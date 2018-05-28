"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require(".//app-routing.module");
var nowplaying_component_1 = require("./nowplaying.component");
var contact_component_1 = require("./contact.component");
var price_component_1 = require("./price.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var carousel_1 = require("ngx-bootstrap/carousel");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var buy_step1_component_1 = require("./buy-step1/buy-step1.component");
var buy_step2_component_1 = require("./buy-step2/buy-step2.component");
var buy_step3_component_1 = require("./buy-step3/buy-step3.component");
var buy_success_component_1 = require("./buy-success/buy-success.component");
var user_login_component_1 = require("./user-login/user-login.component");
var user_registration_component_1 = require("./user-registration/user-registration.component");
var header_component_1 = require("./header/header.component");
var admin_component_1 = require("./admin/admin.component");
var profile_component_1 = require("./profile/profile.component");
var client_component_1 = require("./client/client.component");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var panel_login_component_1 = require("./admin/panel-login/panel-login.component");
var home_panel_component_1 = require("./admin/home-panel/home-panel.component");
var movies_component_1 = require("./admin/movies/movies.component");
var movie_details_component_1 = require("./admin/Movies/movie-details/movie-details.component");
var edit_movie_component_1 = require("./admin/Movies/edit-movie/edit-movie.component");
var seances_component_1 = require("./admin/seances/seances.component");
var reservations_component_1 = require("./admin/reservations/reservations.component");
var reservation_details_component_1 = require("./admin/reservation-details/reservation-details.component");
var seance_details_component_1 = require("./admin/Seances/seance-details/seance-details.component");
var edit_seance_component_1 = require("./admin/Seances/edit-seance/edit-seance.component");
var admin_header_component_1 = require("./admin/header/admin-header.component");
var authentication_service_1 = require("./shared/authentication.service");
var auth_guard_service_1 = require("./shared/auth-guard.service");
var common_1 = require("@angular/common");
var seance_service_1 = require("./shared/seance.service");
var timepicker_1 = require("ngx-bootstrap/timepicker");
var auth_guard_admin_service_1 = require("./admin/services/auth-guard-admin.service");
var reservation_service_1 = require("./shared/reservation.service");
var buy_component_1 = require("./buy/buy.component");
var dialog_component_1 = require("./buy-step3/dialog/dialog.component");
var buy_step_0_component_1 = require("./buy-step-0/buy-step-0.component");
var booking_seats_service_1 = require("./shared/booking-seats.service");
var step1_guard_service_1 = require("./shared/step1-guard.service");
var regulations_component_1 = require("./regulations/regulations.component");
var buy_resolver_service_1 = require("./buy/buy-resolver.service");
var order_container_component_1 = require("./order-container/order-container.component");
var buy_process_service_1 = require("./shared/buy-process.service");
var header_opacity_service_1 = require("./shared/header-opacity.service");
var actual_component_resolver_service_1 = require("./shared/actual-component-resolver.service");
var user_api_service_1 = require("./shared/user-api.service");
var user_registration_service_1 = require("./shared/user-registration.service");
var block_after_login_service_1 = require("./shared/block-after-login.service");
var description_dialog_component_1 = require("./description-dialog/description-dialog.component");
var filter_movies_pipe_1 = require("./shared/pipes/filter-movies.pipe");
var movie_ratings_component_1 = require("./movie-ratings/movie-ratings.component");
var rating_dialog_component_1 = require("./movie-ratings/rating-dialog/rating-dialog.component");
var ratings_service_1 = require("./shared/ratings.service");
var filter_rating_pipe_pipe_1 = require("./shared/pipes/filter-rating-pipe.pipe");
var confirm_email_component_1 = require("./confirm-email/confirm-email.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                buy_component_1.BuyComponent,
                app_component_1.AppComponent,
                profile_component_1.ProfileComponent,
                nowplaying_component_1.NowPlayingComponent,
                contact_component_1.ContactComponent,
                price_component_1.PriceComponent,
                dashboard_component_1.DashboardComponent,
                buy_step1_component_1.BuyStep1Component,
                buy_step2_component_1.BuyStep2Component,
                buy_step3_component_1.BuyStep3Component,
                buy_success_component_1.BuySuccessComponent,
                user_login_component_1.UserLoginComponent,
                user_registration_component_1.UserRegistrationComponent,
                header_component_1.HeaderComponent,
                admin_component_1.AdminComponent,
                client_component_1.ClientComponent,
                panel_login_component_1.PanelLoginComponent,
                home_panel_component_1.HomePanelComponent,
                movies_component_1.MoviesComponent,
                movie_details_component_1.MovieDetailsComponent,
                edit_movie_component_1.EditMovieComponent,
                seances_component_1.SeancesComponent,
                reservations_component_1.ReservationsComponent,
                reservation_details_component_1.ReservationDetailsComponent,
                seance_details_component_1.SeanceDetailsComponent,
                edit_seance_component_1.EditSeanceComponent,
                admin_header_component_1.AdminHeaderComponent,
                dialog_component_1.DialogComponent,
                buy_step_0_component_1.BuyStep0Component,
                regulations_component_1.RegulationsComponent,
                order_container_component_1.OrderContainerComponent,
                description_dialog_component_1.DescriptionDialogComponent,
                filter_movies_pipe_1.FilterMoviesPipe,
                movie_ratings_component_1.MovieRatingsComponent,
                rating_dialog_component_1.RatingDialogComponent,
                filter_rating_pipe_pipe_1.FilterRatingPipePipe,
                confirm_email_component_1.ConfirmEmailComponent,
                forgot_password_component_1.ForgotPasswordComponent
            ],
            imports: [
                common_1.CommonModule,
                dropdown_1.BsDropdownModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                ngx_bootstrap_1.AlertModule.forRoot(),
                ngx_bootstrap_1.BsDatepickerModule.forRoot(),
                timepicker_1.TimepickerModule.forRoot(),
                platform_browser_1.BrowserModule,
                http_2.HttpClientModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatStepperModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatDividerModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
            ],
            entryComponents: [
                dialog_component_1.DialogComponent, regulations_component_1.RegulationsComponent, description_dialog_component_1.DescriptionDialogComponent, rating_dialog_component_1.RatingDialogComponent
            ],
            providers: [authentication_service_1.AuthenticationService, auth_guard_service_1.AuthGuard, common_1.DatePipe, seance_service_1.SeanceService, auth_guard_admin_service_1.AuthGuardAdmin, reservation_service_1.ReservationService,
                booking_seats_service_1.BookingSeatsService, step1_guard_service_1.Step1GuardService, buy_resolver_service_1.BuyResolverService, buy_process_service_1.BuyProcessService, header_opacity_service_1.HeaderOpacityService, actual_component_resolver_service_1.ActualComponentResolverService,
                user_api_service_1.UserApiService, user_registration_service_1.UserRegistrationService, block_after_login_service_1.BlockAfterLoginService, ratings_service_1.RatingsService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map