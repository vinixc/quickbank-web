import { FormsModule } from '@angular/forms';
import { MetaComponent } from './meta/meta.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MensagemErroComponent } from './mensagem-erro/mensagem-erro.component';
import { MessageComponent } from '../message/message.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';







@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TooltipModule


  ],
  declarations: [
     MensagemErroComponent,
     MetaComponent,
     MessageComponent
  ],
  providers: [],
  bootstrap: [ShareModule],
  exports:[
    MensagemErroComponent,
    MetaComponent,
    MessageComponent
  ]
})
export class ShareModule { }
