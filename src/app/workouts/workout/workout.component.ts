import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
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
  @Output() dataChanged = new EventEmitter<boolean>();
  displayedColumns: string[] = ['id', 'repetitions', 'weight'];
  newExerciseName: string;
  currentWorkout: WorkoutNode;
  showingNewSet: number;
  showingEdit: number;
  repetitions: number;
  weight: number;

  constructor(private workoutsService: WorkoutsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.currentWorkout = this.workout;
  }

  addExercise(name: string): void {
    this.workoutsService.addExercise(name, this.workout.id).subscribe(() => {
      this.getNewData();
    });
  }

  getNewData(): void {
    this.dataChanged.emit(true);
  }

  toggleNewSet(exId: number): void {
    if (exId === this.showingNewSet) {
      this.showingNewSet = null;
    } else {
      this.showingNewSet = exId;
    }
  }

  toggleEdit(exId: number): void {
    if (exId === this.showingEdit) {
      this.showingEdit = null;
    } else {
      this.showingEdit = exId;
    }
  }

  saveNewSet(exId: number): void {
    this.workoutsService.addSet(this.weight, this.repetitions, exId).subscribe(() => {
      this.getNewData();
    });
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

  removeWorkout(wId: number) {
    this.workoutsService.removeWorkout(wId).subscribe(() => {
      this.getNewData();
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
  newExerciseName: string;
  constructor(
    public dialogRef: MatDialogRef<AddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
