import { Component, OnInit, HostListener } from '@angular/core';

import 'clarity-icons';
import 'clarity-icons/shapes/all-shapes';
import { TiersService } from '../services/tiers.service';
import { Router } from '@angular/router';
import { PlacementService } from '../services/placement.service';

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
    public _placementService: PlacementService
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

  save(): void {
    this._tiersService.save();
  }

  load(): void {
    this._tiersService.load();
  }
}
