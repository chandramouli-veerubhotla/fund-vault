import { Routes } from '@angular/router';
import { FundPageComponent } from './pages/fund-page/fund-page.component';
import { MyFundsPageComponent } from './pages/my-funds-page/my-funds-page.component';


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
        path: 'fund/:fundId',
        component: FundPageComponent,
        title: 'fundvault | Fund Details'
    }
];
