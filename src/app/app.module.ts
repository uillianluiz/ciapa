import { AffinityComponent } from './tiers/tier-card/affinity/affinity.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CapacityComponent } from './tiers/tier-card/capacity/capacity.component';
import { ClarityModule } from 'clarity-angular';
import { ContentComponent } from './content/content.component';
import { DndModule } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { InterferenceComponent } from './tiers/tier-card/interference/interference.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { TierCardComponent } from './tiers/tier-card/tier-card.component';
import { TiersComponent } from './tiers/tiers.component';
import { TiersService } from './services/tiers.service';

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
    FormsModule,
    BrowserAnimationsModule,
    DndModule.forRoot()
  ],
  providers: [TiersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
