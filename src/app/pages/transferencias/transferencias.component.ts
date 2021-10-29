import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { Transferencia } from 'src/app/model/transferencia';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { TransferenciaService } from 'src/app/services/transferencia/transferencia.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  public transferencias : Transferencia[] = [];

  constructor(
     private transferenciaService : TransferenciaService,
   ) { }

  ngOnInit(): void {

    this.transferenciaService.getTransferencias().then(result => {
      this.transferencias = result.transferencias;
    });

  }

}
