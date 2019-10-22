import { environment } from 'environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PartyApi, ElectionsApi, VoterApi, MembersApi, CandidateApi, VotesApi, Candidate_walletApi, TransactionsApi } from '../../../../../core/sdk/index';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { AddPartyComponent } from '../add-party/add-party.component';
import { AddVoterComponent } from '../add-voter/add-voter.component';
import { DeleteElectionComponent } from '../../delete-election/delete-election.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss'],
  animations: fuseAnimations
})
export class PartyListComponent implements OnInit {
  baseUrl = environment.API_URL;
  dataSource: any;
  dataSource1;
  dataSource2;
  electionid;
  voter_data;
  elctionDdetails: any;
  type;
  voterid;
  member: any;
  mem_id: any;
  election_entry = false;
  voted = false;
  results: any = [];
  @ViewChild(MatPaginator) paginatorsent: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['title', 'logo', 'actions'];
  displayedColumns1 = ['number', 'name', 'email', 'password', 'actions'];
  displayedColumns2 = ['partylogo', 'name', 'email', 'party', 'status'];
  dialogRef: any;
  countVotes: any;
  isVoted: any = 0;
  votedFor: any;
  electionAdmin;
  adminUser: any = false;
  confirmDialogRef: MatDialogRef<AddPartyComponent>;
  constructor(
    public partyapi: PartyApi,
    public _matDialog: MatDialog,
    public voterapi: VoterApi,
    private toastr: ToastrService,
    public election: ElectionsApi,
    public voter: VoterApi,
    public votes: VotesApi,
    public membersApi: MembersApi,
    public _candidateApi: CandidateApi,
    public _candidate_wallet: Candidate_walletApi,
    private route: ActivatedRoute,
    public _transactionsApi: TransactionsApi
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id.indexOf('vote') > -1) {
        this.electionid = params.id.split('-')[1];
        this.voterid = params.id.split('-')[2];
        this.election_entry = true;

        console.log('PARAMS-- ', this.voterid, this.electionid);

        if (params.id.split('-').length == 2) {
          this.adminUser = true;
        }
        else if (params.id.split('-').length == 3) {
          this.adminUser = false;
        }
      }
      else {
        this.electionid = params.id;
      }
      console.log(this.electionid, "hjkkkkk", this.voterid == 'undefined');
    });






    // this.membersApi.find({
    //   where: {
    //     userType: 'superadmin'
    //   }
    // }).subscribe((_res: any) => {
    //   this.electionAdmin = _res[0];
    //   console.log('this.electionAdmin', this.electionAdmin);
    // });


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
          scope: {
            include: [{
              relation: 'voter_detail'
            }]
          }
        },
        {
          relation: 'election_candidates',
          scope: {
            include: [
              {
                where: {
                  candidateId: { neq: '' },
                },
                relation: 'candidate_detail',
                scope: {
                  include: [
                    {
                      relation: 'candidate_votes'
                    }
                  ]
                }
              },
              {
                relation: 'candidate_party'
              }
            ]
          }
        },
      ]
    }
    ).subscribe((_res: any) => {
      this.elctionDdetails = _res[0]

      console.log(this.elctionDdetails, "this.elctionDdetails")

      let voterLength = 0;
      this.elctionDdetails.election_candidates.map((candi) => {
        if (candi.candidate_detail) {
          candi.voterLength = voterLength;
          candi.candidate_detail.candidate_votes.map((el) => {
            if (el.voter_id == this.voterid) {
              voterLength++;
              candi.voterLength = voterLength;
            }
            this.isVoted = voterLength;
          });
        }
      });


      console.log(this.elctionDdetails, "this.elctionDdetails")

      let allCandidates = this.elctionDdetails.election_candidates;

      console.log(allCandidates, 'allCandidates');
      // allCandidates.map((all_candi) => {

      //   this.votes.find().subscribe((resp) => {
      //     console.log(resp, '====================');
      //   });
      // });


      console.log('_res[0]', _res[0]);
      console.log('_res[0].election_parties', _res[0].election_parties);
      this.dataSource = new MatTableDataSource(_res[0].election_parties);
      this.dataSource.paginator = this.paginatorsent;
      this.dataSource.sort = this.sort;
      console.log('this.dataSource', this.dataSource);

      console.log(' _res[0].election_voters', _res[0].election_voters);
      this.dataSource1 = new MatTableDataSource(_res[0].election_voters);
      this.dataSource1.paginator = this.paginatorsent;
      this.dataSource1.sort = this.sort;
      console.log('this.dataSource1', this.dataSource1);

      console.log('_res[0].election_candidates', _res[0].election_candidates);
      this.dataSource2 = new MatTableDataSource(_res[0].election_candidates);
      this.dataSource2.paginator = this.paginatorsent;
      this.dataSource2.sort = this.sort;
      console.log('this.dataSource2', this.dataSource2);



    });

    this.votes.find({
      where: {
        election_id: this.electionid
      }
      // include:[{
      //   relation: 'candidate'
      // },
      // {
      //   relation : 'voter'
      // }
      //]
    }).subscribe(_res => {

      _res.map(_item => {
        let t = JSON.parse(JSON.stringify(_item))

        this.votes.find({
          where: {
            candidate_id: t.candidate_id
          },
        }).subscribe(_i => {
          console.log(_i, "oooo ppppppppppp +++++++ pppppppp")
        })


      })


    })



    this._candidateApi.find({
      where: {
        electionId: this.electionid
      },
      include: [{
        relation: 'candidate_detail'
      }]
    }).subscribe(_candDetais => {

      console.log(_candDetais, "llllll ooooooooooo")

      let t = JSON.parse(JSON.stringify(_candDetais))

      _candDetais.map((_item: any) => {
        console.log(_item.candidateId, "oooooo pppppppppppppppp", this.electionid)

        this.votes.find({
          where: { and: [{ candidate_id: _item.candidateId }, { election_id: this.electionid }] },
          include: [
            {
              relation: 'candidate',
              scope: {
                include: [
                  {
                    relation: 'candidate_party'
                  }
                ]
              }
            }
          ]
        }).subscribe((_succ: any) => {

          console.log(_succ, "eeeeeeeeeeee")

          if (_succ.length) {
            const electionRes = {
              candidateName: _succ[0].candidate.name,
              voteLength: _succ.length
            }
            this.results.push(electionRes);
          }

        })

      })

    })



    this._candidateApi.find({
      where: {
        electionId: this.electionid
      },
      include: [
        {
          relation: 'candidate_detail',
          // scope:{
          //   include:[{
          //     relation : 'voter'
          //   }]
          // }
        },
        {
          relation: 'candidate_votes',
          // scope: {
          //   type: 'count'
          // }
        },
        {
          relation: 'party_candidateregister'
        }
      ]
    }).subscribe((_res) => {
      console.log('_candidateApi_', _res);



    });



    // this.votes.find().subscribe((_res) => {
    //   console.log('VOTES', _res);

    //   this.countVotes = _res;
    //   // if(_res.length > 0){
    //   //   this.voted = true;
    //   // }
    // });



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
    console.log(response, "fghjkl")

    let voterDetails = {
      election: this.elctionDdetails,
      userDetsils: response
    }

    this.membersApi.createVoters(voterDetails).subscribe(_item => {
      if (_item) {
        this.ngOnInit();
      }
    });
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
          // this._electionsApi.deleteById(election.id)
          //         this.ngOnInit();
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
          where: {
            email: response[1].email
          }
        }).subscribe(res => {
          this.member = JSON.parse(JSON.stringify(res))
          this.mem_id = this.member[0]
          console.log(this.mem_id, "grwwww")

          console.log(this.mem_id, "kojhjojoj")
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
              response[1].password = password


              const elec_amount = Number(this.elctionDdetails.amountToBePaid) + 10;
              this.elctionDdetails.amountToBePaid = this.elctionDdetails.amountToBePaid ? (Number(this.elctionDdetails.amountToBePaid) + 10) : 10;
              this.election.patchOrCreate(this.elctionDdetails).subscribe(_item => {
                console.log('elec_amount', _item);
              });

              this.createOrUpdateVoter({ ...response[1], MemberId: this.mem_id, UDA: response[1].password, election_id: this.electionid, type: 'voter' });
              console.log(response)
            }
          }
        })

      });
  }
  editvoter(voter): void {
    console.log(voter.voter_detail, "kopiko")
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
          console.log(new_data, "rrr")
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

  doVote(candiId) {
    console.log('candiId', candiId);
    const data = {
      voter_id: this.voterid,
      election_id: this.electionid,
      candidate_id: candiId
    };


    this.votes.create(data).subscribe((_res) => {

      const tans_details = { 'voter_id': this.voterid, 'candid_id': candiId };
      this._transactionsApi.sendCoinToCandi(tans_details).subscribe(_resp => {
        console.log('_resp_resp_resp_resp', _resp);
      });

      // const elec_amount = Number(this.elctionDdetails.amountToBePaid) + 10;
      // this.elctionDdetails.amountToBePaid = this.elctionDdetails.amountToBePaid ? (Number(this.elctionDdetails.amountToBePaid) + 10) : 10;
      // this._candidateApi.patchOrCreate({ id: candiId, }).subscribe(_item => {
      //   console.log('elec_amount', _item);
      // });

      // this._candidate_wallet.find({
      //   where:{
      //     id:candiId
      //   }
      // }).subscribe((wallet) => {



      // this._candidate_wallet.find({ 'id': candiId}).subscribe((wallet) => {
      //   const coin = wallet.coin ? (Number(wallet.coin) + 10) : 10;
      //   console.log('wallet', wallet);
      //   this._candidate_wallet.patchOrCreate({ candidate_id: candiId, coin: coin, election_id: this.electionid }).subscribe((resp) => {
      //     console.log('resp', resp);
      //   });
      // });


      console.log('VOTES', _res);
      this.toastr.success('Successfully Voted');
      this.votedFor = candiId;

      this.ngOnInit();
    });

  }


  sendResults(electionId) {
    this.votes.sendResults(electionId).subscribe((_res) => {
      console.log('sendResults', _res);
      this.toastr.success('Results published successfully!');
      if (_res) {
      }
    });
  }





  //   startElection(election): any {
  //     console.log(election);

  //     election.status = true;
  //     this._electionsApi.upsert(election).subscribe((_res: any) => {
  //         console.log('_res_res_res', _res);
  //         this.toastr.success('Election started');
  //         this._transactionsApi.sendCoinToVoters().subscribe((_resp) => {
  //             console.log('_resp_resp_resp_resp', _resp);
  //         });
  //     });
  // }


}
