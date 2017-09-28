import { Component, OnInit, HostListener } from '@angular/core';
import { PlacementService } from '../../services/placement.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public isOverflow = window.innerWidth < 680;
  constructor(public _placementService: PlacementService) {}

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 680) {
      this.isOverflow = true;
    } else {
      this.isOverflow = false;
    }
  }
}
