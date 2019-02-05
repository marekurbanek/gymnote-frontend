import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WorkoutsService } from '../workouts.service';

const WORKOUT_DATA: WorkoutNode[] = [
  {
    id: 1,
    name: 'Workout 1',
    date: '22.01.2019',
    exercises: [
      {
        id: 1,
        workoutId: 1,
        name: 'Bench Press',
        sets: [
          {
            id: 1,
            exerciseId: 1,
            repetitions: 12,
            weight: 20
          },
          {
            id: 2,
            exerciseId: 1,
            repetitions: 10,
            weight: 20
          },
          {
            id: 3,
            exerciseId: 1,
            repetitions: 8,
            weight: 20
          }
        ]
      },
      {

        id: 2,
        workoutId: 1,
        name: 'Pull Ups',
        sets: [
          {
            id: 4,
            exerciseId: 2,
            repetitions: 12,
            weight: 20
          },
          {
            id: 5,
            exerciseId: 2,
            repetitions: 13,
            weight: 20
          },
          {
            id: 6,
            exerciseId: 2,
            repetitions: 15,
            weight: 20
          }
        ]
      },
    ]
  },
  {
    id: 2,
    name: 'Workout 2',
    date: '01.02.2019',
    exercises: [
      {
        id: 3,
        workoutId: 2,
        name: 'Lateral Press',
        sets: [
          {
            id: 7,
            exerciseId: 3,
            repetitions: 22,
            weight: 20
          },
          {
            id: 8,
            exerciseId: 3,
            repetitions: 15,
            weight: 20
          },
          {
            id: 9,
            exerciseId: 3,
            repetitions: 20,
            weight: 20
          }
        ]
      },
      {

        id: 4,
        workoutId: 1,
        name: 'ABS workout',
        sets: [
          {
            id: 10,
            exerciseId: 4,
            repetitions: 8,
            weight: 20
          },
          {
            id: 11,
            exerciseId: 4,
            repetitions: 5,
            weight: 20
          },
          {
            id: 12,
            exerciseId: 4,
            repetitions: 3,
            weight: 20
          }
        ]
      },
    ]
  }
];

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
  openedWorkoutIndex: number;

  constructor(public dialog: MatDialog, private workoutService: WorkoutsService) {
    // this.workouts = WORKOUT_DATA;
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
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.workoutService.addWorkout(result).subscribe();
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
