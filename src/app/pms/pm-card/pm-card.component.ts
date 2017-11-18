import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PmsService } from '../../services/pms.service';
import { PM } from '../../ciapa/datatype/PM';

@Component({
  selector: 'app-pm-card',
  templateUrl: './pm-card.component.html',
  styleUrls: ['./pm-card.component.scss']
})
export class PmCardComponent implements OnInit {
  @Input('pmId') pmId: number;
  @Output() pmIdChange: EventEmitter<number> = new EventEmitter<number>();

  public _deletePMModal = false;
  public _infoModel = false;

  constructor(private _pmsService: PmsService) { }

  ngOnInit() {
  }

  get pm(): PM {
    return this._pmsService.pms[this.pmId];
  }

  deletePMHandler(): void {
    this.pmIdChange.emit(-1);
    this._pmsService.pms.splice(this.pmId, 1);
  }

}
