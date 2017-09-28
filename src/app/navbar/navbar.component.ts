import { Component, OnInit, HostListener } from '@angular/core';

import 'clarity-icons';
import 'clarity-icons/shapes/all-shapes';
import { TiersService } from '../services/tiers.service';
import { Router } from '@angular/router';
import { PlacementService } from '../services/placement.service';
import { PmsService } from '../services/pms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public subnavStick = false;

  constructor(
    private _tiersService: TiersService,
    public router: Router,
    public _placementService: PlacementService,
    public _pmsService: PmsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (window.pageYOffset >= 60) {
      this.subnavStick = true;
    } else {
      this.subnavStick = false;
    }
  }

  newTier(): void {
    this._tiersService.newTier();
  }

  newRandomTier(): void {
    this._tiersService.newRandomTier();
  }

  newPM(): void {
    this._pmsService.newPM();
  }

  save(): void {
    this._tiersService.save();
    this._pmsService.save();
    this.toastr.success(
      'Project was successfully saved in your local storage.',
      'Success'
    );
  }

  load(): void {
    if (this._tiersService.load() || this._pmsService.load()) {
      this.toastr.success(
        'Project was successfully loaded from your local storage.',
        'Success'
      );
    } else {
      this.toastr.error(
        'There is no project saved locally.',
        'Error'
      );
    }

  }
}
