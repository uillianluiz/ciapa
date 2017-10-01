import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../services/placement.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public isExecuting = false;
  public helpActive = false;

  constructor(public _placementService: PlacementService) {}

  ngOnInit() {}

  execute(): void {
    this.isExecuting = true;
    this._placementService.resetData();
    setTimeout(
      this._placementService.execute.bind(
        this._placementService,
        this.finishedExecuting.bind(this)
      ),
      15
    );
  }

  finishedExecuting(): void {
    this.isExecuting = false;
  }
}
