import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { tap } from "rxjs/operators";
import { BodyReturnAuth } from "../token/return.token";

const API_URL = 'https://api-quick-bank-desenvolvimento.herokuapp.com/login/';

@Injectable({
    providedIn:"root"
})
export class AuthService{

    constructor(
        private http:HttpClient,
        private userService:UserService
    ){}

    authenticate(usuario:string,senha:string){

      if(!usuario.startsWith('@')){
        usuario = '@' + usuario;
      }

        return this.http
            .post(API_URL,
                 {usuario,senha},
                 {observe: 'response'})
                 .pipe(tap(res =>{
                     console.log(res.body)
                     const returnToken = res.body as BodyReturnAuth;
                     this.userService.setToken(returnToken.token,returnToken);
                 }))
    }
}
