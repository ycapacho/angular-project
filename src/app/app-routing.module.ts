import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { HomeComponent } from './components/home/home.component';
import { PartiesComponent } from './components/parties/parties.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SigninComponent } from './components/signin/signin.component';
import { StationsComponent } from './components/stations/stations.component';
import { UsersComponent } from './components/users/users.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuardService],
  children: [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'parties',
      component: PartiesComponent
    },
    {
      path: 'candidates',
      component: CandidatesComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'reports',
      component: ReportsComponent
    },
    {
      path: 'stations',
      component: StationsComponent
    }
  ]
}, {
  path: 'signin',
  component: SigninComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
