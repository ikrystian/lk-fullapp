import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './shared/auth-header.interceptor';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { TrainingComponent } from './components/profile/training/training.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './loader/interceptor.service';
import { EditTrainingComponent } from './components/profile/edit-training/edit-training.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    CalendarComponent,
    DashboardComponent,
    TrainingComponent,
    EditTrainingComponent,
    ToolbarComponent
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
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
