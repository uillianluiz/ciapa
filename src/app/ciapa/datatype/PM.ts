import { Tier } from './Tier';
import { Model } from '../functions/Model';

class PM {
  static model: Model = new Model();
  static counter = 1;
  public tiers: Tier[] = [];
  public name: string;
  public capacity: number;

  private cost: number = undefined;
  public hasChanged = true;

  /**
     * Create the PM, giving a sequential name to it.
     */
  constructor(capacity = 1) {
    this.capacity = capacity;
    this.name = 'PM' + PM.counter++;
  }

  getCapacityUsed(): number {
    let used = 0;
    for (const tier of this.tiers) {
      used += tier.capacity.capacity;
    }
    return used;
  }

  /**
     * It calculates and returns the cost of running the tiers together in this PM.
     * It keeps the result while the tiers in the PM don't change.
     */
  public getCost(): number {
    return PM.model.cost(this.tiers, this.capacity);
    /*
    if (this.cost === undefined || this.hasChanged) {
      this.cost = PM.model.cost(this.tiers, this.capacity);
      this.hasChanged = false;
    }
    return this.cost;*/
  }

  /**
     * Helper function that prints the PM and the tiers on it.
     */
  public toString = (): string => {
    const tiers = [];
    for (const tier of this.tiers) {
      tiers.push(tier.name);
    }
    return `${this.name}: [${tiers.join(', ')}] (${this.getCost().toFixed(3)})`;
  }
}

export { PM };
