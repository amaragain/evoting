import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { RegisterModule } from 'app/main/pages/authentication/register/register.module';

import { ProfileModule } from 'app/main/pages/profile/profile.module';
import { SearchClassicModule } from 'app/main/pages/search/classic/search-classic.module';
import { SearchModernModule } from 'app/main/pages/search/modern/search-modern.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        RegisterModule,
       
        // Profile
        ProfileModule,

        // Search
        SearchClassicModule,
        SearchModernModule,

        
    ]
})
export class PagesModule
{

}
