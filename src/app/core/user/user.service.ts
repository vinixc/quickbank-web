import { Router } from '@angular/router';
import { URLs } from 'src/app/share/constantes.enum';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TokenService } from "../token/token.service";
import { User } from "./user";
import { UserImpl } from "./user.impl";

import jwt_decode from 'jwt-decode';
import { ContentTokenUser } from "./content-token-user";
import { BodyReturnAuth } from "../token/return.token";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_CONSULTA_USUARIO = URLs.BACKEND_PRODUCTION + '/accounts/GetUserFilterName/';

@Injectable({
    providedIn:"root"
})
export class UserService{

    private userSubject = new BehaviorSubject<UserImpl>(null);
    private userName : string;
    private situacaoLoginUsuario = new BehaviorSubject<boolean>(false);

    getSituacaoLoginUsuario(){
        return this.situacaoLoginUsuario.asObservable();
    }

    constructor(private tokenService : TokenService,private http: HttpClient,private router : Router){
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token : string,bodyReturn: BodyReturnAuth){
        this.tokenService.setToken(token);
        console.log(`ADICIONANDO TOKEN ${bodyReturn._id}`)
        this.decodeAndNotifyForBody(bodyReturn);
    }

    getUser(){
        return this.userSubject.asObservable();
    }

    logout(){
        this.tokenService.removeToken();
        this.tokenService.removeDataObject();
        this.userSubject.next(null);
        this.situacaoLoginUsuario.next(false);
    }

    isLogged(){
        return this.tokenService.hasToken();
    }

    private decodeAndNotify(){

        const token = this.tokenService.getToken();
        const contentToken = jwt_decode(token) as ContentTokenUser;
        this.userName = contentToken.id;

        const dataObjct = this.tokenService.getDataObject();
        const user = JSON.parse(atob(dataObjct)) as BodyReturnAuth;
        user._id = contentToken.id;
        this.userSubject.next(user);
    }

    private decodeAndNotifyForBody(bodyReturn: BodyReturnAuth){
        const token = this.tokenService.getToken();
        const contentToken = jwt_decode(token) as ContentTokenUser;
        this.userName = contentToken.id;

        this.tokenService.setDataObject(btoa(JSON.stringify(bodyReturn)))

        const user = new UserImpl(bodyReturn);


        this.userSubject.next(user);
    }

    public atualizaDadosUsuario(){
      let usuario : UserImpl;
      this.getUser().subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      this.http.get(`${API_CONSULTA_USUARIO}${usuario.filterName}`, options)
      .toPromise()
      .then(resp => {
        const userAtt = resp as UserImpl[];

        userAtt.forEach(u =>{
          u.token = usuario.token
          this.userSubject.next(u)
        })


      })
      .catch((err) => {
        if(err.status === 401){
          this.logout();
          this.router.navigate(['login'])
        }
      });

    }
}
