import { BodyReturnAuth } from "../token/return.token";
import { User } from "./user";

export class UserImpl implements User{
        
    constructor(bodyReturn : BodyReturnAuth){

        if(bodyReturn !== null){
            this._id = bodyReturn._id;
            this.agencia = bodyReturn.agencia;
            this.conta = bodyReturn.conta;
            this.cpf = bodyReturn.cpf;
            this.email = bodyReturn.email;
            this.filterName = bodyReturn.filterName;
            this.name = bodyReturn.name;
            this.saldo = bodyReturn.saldo;
            this.token = bodyReturn.token;
        }
        
    }
    
    _id: string;
    name: string;
    filterName: string;
    cpf: string;
    email: string;
    agencia: string;
    conta: string;
    saldo: number;
    token: string;

}