import { Injectable } from '@angular/core';
import { Solution } from '../ciapa/datatype/Solution';
import { Model } from '../ciapa/functions/Model';
import { SimulatedAnnealing } from '../ciapa/functions/SimulatedAnnealing';
import { TiersService } from './tiers.service';
import { PM } from '../ciapa/datatype/PM';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PlacementService {
  public numberOfPMs = 2;
  public solutions = undefined;

  constructor(public _tiersService: TiersService, private toastr: ToastrService) { }

  /**
   * Generate a round robin placement
   */
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

  /**
   * Execute a first fit placement
   */
  private executeFF(): Solution {
    const solution: Solution = new Solution();

    let numPMs = 1;

    for (const tier of this._tiersService.tiers) {
      let hasAdded = false;
      for (const pm of solution.PMs) {
        if (pm.getCapacity() + tier.capacity.capacity <= 1) {
          pm.tiers.push(tier);
          hasAdded = true;
          break;
        }
      }
      if (!hasAdded) {
        const newPM = new PM();
        newPM.name = `PM${numPMs++}`;
        newPM.tiers.push(tier);
        solution.PMs.push(newPM);
      }
    }

    return solution;
  }

  /**
   * Generate a placement based on the simulated annealing algorithm
   */
  executeSA(costFunction: string): Solution {
    const simulatedAnnealing = new SimulatedAnnealing();
    return simulatedAnnealing.exec(this.executeRR(), costFunction);
  }

  /**
   * Ensure the limits of PMs that can be used
   */
  ensurePMNumber(): void {
    if (this.numberOfPMs > this._tiersService.tiers.length) {
      this.numberOfPMs = this._tiersService.tiers.length;
    } else if (this.numberOfPMs <= 1) {
      this.numberOfPMs = 1;
    }
  }

  /**
   * Execute all placement algorithms available
   */
  execute(costFunction: string) {
    if (this._tiersService.tiers.length === 0) {
      this.toastr.error('There are no tiers to place.', 'Error');
      return;
    }
    this.ensurePMNumber();

    this.solutions = undefined;
    const solutions = [];

    solutions.push({
      algorithm: 'Simulated Annealing',
      solution: this.executeSA(costFunction)
    });

    solutions.push({
      algorithm: 'Round Robin',
      solution: this.executeRR()
    });

    solutions.push({
      algorithm: 'First Fit',
      solution: this.executeFF()
    });

    this.solutions = solutions;
  }


}
