class Capacity {
    public capacity: number;
    public static nano = 0.05;
    public static micro = 0.1;
    public static small = 0.15;
    public static medium = 0.2;
    public static large = 0.3;
    public static xlarge = 0.4;

    /**
     * 
     * @param capacity Capacity (size) of the tier
     */
    constructor(capacity: number) {
        if (capacity < 0 || capacity > 1) {
            throw new Error("Capacity must be in the interval (0, 1].");
        }
        this.capacity = capacity;
    }
}

export { Capacity };