import { Solution } from "../datatype/Solution";
import * as _ from "lodash";

class SimulatedAnnealing {

    private temperature: number = 10000000;
    private coolingRate: number = 0.003;

    /**
     * Calculates the acceptance probability
     * @param currentCost the cost of the current solution
     * @param newCost the cost of the new solution
     * @param temperature the current temperature
     * @return the problability of accepting the new solution
     */
    private acceptanceProbability(currentCost: number, newCost: number, temperature: number): number {
        if (newCost < currentCost) {
            return 1.0;
        }
        return Math.exp((currentCost - newCost) / temperature);
    }

    /**
     * It executes the simulated annealing algorithm and returns the best solution
     * @param initial initial solution
     * @return best solution found
     */
    exec(initial: Solution): Solution {
        let best = initial;

        let temperature = this.temperature;
        let currentSolution = Solution.copy(best);

        let numOp = 0;
        
        let noChange = 0;
        let maxNoChange = 1000;

        while (temperature > 1 && noChange < maxNoChange) {
            numOp++;
            let newSolution = Solution.copy(currentSolution);
            
            newSolution.randomSwap(); //generate a modified solution
            
            let currentCost = currentSolution.getCost();
            let newCost = newSolution.getCost();

            if (this.acceptanceProbability(currentCost, newCost, temperature) > Math.random()) {
                currentSolution = newSolution;
            }

            if(currentSolution.getCost() < best.getCost()){
                best = currentSolution;
                noChange = 0;
            }
            noChange++;
            temperature *= 1 - this.coolingRate;
        }
        console.log("NumOp: "+ numOp);
        return best;
    }
}

export { SimulatedAnnealing };