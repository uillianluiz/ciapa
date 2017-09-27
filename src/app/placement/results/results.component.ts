import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../services/placement.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(
    public _placementService: PlacementService
  ) { }

  ngOnInit() {
  }

}
