import { CustomValidators } from './../../share/custom-validators';
import { UserService } from './../../core/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public nome : string = '';
  public cpf : string = '';
  public usuario : string = '';
  public email : string = '';
  public senha : string = '';

  public mensagemError = '';
  public mensagemSucesso = '';

  newUserFormGroup : FormGroup;

  constructor(
    private userService : UserService,
    private router : Router)
    {


    }

  ngOnInit() {
  }

  criarConta(){
    this.mensagemSucesso = null;
    this.mensagemError = null;
    this.userService.criarUsuario(this.nome,this.usuario,this.senha,this.cpf,this.email)
      .then((result) =>{
        console.log(`SUCESSO ${result}`)
        this.mensagemSucesso = 'Conta registrada com sucesso! Em alguns segundos realize seu login!'

        setTimeout(() =>{
          this.router.navigate(['login'])
        },5000);

      })
      .catch((err) =>{
        console.log(`ERRO ${err.error.error}`)
        this.mensagemError = err.error.error;
      })
  }


  invalidSenha(){
    let regexp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    return !regexp.test(this.senha);
  }

}
