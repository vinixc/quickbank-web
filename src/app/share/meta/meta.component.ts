import { GoalsService } from './../../services/goals/goals.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {

  @Input() goal : any;
  @Output() metaExcluida : any = new EventEmitter();
  mensagemError : string = '';


  @Output() mostraModalAdicionarMeta : any = new EventEmitter();

  constructor(private goalsService : GoalsService) { }

  ngOnInit(): void {
  }

  calcPorcent(sourceValue : number, targetValue: number){
    return((sourceValue/targetValue)*100).toFixed(2);
  }

  deletarMeta(){
    this.goalsService.deletarMeta(this.goal._id);
    this.metaExcluida.emit();
  }



  mostraModal(){
    this.mostraModalAdicionarMeta.emit(this.goal);
  }
}
