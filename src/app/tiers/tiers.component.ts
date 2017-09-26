import { Component, OnInit } from '@angular/core';
import { Tier } from '../util/datatype/Tier';
import { Affinity, AffinityElement } from '../util/datatype/Affinity';
import { Capacity } from '../util/datatype/Capacity';
import { Interference } from '../util/datatype/Interference';
import {
  DegradationCPU,
  DegradationMemory,
  DegradationAffinity,
  DegradationCache,
  DegradationDisk
} from '../util/datatype/Degradation';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.scss']
})
export class TiersComponent implements OnInit {
  public tiers: Tier[] = [];

  constructor() {
    const tier3Interference = new Interference(
      DegradationCPU.Moderate,
      DegradationMemory.High,
      DegradationDisk.Moderate,
      DegradationCache.Low
    );
    const tier3Affinity = new Affinity();
    const tier3Capacity = new Capacity(0.4);
    const tier3 = new Tier(tier3Interference, tier3Affinity, tier3Capacity);
    tier3.name = 'tier3';
    this.tiers.push(tier3);

    const tier2Interference = new Interference(
      DegradationCPU.Low,
      DegradationMemory.High,
      DegradationDisk.Absent,
      DegradationCache.Moderate
    );
    const tier2Affinity = new Affinity();
    tier2Affinity.addAffinity(
      new AffinityElement(tier3, DegradationAffinity.Moderate)
    );
    const tier2Capacity = new Capacity(0.3);
    const tier2 = new Tier(tier2Interference, tier2Affinity, tier2Capacity);
    tier2.name = 'tier2';
    this.tiers.push(tier2);

    console.log(tier2)
  }

  ngOnInit() {}
}
