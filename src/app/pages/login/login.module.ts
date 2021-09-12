import { ShareModule } from './../../share/share.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./login.component";

@NgModule({

    imports:[
        FormsModule,
        NgbModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        ShareModule
    ],
    declarations:[
        LoginComponent
    ]
})
export class LoginModule{}
