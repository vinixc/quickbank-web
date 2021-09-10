import { Component, Input } from "@angular/core";

@Component({
  selector:'ap-mensagem-erro',
  templateUrl: './mensagem-erro.component.html'
})
export class MensagemErroComponent{

  @Input() mensagem : any;

}
