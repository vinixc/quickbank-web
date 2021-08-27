import { Injectable } from "@angular/core";

const KEY = 'authToken';
const DATA_OBJ = 'dataObject';


@Injectable({
    providedIn: "root"
})
export class TokenService{

    hasToken(){
        return !!this.getToken();
    }

    setToken(token){
        window.localStorage.setItem(KEY,token);
    }

    setDataObject(dataObject){
        window.localStorage.setItem(DATA_OBJ,dataObject);
    }

    getDataObject(){
        return window.localStorage.getItem(DATA_OBJ);
    }

    getToken(){
        return window.localStorage.getItem(KEY);
    }

    removeToken(){
        window.localStorage.removeItem(KEY);
    }

    removeDataObject(){
        window.localStorage.removeItem(DATA_OBJ);
    }
}