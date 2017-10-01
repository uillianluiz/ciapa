import { Injectable } from '@angular/core';
import { Model } from '../ciapa/functions/Model';
import { PM } from '../ciapa/datatype/PM';
import { RoundRobin } from '../ciapa/functions/RoundRobin';
import { SimulatedAnnealing } from '../ciapa/functions/SimulatedAnnealing';
import { Solution } from '../ciapa/datatype/Solution';
import { TiersService } from './tiers.service';
import { ToastrService } from 'ngx-toastr';
import { FirstFit } from '../ciapa/functions/FirstFit';
import { PmsService } from './pms.service';
import * as CircularJSON from 'circular-json';
import { Tier } from '../ciapa/datatype/Tier';
import { BestFit } from '../ciapa/functions/BestFit';
import { WorstFit } from '../ciapa/functions/WorstFit';

@Injectable()
export class PlacementService {
  public solutions = [];
  public chartData = { dataAVG: [], dataMult: [], dataPMs: [] };
  public costFunction = 'getCostAVG';
  public temperature = 10000000;
  public coolingRate = 0.003;
  public costThreshold = 10;
  public sizeNewPMs = 1;

  constructor(
    public _tiersService: TiersService,
    private _pmsService: PmsService,
    private toastr: ToastrService
  ) {}

  /**
   * Create a copy of the PMs (clone)
   */
  get pms(): PM[] {
    const pms = <PM[]>Object.assign(
      CircularJSON.parse(CircularJSON.stringify(this._pmsService.pms))
    );

    for (let i = 0; i < pms.length; i++) {
      pms[i] = <PM>Object.assign(new PM(), pms[i]);
    }
    return pms;
  }

  get tiers(): Tier[] {
    const tiers = <Tier[]>Object.assign(
      CircularJSON.parse(CircularJSON.stringify(this._tiersService.tiers))
    );
    tiers.sort(function(a, b) {
      return b.capacity.capacity - a.capacity.capacity;
    });
    return tiers;
  }

  /**
   * Generate a round robin placement
   */
  private executeRR(): Solution {
    const roundRobin = new RoundRobin();
    return roundRobin.exec(this.pms, this.tiers);
  }

  /**
   * Execute a first fit placement
   */
  private executeFF(): Solution {
    const firstFit = new FirstFit();
    return firstFit.exec(
      this.pms,
      this.tiers,
      this.costThreshold,
      this.sizeNewPMs
    );
  }

  /**
  * Execute a best fit placement
  */
  private executeBF(): Solution {
    const bestFit = new BestFit();
    return bestFit.exec(
      this.pms,
      this.tiers,
      this.costThreshold,
      this.sizeNewPMs
    );
  }

  /**
* Execute a worst fit placement
*/
  private executeWF(): Solution {
    const worstFit = new WorstFit();
    return worstFit.exec(
      this.pms,
      this.tiers,
      this.costThreshold,
      this.sizeNewPMs
    );
  }

  /**
   * Generate a placement based on the simulated annealing algorithm
   */
  executeSA(): Solution {
    const simulatedAnnealing = new SimulatedAnnealing(
      this.temperature,
      this.coolingRate
    );
    return simulatedAnnealing.exec(this.executeRR(), this.costFunction);
  }

  resetData(): void {
    this.solutions = [];
    this.chartData = { dataAVG: [], dataMult: [], dataPMs: [] };
  }

  /**
   * Execute all placement algorithms available
   */
  execute(fn: () => void) {
    if (this._tiersService.tiers.length === 0) {
      this.toastr.error('There are no tiers to place.', 'Error');
      fn();
      return;
    } else if (this._pmsService.pms.length === 0) {
      this.toastr.error('There should be at least one PM.', 'Error');
      fn();
      return;
    }

    this.solutions.push({
      algorithm: 'Simulated Annealing',
      short: 'SA',
      solution: this.executeSA()
    });

    this.solutions.push({
      algorithm: 'Round Robin',
      short: 'RR',
      solution: this.executeRR()
    });

    this.solutions.push({
      algorithm: 'First Fit Decreasing',
      short: 'FFD',
      solution: this.executeFF()
    });

    this.solutions.push({
      algorithm: 'Best Fit Decreasing',
      short: 'BFD',
      solution: this.executeBF()
    });

    this.solutions.push({
      algorithm: 'Worst Fit Decreasing',
      short: 'WFD',
      solution: this.executeWF()
    });

    this.generateChartData();

    this.toastr.success(
      'All placement settings were successfully generated.',
      'Success'
    );

    fn();
  }

  /**
   * Generate the data for displaying a chart with the cost functions of each algorithm
   */
  generateChartData() {
    this.chartData.dataAVG = [];
    this.chartData.dataMult = [];
    this.chartData.dataPMs = [];
    for (const solution of this.solutions) {
      this.chartData.dataAVG.push({
        data: [solution.solution.getCostAVG().toFixed(2)],
        label: solution.short
      });
      this.chartData.dataMult.push({
        data: [solution.solution.getCost().toFixed(2)],
        label: solution.short
      });

      this.chartData.dataPMs.push({
        data: [solution.solution.PMs.length],
        label: solution.short
      });
    }
  }
}
