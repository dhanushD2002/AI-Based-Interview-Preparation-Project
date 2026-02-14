import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillInterviewComponent } from './components/skill-interview/skill-interview.component';
import { ResumeInterviewComponent } from './components/resume-interview/resume-interview.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  /* 🔥 DEFAULT = HOME */
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  /* PUBLIC */
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  /* AUTH */
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  /* PROTECTED */
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'skills',
    component: SkillInterviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resume',
    component: ResumeInterviewComponent,
    canActivate: [AuthGuard]
  },

  /* FALLBACK */
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
