import { Solution } from '../datatype/Solution';
import { PM } from '../datatype/PM';
import { Tier } from '../datatype/Tier';

/**
 * Place the tiers in a best fit fashion, checking only the PMs capacity, and adding more PMs as necessary
 */
class BestFit {
  public exec(pms: PM[], tiers: Tier[]): Solution {
    const solution: Solution = new Solution();
    solution.PMs = pms;

    for (const tier of tiers) {
      let hasAdded = false;
      for (const pm of solution.PMs) {
        if (pm.getCapacityUsed() + tier.capacity.capacity <= pm.capacity) {
          pm.tiers.push(tier);
          hasAdded = true;
          break;
        }
      }
      if (!hasAdded) {
        const newPM = new PM();
        newPM.name = `+PM${solution.PMs.length + 1}`;
        newPM.tiers.push(tier);
        solution.PMs.push(newPM);
      }
    }

    return solution;
  }
}

export { BestFit };
