import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-interference',
  templateUrl: './interference.component.html',
  styleUrls: ['./interference.component.scss']
})
export class InterferenceComponent implements OnInit {

  @Input('name') name: string;
  @Input('degradation') degradation: any;
  @Input('interference') interference: any;
  constructor() { }

  ngOnInit() {
  }

}
