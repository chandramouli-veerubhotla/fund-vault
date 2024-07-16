import { Routes } from '@angular/router';
import { MyFundsPageComponent } from './pages/my-funds-page/my-funds-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { NewFundPageComponent } from './pages/new-fund-page/new-fund-page.component';
import { FundPageComponent } from './pages/fund-page/fund-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'funds',
        pathMatch: 'full'
    },
    {
        path: 'funds',
        component: MyFundsPageComponent,
        title: 'fundvault | My Funds'
    },
    {
        path: 'new-fund',
        component: NewFundPageComponent,
        title: 'fundvault | New Fund'
    },
    {
        path: 'fund/:id',
        component: FundPageComponent,
        title: 'fundvault | Fund Details'
    },
    {
        path: 'profile',
        component: MyProfilePageComponent,
        title: 'fundvault | My Profile'
    }
];
