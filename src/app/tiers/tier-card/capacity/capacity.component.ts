import { Component, OnInit, Input } from '@angular/core';
import { Capacity } from '../../../util/datatype/Capacity';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {

  @Input('capacity') capacity: any;
  constructor() { }

  ngOnInit() {
  }

  get sizes() {
    return Capacity.sizes;
  }

}
