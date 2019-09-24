import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule,MatDialog,MatSnackBarModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElectionsApi } from '../../../../core/sdk/index';
import {ElectionListComponent} from '../election-list/election-list.component';

@Component({
  selector: 'app-delete-election',
  templateUrl: './delete-election.component.html',
  styleUrls: ['./delete-election.component.scss']
})
export class DeleteElectionComponent implements OnInit {
  newElectionForm: FormGroup;
  addPartyForm:FormGroup;
  addVoterForm:FormGroup;
  dialogTitle: string;
  action:string;
  response=false;
  constructor(
    public _electionsApi : ElectionsApi,
    public dialog:MatDialog,
    public snackbar:MatSnackBarModule,
        public matDialogRef: MatDialogRef<DeleteElectionComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
   
}

}
