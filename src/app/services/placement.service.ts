import { Injectable } from '@angular/core';
import { Solution } from '../util/datatype/Solution';
import { Model } from '../util/functions/Model';
import { SimulatedAnnealing } from '../util/functions/SimulatedAnnealing';
import { TiersService } from './tiers.service';
import { PM } from '../util/datatype/PM';

@Injectable()
export class PlacementService {
  public numberOfPMs = 2;
  public solution: Solution = null;
  constructor(public _tiersService: TiersService) {}

  private generateInitialSolution(): Solution {
    const initialSolution: Solution = new Solution();
    for (let i = 0; i < this.numberOfPMs; i++) {
      const pm = new PM();
      initialSolution.PMs.push(pm);
    }

    for (let i = 0; i < this._tiersService.tiers.length; i++) {
      initialSolution.PMs[i % this.numberOfPMs].tiers.push(
        this._tiersService.tiers[i]
      );
    }

    return initialSolution;
  }

  executeSA(): void {
    this.solution = null;
    if (this.numberOfPMs > this._tiersService.tiers.length) {
      this.numberOfPMs = this._tiersService.tiers.length;
    }
    const simulatedAnnealing = new SimulatedAnnealing();
    this.solution = simulatedAnnealing.exec(this.generateInitialSolution());
  }
}
