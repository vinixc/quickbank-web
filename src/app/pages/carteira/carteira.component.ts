import { StockInvest } from './../../model/stock-invest';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockServicesService } from 'src/app/services/stock/stock-services.service';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  data: any;
  optionsData : any[] = [];
  optionsValues : any[] = [];

  chartOptions: any;
  public listStocks : StockInvest[] = [];
  public totalEmAcoes : number;

  constructor(private stockServices : StockServicesService) { }

  ngOnInit(): void {

    this.stockServices.getStocksByUser().then((res) => {
      this.listStocks =  res.stocks;

      this.totalEmAcoes = this.listStocks.map(s => s.totalInvestment).reduce((acumulator,current) => acumulator + current);

      res.stocks.forEach(stock => {
        this.optionsData.push(stock.stockDisplayName);
        this.optionsValues.push(stock.totalInvestment);
      });

      this.data = {
        labels: this.optionsData,
        datasets: [
            {
                data: this.optionsValues,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#84ff63",
                    "#9063ff",
                    "#ffe0bc"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#84ff63",
                    "#9063ff",
                    "#ffe0bc"
                ]
            }
        ]
    };
    });
  }

}
