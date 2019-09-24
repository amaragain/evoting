import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import {Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router'
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ToastrService } from 'ngx-toastr';
// import { ElectionListService } from 'app/main/apps/election/election-list/election-list.service';
import { takeUntil } from 'rxjs/internal/operators';

import { newElectionDialogComponent } from '../new-election/new-election.component';
import {DeleteElectionComponent} from '../delete-election/delete-election.component';

import { ElectionsApi } from '../../../../core/sdk/index'

import {MatTooltipModule} from '@angular/material/tooltip';

import * as moment from 'moment';
import { id } from '@swimlane/ngx-charts/release/utils';

@Component({
    selector     : 'elections',
    templateUrl  : './election-list.component.html',
    styleUrls    : ['./election-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ElectionListComponent implements OnInit
{
    dataSource: any
    @ViewChild(MatPaginator) paginatorsent: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['title', 'location', 'amount', 'start date', 'end date', 'actions'];

  

    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<newElectionDialogComponent>;

    constructor(private router:Router,private route:ActivatedRoute,
        public _matDialog: MatDialog,
        private toastr: ToastrService,
        public _electionsApi : ElectionsApi
        // public electionservice:ElectionListService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit()
    {
        //this.dataSource = new FilesDataSource(this._electionListService, this.paginator, this.sort);
        //console.log( this.dataSource, " this.dataSource")

        

            this._electionsApi.find({
                include:[
                    {
                        relation:'election_parties'
                    }
                ]
            }).subscribe((_res : any) => {
                this.dataSource = new MatTableDataSource(_res );
                this.dataSource.paginator = this.paginatorsent;
                this.dataSource.sort = this.sort;
            })
    }

    applyFilterSent(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    createOrUpdateElection(response){
        
        this._electionsApi.upsert(response).subscribe(_item => {
            if(_item){
                this.ngOnInit();
            }
        })
    }



    createNewElection(){

        this.dialogRef = this._matDialog.open(newElectionDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action : 'create',
                election_details : ''
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                this.toastr.success('Added successfully');
                if(response) {

                    let StartDate = new Date(response[1].startDate)
                    let startTime = StartDate.getHours() + ':' + StartDate.getMinutes() + ":" + StartDate.getSeconds()
                    let endDate = new Date(response[1].endDate)
                    let endTime = endDate.getHours() + ':' + endDate.getMinutes() + ":" + endDate.getSeconds()
                    this.createOrUpdateElection({...response[1],start_time:startTime,end_time:endTime})
                    console.log(startTime ,"lllllllkkkkkkkkkkkk")
                }
                    
                   
            });
    }
    editElection(election)
    {
        this.dialogRef=this._matDialog.open(newElectionDialogComponent,{
            panelClass:'contact-form-dialog',
            data: {
                action: 'edit',
                 election_details: election
                }
        });
        
        console.log(election)

        this.dialogRef.afterClosed()
        .subscribe(response => {
            this.toastr.success('Updated successfully');
            if(response) {
                console.log(response)
                let new_data = response[1];
                this.createOrUpdateElection({...new_data, id: election.id})
            }
        });
        
    }
    deleteElection(election):void
    {
        this.dialogRef=this._matDialog.open(DeleteElectionComponent,{
            panelClass:'contact-form-dialog',
            data: {
                action: 'delete',
                 election_details: election
                }
        });
        this.dialogRef.afterClosed()
       
        .subscribe(response => {
            
            if(response)
            {      
                this._electionsApi.deleteById(election.id).subscribe(_item => {
                    if(_item){
                        this.toastr.success('Deleted successfully');
                        this.ngOnInit();
                    }
                })
            }
        
        });
        
        
            }
            addparty(election)
            {
             this.router.navigateByUrl('/apps/election/party/party-list/'+election.id);
            }
        }


