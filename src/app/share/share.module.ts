import { MetaComponent } from './meta/meta.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MensagemErroComponent } from './mensagem-erro/mensagem-erro.component';



@NgModule({
  imports: [
    CommonModule

  ],
  declarations: [
     MensagemErroComponent,
     MetaComponent

  ],
  providers: [],
  bootstrap: [ShareModule],
  exports:[
    MensagemErroComponent,
    MetaComponent
  ]
})
export class ShareModule { }
