import { Component, OnInit } from '@angular/core';

import 'clarity-icons';
import 'clarity-icons/shapes/all-shapes';
import { TiersService } from '../services/tiers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _tiersService: TiersService) { }

  ngOnInit() {
  }

  newTier(): void {
    this._tiersService.newTier();
  }

}
