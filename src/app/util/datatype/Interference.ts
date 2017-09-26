class Interference {
    public cpu: number;
    public memory: number;
    public disk: number;
    public cache: number;

    /**
     * Interference object for each resource
     * @param cpu 
     * @param memory 
     * @param disk 
     * @param cache 
     */
    constructor(cpu: number, memory: number, disk: number, cache: number) {
        this.cpu = cpu;
        this.memory = memory;
        this.disk = disk;
        this.cache = cache;
    }

}

export { Interference };