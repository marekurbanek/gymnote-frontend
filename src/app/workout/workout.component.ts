import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @Input() workout: WorkoutNode[];
  displayedColumns: string[] = ['id', 'repetitions', 'weight'];
  constructor() { }

  ngOnInit() {
    console.log(this.workout)
  }

}
