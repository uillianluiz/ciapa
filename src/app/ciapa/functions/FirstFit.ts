import { Solution } from '../datatype/Solution';
import { PM } from '../datatype/PM';
import { Tier } from '../datatype/Tier';

/**
 * Place the tiers in a first fit fashion, checking the PMs capacity and cost threshold, and adding more PMs as necessary
 */
class FirstFit {
  public exec(pms: PM[], tiers: Tier[], costThreshold: number, sizeNewPMs: number): Solution {
    const solution: Solution = new Solution();
    solution.PMs = pms;

    for (const tier of tiers) {
      let hasAdded = false;
      for (const pm of solution.PMs) {
        if (pm.getCapacityUsed() + tier.capacity.capacity <= pm.capacity) {
          pm.tiers.push(tier);
          if (pm.getCost() > costThreshold) {
            pm.tiers.pop();
          } else {
            hasAdded = true;
            break;
          }
        }
      }
      if (!hasAdded) {
        const newPM = new PM();
        newPM.name = `+PM${solution.PMs.length + 1}`;
        newPM.capacity = sizeNewPMs;
        newPM.tiers.push(tier);
        solution.PMs.push(newPM);
      }
    }

    return solution;
  }
}

export { FirstFit };
