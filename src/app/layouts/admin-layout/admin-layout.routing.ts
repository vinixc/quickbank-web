import { RecuperarSenhaComponent } from './../../pages/recuperar-senha/recuperar-senha.component';
import { CarteiraComponent } from './../../pages/carteira/carteira.component';
import { RegisterComponent } from './../../pages/register/register.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { InvestComponent } from 'src/app/pages/invest/invest.component';
import { TransferenciasComponent } from 'src/app/pages/transferencias/transferencias.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'register',   component: RegisterComponent },
    { path: 'forgot_password',   component: RecuperarSenhaComponent },
    { path: 'invest',   component: InvestComponent},
    { path: 'carteira',   component: CarteiraComponent},
    { path: 'transferencias',   component: TransferenciasComponent }

];
