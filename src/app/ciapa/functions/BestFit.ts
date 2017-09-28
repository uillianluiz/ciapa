import { Solution } from '../datatype/Solution';
import { PM } from '../datatype/PM';
import { Tier } from '../datatype/Tier';

/**
 * Place the tiers in a best fit fashion, checking the PMs capacity and degradation threshold, and adding more PMs as necessary
 */
class BestFit {
  public exec(pms: PM[], tiers: Tier[], costThreshold: number, sizeNewPMs: number): Solution {
    const solution: Solution = new Solution();
    solution.PMs = pms;

    for (const tier of tiers) {
      let bestPM: PM;
      let used = Number.MAX_SAFE_INTEGER;
      for (const pm of solution.PMs) {
        pm.tiers.push(tier);
        const remainder = pm.capacity - pm.getCapacityUsed();
        if (remainder >= 0 && remainder < used && pm.getCost() <= costThreshold) {
          used = pm.capacity - pm.getCapacityUsed();
          bestPM = pm;
        }

        pm.tiers.pop();
      }

      if (bestPM !== undefined) {
        bestPM.tiers.push(tier);
      } else {
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

export { BestFit };
