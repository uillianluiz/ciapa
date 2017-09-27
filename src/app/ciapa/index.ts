import { Tier } from "./datatype/Tier";
import { Interference } from "./datatype/Interference";
import { Affinity, AffinityElement } from "./datatype/Affinity";
import { Capacity } from "./datatype/Capacity";
import { DegradationAffinity, DegradationCache, DegradationCPU, DegradationDisk, DegradationMemory } from "./datatype/Degradation";
import { Model } from "./functions/Model";
import { Solution } from "./datatype/Solution";
import { PM } from "./datatype/PM";
import { SimulatedAnnealing } from "./functions/SimulatedAnnealing";


/*
let tier3Interference = new Interference(DegradationCPU.Moderate, DegradationMemory.High, DegradationDisk.Moderate, DegradationCache.Low);
let tier3Affinity = new Affinity();
let tier3Capacity = new Capacity(0.45);
let tier3 = new Tier(tier3Interference, tier3Affinity, tier3Capacity);
tier3.name = "tier3";

let tier2Interference = new Interference(DegradationCPU.Low, DegradationMemory.High, DegradationDisk.Absent, DegradationCache.Moderate);
let tier2Affinity = new Affinity();
tier2Affinity.addAffinity(new AffinityElement(tier3, DegradationAffinity.Moderate));
let tier2Capacity = new Capacity(0.35);
let tier2 = new Tier(tier2Interference, tier2Affinity, tier2Capacity);
tier2.name = "tier2";

let tier1Interference = new Interference(DegradationCPU.Low, DegradationMemory.Low, DegradationDisk.Absent, DegradationCache.High);
let tier1Affinity = new Affinity();
tier1Affinity.addAffinity(new AffinityElement(tier2, DegradationAffinity.Moderate));
let tier1Capacity = new Capacity(0.25);
let tier1 = new Tier(tier1Interference, tier1Affinity, tier1Capacity);
tier1.name = "tier1";

let solution = new Solution();
let pm1 = new PM();
pm1.tiers.push(tier1);
pm1.tiers.push(tier2);
solution.PMs.push(pm1);
let pm2 = new PM();
pm2.tiers.push(tier3);
solution.PMs.push(pm2);
*/


let tiers = [];
for (let i = 0; i < 10; i++) {
    let int = new Interference(getDegradation("cpu", i), getDegradation("memory", i), getDegradation("disk", i), getDegradation("cache", i));
    let affElem, aff;
    aff = new Affinity();
    if(i > 0 && i < 6){
        affElem = new AffinityElement(tiers[i-1], DegradationAffinity.Moderate);
        aff.addAffinity(affElem);
    } 
    let cap = new Capacity(getCap(i));
    tiers.push(new Tier(int, aff, cap));
}

//console.log(tiers)

function getCap(seed: number){
    //return 0;
    return [0.20, 0.35, 0.25, 0.25][seed % 4];
}

function getDegradation(type: string, seed: number) {
    if(type == "cpu"){
        if (seed % 4 == 0) {
            return DegradationCPU.Absent;
        } else if (seed % 4 == 1) {
            return DegradationCPU.Low;
        } else if (seed % 4 == 2) {
            return DegradationCPU.Moderate;
        } else if (seed % 4 == 3) {
            return DegradationCPU.High;
        }
    } else if(type == "disk"){
        if (seed % 4 == 1) {
            return DegradationDisk.Absent;
        } else if (seed % 4 == 2) {
            return DegradationDisk.Low;
        } else if (seed % 4 == 3) {
            return DegradationDisk.Moderate;
        } else if (seed % 4 == 0) {
            return DegradationDisk.High;
        }
    } else if(type == "memory"){
        if (seed % 4 == 2) {
            return DegradationMemory.Absent;
        } else if (seed % 4 == 3) {
            return DegradationMemory.Low;
        } else if (seed % 4 == 0) {
            return DegradationMemory.Moderate;
        } else if (seed % 4 == 1) {
            return DegradationMemory.High;
        }
    } else if(type == "cache"){
        if (seed % 4 == 3) {
            return DegradationCache.Absent;
        } else if (seed % 4 == 0) {
            return DegradationCache.Low;
        } else if (seed % 4 == 1) {
            return DegradationCache.Moderate;
        } else if (seed % 4 == 2) {
            return DegradationCache.High;
        }
    }
}


let solution = new Solution();
let pm1 = new PM();
pm1.tiers.push(tiers[0]);
pm1.tiers.push(tiers[1]);
pm1.tiers.push(tiers[2]);
solution.PMs.push(pm1);
let pm2 = new PM();
pm2.tiers.push(tiers[3]);
pm2.tiers.push(tiers[4]);
pm2.tiers.push(tiers[5]);
solution.PMs.push(pm2);
let pm3 = new PM();
pm3.tiers.push(tiers[6]);
pm3.tiers.push(tiers[7]);
pm3.tiers.push(tiers[8]);
pm3.tiers.push(tiers[9]);
solution.PMs.push(pm3);

let sa = new SimulatedAnnealing();
let s = sa.exec(solution);
console.log(solution.PMs.toString() + " - " + solution.getCost().toFixed(3));
console.log(s.PMs.toString() + " - " + s.getCost().toFixed(3));