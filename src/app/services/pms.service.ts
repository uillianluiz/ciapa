import { Injectable } from '@angular/core';
import { PM } from '../ciapa/datatype/PM';
import { ToastrService } from 'ngx-toastr';
import * as CircularJSON from 'circular-json';

@Injectable()
export class PmsService {

  public pms: PM[] = [];
  constructor() {
    this.load();
  }

  newPM(): void {
    const pm = new PM();
    pm.name = 'PM' + (this.pms.length + 1);
    this.pms.unshift(pm);
  }

  save(): void {
    const str = CircularJSON.stringify(this.pms);
    localStorage.setItem('pms', str);
  }

  load(): boolean {
    if (localStorage.getItem('pms') == null) {
      return false;
    } else {
      this.pms = CircularJSON.parse(localStorage.getItem('pms'));
      for (let i = 0; i < this.pms.length; i++) {
        this.pms[i] = <PM>Object.assign(new PM(), this.pms[i]);
      }
      return true;
    }
  }

}
