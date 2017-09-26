import { Component, OnInit, Input } from '@angular/core';
import { DegradationCPU, DegradationMemory, DegradationAffinity, DegradationCache, DegradationDisk } from '../../util/datatype/Degradation';
import { Tier } from '../../util/datatype/Tier';

@Component({
  selector: 'app-tier-card',
  templateUrl: './tier-card.component.html',
  styleUrls: ['./tier-card.component.scss']
})
export class TierCardComponent implements OnInit {
  @Input('tier') tier: Tier;
  @Input('tiers') tiers: Tier[];
  constructor() { }

  ngOnInit() {
  }

  get DegradationCPU() {
    return DegradationCPU;
  }

  get DegradationMemory() {
    return DegradationMemory;
  }

  get DegradationCache() {
    return DegradationCache;
  }

  get DegradationDisk() {
    return DegradationDisk;
  }
  get DegradationAffinity() {
    return DegradationAffinity;
  }

}
