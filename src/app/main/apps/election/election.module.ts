import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule,
    MatCheckboxModule, MatDatepickerModule, MatMenuModule, MatToolbarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { HttpModule } from '@angular/http';

import { ElectionListComponent } from 'app/main/apps/election/election-list/election-list.component';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { newElectionDialogComponent } from './new-election/new-election.component';
import { DeleteElectionComponent } from './delete-election/delete-election.component';
import { AddPartyComponent } from './party/add-party/add-party.component';
import { PartyListComponent } from './party/party-list/party-list.component';
import { AddVoterComponent } from './party/add-voter/add-voter.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
    {
        path     : 'election-list',
        component: ElectionListComponent,
    },
    {
        path     : 'party/party-list/:id',
        component: PartyListComponent,
    },
    {
        path     : 'party/add-party',
        component: AddPartyComponent,
    }
];

@NgModule({
    declarations: [
        ElectionListComponent,
        newElectionDialogComponent,
        DeleteElectionComponent,
        AddPartyComponent,
        PartyListComponent,
        AddVoterComponent
       
        
    ],
    imports     : [
        RouterModule.forChild(routes),
        HttpClientModule,
        HttpModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule, 
        MatDatepickerModule, 
        MatMenuModule, 
        MatToolbarModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AngularDateTimePickerModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        FuseConfirmDialogModule
    ],
    providers   : [
    ],
    entryComponents: [
        newElectionDialogComponent,
        AddPartyComponent,
        AddVoterComponent,
        DeleteElectionComponent
    ]
})
export class ElectionModule
{
}
