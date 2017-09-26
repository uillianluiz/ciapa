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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    TierCardComponent,
    TiersComponent
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
