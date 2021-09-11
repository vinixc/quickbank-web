import { URLs } from 'src/app/share/constantes.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';
import { Goal } from 'src/app/model/goal';

const URL_API_CONSULTA_GOALS= URLs.BACKEND_PRODUCTION + '/goals/GetGoalsUser/';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  user$ : Observable<UserImpl>;

  constructor(
    private http: HttpClient,
    private userService:UserService,
    private router : Router)
    {
      this.user$ = userService.getUser();
    }

    getGoals() : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      return this.http.get<Goal[]>(`${URL_API_CONSULTA_GOALS}${usuario._id}`, options)
      .toPromise()
      .then(response => {
        const resultado = {goals: response};
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
