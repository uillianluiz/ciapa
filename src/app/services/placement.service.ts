import { Injectable } from '@angular/core';
import { Solution } from '../util/datatype/Solution';
import { Model } from '../util/functions/Model';
import { SimulatedAnnealing } from '../util/functions/SimulatedAnnealing';
import { TiersService } from './tiers.service';
import { PM } from '../util/datatype/PM';

@Injectable()
export class PlacementService {
  public numberOfPMs = 2;
  public solutions = undefined;

  constructor(public _tiersService: TiersService) {}

  private executeRR(): Solution {
    const initialSolution: Solution = new Solution();
    for (let i = 0; i < this.numberOfPMs; i++) {
      const pm = new PM();
      pm.name = `PM${i + 1}`;
      initialSolution.PMs.push(pm);
    }

    for (let i = 0; i < this._tiersService.tiers.length; i++) {
      initialSolution.PMs[i % this.numberOfPMs].tiers.push(
        this._tiersService.tiers[i]
      );
    }
    return initialSolution;
  }

  execute() {
    if (this.numberOfPMs > this._tiersService.tiers.length) {
      this.numberOfPMs = this._tiersService.tiers.length;
    }

    this.solutions = undefined;
    const solutions = [];

    solutions.push({
      algorithm: 'Simulated Annealing',
      solution: this.executeSA()
    });

    solutions.push({
      algorithm: 'Round Robin',
      solution: this.executeRR()
    });

    this.solutions = solutions;
  }

  executeSA(): Solution {
    const simulatedAnnealing = new SimulatedAnnealing();
    return simulatedAnnealing.exec(this.executeRR());
  }
}
