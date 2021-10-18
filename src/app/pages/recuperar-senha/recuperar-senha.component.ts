import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  mensagemSucesso : string;
  mensagemError   : string;
  usuario         : string;

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  recuperarSenha(){

    this.userService.recuperarSenha(this.usuario).then(res => {
      this.mensagemSucesso = 'E-mail enviado! Confira sua caixa de entrada e o lixo eletrônico.';

      setTimeout(() =>{
        this.router.navigate(['login'])
      },5000);

    }).catch(err =>{
        this.mensagemError = err.error.error;
    });

  }

}
