import { Component, OnInit } from '@angular/core';
import { Tier } from '../ciapa/datatype/Tier';
import { Affinity, AffinityElement } from '../ciapa/datatype/Affinity';
import { Capacity } from '../ciapa/datatype/Capacity';
import { Interference } from '../ciapa/datatype/Interference';
import {
  DegradationCPU,
  DegradationMemory,
  DegradationAffinity,
  DegradationCache,
  DegradationDisk
} from '../ciapa/datatype/Degradation';
import { TiersService } from '../services/tiers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.scss']
})
export class TiersComponent implements OnInit {
  public tierModal = false;
  public tierIndex = -1;

  constructor(
    private _tierService: TiersService,
    private _route: ActivatedRoute
  ) {
    if (this._route.snapshot.paramMap.has('id')) {
      this._tierService.loadTiers(this._route.snapshot.paramMap.get('id'));
    }
  }

  get tiers(): Tier[] {
    return this._tierService.tiers;
  }

  openTierModal(tier: Tier) {
    this.tierIndex = this._tierService.tiers.indexOf(tier);
    this.tierModal = true;
  }

  cpu(degradation) {
    return this.degradation(DegradationCPU, degradation);
  }

  disk(degradation) {
    return this.degradation(DegradationDisk, degradation);
  }

  memory(degradation) {
    return this.degradation(DegradationMemory, degradation);
  }

  cache(degradation) {
    return this.degradation(DegradationCache, degradation);
  }

  size(size) {
    for (const cap of Capacity.sizes) {
      if (cap.capacity === size) {
        return cap.name;
      }
    }
  }

  degradation(DegradationEnum, degradation: number) {
    if (degradation === DegradationEnum.Absent) {
      return 'Absent';
    } else if (degradation === DegradationEnum.Low) {
      return 'Low';
    } else if (degradation === DegradationEnum.Moderate) {
      return 'Moderate';
    } else if (degradation === DegradationEnum.High) {
      return 'High';
    }
  }

  ngOnInit() {}
}
