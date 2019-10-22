import { environment } from 'environments/environment';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { ElectionsApi, PartyApi, CandidateApi,MembersApi } from '../../../../core/sdk';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { id } from '@swimlane/ngx-datatable/release/utils';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    elections;
    party;
    candidate_details: any;
    parties: any = [];
    partylist: any = [];
    baseUrl = environment.API_URL;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private election: ElectionsApi,
        private partys: PartyApi,
        private router: Router,
        private candidate: CandidateApi,
        private membersapi:MembersApi
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            election: ['', Validators.required],
            party: ['', Validators.required]
        });
        this.election.find().subscribe((res: any) => {
            if (res) {
                console.log(res, "hjklgh")
                this.elections = res;
            }
        })
        this.partys.find().subscribe((res: any) => {
            if (res) {
                console.log(res, "hjklghmmmmm")
                this.party = res;
            }
        })


        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }
    register() {
        console.log(this.registerForm.value,"oooooooooooooooooo",)
        let electionDetails = {
            electionId : this.registerForm.value.election,
            partyId : this.registerForm.value.party
        }

        let registrationDetils = {
            name : this.registerForm.value.name,
            email:this.registerForm.value.email,
            password:this.registerForm.value.password,
            passwordConfirm:this.registerForm.value.passwordConfirm,
            type : 'candidate'
        }

        let candidate_election_details = {
            elctionDeetails : electionDetails,
            cand_registerDetails: registrationDetils
        }
        console.log(candidate_election_details)
        this.membersapi.createCandidate(candidate_election_details).subscribe(item => {
            console.log(item, "dfghjkjjjjjj")
            this.router.navigate(['/pages/auth/login']);
        })
    }
    

    getParties(electionId) {

        this.election.find({


            where: {
                id: electionId
            },
            include: [
                {
                    relation: 'election_parties',
                    scope: {
                        include: [
                            {
                                relation: 'party_cand'
                            }
                        ]
                    }
                }
            ]
        }

        ).subscribe(res => {

            if (res) {

                let parseData = JSON.parse(JSON.stringify(res))
                let allParties = parseData[0].election_parties;
                allParties.map((party) => {
                    if (party.party_cand.length == 0){
                        this.parties.push(party);
                    }
                });
                console.log(parseData[0].election_parties, "ghjklbnm,")
                this.candidate_details = res[0];
                console.log(this.candidate_details, "bbbbbbbbbb")
            }
        })

    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
