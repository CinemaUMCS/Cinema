import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { NowPlayingComponent } from './nowplaying.component';
import { ContactComponent } from './contact.component';
import { PriceComponent } from './price.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BuyStep1Component } from './buy-step1/buy-step1.component';
import { BuyStep2Component } from './buy-step2/buy-step2.component';
import { BuyStep3Component } from './buy-step3/buy-step3.component';
import { BuySuccessComponent } from './buy-success/buy-success.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NowPlayingComponent,
    ContactComponent,
    PriceComponent,
    DashboardComponent,
    BuyStep1Component,
    BuyStep2Component,
    BuyStep3Component,
    BuySuccessComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    HeaderComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
