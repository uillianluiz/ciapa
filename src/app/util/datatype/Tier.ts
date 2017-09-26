import { Interference } from './Interference';
import { Affinity } from './Affinity';
import { Capacity } from './Capacity';

class Tier {
  static counter = 1;
  public interference: Interference;
  public affinity: Affinity;
  public capacity: Capacity;
  public name: string;
  public id: number;

  static filterToJson(tiers: any): string {
    return JSON.stringify(tiers, (key, value) => {
      if (key === 'affinities' && typeof value === 'object') {
        for (const affinity of value) {
          affinity.tier = affinity.tier.id;
        }
        return value;
      }
      return value;
    });
  }

  static filterToObject(str: string): Tier[] {
    const map: Map<number, Tier> = new Map<number, Tier>();

    const tiers = JSON.parse(localStorage.getItem('tiers'), (key, value) => {
      if (key === 'affinities') {
        value.tier = map.get(value.tier);
      } else if (value.hasOwnProperty('id')) {
        value = <Tier>Object.assign(
          new Tier(value.interference, value.affinity, value.capacity),
          value
        );
        map.set(value.id, value);
      }
      return value;
    });

    for (const tier of tiers) {
      for (const affElement of tier.affinity.affinities) {
        affElement.tier = map.get(affElement.tier as any);
      }
    }

    return tiers;
  }

  /**
     * Creates a new tier with the given parameters, and sets a sequential name.
     * @param interference Interference object with values for each resource
     * @param affinity Affinity object with network affinities
     * @param capacity Size of the tier in percentage of PM
     */
  constructor(
    interference: Interference,
    affinity: Affinity,
    capacity: Capacity
  ) {
    this.interference = interference;
    this.affinity = affinity;
    this.capacity = capacity;
    this.name = 'tier' + Tier.counter;
    this.id = Tier.counter;
    Tier.counter++;
  }
}

export { Tier };
