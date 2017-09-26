import { Component, OnInit, Input } from '@angular/core';
import { TiersService } from '../../../services/tiers.service';
import { Tier } from '../../../util/datatype/Tier';
import { AffinityElement, Affinity } from '../../../util/datatype/Affinity';

@Component({
  selector: 'app-affinity',
  templateUrl: './affinity.component.html',
  styleUrls: ['./affinity.component.scss']
})
export class AffinityComponent implements OnInit {

  @Input('degradation') degradation: any;
  @Input('affinity') affinity: Affinity;
  @Input('tierId') tierId: number;
  constructor(private _tiersService: TiersService) { }

  ngOnInit() {
  }

  get tiers(): Tier[] {
    return this._tiersService.tiers;
  }

  removeAffinityHandler(index: number): void {
    this.affinity.affinities.splice(index, 1);
  }

}
