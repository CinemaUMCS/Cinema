import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NowPlayingComponent } from './nowplaying.component';
import { ContactComponent } from './contact.component';
import { PriceComponent } from './price.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyStep1Component } from './buy-step1/buy-step1.component';
import { BuyStep2Component } from './buy-step2/buy-step2.component';
import { BuyStep3Component } from './buy-step3/buy-step3.component';
import { BuySuccessComponent } from './buy-success/buy-success.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nowplaying', component: NowPlayingComponent },
  { path: 'pricelist', component: PriceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'buy', component: BuyStep1Component },
  { path: 'buy-next', component: BuyStep2Component },
  { path: 'buy-last', component: BuyStep3Component },
  { path: 'buy-success', component: BuySuccessComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
