import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'whats-next';

  constructor(
    private db: DatabaseService,
    private route: Router
  ) { }

  ngOnInit() {

    console.dir(this.db.taskList)

    // Fetch tasks (data respresenting to-do tasks) from database
    // If the task list array is empty and it's not the base URL
    if(this.db.taskList && this.route.url !== '') {
      this.db.testAFS()
      .subscribe(
        (v) => {
          this.db.taskList = v.map(
            v => {
              let id = v.key;
              let obj = v.payload.val();
              return {id: id, ...obj as Object}

            }
          )
          console.log(this.db.taskList)

        console.dir(this.db.taskList)
          this.db.hasTasks = v.length > 0;
          if (this.db.taskList !== undefined) {
            this.db.hasTasksObs$.next(true);
          }

        }
      )
    }

  }
}
