import { Component, OnInit, ViewChild } from '@angular/core';
import { PartyApi, ElectionsApi, VoterApi, MembersApi } from '../../../../../core/sdk/index';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { AddPartyComponent } from '../add-party/add-party.component';
import { AddVoterComponent } from '../add-voter/add-voter.component';
import { DeleteElectionComponent } from '../../delete-election/delete-election.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { PARAMETERS } from '@angular/core/src/util/decorators';
@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss'],
  animations: fuseAnimations
})
export class PartyListComponent implements OnInit {
  dataSource: any;
  dataSource1;
  electionid;
  voter_data;
  elctionDdetails: any
  member
  mem_id
  type;
  @ViewChild(MatPaginator) paginatorsent: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['title', 'logo', 'actions'];
  displayedColumns1 = ['number', 'name', 'email',  'actions'];
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AddPartyComponent>;
  constructor(public partyapi: PartyApi, public _matDialog: MatDialog, public voterapi: VoterApi,
    private toastr: ToastrService,
    public election: ElectionsApi,
    public voter: VoterApi,
    public membersApi: MembersApi,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.electionid = params.id;
      console.log(this.electionid, "hjkkkkk");
    })
    this.election.find({
      where: {
        id: this.electionid
      },
      include: [
        {
          relation: 'election_parties'
        },
        {
          relation: 'election_voters',
          scope:{
            include:[{
              relation:'voter_detail'
            }]
          }
        }
      ]


    }
    ).subscribe((_res: any) => {
      this.elctionDdetails = _res[0]
      console.log(_res[0].election_parties, "kkkkkkk")
      this.dataSource = new MatTableDataSource(_res[0].election_parties);
      this.dataSource.paginator = this.paginatorsent;
      this.dataSource.sort = this.sort;

      console.log(_res[0].election_voters, "jjjjkl")
      this.dataSource1 = new MatTableDataSource(_res[0].election_voters);
      this.dataSource1.paginator = this.paginatorsent;
      this.dataSource1.sort = this.sort;
      console.log(this.dataSource1)


    })


  }
  applyFilterSent(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  createOrUpdateParty(response) {

    this.partyapi.upsert(response).subscribe(_item => {
      if (_item) {
        this.ngOnInit();
      }
    })
  }
  createOrUpdateVoter(response) {
    console.log(response.MemberId,"fghjkl")

    let voterDetails = {
      election: this.elctionDdetails,
      userDetsils: response
    }

    this.membersApi.createVoters(voterDetails).subscribe(_item => {
      if (_item) {
        this.ngOnInit();
      }
    })
  }
  createNewParty() {

    this.dialogRef = this._matDialog.open(AddPartyComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'create',
        party_details: ''
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.toastr.success('Added successfully');
        if (response) {

          let new_data = response[1];
          this.createOrUpdateParty({ ...new_data, election_id: this.electionid });
          console.log(response)
        }


      });
  }
  editparty(party): void {
    this.dialogRef = this._matDialog.open(AddPartyComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        party_details: party
      }
    });

    console.log(party)

    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.toastr.success('Updated successfully');
        if (response) {
          console.log(response)
          let new_data = response[1];
          this.createOrUpdateParty({ ...new_data, id: party.id, election_id: this.electionid })
        }
      });

  }

  deleteparty(party): void {

    this.dialogRef = this._matDialog.open(DeleteElectionComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'delete',
        party_details: party
      }
    });
    this.dialogRef.afterClosed()

      .subscribe(response => {
        this.toastr.success('Deleted successfully');
        console.log(response, "lllllll")
        if (response) {
          this.partyapi.deleteById(party.id).subscribe(_item => {
            if (_item) {
              this.ngOnInit();
            }
          })
        }

      });


  }
  createNewVoter() {
    this.dialogRef = this._matDialog.open(AddVoterComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'Create Voter',
        voter_details: '',
        electionid: this.electionid
      }
    });

    // console.log(Voter)
    this.dialogRef.afterClosed()

      .subscribe(response => {
        this.membersApi.find({
          where :{
            email:response[1].email
          }
        }).subscribe(res=>{
        this.member=JSON.parse(JSON.stringify(res))
          this.mem_id=this.member[0]
          console.log(this.mem_id,"grwwww")
       
        console.log(this.mem_id,"kojhjojoj")
        console.log(response);
        this.toastr.success('Added successfully');
        if (response) {
          console.log(this.electionid)
          if (response) {
            let length = 8
            let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            let password = ""
            for (var i = 0, n = charset.length; i < length; ++i) {
              password += charset.charAt(Math.floor(Math.random() * n));
            }
            console.log(password, "eeeeeetttttttttt")
            response[1].password=password
            this.createOrUpdateVoter({ ...response[1],MemberId:this.mem_id,UDA:response[1].password,election_id: this.electionid, type: 'voter' });
            console.log(response)
          }
        }
      })

      });
  }
  editvoter(voter): void {
    console.log(voter.voter_detail,"kopiko")
    this.dialogRef = this._matDialog.open(AddVoterComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'Edit Voter',
        voter_details: voter.voter_detail
      }
    });

    console.log(voter)

    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.toastr.success('Updated successfully');
        if (response) {
          console.log(response)
          let new_data = response[1];
          console.log(new_data,"rrr")
          this.membersApi.upsert({ ...new_data, id: voter.id, election_id: this.electionid })
          .subscribe(_item => {
            if (_item) {
              this.ngOnInit();
            }
          })

        }
      });

  }

  deletevoter(voter): void {

    this.dialogRef = this._matDialog.open(DeleteElectionComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        action: 'delete',
        voter_details: voter
      }
    });
    this.dialogRef.afterClosed()

      .subscribe(response => {

        console.log(response, "lllllll")
        if (response) {
          this.toastr.success('Deleted successfully');
          this.voterapi.deleteById(voter.id).subscribe(_item => {
            if (_item) {
              this.ngOnInit();
            }
          })
        }

      });

  }
}
