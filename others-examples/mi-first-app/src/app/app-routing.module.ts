import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  /* { path: '', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent } 
  */
 {
   path: 'home',
   component: HomePageComponent,
   //canActivate: [AuthTokenAdminGuardGuard],
   title: 'home',
  },
  {
    path: 'landing',
    component: LandingPageComponent,
    //canActivate: [AuthTokenAdminGuardGuard],
    title: 'Landing',
  },
  {
    path: 'landing2',
    component: LandingPageComponent,
    //canActivate: [AuthTokenAdminGuardGuard],
    title: 'Landing',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
