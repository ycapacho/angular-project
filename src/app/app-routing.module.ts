import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'signin',
  component: SigninComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
