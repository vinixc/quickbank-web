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
  public modalCriarMeta : boolean = false;
  public modalAdicionameta : boolean = false;
  public mensagemError : string = '';
  public nomeMeta : string = '';
  public valorMeta : number;
  public mensagemMetaCriada: string = '';
  mensagemMetaAtualizada : string = '';
  valorAddMeta : number;
  goalAlteracao : any;

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

  criarMeta(){

    this.goalsService.criarMeta(this.nomeMeta,this.valorMeta).then((result) =>{
      this.mensagemMetaCriada = 'Meta criada com sucesso!';
      this.goalsService.getGoals().then(result => {
        this.goals = result.goals;
      })
    })
    .catch(err => {
      this.mensagemError = err.error.error;
    })

  }

  atualizarMetas(){
    this.goalsService.getGoals().then(result => {
      this.goals = result.goals;
    })
  }

  finishCriarMeta(){
    this.modalCriarMeta = false;
    this.nomeMeta = null;
    this.valorMeta = null;
    this.mensagemMetaCriada = null;
    this.mensagemError = null;
  }

  adicionarEmMeta(goal : any){
    this.goalAlteracao = goal;
    this.modalAdicionameta = true;
  }

  atualizarMeta(){
    this.goalsService.depositar(this.goalAlteracao, this.valorAddMeta).then(result =>{
      this.mensagemMetaAtualizada = result;

    }).catch(err =>{
      this.mensagemError = err.error.error;
    });

  }

  finishAtualizarMeta(){
    this.modalAdicionameta = false;
    this.mensagemError = null;
    this.mensagemMetaAtualizada = null;
    this.valorAddMeta = null;
   }
}
