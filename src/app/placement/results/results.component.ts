import { Component, OnInit, HostListener } from '@angular/core';
import { PlacementService } from '../../services/placement.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public limitShort = 1075;
  public limitOverflow = 851;

  public isOverflow = window.innerWidth < this.limitOverflow;
  public showShort = window.innerWidth < this.limitShort;
  constructor(public _placementService: PlacementService) { }

  ngOnInit() { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < this.limitOverflow) {
      this.showShort = false;
      this.isOverflow = true;
    } else if (event.target.innerWidth < this.limitShort) {
      this.showShort = true;
      this.isOverflow = false;
    } else {
      this.isOverflow = false;
      this.showShort = false;
    }
  }
}
