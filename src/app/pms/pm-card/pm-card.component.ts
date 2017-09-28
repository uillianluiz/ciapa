import { Component, OnInit, Input } from '@angular/core';
import { PmsService } from '../../services/pms.service';
import { PM } from '../../ciapa/datatype/PM';

@Component({
  selector: 'app-pm-card',
  templateUrl: './pm-card.component.html',
  styleUrls: ['./pm-card.component.scss']
})
export class PmCardComponent implements OnInit {
  @Input('pmId') pmId: number;

  public _deletePMModal = false;
  public _infoModel = false;

  constructor(private _pmsService: PmsService) { }

  ngOnInit() {
  }

  get pm(): PM {
    return this._pmsService.pms[this.pmId];
  }

}
