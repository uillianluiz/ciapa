import { PM } from './PM';
import { Tier } from './Tier';
import * as CircularJSON from 'circular-json';
import Util from '../functions/Util';


class Solution {
  public PMs: PM[] = [];

  /**
  * Creates a deep clone of the object
  * @param old solution to be copied
  */
  public static copy(old: Solution): Solution {
    const newSolution = <Solution>Object.assign(
      new Solution(),
      CircularJSON.parse(CircularJSON.stringify(old))
    );

    for (let i = 0; i < newSolution.PMs.length; i++) {
      newSolution.PMs[i] = <PM>Object.assign(new PM(), newSolution.PMs[i]);
    }

    return newSolution;
  }

  /**
  * It calculates the cost of the current configuration.
  */
  public getCost(): number {
    let cost = 1;
    for (const pm of this.PMs) {
      cost *= pm.getCost();
    }
    return cost;
  }

  /**
  * It calculates the cost of the current configuration.
  */
  public getCostAVG(): number {
    let cost = 0;
    for (const pm of this.PMs) {
      cost += pm.getCost();
    }
    return cost / this.PMs.length;
  }

  /**
  * Generate a random modification of the current solution.
  * 75% of chance of swaping two tiers
  * 25% of change of moving a tier to a new PM
  */
  public randomSwap(): void {
    const rand = Math.random();

    if (rand > 0.25) {
      this.swap();
    } else {
      this.move();
    }
  }

  /**
  * Move a random tier of the PM with highest cost to the PM with lowest cost
  */
  private move(): void {
    const pmsWithTiers = this.pmsWithTiers();
    const pmsEmpty = this.pmsEmpty();


    let maxPM: PM;
    let minPM: PM;

    if (pmsEmpty.length > 0) {
      minPM = pmsEmpty[Util.getRandomInt(0, pmsEmpty.length)];
    } else if (pmsWithTiers.length <= 1) {
      return;
    } else {
      minPM = pmsWithTiers[Util.getRandomInt(0, pmsWithTiers.length)];
    }

    maxPM = pmsWithTiers[Util.getRandomInt(0, pmsWithTiers.length)];
    while (minPM === maxPM) {
      maxPM = pmsWithTiers[Util.getRandomInt(0, pmsWithTiers.length)];
    }

    const tier = Util.getRandomInt(0, maxPM.tiers.length);

    const t1 = maxPM.tiers[tier];
    maxPM.tiers.splice(tier, 1);
    minPM.tiers.push(t1);

    minPM.hasChanged = true;
    maxPM.hasChanged = true;
  }

  /**
   * return the PMs that have no tiers
   */
  private pmsEmpty(): PM[] {
    const pms: PM[] = [];
    for (const pm of this.PMs) {
      if (pm.tiers.length === 0) {
        pms.push(pm);
      }
    }

    return pms;
  }

  /**
   * return the PMs that have at least one tier
   */
  private pmsWithTiers(): PM[] {
    const pms: PM[] = [];
    for (const pm of this.PMs) {
      if (pm.tiers.length > 0) {
        pms.push(pm);
      }
    }
    return pms;
  }

  /**
  * Swap two random tiers from two different PMs
  */
  private swap() {
    const pmsWithTiers = this.pmsWithTiers();

    if (pmsWithTiers.length === 1) {
      return;
    }

    const pm1 = Util.getRandomInt(0, pmsWithTiers.length);
    let pm2 = pm1;
    while (pm2 === pm1) {
      pm2 = Util.getRandomInt(0, pmsWithTiers.length);
    }

    const tier1 = Util.getRandomInt(0, pmsWithTiers[pm1].tiers.length);
    const tier2 = Util.getRandomInt(0, pmsWithTiers[pm2].tiers.length);

    // console.log(`Swaping ${this.PMs[pm1].tiers[tier1].name} -> ${this.PMs[pm2].tiers[tier2].name}`)

    const t1 = pmsWithTiers[pm1].tiers[tier1];
    const t2 = pmsWithTiers[pm2].tiers[tier2];

    pmsWithTiers[pm1].tiers[tier1] = t2;
    pmsWithTiers[pm2].tiers[tier2] = t1;

    pmsWithTiers[pm1].hasChanged = true;
    pmsWithTiers[pm2].hasChanged = true;
  }

  /**
     * Helper function that prints the current solution
     */
  public toString = (): string => {
    const PMsSTR = [];
    for (const pm of this.PMs) {
      PMsSTR.push(pm.name + ':');
      for (const tier of pm.tiers) {
        PMsSTR.push(tier.name);
      }
    }
    return PMsSTR.join(' ');
  }
}

export { Solution };
