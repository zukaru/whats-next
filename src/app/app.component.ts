import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, timeoutWith } from 'rxjs/operators';
import { DatabaseService } from './services/database.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'whats-next';

  constructor(
    private afs: AngularFirestore,
    private db: DatabaseService,
    private taskService: TaskService,
    private router: Router
  ) {

  }

  ngOnInit() {

    if(this.db.taskList === undefined && this.router.url !== '') { 
      this.db.fetchEntries()
        .pipe(
          map(actions => actions.map(a => a.payload.doc))
        )
        .subscribe(
          (res) => {
            this.db.hasTasks = res.length > 0;
            this.db.taskList = res.map(
              (d) => {
                const id = d.id;
                let task = d.data();
                task.docID = id;
                return task;
              }
            )
          }
        )
    }

  }
}
