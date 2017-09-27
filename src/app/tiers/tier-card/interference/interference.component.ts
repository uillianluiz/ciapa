import { Component, OnInit, Input } from '@angular/core';
import { Interference } from '../../../ciapa/datatype/Interference';

@Component({
  selector: 'app-interference',
  templateUrl: './interference.component.html',
  styleUrls: ['./interference.component.scss']
})
export class InterferenceComponent implements OnInit {

  @Input('name') name: string;
  @Input('degradation') degradation: any;
  @Input('interference') interference: Interference;
  constructor() { }

  get interferenceName(): string {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  ngOnInit() {
  }

}
