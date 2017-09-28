import { Solution } from '../datatype/Solution';
import { PM } from '../datatype/PM';
import { Tier } from '../datatype/Tier';

/**
 * Place the tiers in a round robin fashion, without checking for any constraints
 */
class RoundRobin {
  public exec(numberOfPMs: number, tiers: Tier[]): Solution {
    const initialSolution: Solution = new Solution();
    for (let i = 0; i < numberOfPMs; i++) {
      const pm = new PM();
      pm.name = `PM${i + 1}`;
      initialSolution.PMs.push(pm);
    }

    for (let i = 0; i < tiers.length; i++) {
      initialSolution.PMs[i % numberOfPMs].tiers.push(tiers[i]);
    }
    return initialSolution;
  }
}

export { RoundRobin };
