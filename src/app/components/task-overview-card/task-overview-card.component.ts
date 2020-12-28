import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-overview-card',
  templateUrl: './task-overview-card.component.html',
  styleUrls: ['./task-overview-card.component.scss']
})
export class TaskOverviewCardComponent implements OnInit {
  @Input() description = `Task description will go here. You can make the description as detailed or brief as necessary. 🎉🎉🎉`;
  @Input() dateCreated = '11/14/20';
  @Input() deadline = '12/4/20';
  @Input() price = '175.00';
  @Input() fName = 'Joe';
  @Input() lName = 'Shmoe';
  @Input() phone = '(555) 555-5555';
  @Input() status = '✔️ Complete';
  @Input() whoIs: string;

  constructor( ) { }

  ngOnInit(): void {  }
  
}
