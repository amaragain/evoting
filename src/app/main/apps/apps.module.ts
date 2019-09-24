import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatDialogModule,MatSnackBarModule} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FuseSharedModule } from '@fuse/shared.module';


const routes = [
    
    {
        path        : 'election',
        loadChildren: './election/election.module#ElectionModule'
    },
    {
        path        : 'parties',
        loadChildren: './election/election.module#ElectionModule'
    }
    
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatDialogModule,
        MatSnackBarModule,
        OwlDateTimeModule, 
         OwlNativeDateTimeModule
    ]
})
export class AppsModule
{
}
