import { CommonModule } from '@angular/common';
import { MensagemErroComponent } from './mensagem-erro.component';
import { NgModule } from "@angular/core";



@NgModule({
  imports: [
    CommonModule

  ],
  declarations: [
     MensagemErroComponent

  ],
  providers: [],
  bootstrap: [MensagemErroModule],
  exports:[
    MensagemErroComponent
  ]
})
export class MensagemErroModule { }
