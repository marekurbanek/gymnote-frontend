import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutsComponent } from './workouts/workouts.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  { path: './', component: WorkoutsComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: './', pathMatch: 'full' },
  { path: '**', redirectTo: './', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
