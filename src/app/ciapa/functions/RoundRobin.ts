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

    for (let i = 0; i < tiers.length; i++) {
      solution.PMs[i % solution.PMs.length].tiers.push(tiers[i]);
    }
    return solution;
  }
}

export { RoundRobin };
