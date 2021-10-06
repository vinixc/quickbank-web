import { RegisterComponent } from './../../pages/register/register.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { InvestComponent } from 'src/app/pages/invest/invest.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'register',   component: RegisterComponent },
    { path: 'invest',   component: InvestComponent}

];
