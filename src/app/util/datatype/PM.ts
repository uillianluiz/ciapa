import { Tier } from "./Tier";
import { Model } from "../functions/Model";


class PM {
    public tiers: Tier[] = [];
    static counter: number = 1;
    public name: string;
    static model: Model = new Model();

    private cost: number = undefined;
    public hasChanged: boolean = false;

    /**
     * Create the PM, giving a sequential name to it.
     */
    constructor() {
        this.name = "PM" + PM.counter++;
    }

    /**
     * It calculates and returns the cost of running the tiers together in this PM.
     * It keeps the result while the tiers in the PM don't change.
     */
    public getCost(): number {
        if(this.cost == undefined || this.hasChanged){
            this.cost = PM.model.cost(this.tiers);
            this.hasChanged = false;
        }
        return this.cost;
    }

    /**
     * Helper function that prints the PM and the tiers on it.
     */
    public toString = (): string => {
        let tiers = []
        for (let tier of this.tiers) {
            tiers.push(tier.name);
        }
        return `${this.name}: [${tiers.join(", ")}] (${this.getCost().toFixed(3)})`;
    }
}

export { PM };