import {
  Component,
  OnInit,
  Input,
  Injectable,
  Output,
  EventEmitter
} from '@angular/core';
import {
  DegradationCPU,
  DegradationMemory,
  DegradationAffinity,
  DegradationCache,
  DegradationDisk
} from '../../ciapa/datatype/Degradation';
import { Tier } from '../../ciapa/datatype/Tier';
import { TiersService } from '../../services/tiers.service';

@Component({
  selector: 'app-tier-card',
  templateUrl: './tier-card.component.html',
  styleUrls: ['./tier-card.component.scss']
})
@Injectable()
export class TierCardComponent implements OnInit {
  @Input('tierId') tierId: number;
  @Output() tierIdChange: EventEmitter<number> = new EventEmitter<number>();

  public _deleteTierModal = false;

  constructor(private _tiersService: TiersService) {}

  ngOnInit() {}

  get tier(): Tier {
    return this._tiersService.tiers[this.tierId];
  }

  get tiers(): Tier[] {
    return this._tiersService.tiers;
  }

  get DegradationCPU() {
    return DegradationCPU;
  }

  get DegradationMemory() {
    return DegradationMemory;
  }

  get DegradationCache() {
    return DegradationCache;
  }

  get DegradationDisk() {
    return DegradationDisk;
  }
  get DegradationAffinity() {
    return DegradationAffinity;
  }

  addAffinityHandler(): void {
    this._tiersService.addAffinity(this.tierId);
  }

  deleteTierHandler(): void {
    this.tierIdChange.emit(-1);
    this._tiersService.tiers.splice(this.tierId, 1);
  }
}
