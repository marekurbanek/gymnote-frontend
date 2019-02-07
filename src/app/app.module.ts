import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WorkoutsComponent, AddWorkoutComponent } from './workouts/workouts.component';

import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WorkoutComponent, AddExerciseComponent } from './workouts/workout/workout.component';
import { LoginComponent } from './authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './token.interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    WorkoutComponent,
    AddWorkoutComponent,
    AddExerciseComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents: [AddWorkoutComponent, AddExerciseComponent],
  providers: [HttpClientModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
