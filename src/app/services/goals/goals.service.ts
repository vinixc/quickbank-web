import { URLs } from 'src/app/share/constantes.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';
import { Goal } from 'src/app/model/goal';

const URL_API_CONSULTA_GOALS= URLs.BACKEND_PRODUCTION + '/goals/GetGoalsUser/';
const URL_API_NOVA_META= URLs.BACKEND_PRODUCTION + '/goals/NewGoal';
const URL_API_DELETAR_META = URLs.BACKEND_PRODUCTION + '/goals/DeleteGoal';
const URL_DEPOSITAR_GOALS = URLs.BACKEND_PRODUCTION + '/goals/TransferToGoal';

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

    criarMeta(nomeMeta : string, valorMeta: number) : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      const objEnvio = {parentId:usuario._id,parentName: usuario.filterName, nameGoal:nomeMeta,valueGoal: valorMeta};

      return this.http.post(`${URL_API_NOVA_META}`, JSON.stringify(objEnvio), options).toPromise();

    }

    deletarMeta(_idMeta : string) : Promise<any>{
      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const objEnvio = {_id:_idMeta};
      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json'),
        body: objEnvio
      };

      return this.http.delete(URL_API_DELETAR_META, options).toPromise();
    }

    depositar(goals, valorAdd) : Promise<any>{

      let usuario : UserImpl;
      this.user$.subscribe(async user => {
        usuario = user;
      });

      const options = {
        headers: new HttpHeaders().set('Authorization','Bearer ' + usuario.token).set('Content-Type', 'application/json')
      };

      const objEnvio = {_id:goals._id,value: valorAdd, conta:usuario.conta};

      return this.http.put(URL_DEPOSITAR_GOALS, objEnvio, options).toPromise();

    }
}
