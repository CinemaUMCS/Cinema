"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nowplaying_component_1 = require("./nowplaying.component");
var contact_component_1 = require("./contact.component");
var price_component_1 = require("./price.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var buy_step2_component_1 = require("./buy-step2/buy-step2.component");
var buy_step3_component_1 = require("./buy-step3/buy-step3.component");
var user_login_component_1 = require("./user-login/user-login.component");
var user_registration_component_1 = require("./user-registration/user-registration.component");
var user_service_1 = require("./user.service");
var profile_component_1 = require("./profile/profile.component");
var admin_component_1 = require("./admin/admin.component");
var client_component_1 = require("./client/client.component");
var panel_login_component_1 = require("./admin/panel-login/panel-login.component");
var home_panel_component_1 = require("./admin/home-panel/home-panel.component");
var movies_component_1 = require("./admin/movies/movies.component");
var movie_details_component_1 = require("./admin/Movies/movie-details/movie-details.component");
var edit_movie_component_1 = require("./admin/Movies/edit-movie/edit-movie.component");
var reservations_component_1 = require("./admin/reservations/reservations.component");
var seances_component_1 = require("./admin/seances/seances.component");
var seance_details_component_1 = require("./admin/Seances/seance-details/seance-details.component");
var edit_seance_component_1 = require("./admin/Seances/edit-seance/edit-seance.component");
var auth_guard_service_1 = require("./shared/auth-guard.service");
var buy_component_1 = require("./buy/buy.component");
var buy_step_0_component_1 = require("./buy-step-0/buy-step-0.component");
var step1_guard_service_1 = require("./shared/step1-guard.service");
var buy_resolver_service_1 = require("./buy/buy-resolver.service");
var block_after_login_service_1 = require("./shared/block-after-login.service");
var movie_ratings_component_1 = require("./movie-ratings/movie-ratings.component");
var confirm_email_component_1 = require("./confirm-email/confirm-email.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var routes = [
    {
        path: '', component: client_component_1.ClientComponent, children: [
            { path: 'account/validate_token/:id/:token', component: confirm_email_component_1.ConfirmEmailComponent },
            { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent },
            { path: '', component: dashboard_component_1.DashboardComponent },
            { path: 'nowplaying', component: nowplaying_component_1.NowPlayingComponent },
            { path: 'pricelist', component: price_component_1.PriceComponent },
            { path: 'contact', component: contact_component_1.ContactComponent },
            { path: 'ratings', component: movie_ratings_component_1.MovieRatingsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            {
                path: 'buy/:seanceId', component: buy_component_1.BuyComponent, resolve: {
                    data: buy_resolver_service_1.BuyResolverService
                }, children: [
                    { path: 'step2', component: buy_step2_component_1.BuyStep2Component },
                    { path: 'step1', component: buy_step3_component_1.BuyStep3Component, canActivate: [step1_guard_service_1.Step1GuardService] },
                    { path: 'step0', component: buy_step_0_component_1.BuyStep0Component },
                ], canActivate: [auth_guard_service_1.AuthGuard]
            },
            // {path: 'buy/:seanceId/step2', component: BuyStep2Component},
            { path: 'login', component: user_login_component_1.UserLoginComponent, canActivate: [block_after_login_service_1.BlockAfterLoginService] },
            { path: 'register', component: user_registration_component_1.UserRegistrationComponent, canActivate: [block_after_login_service_1.BlockAfterLoginService] },
            { path: 'user.service', component: user_service_1.UserService },
            { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_service_1.AuthGuard] }
        ]
    },
    {
        path: 'admin', component: admin_component_1.AdminComponent, children: [
            { path: 'login', component: panel_login_component_1.PanelLoginComponent },
            {
                path: 'panel', component: home_panel_component_1.HomePanelComponent, children: [
                    { path: 'filmy', component: movies_component_1.MoviesComponent },
                    { path: 'filmy/dodaj', component: edit_movie_component_1.EditMovieComponent },
                    { path: 'filmy/edycja/:id', component: edit_movie_component_1.EditMovieComponent },
                    { path: 'filmy/:id', component: movie_details_component_1.MovieDetailsComponent },
                    { path: 'rezerwacje', component: reservations_component_1.ReservationsComponent },
                    { path: 'filmy/:id/seanse', component: seances_component_1.SeancesComponent },
                    { path: 'filmy/:id/seanse/nowy', component: edit_seance_component_1.EditSeanceComponent },
                    { path: 'filmy/:id/seanse/edytuj/:id', component: edit_seance_component_1.EditSeanceComponent },
                    { path: 'filmy/:id/seanse/:id', component: seance_details_component_1.SeanceDetailsComponent },
                ]
            },
        ]
    },
    {
        path: '**', redirectTo: '/'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes),
                router_1.RouterModule.forRoot(routes, { useHash: true })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map