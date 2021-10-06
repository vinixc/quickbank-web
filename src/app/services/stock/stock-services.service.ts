import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';
import { Stock } from 'src/app/model/stock';
import { URLs } from 'src/app/share/constantes.enum';

const URL_API_GET_STOKS= URLs.BACKEND_PRODUCTION + '/stocks/GetStocks/';

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
}
