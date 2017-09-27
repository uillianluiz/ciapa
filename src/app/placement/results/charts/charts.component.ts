import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../../services/placement.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true
  };

  public barChartType = 'bar';
  public barChartLegend = true;

  constructor(public _placementService: PlacementService) {}

  ngOnInit() {}

  get labels() {
    return this._placementService.chartData.labels;
  }

  get data() {
    return this._placementService.chartData.data;
  }
}
