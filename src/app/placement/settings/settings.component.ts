import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../services/placement.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public costFunction = 'getCostAVG';
  constructor(
    public _placementService: PlacementService
  ) { }

  ngOnInit() {
  }

  execute(): void {
    this._placementService.execute(this.costFunction);
  }

}