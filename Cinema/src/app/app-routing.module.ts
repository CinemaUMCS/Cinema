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
import { PanelLoginComponent } from './admin/panel-login/panel-login.component';
import { HomePanelComponent } from './admin/home-panel/home-panel.component';
import { MoviesComponent } from './admin/movies/movies.component';
import { MovieDetailsComponent } from './admin/Movies/movie-details/movie-details.component';
import { EditMovieComponent } from './admin/Movies/edit-movie/edit-movie.component';
import { ReservationsComponent } from './admin/reservations/reservations.component';
import { ReservationDetailsComponent } from './admin/reservation-details/reservation-details.component';
import { SeancesComponent } from './admin/seances/seances.component';
import { SeanceDetailsComponent } from './admin/Seances/seance-details/seance-details.component';
import { EditSeanceComponent } from './admin/Seances/edit-seance/edit-seance.component';
import {AuthGuard} from './shared/auth-guard.service';
import {AuthGuardAdmin} from './admin/services/auth-guard-admin.service';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'nowplaying', component: NowPlayingComponent},
      {path: 'pricelist', component: PriceComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'buy', component: BuyStep1Component},
      {path: 'buy-next', component: BuyStep2Component},
      {path: 'buy-last', component: BuyStep3Component},
      {path: 'buy-success', component: BuySuccessComponent},
      {path: 'login', component: UserLoginComponent},
      {path: 'register', component: UserRegistrationComponent},
      {path: 'user.service', component: UserService},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: 'admin', component: AdminComponent, children: [
    {path: 'login', component: PanelLoginComponent },
    {path: 'panel', component: HomePanelComponent, children: [
      {path: 'filmy', component: MoviesComponent },
      {path: 'filmy/dodaj', component: EditMovieComponent },
      {path: 'filmy/edycja/:id', component: EditMovieComponent },
      {path: 'filmy/:id', component: MovieDetailsComponent },
      {path: 'rezerwacje', component: ReservationsComponent },
      {path: 'filmy/:id/seanse', component: SeancesComponent },
      {path: 'filmy/:id/seanse/nowy', component: EditSeanceComponent },
      {path: 'filmy/:id/seanse/edytuj/:id', component: EditSeanceComponent },
      {path: 'filmy/:id/seanse/:id', component: SeanceDetailsComponent },
    ] },

  ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
