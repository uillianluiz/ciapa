import { AffinityComponent } from './tiers/tier-card/affinity/affinity.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CapacityComponent } from './tiers/tier-card/capacity/capacity.component';
import { ClarityModule } from 'clarity-angular';
import { DndModule } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { InterferenceComponent } from './tiers/tier-card/interference/interference.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PlacementComponent } from './placement/placement.component';
import { PlacementService } from './services/placement.service';
import { RoutingModule } from './routing.module';
import { TierCardComponent } from './tiers/tier-card/tier-card.component';
import { TiersComponent } from './tiers/tiers.component';
import { TiersService } from './services/tiers.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TierCardComponent,
    TiersComponent,
    InterferenceComponent,
    CapacityComponent,
    AffinityComponent,
    PlacementComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    ClarityModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [TiersService, PlacementService],
  bootstrap: [AppComponent]
})
export class AppModule {}
