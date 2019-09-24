import { Component, Inject, OnInit,  ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {  ElectionsApi, MembersApi} from '../../../../../core/sdk/index';

@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddVoterComponent implements OnInit {
  addVoterForm: FormGroup;
  memberId
  constructor(
     public election: ElectionsApi,
    public voter:MembersApi,
    public matDialogRef: MatDialogRef<AddVoterComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    let details = this._data.voter_details;
    this.addVoterForm = this._formBuilder.group({
      Number: [details.Number ? details.Number : '', Validators.required],
      name: [details.name ? details.name : '', Validators.required],
      email: [details.email ? details.email : '', Validators.required]
    });
  }
  findemail(value){
    console.log(value,"hhhh")
    this.voter.find(
      {
      where:{
        email:value
      }
    }
    ).subscribe(res=>{
    console.log(res,"fffff")
    let member_data =JSON.parse(JSON.stringify(res))

    if(member_data.length){
      console.log(member_data[0].id,"lkgo")
      this.memberId=member_data[0].id
        this.addVoterForm = this._formBuilder.group({
          Number: [member_data[0].Number ? member_data[0].Number : '', Validators.required],
      name: [member_data[0].name ? member_data[0].name : '', Validators.required],
      email: [member_data[0].email ? member_data[0].email : '', Validators.required]
      });
    }
    console.log(this.memberId,"ty")
   
    })
  }


}
