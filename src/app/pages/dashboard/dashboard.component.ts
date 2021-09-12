import { GoalsService } from './../../services/goals/goals.service';
import { Transferencia } from './../../model/transferencia';
import { TransferenciaService } from './../../services/transferencia/transferencia.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';
import { Router } from '@angular/router';
import { Goal } from 'src/app/model/goal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user$ : Observable<UserImpl>;
  public mostraValor : boolean = false;
  public transferencias : Transferencia[] = [];
  public transferenciasResumo : Transferencia[] = [];
  public goals : Goal[] = [];

  constructor(
    private userService: UserService,
    private transferenciaService : TransferenciaService,
    private goalsService : GoalsService,
    private router : Router){

    userService.atualizaDadosUsuario();
    this.user$ = userService.getUser();

    //this.transferencias = this.transferenciaService.getTransferencias();
    this.transferenciaService.getTransferencias().then(result => {
      this.transferenciasResumo = result.transferencias;
      this.transferenciasResumo = this.transferenciasResumo.slice(0,4);
    });

    this.goalsService.getGoals().then(result => {
      this.goals = result.goals;
    })
  }

  ngOnInit() {

  }

  mostrarValorOculto(){
    if(this.mostraValor){
      this.mostraValor = false;
    }else{
      this.userService.atualizaDadosUsuario()
      this.mostraValor = true;
    }
  }

  atualizarTransferencias(){
    this.transferenciaService.getTransferencias().then(result => {
      this.transferenciasResumo = result.transferencias;
      this.transferenciasResumo = this.transferenciasResumo.slice(0,4);
    });
  }
}
