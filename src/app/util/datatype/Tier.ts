import { Interference } from "./Interference";
import { Affinity } from "./Affinity";
import { Capacity } from "./Capacity";

class Tier {
    public interference: Interference;
    public affinity: Affinity;
    public capacity: Capacity;
    public name: string;
    static counter: number = 1;

    /**
     * Creates a new tier with the given parameters, and sets a sequential name.
     * @param interference Interference object with values for each resource
     * @param affinity Affinity object with network affinities
     * @param capacity Size of the tier in percentage of PM
     */
    constructor(interference: Interference, affinity: Affinity, capacity: Capacity) {
        this.interference = interference;
        this.affinity = affinity;
        this.capacity = capacity;
        this.name = "tier" + Tier.counter++;
    }
}

export { Tier };
