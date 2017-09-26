import { Tier } from '../datatype/Tier';
import { Interference } from '../datatype/Interference';
import { Affinity } from '../datatype/Affinity';
import { Capacity } from '../datatype/Capacity';



class Model {

    private MAX = 100;

    /**
     * Calculates the total cost of running the given tiers in the same PM
     * @param tiers array of tiers placed in the same PM
     * @return total placement cost of the given tiers
     */
    cost(tiers: Tier[]) {
        const interferences: Interference[] = [];
        const affinities: Affinity[] = [];
        const capacities: Capacity[] = [];
        for (const tier of tiers) {
            interferences.push(tier.interference);
            affinities.push(tier.affinity);
            capacities.push(tier.capacity);
        }
        return this.costInterference(interferences) * this.costAffinity(affinities, tiers) * this.costCapacity(capacities);
    }

    /**
     * Calculates the cost given by the interference of each resource
     * @param interferences array of interferences
     * @return total interference cost
     */
    costInterference(interferences: Interference[]) {
        let costInterferenceAux = function (type: string) {
            let cost = 1;
            let count = 0;
            for (let interference of interferences) {
                if (interference[type] > 1) {
                    cost *= interference[type];
                    count++;
                }
            }
            return count > 1 ? cost : 1;
        }

        return costInterferenceAux('cpu') * costInterferenceAux('memory') * costInterferenceAux('disk') * costInterferenceAux('cache');
    }

    /**
     * Calculates the cost given by the network affinity
     * @param affinities array of affinities
     * @param tiers tiers placed in the same PM
     * @return total affinity cost
     */
    costAffinity(affinities: Affinity[], tiers: Tier[]) {
        let cost = 1;
        for (let affinity of affinities) {
            for (let affinityElement of affinity.affinities) {
                cost *= tiers.indexOf(affinityElement.tier) == -1 ? affinityElement.affinity : 1;
            }
        }
        return cost;
    }

    /**
     * Verifies if the current PM is able to host all given tiers, if its not, return a MAX value
     * @param capacities array of size of each tier
     * @return capacity constraint cost
     */
    costCapacity(capacities: Capacity[]) {
        let sum = 0;
        for (let capacity of capacities) {
            sum += capacity.capacity;
        }
        return sum > 1 ? this.MAX : 1;
    }
}

export { Model }
