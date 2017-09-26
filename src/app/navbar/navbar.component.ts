import { Component, OnInit } from '@angular/core';

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
  constructor(
    private _tiersService: TiersService,
    public router: Router,
    public _placementService: PlacementService
  ) {}

  ngOnInit() {}

  newTier(): void {
    this._tiersService.newTier();
  }

  executeSA(): void {
    this._placementService.execute();
  }

  save(): void {
    this._tiersService.save();
  }

  load(): void {
    this._tiersService.load();
  }
}
