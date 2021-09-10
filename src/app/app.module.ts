import { ServicesModule } from './services/services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { VMessageComponent } from './share/vmessage/vmessage.component';
import { LoginModule } from './pages/login/login.module';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
 import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './pages/login/layout/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MensagemErroComponent } from './share/mensagem-erro/mensagem-erro.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ComponentsModule,
    AppRoutingModule,
    LoginModule,
    CommonModule,
    ServicesModule

  ],
  declarations: [
    AppComponent,
    VMessageComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
