import { Injectable } from '@angular/core';
import { Tier } from '../ciapa/datatype/Tier';
import { Interference } from '../ciapa/datatype/Interference';
import {
  DegradationCPU,
  DegradationDisk,
  DegradationCache,
  DegradationMemory,
  DegradationAffinity
} from '../ciapa/datatype/Degradation';
import { Affinity, AffinityElement } from '../ciapa/datatype/Affinity';
import { Capacity } from '../ciapa/datatype/Capacity';

import * as CircularJSON from 'circular-json';
import { ToastrService } from 'ngx-toastr';
import Util from '../ciapa/functions/Util';

@Injectable()
export class TiersService {
  public tiers: Tier[] = [];

  private interference(random = false): Interference {
    if (random) {
      const opt = ['Absent', 'Low', 'Moderate', 'High'];
      return new Interference(
        DegradationCPU[opt[Util.getRandomInt(0, 4)]],
        DegradationMemory[opt[Util.getRandomInt(0, 4)]],
        DegradationDisk[opt[Util.getRandomInt(0, 4)]],
        DegradationCache[opt[Util.getRandomInt(0, 4)]],
      );
    }
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

  private capacity(random = false): Capacity {
    if (random) {
      return new Capacity(Capacity.sizes[Util.getRandomInt(0, Capacity.sizes.length)].capacity);
    }
    return new Capacity(0.05);
  }

  constructor(private toastr: ToastrService) {
    const tier3Interference = new Interference(
      DegradationCPU.Moderate,
      DegradationMemory.High,
      DegradationDisk.Moderate,
      DegradationCache.Low
    );
    const tier3Affinity = new Affinity();
    const tier3Capacity = new Capacity(0.4);
    const tier3 = new Tier(tier3Interference, tier3Affinity, tier3Capacity);
    tier3.name = 'tier2';
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
    tier2.name = 'tier1';
    this.tiers.push(tier2);
  }

  addAffinity(tierId: number): void {
    this.tiers[tierId].affinity.addAffinity(
      new AffinityElement(null, DegradationAffinity.Absent)
    );
  }

  newTier(): void {
    this.tiers.unshift(
      new Tier(this.interference(), this.affinity(), this.capacity())
    );
  }

  newRandomTier(): void {
    this.tiers.unshift(
      new Tier(this.interference(true), this.affinity(), this.capacity(true))
    );
  }

  /**
   * Convert tiers to string (JSON), changing the tiers references to their id
   */
  save(): void {
    const str = CircularJSON.stringify(this.tiers);
    localStorage.setItem('tiers', str);
    this.toastr.success(
      'Tiers were successfully saved in your local storage.',
      'Success'
    );
  }

  load(): void {
    if (localStorage.getItem('tiers') == null) {
      this.toastr.error('There are no tier locally saved.', 'Error');
    } else {
      this.tiers = CircularJSON.parse(localStorage.getItem('tiers'));
      this.toastr.success(
        'Tiers were successfully loaded from your local storage.',
        'Success'
      );
    }
  }
}
