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

  constructor(private toastr: ToastrService) {
    this.load(false);
  }

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

  addAffinity(tierId: number): void {
    this.tiers[tierId].affinity.addAffinity(
      new AffinityElement(null, DegradationAffinity.Absent)
    );
  }

  newTier(): void {
    const tier = new Tier(this.interference(), this.affinity(), this.capacity());
    tier.name = 'tier' + (this.tiers.length + 1);
    this.tiers.unshift(tier);
  }

  newRandomTier(): void {
    const tier = new Tier(this.interference(true), this.affinity(), this.capacity(true));
    tier.name = 'tier' + (this.tiers.length + 1);
    this.tiers.unshift(tier);
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

  load(showAlert = true): void {
    if (localStorage.getItem('tiers') == null) {
      if (showAlert) {
        this.toastr.error('There are no tiers locally saved.', 'Error');
      }
    } else {
      this.tiers = CircularJSON.parse(localStorage.getItem('tiers'));
      if (showAlert) {
        this.toastr.success(
          'Tiers were successfully loaded from your local storage.',
          'Success'
        );
      }
    }
  }
}
