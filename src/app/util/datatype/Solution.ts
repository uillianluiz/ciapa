import { PM } from "./PM";
import { Tier } from "./Tier";

class Solution {
    public PMs: PM[] = [];

    /**
     * Creates a deep clone of the object
     * @param old solution to be copied
     */
    public static copy(old: Solution): Solution {
        let newSolution = <Solution>Object.assign(new Solution, JSON.parse(JSON.stringify(old)));

        for (let i = 0; i < newSolution.PMs.length; i++) {
            newSolution.PMs[i] = <PM>Object.assign(new PM, newSolution.PMs[i]);
        }

        return newSolution;
    }

    /**
     * It calculates the cost of the current configuration.
     */
    public getCost(): number {
        let cost = 1;
        for (let pm of this.PMs) {
            cost *= pm.getCost();
        }
        return cost;
    }

    /**
     * Returns an integer between the given range
     * @param min minimum value (inclusive)
     * @param max maximum value (exclusive)
     */
    private getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * Generate a random modification of the current solution.
     * 75% of chance of swaping two tiers
     * 25% of change of moving a tier to a new PM
     */
    public randomSwap(): void {
        let rand = Math.random();

        if (rand > 0.25) {
            this.swap();
        } else {
            this.move();
        }
    }

    /**
     * Move a random tier of the PM with highest cost to the PM with lowest cost
     */
    private move(): void {
        let maxPM = this.PMs[0], minPM = this.PMs[0];
        for(let pm of this.PMs){
            const cost = pm.getCost();
            if(cost > maxPM.getCost()){
                maxPM = pm;
            }
            if(cost < minPM.getCost()){
                minPM = pm;
            }
        }

        let tier = this.getRandomInt(0, maxPM.tiers.length);

        let t1 = maxPM.tiers[tier];
        maxPM.tiers.splice(tier, 1);
        minPM.tiers.push(t1);

        minPM.hasChanged = true;
        maxPM.hasChanged = true;
    }

    /**
     * Swap two random tiers from two different PMs
     */
    private swap() {
        let pm1 = this.getRandomInt(0, this.PMs.length);
        let pm2 = pm1;
        while (pm2 == pm1) {
            pm2 = this.getRandomInt(0, this.PMs.length);
        }

        let tier1 = this.getRandomInt(0, this.PMs[pm1].tiers.length);
        let tier2 = this.getRandomInt(0, this.PMs[pm2].tiers.length);

        //console.log(`Swaping ${this.PMs[pm1].tiers[tier1].name} -> ${this.PMs[pm2].tiers[tier2].name}`)

        let t1 = this.PMs[pm1].tiers[tier1];
        let t2 = this.PMs[pm2].tiers[tier2];

        this.PMs[pm1].tiers[tier1] = t2;
        this.PMs[pm2].tiers[tier2] = t1;

        this.PMs[pm1].hasChanged = true;
        this.PMs[pm2].hasChanged = true;
    }

    /**
     * Helper function that prints the current solution
     */
    public toString = (): string => {
        let PMsSTR = [];
        for (let pm of this.PMs) {
            PMsSTR.push(pm.name + ":");
            for (let tier of pm.tiers) {
                PMsSTR.push(tier.name);
            }
        }
        return PMsSTR.join(" ");
    }
}

export { Solution };