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

  public barChartOptionsPMs: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: true,
      text: 'Number of PMs'
    },
    scales: {
      yAxes: [{
          ticks: {
              min: 0,
              stepSize: 1
          }
      }]
  }
  };

  public barToggle = false;

  public barChartType = 'bar';
  public barChartLegend = true;

  public labelsMult = ['Multiplication'];
  public labelsAVG = ['Average'];
  public labelsPMs = ['PMs'];

  constructor(public _placementService: PlacementService) { }

  ngOnInit() { }

  get dataAVG() {
    return this._placementService.chartData.dataAVG;
  }

  get dataMult() {
    return this._placementService.chartData.dataMult;
  }

  get dataPMs() {
    return this._placementService.chartData.dataPMs;
  }

  handleBarToggle() {
    if (!this.barToggle) {
      this.barChartType = 'bar';
    } else {
      this.barChartType = 'horizontalBar';
    }
  }
}
