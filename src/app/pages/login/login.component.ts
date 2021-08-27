import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  mensagemError: string = '';

  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        login:['', Validators.required],
        senha:['', Validators.required]
    })
  }

  login(){
    const login = this.loginForm.get('login').value;
    const senha = this.loginForm.get('senha').value;

    this.authService.authenticate(login,senha)
      .subscribe(
        () => this.router.navigate(['dashboard']),
        err =>{
          this.mensagemError = err.error.error;
          console.log(this.mensagemError)
          this.loginForm.reset();
          this.userNameInput.nativeElement.focus();
        }
      )
  }
}


