import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../services/placement.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {

  constructor(public _placementService: PlacementService) { }

  ngOnInit() {
  }

}
