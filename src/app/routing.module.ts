import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TiersComponent } from './tiers/tiers.component';
import { PlacementComponent } from './placement/placement.component';
import { PmsComponent } from './pms/pms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tiers',
    pathMatch: 'full'
  },
  { path: 'tiers', component: TiersComponent },
  { path: 'pms', component: PmsComponent },
  { path: 'placement', component: PlacementComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
