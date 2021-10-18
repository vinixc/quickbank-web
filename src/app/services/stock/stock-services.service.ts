import { async } from '@angular/core/testing';
import { OptionsBuyInvest } from './../../model/options-buy-invest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';
import { Stock } from 'src/app/model/stock';
import { URLs } from 'src/app/share/constantes.enum';
import { StockInvest } from 'src/app/model/stock-invest';

const URL_API_GET_STOKS= URLs.BACKEND_PRODUCTION + '/stocks/GetStocks/';
const URL_API_BUY_STOKS_ACCOUNT= URLs.BACKEND_PRODUCTION + '/stocks/PostStockUserAccount/';
const URL_API_BUY_STOKS_GOALS= URLs.BACKEND_PRODUCTION + '/stocks/PostStockUserGoal/';
const URL_API_GET_STOKS_BY_USER= URLs.BACKEND_PRODUCTION + '/stocks/GetUserStocks/';
const URL_API_GET_IMS_STOCKS_BY_ID = URLs.BACKEND_PRODUCTION_ARQ + '/api/Arquivo/ListArquivoByStock/';
const URL_API_GET_IMS_STOCKS_BY_CHAVE = URLs.BACKEND_PRODUCTION_ARQ + '/api/Arquivo/GetViewFile/';

@Injectable({
  providedIn: 'root'
})
export class StockServicesService {

  user$ : Observable<UserImpl>;

  constructor(private http: HttpClient,
    private userService:UserService,
    private router : Router) {

      this.user$ = userService.getUser();

    }

    getStocks() : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      return this.http.get<Stock[]>(`${URL_API_GET_STOKS}`, options)
      .toPromise()
      .then(response => {
        const resultado = {stoks: response};
        return resultado;
      })
      .catch((err) => {
        if(err.status === 401){
          this.userService.logout();
          this.router.navigate(['login'])
        }
      });
    }

    getStocksByUser() : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      return this.http.get<StockInvest[]>(`${URL_API_GET_STOKS_BY_USER}${usuario._id}`, options)
      .toPromise()
      .then(response => {
        const resultado = {stocks: response};
        return resultado;
      })
      .catch((err) => {
        if(err.status === 401){
          this.userService.logout();
          this.router.navigate(['login'])
        }
      });
    }

    realizaCompra(stockId: string, stockQtd : number, optionSelect : OptionsBuyInvest) : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      //code 0 saldo conta corrente se nao utiliza da meta.
      if(optionSelect.code === "0"){

        const objEnvio = {parentId:usuario._id,stockId, stockQtd};
        return this.http.post(`${URL_API_BUY_STOKS_ACCOUNT}`, JSON.stringify(objEnvio), options).toPromise();
      }else{
        const objEnvio = {parentId:usuario._id,stockId, stockQtd, goalId: optionSelect.code};
        return this.http.post(`${URL_API_BUY_STOKS_GOALS}`, JSON.stringify(objEnvio), options).toPromise();
      }
    }

    getImagesAcao(stockId: string) : Promise<any>{

      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };

      return this.http.get(`${URL_API_GET_IMS_STOCKS_BY_ID}${stockId}`,options)
      .toPromise()
      .then(response => {
        const resultado = {imgs: response};
        return resultado;
      })
      .catch((err) => {
        if(err.status === 401){
          this.userService.logout();
          this.router.navigate(['login'])
        }
      });
    }

    getImagesAcaoChave(chave: string){
      return `${URL_API_GET_IMS_STOCKS_BY_CHAVE}${chave}`;
    }
}
