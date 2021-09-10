import { Transferencia } from './../../model/transferencia';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { URLs } from 'src/app/share/constantes.enum';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const API_URL_TRANSFER_BY_ID = URLs.BACKEND_PRODUCTION + '/expenses/';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  user$ : Observable<UserImpl>;
  private transferList = new Subject();

  constructor(
    private http: HttpClient,
    private userService:UserService,
    private router : Router)
    {
      this.user$ = userService.getUser();

    }

    getTransferencias() : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      return this.http.get<Transferencia[]>(`${API_URL_TRANSFER_BY_ID}${usuario._id}`, options)
      .toPromise()
      .then(response => {
        const resultado = {transferencias: response};
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
