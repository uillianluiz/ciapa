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
import { SettingsComponent } from './placement/settings/settings.component';
import { ResultsComponent } from './placement/results/results.component';
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './placement/results/charts/charts.component';
import { PmsComponent } from './pms/pms.component';
import { PmsService } from './services/pms.service';
import { PmCardComponent } from './pms/pm-card/pm-card.component';
import { EmptyListComponent } from './shared/empty-list/empty-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TierCardComponent,
    TiersComponent,
    InterferenceComponent,
    CapacityComponent,
    AffinityComponent,
    PlacementComponent,
    SettingsComponent,
    ResultsComponent,
    ChartsComponent,
    PmsComponent,
    PmCardComponent,
    EmptyListComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    ClarityModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added,
    ChartsModule
  ],
  providers: [TiersService, PlacementService, PmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
