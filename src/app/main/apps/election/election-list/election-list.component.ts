import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ToastrService } from 'ngx-toastr';
// import { ElectionListService } from 'app/main/apps/election/election-list/election-list.service';
import { takeUntil } from 'rxjs/internal/operators';

import { newElectionDialogComponent } from '../new-election/new-election.component';
import { DeleteElectionComponent } from '../delete-election/delete-election.component';

import { ElectionsApi, TransactionsApi, MembersApi } from '../../../../core/sdk/index';

import { MatTooltipModule } from '@angular/material/tooltip';
import { LoopBackAuth } from '../../../../core/sdk/services/core';

import * as moment from 'moment';
import { id } from '@swimlane/ngx-charts/release/utils';

@Component({
    selector: 'elections',
    templateUrl: './election-list.component.html',
    styleUrls: ['./election-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ElectionListComponent implements OnInit {
    dataSource: any
    @ViewChild(MatPaginator) paginatorsent: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['title', 'location', 'amount', 'start date', 'end date', 'actions'];



    dialogRef: any;
    currentUser: any;
    currentDate: any;
    electionAdmin: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<newElectionDialogComponent>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public _matDialog: MatDialog,
        private toastr: ToastrService,
        private _loopBackAuth: LoopBackAuth,
        public _electionsApi: ElectionsApi,
        public membersApi: MembersApi,
        public _transactionsApi: TransactionsApi
        // public electionservice:ElectionListService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {
        //this.dataSource = new FilesDataSource(this._electionListService, this.paginator, this.sort);
        //console.log( this.dataSource, " this.dataSource")

        this.currentDate = new Date();


        this.route.params.subscribe(params => {
            console.log('params', params);
        });


        this.currentUser = this._loopBackAuth.getCurrentUserData();
        console.log('this.currentUser', this.currentUser);


        this.membersApi.find({
            where: {
                userType: 'superadmin'
            }
        }).subscribe((_res: any) => {
            this.electionAdmin = _res[0];
            console.log('this.electionAdmin', this.electionAdmin);
        });



        this._electionsApi.find({
            include: [
                {
                    relation: 'election_parties'
                },
                {
                    relation: 'election_voters'
                },
                {
                    relation: 'election_candidates',
                },
                {
                    relation: 'election_transactions',
                    scope: {
                        where: {
                            'sender': { 'like': this.currentUser.id }
                        }
                    }
                    // scope: {
                    //     where: {
                    //         sender: this.currentUser.id
                    //     }
                    // }
                }
            ]
        }).subscribe((_res: any) => {
            console.log('this._electionsApi.find', _res, this.currentUser.id);
            this.dataSource = new MatTableDataSource(_res);
            this.dataSource.paginator = this.paginatorsent;
            this.dataSource.sort = this.sort;
        })
    }

    applyFilterSent(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    createOrUpdateElection(response) {

        this._electionsApi.upsert(response).subscribe(_item => {
            if (_item) {
                console.log('_item_item_item', _item);
                // if (_item.electionWallet == '' || !_item.electionWallet){
                this.createEthElecAccount(_item);
                this.ngOnInit();
                // }
                // else{
                //     this.ngOnInit();
                // }
            }
        })
    }


    createEthElecAccount(election): void {
        console.log('createEthElecAccount', election);
        this._electionsApi.createEthElecAccount(election).subscribe(_res => {
            console.log('createEthElecAccount', _res);
            if (_res) {

            }
        });
    }

    createNewElection() {

        this.dialogRef = this._matDialog.open(newElectionDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'create',
                election_details: ''
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                this.toastr.success('Added successfully');
                if (response) {
                    console.log('responseresponse', response);
                    let StartDate = new Date(response[1].startDate)
                    let startTime = StartDate.getHours() + ':' + StartDate.getMinutes() + ":" + StartDate.getSeconds()
                    let endDate = new Date(response[1].endDate)
                    let endTime = endDate.getHours() + ':' + endDate.getMinutes() + ":" + endDate.getSeconds()
                    this.createOrUpdateElection({ ...response[1], start_time: startTime, end_time: endTime })
                    // 
                    //this.createEthElecAccount(response);
                }

            });
    }
    editElection(election) {
        this.dialogRef = this._matDialog.open(newElectionDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'edit',
                election_details: election
            }
        });

        console.log(election)

        this.dialogRef.afterClosed()
            .subscribe(response => {
                this.toastr.success('Updated successfully');
                if (response) {
                    console.log(response)
                    let new_data = response[1];
                    this.createOrUpdateElection({ ...new_data, id: election.id, status: 0 });
                }
            });

    }
    deleteElection(election): void {
        this.dialogRef = this._matDialog.open(DeleteElectionComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'delete',
                election_details: election
            }
        });
        this.dialogRef.afterClosed()

            .subscribe(response => {

                if (response) {
                    this._electionsApi.deleteById(election.id).subscribe(_item => {
                        if (_item) {
                            this.toastr.success('Deleted successfully');
                            this.ngOnInit();
                        }
                    })
                }

            });
    }


    addparty(election) {
        this.router.navigateByUrl('/apps/election/party/party-list/' + election.id);
    }


    payForElection(elec_id): void {
        console.log('elec_id', elec_id);
        this._transactionsApi.upsert({
            election_id: elec_id,
            sender: this.currentUser.id,
            type: 1    // 1 is for candidate registration for an election
        }).subscribe(_item => {
            if (_item) {

                this.membersApi.find({
                    where: {
                        userType: 'superadmin'
                    }
                }).subscribe((_res: any) => {
                    this.electionAdmin = _res[0];
                    console.log('this.electionAdmin', this.electionAdmin);

                    const tans_details = { 'admin_wallet': this.electionAdmin.walletAddress, 'sender_wallet': this.currentUser.walletAddress };
                    console.log('tans_detailstans_detailstans_details', tans_details);
                    this._transactionsApi.sendCoin(tans_details).subscribe(_resp => {
                        console.log('_resp_resp_resp_resp', _resp);
                    });

                    this.toastr.success('Paid successfully');
                    this.ngOnInit();
                });

            }
        });
    }



    startElection(election): any {
        console.log(election);

        election.status = true;
        this._electionsApi.upsert(election).subscribe((_res: any) => {
            console.log('_res_res_res', _res);
            this.toastr.success('Election started');
            this._transactionsApi.sendCoinToVoters().subscribe((_resp) => {
                console.log('_resp_resp_resp_resp', _resp);
            });
        });
    }

    viewElectionResult(election): any {
        this.router.navigate(['/apps/election/party/party-list/vote-' + election.id]);
    }


}


