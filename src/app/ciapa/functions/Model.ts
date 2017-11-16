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
    cost(tiers: Tier[], pmCapacity: number) {
        const interferences: Interference[] = [];
        const affinities: Affinity[] = [];
        const capacities: Capacity[] = [];
        for (const tier of tiers) {
            interferences.push(tier.interference);
            affinities.push(tier.affinity);
            capacities.push(tier.capacity);
        }
        return this.costInterference(interferences) * this.costAffinity(affinities, tiers) * this.costCapacity(capacities, pmCapacity);
    }


    costOnlyInterference(tiers: Tier[], pmCapacity: number) {
        const interferences: Interference[] = [];
        const capacities: Capacity[] = [];
        for (const tier of tiers) {
            interferences.push(tier.interference);
            capacities.push(tier.capacity);
        }
        return this.costInterference(interferences) * this.costCapacity(capacities, pmCapacity);
    }

    costOnlyAffinity(tiers: Tier[], pmCapacity: number) {
        const affinities: Affinity[] = [];
        const capacities: Capacity[] = [];
        for (const tier of tiers) {
            affinities.push(tier.affinity);
            capacities.push(tier.capacity);
        }
        return this.costAffinity(affinities, tiers) * this.costCapacity(capacities, pmCapacity);
    }

    /** 
     * Calculates the cost given by the interference of each resource
     * @param interferences array of interferences
     * @return total interference cost
     */
    costInterference(interferences: Interference[]) {
        const costInterferenceAux = function (type: string) {
            let cost = 1;
            let count = 0;
            for (const interference of interferences) {
                if (interference[type] > 1) {
                    cost *= interference[type];
                    count++;
                }
            }
            return count > 1 ? cost : 1;
        };

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
        for (const affinity of affinities) {
            for (const affinityElement of affinity.affinities) {
                cost *= tiers.indexOf(affinityElement.tier) === -1 ? affinityElement.affinity : 1;
            }
        }
        return cost;
    }

    /**
     * Verifies if the current PM is able to host all given tiers, if its not, return a MAX value
     * @param capacities array of size of each tier
     * @return capacity constraint cost
     */
    costCapacity(capacities: Capacity[], pmCapacity: number) {
        let sum = 0;
        for (const capacity of capacities) {
            sum += capacity.capacity;
        }
        return sum > pmCapacity ? this.MAX : 1;
    }
}

export { Model };
