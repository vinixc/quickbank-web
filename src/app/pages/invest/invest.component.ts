import { UserService } from './../../core/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { StockServicesService } from 'src/app/services/stock/stock-services.service';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  user$ : Observable<UserImpl>;
  public stoks : Stock[] = [];

  constructor(

    private userService : UserService,
    private stockService : StockServicesService) {


   }

  calcPorcent(sourceValue : number, targetValue: number){
    return((sourceValue/targetValue)*100).toFixed(2);
  }

  ngOnInit(): void {

    this.user$ = this.userService.getUser();

    this.stockService.getStocks().then((res) => {
      this.stoks = res.stoks;
      this.stoks = this.stoks.sort((a,b) => a.stockPrice - b.stockPrice)
    })
  }
}
