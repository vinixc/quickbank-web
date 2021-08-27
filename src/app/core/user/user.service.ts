import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TokenService } from "../token/token.service";
import { User } from "./user";
import { UserImpl } from "./user.impl";

import jwt_decode from 'jwt-decode';
import { ContentTokenUser } from "./content-token-user";
import { BodyReturnAuth } from "../token/return.token";

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

    constructor(private tokenService : TokenService){
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
        console.log("iniciando decode do token")
        const contentToken = jwt_decode(token) as ContentTokenUser;
        console.log(`decode do token ${contentToken.id}`)
        this.userName = contentToken.id;
        
        console.log(`montando user`)
        this.tokenService.setDataObject(btoa(JSON.stringify(bodyReturn)))
        
        const user = new UserImpl(bodyReturn);

        
        this.userSubject.next(user);
    }
}