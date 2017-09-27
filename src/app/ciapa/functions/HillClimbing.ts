import { Solution } from '../datatype/Solution';

class HillClimbing {
  private iterations = 5000;

  /**
     * It executes the hill climbing algorithm and returns the best local solution
     * @param initial initial solution
     * @return best solution found
     */
  exec(initial: Solution): Solution {
    let iterations = this.iterations;
    let best = initial;

    let numOp = 0;

    let noChange = 0;
    const maxNoChange = 1000;

    while (iterations > 1 && noChange < maxNoChange) {
      numOp++;
      const newSolution = Solution.copy(best);

      newSolution.randomSwap();

      const bestCost = best.getCost();
      const newCost = newSolution.getCost();

      if (newCost < bestCost) {
        best = newSolution;
        noChange = 0;
      }

      noChange++;
      iterations--;
    }
    console.log('NumOp: ' + numOp);
    return best;
  }
}

export { HillClimbing };
