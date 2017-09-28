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

@Injectable()
export class PlacementService {
  public numberOfPMs = 2;
  public solutions = undefined;
  public chartData = { data: [], labels: ['Average', 'Multiplication'] };

  constructor(
    public _tiersService: TiersService,
    private _pmsService: PmsService,
    private toastr: ToastrService
  ) {}


  get pms(): PM[] {
    const pms = <PM[]>Object.assign(
      CircularJSON.parse(CircularJSON.stringify(this._pmsService.pms))
    );

    for (let i = 0; i < pms.length; i++) {
      pms[i] = <PM>Object.assign(new PM(), pms[i]);
    }
    return pms;
  }

  /**
   * Generate a round robin placement
   */
  private executeRR(): Solution {
    const roundRobin = new RoundRobin();
    return roundRobin.exec(this.pms, this._tiersService.tiers);
  }

  /**
   * Execute a first fit placement
   */
  private executeFF(): Solution {
    const firstFit = new FirstFit();
    return firstFit.exec(this._tiersService.tiers);
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

    this.solutions = [];

    this.solutions.push({
      algorithm: 'Simulated Annealing',
      solution: this.executeSA(costFunction)
    });

    this.solutions.push({
      algorithm: 'Round Robin',
      solution: this.executeRR()
    });

    this.solutions.push({
      algorithm: 'First Fit',
      solution: this.executeFF()
    });
    this.generateChartData();

    this.toastr.success(
      'All placement comparations were successfully generated.',
      'Success'
    );
  }

  /**
   * Generate the data for displaying a chart with the cost functions of each algorithm
   */
  generateChartData() {
    this.chartData.data = [];
    for (const solution of this.solutions) {
      this.chartData.data.push({
        data: [solution.solution.getCostAVG().toFixed(2), solution.solution.getCost().toFixed(2)],
        label: solution.algorithm
      });
    }
  }
}
