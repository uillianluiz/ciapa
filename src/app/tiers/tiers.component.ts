import { Component, OnInit } from '@angular/core';
import { Tier } from '../util/datatype/Tier';
import { Affinity, AffinityElement } from '../util/datatype/Affinity';
import { Capacity } from '../util/datatype/Capacity';
import { Interference } from '../util/datatype/Interference';
import {
  DegradationCPU,
  DegradationMemory,
  DegradationAffinity,
  DegradationCache,
  DegradationDisk
} from '../util/datatype/Degradation';
import { TiersService } from '../services/tiers.service';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.scss']
})
export class TiersComponent implements OnInit {
  constructor(private _tierService: TiersService) {}

  get tiers(): Tier[] {
    return this._tierService.tiers;
  }

  ngOnInit() {}
}
