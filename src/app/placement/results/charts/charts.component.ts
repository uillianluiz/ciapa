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
    maintainAspectRatio: true,
    title: {
      display: true,
      text: 'Cost Comparison'
  }
  };

  public barToggle = false;
  public dataToogle = true;

  public barChartType = 'bar';
  public barChartLegend = true;

  public labelsMult = ['Multiplication'];
  public labelsAVG = ['Average'];

  constructor(public _placementService: PlacementService) {}

  ngOnInit() {}

  get dataAVG() {
    return this._placementService.chartData.dataAVG;
  }

  get dataMult() {
    return this._placementService.chartData.dataMult;
  }

  handleBarToggle() {
    if (!this.barToggle) {
      this.barChartType = 'bar';
    } else {
      this.barChartType = 'horizontalBar';
    }
  }
}
