import { async } from '@angular/core/testing';
import { OptionsBuyInvest } from './../../model/options-buy-invest';
import { UserService } from './../../core/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { StockServicesService } from 'src/app/services/stock/stock-services.service';
import { Stock } from 'src/app/model/stock';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { Goal } from 'src/app/model/goal';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  user$ : Observable<UserImpl>;
  public stoks : Stock[] = [];
  public stok : Stock;
  public mensagemError : string;
  public quantidadeAcao : number = 1;
  public optionsBuy : OptionsBuyInvest[];
  public optionBuy : OptionsBuyInvest;
  public nextStepReview : boolean = false;
  public compraRealizada : boolean = false;

  constructor(

    private userService : UserService,
    private stockService : StockServicesService,
    private goalsService : GoalsService) {

      this.optionsBuy = [{name: 'Saldo: Conta Corrente', code: '0'}]

      this.goalsService.getGoals().then((res) =>{
          let goals = res.goals as Goal[];
          goals.forEach(g => {
            this.optionsBuy.push({name : 'Meta: ' + g.nameGoal, code : g._id});
          })
      });
   }

  calcPorcent(sourceValue : number, targetValue: number){
    return((sourceValue/targetValue)*100).toFixed(2);
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();

    this.stockService.getStocks().then((res) => {
      this.stoks = res.stoks;
      this.stoks = this.stoks.sort((a,b) => a.stockPrice - b.stockPrice)

      this.stoks.forEach(st =>{
        this.stockService.getImagesAcao(st._id).then(res => {
          console.log(st._id, res);
          if(res != null &&  res.imgs != null && res.imgs.length >= 1){
            st.imgs = res.imgs;
          }else{
            st.imgs = [{chave: null}];
          }
        });
      });
    })
  }

  finishInvestimento(){
    this.stok = null;
    this.quantidadeAcao = 1;
    this.optionBuy = null;
    this.nextStepReview = false;
    this.compraRealizada = false;
    this.mensagemError = null;
  }

  realizaCompra(){
    this.stockService.realizaCompra(this.stok._id,this.quantidadeAcao,this.optionBuy)
    .then(res =>{
      this.compraRealizada = true;
    })
    .catch(err => {
      console.log(err.error.error);
      this.mensagemError = err.error.error;
    });
  }


  getImagemByChave(chave){
    if(chave != null){

      return  this.stockService.getImagesAcaoChave(chave);
    }else{
      return "assets/img/theme/cobertura.jpg";
    }
  }
}
