import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ElectionsApi } from '../../../../core/sdk/index';
@Component({
    selector: 'new-election',
    templateUrl: './new-election.component.html',
    styleUrls: ['./new-election.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class newElectionDialogComponent implements OnInit {
    action: string;
    newElectionForm: FormGroup;
    dialogTitle: string;
    date: Date = new Date();
    date2: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MMM-yyyy hh:mm a',
        defaultOpen: false
    }
    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(private election: ElectionsApi,
        public matDialogRef: MatDialogRef<newElectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let details = this._data.election_details;

        console.log(details.title, "llllllllllllllllllll")
        this.newElectionForm = this._formBuilder.group({

            title: [details.title ? details.title : '', Validators.required],
            location: [details.location ? details.location : '', Validators.required],
            // amountToBePaid: [details.amountToBePaid ? details.amountToBePaid : '', Validators.required],
            startDate: [details.startDate ? details.startDate : new Date(), Validators.required],
            endDate: [details.endDate ? details.endDate : new Date(), Validators.required]
            // id:[this._data.election_details.id?this._data.election_details.id:'']
        });
    }




}
