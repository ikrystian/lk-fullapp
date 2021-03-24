import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatsComponent } from './components/profile/stats/stats.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { InterceptorService } from './loader/interceptor.service';
import { AuthHeaderInterceptor } from './shared/auth-header.interceptor';
import { NavigationModule } from './shared/navigation/navigation.module';
import { NgPipesModule } from 'ngx-pipes';
import * as Hammer from 'hammerjs';
import {
  HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG
}
  from '@angular/platform-browser';
import { appInitializer } from './_helpers/app.initializer';
import { JwtService } from './shared/jwt.service';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: Hammer.DIRECTION_ALL},
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    NavigationModule,
    NgPipesModule,
    HammerModule,
    MatDatepickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],

  providers: [
    MatDatepickerModule,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [JwtService] },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
