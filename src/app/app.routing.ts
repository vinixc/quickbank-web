import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { InvestComponent } from './pages/invest/invest.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardLogged } from './core/auth/auth.guard.logged';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './pages/login/layout/auth-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { CarteiraComponent } from './pages/carteira/carteira.component';

const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:  'login',              component: LoginComponent, canActivate: [AuthGuardLogged]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardLogged]},
  {path: 'forgot_password', component: RecuperarSenhaComponent, canActivate: [AuthGuardLogged]},
  {path: '',                    component: AdminLayoutComponent, canActivate:[AuthGuard],
    children: [{path: '', loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)}]
  },
  { path: '', component: AuthLayoutComponent, canActivate:[AuthGuard],
    children: [{path: '',loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)}]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  },
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'transferencias',   component: TransferenciasComponent },
  { path: 'invest',   component: InvestComponent},
  { path: 'carteira',   component: CarteiraComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
