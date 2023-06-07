import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-overview-card',
  templateUrl: './task-overview-card.component.html',
  styleUrls: ['./task-overview-card.component.scss']
})
export class TaskOverviewCardComponent implements OnInit {
  @Input() email = `Task description will go here. You can make the description as detailed or brief as necessary. 🎉🎉🎉`;
  @Input() uid = 'random string here'
  @Input() exhaust: number;
  @Input() lights: number;

  constructor( ) { }

  ngOnInit(): void {  }

}
