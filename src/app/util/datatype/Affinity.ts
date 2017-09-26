import { Tier } from "./Tier";

class AffinityElement {
    public tier: Tier;
    public affinity: number;

    /**
     * 
     * @param tier Tier that has affinity relation
     * @param affinity Affinity level of current relation
     */
    constructor(tier: Tier, affinity: number) {
        this.tier = tier;
        this.affinity = affinity;
    }
}

class Affinity {
    public affinities: AffinityElement[];

    /**
     * Affinity class may have multiple affinity elements, which are the affinity relation by itself.
     */
    constructor() {
        this.affinities = [];
    }

    /**
     * Wrapper function to add a new affinity element
     * @param affinity affinityelement
     */
    addAffinity(affinity: AffinityElement) {
        this.affinities.push(affinity);
    }
}

export { Affinity, AffinityElement };