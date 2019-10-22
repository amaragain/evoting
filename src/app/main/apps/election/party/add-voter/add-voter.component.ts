import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { VoterApi,ElectionsApi,PartyApi } from '../../../../../core/sdk/index';

@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.scss']
})
export class AddVoterComponent implements OnInit {
addVoterForm:FormGroup;
  constructor(
    private voter:VoterApi,public election:ElectionsApi,
    private party:PartyApi,
    public matDialogRef: MatDialogRef<AddVoterComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    let details = this._data.voter_details; 
    this.addVoterForm = this._formBuilder.group({
        Number : [details.Number ? details.Number : '' , Validators.required],
        name : [details.name ? details.name :'', Validators.required],
        email : [details.email ? details.email : '' , Validators.required]
        // password : [ details.email ? details.email :'' , Validators.required]
        
    });
    
  }

}
