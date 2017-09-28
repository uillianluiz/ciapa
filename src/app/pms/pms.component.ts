import { Component, OnInit } from '@angular/core';
import { PM } from '../ciapa/datatype/PM';
import { PmsService } from '../services/pms.service';

@Component({
  selector: 'app-pms',
  templateUrl: './pms.component.html',
  styleUrls: ['./pms.component.scss']
})
export class PmsComponent implements OnInit {

  constructor(public _pmsService: PmsService) { }

  ngOnInit() {
  }

  get pms(): PM[] {
    return this._pmsService.pms;
  }

}
