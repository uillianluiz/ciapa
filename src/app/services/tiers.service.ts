import { Injectable } from '@angular/core';
import { Tier } from '../util/datatype/Tier';
import { Interference } from '../util/datatype/Interference';
import {
  DegradationCPU,
  DegradationDisk,
  DegradationCache,
  DegradationMemory,
  DegradationAffinity
} from '../util/datatype/Degradation';
import { Affinity, AffinityElement } from '../util/datatype/Affinity';
import { Capacity } from '../util/datatype/Capacity';

@Injectable()
export class TiersService {
  public tiers: Tier[] = [];

  private interference(): Interference {
    return new Interference(
      DegradationCPU.Absent,
      DegradationMemory.Absent,
      DegradationDisk.Absent,
      DegradationCache.Absent
    );
  }

  private affinity(): Affinity {
    return new Affinity();
  }

  private capacity(): Capacity {
    return new Capacity(0.05);
  }

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
  }

  addAffinity(tierId: number): void {
    this.tiers[tierId].affinity.addAffinity(
      new AffinityElement(null, DegradationAffinity.Absent)
    );
  }

  newTier(): void {
    this.tiers.push(new Tier(this.interference(), this.affinity(), this.capacity()));
  }
}
