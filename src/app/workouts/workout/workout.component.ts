import { Component, Input, OnInit, Inject } from '@angular/core';
import { WorkoutsService } from '../../workouts.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  newExerciseName: string;
}

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @Input() workout: WorkoutNode;
  displayedColumns: string[] = ['id', 'repetitions', 'weight'];
  newExerciseName: string;

  constructor(private workoutsService: WorkoutsService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.workout);
  }

  addExercise(name: string): void {
    this.workoutsService.addExercise(name, this.workout.id).subscribe();
  }

  showAddExercise(): void {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      width: '250px',
      data: {newExerciseName: this.newExerciseName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addExercise(result);
      }
    });
  }
}

@Component({
  selector: 'app-add-exercise-component',
  template: `
  <h1 mat-dialog-title>Add new exercise</h1>
  <div mat-dialog-content>
    <p>Enter new exercise name</p>
    <mat-form-field>
      <input matInput [(ngModel)]="newExerciseName">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="newExerciseName" cdkFocusInitial>Add</button>
  </div>
  `,
})
export class AddExerciseComponent {

  constructor(
    public dialogRef: MatDialogRef<AddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
