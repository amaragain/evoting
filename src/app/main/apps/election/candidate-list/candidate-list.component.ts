import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { VoterApi, MembersApi } from 'app/core/sdk';
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  animations: fuseAnimations
})
export class CandidateListComponent implements OnInit {
  displayedColumns = ['name', 'logo', 'actions'];
  dataSource: any
  voterId
  @ViewChild(MatPaginator) paginatorsent: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public candidate: VoterApi,
    public member: MembersApi) { }

  ngOnInit() {
    this.member.getCurrent().subscribe(res => {
      console.log(res.id, "hhhdddd")
      this.voterId=res.id
      this.candidate.find({
        where: {
          voter_id: this.voterId
        },
        include: [
          {
            relation: 'voter',
            scope: {
              include: [{
                relation: 'voter_candidate'
              }

              ]
            }
          }
        ]
      }).subscribe(res => {
        console.log(res, "rew")
      })
    })
  }
  applyFilterSent(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
