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
