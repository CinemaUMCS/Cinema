import {BrowserModule} from '@angular/platform-browser';
import {AlertModule, BsDatepickerModule} from 'ngx-bootstrap';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';

import {NowPlayingComponent} from './nowplaying.component';
import {ContactComponent} from './contact.component';
import {PriceComponent} from './price.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BuyStep1Component} from './buy-step1/buy-step1.component';
import {BuyStep2Component} from './buy-step2/buy-step2.component';
import {BuyStep3Component} from './buy-step3/buy-step3.component';
import {BuySuccessComponent} from './buy-success/buy-success.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {HeaderComponent} from './header/header.component';
import {AdminComponent} from './admin/admin.component';
import {ProfileComponent} from './profile/profile.component';
import {ClientComponent} from './client/client.component';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule, MatHorizontalStepper,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {PanelLoginComponent} from './admin/panel-login/panel-login.component';
import {HomePanelComponent} from './admin/home-panel/home-panel.component';
import {MoviesComponent} from './admin/movies/movies.component';
import {MovieDetailsComponent} from './admin/Movies/movie-details/movie-details.component';
import {EditMovieComponent} from './admin/Movies/edit-movie/edit-movie.component';
import {SeancesComponent} from './admin/seances/seances.component';
import {ReservationsComponent} from './admin/reservations/reservations.component';
import {ReservationDetailsComponent} from './admin/reservation-details/reservation-details.component';
import {SeanceDetailsComponent} from './admin/Seances/seance-details/seance-details.component';
import {EditSeanceComponent} from './admin/Seances/edit-seance/edit-seance.component';
import {AdminHeaderComponent} from './admin/header/admin-header.component';
import {DummyServiceComponent} from './services/dummy-service/dummy-service.component';
import {AuthenticationService} from './shared/authentication.service';
import {AuthGuard} from './shared/auth-guard.service';
import {CommonModule, DatePipe} from '@angular/common';
import {SeanceService} from './shared/seance.service';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {AuthGuardAdmin} from './admin/services/auth-guard-admin.service';
import {ReservationService} from './shared/reservation.service';
import {BuyComponent} from './buy/buy.component';
import {DialogComponent} from './buy-step3/dialog/dialog.component';
import {BuyStep0Component} from './buy-step-0/buy-step-0.component';
import {BookingSeatsService} from './shared/booking-seats.service';
import {Step1GuardService} from './shared/step1-guard.service';
import {RegulationsComponent} from './regulations/regulations.component';
import {BuyResolverService} from './buy/buy-resolver.service';
import {OrderContainerComponent} from './order-container/order-container.component';
import {BuyProcessService} from './shared/buy-process.service';
import {HeaderOpacityService} from './shared/header-opacity.service';
import {ActualComponentResolverService} from './shared/actual-component-resolver.service';
import {UserApiService} from './shared/user-api.service';
import {UserRegistrationService} from './shared/user-registration.service';
import {BlockAfterLoginService} from './shared/block-after-login.service';
import { DescriptionDialogComponent } from './description-dialog/description-dialog.component';
import { FilterMoviesPipe } from './shared/pipes/filter-movies.pipe';
import { MovieRatingsComponent } from './movie-ratings/movie-ratings.component';
import { RatingDialogComponent } from './movie-ratings/rating-dialog/rating-dialog.component';
import {RatingsService} from './shared/ratings.service';
import {FilterRatingPipePipe} from './shared/pipes/filter-rating-pipe.pipe';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    BuyComponent,
    AppComponent,
    ProfileComponent,
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
    HeaderComponent,
    AdminComponent,
    ClientComponent,
    PanelLoginComponent,
    HomePanelComponent,
    MoviesComponent,
    MovieDetailsComponent,
    EditMovieComponent,
    SeancesComponent,
    ReservationsComponent,
    ReservationDetailsComponent,
    SeanceDetailsComponent,
    EditSeanceComponent,
    AdminHeaderComponent,
    DialogComponent,
    BuyStep0Component,
    RegulationsComponent,
    OrderContainerComponent,
    DescriptionDialogComponent,
    FilterMoviesPipe,
    MovieRatingsComponent,
    RatingDialogComponent,
    FilterRatingPipePipe,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  entryComponents: [
    DialogComponent, RegulationsComponent,DescriptionDialogComponent,RatingDialogComponent
  ],
  providers: [AuthenticationService, AuthGuard, DatePipe, SeanceService, AuthGuardAdmin, ReservationService,
    BookingSeatsService, Step1GuardService, BuyResolverService, BuyProcessService, HeaderOpacityService, ActualComponentResolverService,
    UserApiService, UserRegistrationService, BlockAfterLoginService,RatingsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
