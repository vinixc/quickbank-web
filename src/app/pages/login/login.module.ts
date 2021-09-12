import { MensagemErroComponent } from './../../share/mensagem-erro/mensagem-erro.component';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./login.component";
import { MensagemErroModule } from 'src/app/share/mensagem-erro/mensagem-erro.module';

@NgModule({

    imports:[
        FormsModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        MensagemErroModule
    ],
    declarations:[
        LoginComponent
    ]
})
export class LoginModule{}
