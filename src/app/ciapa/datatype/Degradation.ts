/**
 * File with setting configurations of performance degradation of each type of resource
 */

enum DegradationCPU {
    Absent = 1.00,
    Low = 1.03,
    Moderate = 1.15,
    High = 1.33
}

enum DegradationMemory {
    Absent = 1.00,
    Low = 1.07,
    Moderate = 1.64,
    High = 1.74
}

enum DegradationDisk {
    Absent = 1.00,
    Low = 1.12,
    Moderate = 1.82,
    High = 2.25
}

enum DegradationCache {
    Absent = 1.00,
    Low = 1.07,
    Moderate = 1.18,
    High = 1.26
}

enum DegradationAffinity {
    Absent = 1.00,
    Low = 1.05,
    Moderate = 1.32,
    High = 1.57
}

export { DegradationAffinity, DegradationCache, DegradationCPU, DegradationDisk, DegradationMemory }