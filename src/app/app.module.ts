import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { TierCardComponent } from './tiers/tier-card/tier-card.component';
import { TiersComponent } from './tiers/tiers.component';
import { TiersService } from './services/tiers.service';
import { InterferenceComponent } from './tiers/tier-card/interference/interference.component';
import { CapacityComponent } from './tiers/tier-card/capacity/capacity.component';
import { AffinityComponent } from './tiers/tier-card/affinity/affinity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    TierCardComponent,
    TiersComponent,
    InterferenceComponent,
    CapacityComponent,
    AffinityComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    FormsModule
  ],
  providers: [TiersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
