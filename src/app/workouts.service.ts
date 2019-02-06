import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  private workoutsUrl = 'http://localhost:5000/workouts';
  private exercisesUrl = 'http://localhost:5000/exercises';
  private setsUrl = 'http://localhost:5000/sets';

  constructor(private http: HttpClient) { }

  getWorkoutData(): Observable<WorkoutNode[]> {
    return this.http.get(this.workoutsUrl)
      .pipe(catchError(this.handleError));
  }

  addWorkout(workoutName: string): Observable<{}> {
    return this.http.post(this.workoutsUrl, {name: workoutName})
      .pipe(catchError(this.handleError));
  }

  addExercise(name: string, workoutId: number): Observable<{}> {
    return this.http.post(this.exercisesUrl, {name, workoutId})
      .pipe(catchError(this.handleError));
  }

  addSet(weight: number, repetitions: number, exerciseId: number): Observable<{}> {
    return this.http.post(this.setsUrl, {weight, repetitions, exerciseId})
      .pipe(catchError(this.handleError));
  }

  removeWorkout(workoutId: number): Observable<{}> {
    return this.http.delete(`${this.workoutsUrl}/${workoutId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return of(err.error.errorMessage);
  }
}
