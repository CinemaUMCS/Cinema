import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {NowPlayingComponent} from './nowplaying.component';
import {ContactComponent} from './contact.component';
import {PriceComponent} from './price.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BuyStep1Component} from './buy-step1/buy-step1.component';
import {BuyStep2Component} from './buy-step2/buy-step2.component';
import {BuyStep3Component} from './buy-step3/buy-step3.component';
import {BuySuccessComponent} from './buy-success/buy-success.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {UserService} from './user.service';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {ClientComponent} from './client/client.component';
import {PanelLoginComponent} from './admin/panel-login/panel-login.component';
import {HomePanelComponent} from './admin/home-panel/home-panel.component';
import {MoviesComponent} from './admin/movies/movies.component';
import {MovieDetailsComponent} from './admin/Movies/movie-details/movie-details.component';
import {EditMovieComponent} from './admin/Movies/edit-movie/edit-movie.component';
import {ReservationsComponent} from './admin/reservations/reservations.component';
import {ReservationDetailsComponent} from './admin/reservation-details/reservation-details.component';
import {SeancesComponent} from './admin/seances/seances.component';
import {SeanceDetailsComponent} from './admin/Seances/seance-details/seance-details.component';
import {EditSeanceComponent} from './admin/Seances/edit-seance/edit-seance.component';
import {AuthGuard} from './shared/auth-guard.service';
import {AuthGuardAdmin} from './admin/services/auth-guard-admin.service';
import {BuyComponent} from './buy/buy.component';
import {BuyStep0Component} from './buy-step-0/buy-step-0.component';
import {Step1GuardService} from './shared/step1-guard.service';
import {RegulationsComponent} from './regulations/regulations.component';
import {BuyResolverService} from './buy/buy-resolver.service';
import {ActualComponentResolverService} from './shared/actual-component-resolver.service';
import {BlockAfterLoginService} from './shared/block-after-login.service';
import {MovieRatingsComponent} from './movie-ratings/movie-ratings.component';
import {ConfirmEmailComponent} from './confirm-email/confirm-email.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {path: 'account/validate_token/:id/:token', component: ConfirmEmailComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: '', component: DashboardComponent},
      {path: 'nowplaying', component: NowPlayingComponent},
      {path: 'pricelist', component: PriceComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'ratings', component: MovieRatingsComponent, canActivate: [AuthGuard]},
      {
        path: 'buy/:seanceId', component: BuyComponent, resolve: {
          data: BuyResolverService
        }, children: [
          {path: 'step2', component: BuyStep2Component},
          {path: 'step1', component: BuyStep3Component, canActivate: [Step1GuardService]},
          {path: 'step0', component: BuyStep0Component},
          // {path: 'step3', component: BuyStep1Component},
        ], canActivate: [AuthGuard]

      },
      // {path: 'buy/:seanceId/step2', component: BuyStep2Component},
      {path: 'login', component: UserLoginComponent, canActivate: [BlockAfterLoginService]},
      {path: 'register', component: UserRegistrationComponent, canActivate: [BlockAfterLoginService]},
      {path: 'user.service', component: UserService},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'login', component: PanelLoginComponent},
      {
        path: 'panel', component: HomePanelComponent, children: [
          {path: 'filmy', component: MoviesComponent},
          {path: 'filmy/dodaj', component: EditMovieComponent},
          {path: 'filmy/edycja/:id', component: EditMovieComponent},
          {path: 'filmy/:id', component: MovieDetailsComponent},
          {path: 'rezerwacje', component: ReservationsComponent},
          {path: 'filmy/:id/seanse', component: SeancesComponent},
          {path: 'filmy/:id/seanse/nowy', component: EditSeanceComponent},
          {path: 'filmy/:id/seanse/edytuj/:id', component: EditSeanceComponent},
          {path: 'filmy/:id/seanse/:id', component: SeanceDetailsComponent},
        ]
      },

    ]
  },
  {
    path: '**', redirectTo: '/'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
