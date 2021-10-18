import { RecuperarSenhaComponent } from './../../pages/recuperar-senha/recuperar-senha.component';
import { CarteiraComponent } from './../../pages/carteira/carteira.component';
import { RegisterComponent } from './../../pages/register/register.component';
import { ShareModule } from './../../share/share.module';
import { ModalEnviarComponent } from './../../share/modal-enviar/modal-enviar.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import { InvestComponent } from 'src/app/pages/invest/invest.component';
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {CarouselModule} from 'primeng/carousel';


// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    InputNumberModule,
    ShareModule,
    BadgeModule,
    InputMaskModule,
    PasswordModule,
    DropdownModule,
    ChartModule,
    TableModule,
    CarouselModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ModalEnviarComponent,
    RegisterComponent,
    InvestComponent,
    CarteiraComponent,
    RecuperarSenhaComponent
  ]
})

export class AdminLayoutModule {}
