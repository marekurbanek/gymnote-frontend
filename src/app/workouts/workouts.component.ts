import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WorkoutsService } from '../workouts.service';

export interface DialogData {
  newWorkoutName: string;
}

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {
  panelOpenState = false;
  workouts: WorkoutNode[];
  newWorkoutName = '';
  openedWorkoutIndex: any;

  constructor(public dialog: MatDialog, private workoutService: WorkoutsService) {
  }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getWorkoutData().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  openAddWorkout(): void {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
      width: '250px',
      data: {name: this.newWorkoutName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workoutService.addWorkout(result).subscribe(() => {
          this.getWorkouts();
        });
      }
    });
  }

  setOpenedWorkout(id: number) {
    this.openedWorkoutIndex = id;
  }
}

@Component({
  selector: 'app-overview-example-dialog',
  template: `
  <h1 mat-dialog-title>Enter workout title</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <input matInput name="newWorkoutName" [(ngModel)]="newWorkoutName" placeholder="Workout name" >
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="newWorkoutName" cdkFocusInitial>Ok</button>
  </div>
  `,
})
export class AddWorkoutComponent {

  constructor(
    public dialogRef: MatDialogRef<AddWorkoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
