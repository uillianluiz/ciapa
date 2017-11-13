import { Solution } from '../datatype/Solution';
import { PM } from '../datatype/PM';
import { Tier } from '../datatype/Tier';

/**
 * Place the tiers in a round robin fashion, without checking for any constraints
 */
class RoundRobin {
  public exec(pms: PM[], tiers: Tier[]): Solution {
    const solution: Solution = new Solution();
    solution.PMs = pms;

    let pmToAdd = 0;
    for (let i = 0; i < tiers.length; i++) {
      if (pms[pmToAdd].getCapacityUsed() + tiers[i].capacity.capacity <= pms[pmToAdd].capacity) {
        solution.PMs[pmToAdd].tiers.push(tiers[i]);
      } else {
        const pmWithSpaceId = this.findPMWithSpace(solution.PMs, tiers[i], pmToAdd + 1);

        if (pmWithSpaceId !== -1) {
          solution.PMs[pmWithSpaceId].tiers.push(tiers[i]);
        } else {
          solution.PMs[pmToAdd].tiers.push(tiers[i]);
        }
      }
      pmToAdd = (pmToAdd + 1) % pms.length;
    }
    return solution;
  }

  public findPMWithSpace(pms: PM[], tier: Tier, pmStart: number): number {
    for (let i = pmStart; i < pms.length + pmStart; i++) {
      const idx = i % pms.length;
      if (pms[idx].getCapacityUsed() + tier.capacity.capacity <= pms[idx].capacity) {
        return idx;
      }
    }
    return -1;
  }
}

export { RoundRobin };
