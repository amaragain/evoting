import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PartyApi, Party } from '../../../../../core/sdk/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { environment } from '../../../../../../environments/environment'

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.scss']
})
export class AddPartyComponent implements OnInit {
  id: number;
  new_file_name: any
  private sub: any;
  route: ActivatedRoute;
  action: string;
  addPartyForm: FormGroup;
  dialogTitle: string;
  baseUrl: any
  constructor(private party: PartyApi,
    public matDialogRef: MatDialogRef<AddPartyComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private router: Router,
    public httpFile: Http

  ) { }

  ngOnInit() {
    this.baseUrl = environment.API_URL
    let details = this._data.party_details;
    this.addPartyForm = this._formBuilder.group({
      title: [details.title ? details.title : '', Validators.required]
    });

  }

  uploadPartyLogo(event) {
    const URL = this.baseUrl + '/api/storages/party_logo/upload'
    let fileList: FileList = event.target.files
    
    if (fileList.length > 0) {
      let file: File = fileList[0]
      var file_ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      this.new_file_name = new Date().getTime() / 1000 + '.' + file_ext

      let formData: FormData = new FormData()
      formData.append('uploadFile', file, this.new_file_name)
      let headers = new Headers()
      let options = new RequestOptions({ headers: headers })
      console.log('URL', URL, options, FormData);
      this.httpFile.post(URL, formData, options).subscribe(res => {
        if (res) {
          console.log('res', res);

          this.addPartyForm.value.partyLogo = this.new_file_name
          console.log('this.new_file_name', this.new_file_name);

        }
      });
    }
  }
}
