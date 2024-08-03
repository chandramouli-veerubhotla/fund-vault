import { Routes } from '@angular/router';
import { FundPageComponent } from './pages/fund-page/fund-page.component';
import { MyFundsPageComponent } from './pages/my-funds-page/my-funds-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';


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
    },
    {
        path: 'history',
        component: HistoryPageComponent,
        title: 'fundvault | History'
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        title: 'fundvault | Settings'
    }
];
