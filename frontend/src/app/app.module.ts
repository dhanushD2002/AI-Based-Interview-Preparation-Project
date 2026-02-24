import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* AUTH */
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

/* COMMON COMPONENTS */
import { NavbarComponent } from './components/navbar/navbar.component';

/* PAGES */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillInterviewComponent } from './components/skill-interview/skill-interview.component';
import { ResumeInterviewComponent } from './components/resume-interview/resume-interview.component';

/* HOME / ABOUT / CONTACT */
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,

    /* Auth */
    LoginComponent,
    SignupComponent,

    /* Common */
    NavbarComponent,

    /* Pages */
    DashboardComponent,
    SkillInterviewComponent,
    ResumeInterviewComponent,

    /* Public pages */
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
