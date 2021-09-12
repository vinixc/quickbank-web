import { TransferenciaService } from './../../services/transferencia/transferencia.service';
import { UserImpl } from './../../core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-enviar',
  templateUrl: './modal-enviar.component.html'
})
export class ModalEnviarComponent {
  closeResult = '';

  modalEnviar: boolean = false;

  @Input() usuarioTarget : string;
  @Input() valorEnvio : number;
  mensagemError: string = '';
  mensagemSucesso: string = '';
  usuarioTargetObj : UserImpl;

  @Output() transferenciaRealizada : any = new EventEmitter();


  constructor(private modalService: NgbModal, private userService :UserService,private router : Router, private transferService: TransferenciaService) {}

  showDialogEnviar(){
    this.modalEnviar = true;
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['login']);
  }

  avancarEnvio(){

    this.userService.findUserByFilterName(this.usuarioTarget).then(result => {
      this.usuarioTargetObj = result.usuarioEncontrado;
    })
    .catch(err => {
      this.mensagemError = err.error.error;
    });

  }

  cancelarEnvio(){
    this.usuarioTarget = null;
    this.usuarioTargetObj = null;
    this.modalEnviar = false;
    this.valorEnvio = null;
    this.mensagemSucesso = null;
    this.mensagemError = null;
  }

  transferir(){

    this.transferService.trasferir(this.usuarioTargetObj.conta, this.valorEnvio).then(result =>{
      this.mensagemSucesso = result;
      this.transferenciaRealizada.emit();
    })
    .catch(err => {
      this.mensagemError = err.error.error
    })
  }
}
