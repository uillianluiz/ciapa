/**
 * File with setting configurations of performance degradation of each type of resource
 */

enum DegradationCPU {
    Absent = 1,
    Low = 1.01,
    Moderate = 1.25,
    High = 1.5
}

enum DegradationMemory {
    Absent = 1,
    Low = 1.07,
    Moderate = 1.64,
    High = 1.74
}

enum DegradationDisk {
    Absent = 1,
    Low = 1.3,
    Moderate = 1.8,
    High = 2.4
}

enum DegradationCache {
    Absent = 1,
    Low = 1.07,
    Moderate = 1.18,
    High = 1.26
}

enum DegradationAffinity {
    Absent = 1,
    Low = 1.05,
    Moderate = 1.32,
    High = 1.57
}

export { DegradationAffinity, DegradationCache, DegradationCPU, DegradationDisk, DegradationMemory }