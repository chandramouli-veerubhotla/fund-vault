import { Routes } from '@angular/router';
import { MyFundsPageComponent } from './pages/my-funds-page/my-funds-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';

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
        path: 'profile',
        component: MyProfilePageComponent,
        title: 'fundvault | My Profile'
    }
];
