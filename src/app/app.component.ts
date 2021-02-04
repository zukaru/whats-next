import { createOfflineCompileUrlResolver } from '@angular/compiler';
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
    private router: Router
  ) {

  }

  ngOnInit() {


    // Fetch tasks (data respresenting to-do tasks) from database
    // If the task list array is empty and it's not the base URL
    if(this.db.taskList === undefined && this.router.url !== '') { 
      this.db.fetchEntries()
        .pipe(
          // Extracts data from response
          map(actions => actions.map(a => a.payload.doc))
        )
        .subscribe(
          (res) => {

            // Assigns an array of Tasks to taskList property of DataService
            this.db.taskList = res.map(
              (d) => {
                const id = d.id;
                let task = d.data();
                // const amountDue = this.db.calcAmtDue(task.price, task.statusUpdates);

                // task.amountDue = amountDue;

                task.docID = id;
                console.log(task.dateCreated)
                return task;
              }
            )

            // Assigns boolean to hasTasks property of DataService for UI features
            this.db.hasTasks = res.length > 0;

            // Emits true to subscribers of hasTasksObs$ (BehaviourSubject) property of DataService
            if(this.db.taskList !== undefined) {
              this.db.hasTasksObs$.next(true);
            }
          }
        )
    }

  }
}
