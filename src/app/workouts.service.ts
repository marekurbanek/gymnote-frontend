import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  private workoutsUrl = 'http://localhost:5000/workouts';

  constructor(private http: HttpClient) { }

  addWorkout(workoutName: string): Observable<{}> {
    return this.http.post(this.workoutsUrl, {name: workoutName})
      .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return of(err.error.errorMessage);
  }
}
