import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/model/goal';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {

  @Input() goal : any;

  constructor() { }

  ngOnInit(): void {
  }

  calcPorcent(sourceValue : number, targetValue: number){
    return((sourceValue/targetValue)*100).toFixed(2);
  }

}
