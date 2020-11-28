import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  taskDetails: TaskModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService,
    private persist: PersistService
  ) { }

  ngOnInit(): void {

   if(this.persist.getPersist('TASK_DOC')) {
     this.taskDetails = this.persist.getPersist('TASK_DOC');
   } else {
    this.activatedRoute.url.subscribe(
      (v) => {
        this.taskDetails = this.db.getTaskByID(v[1].path)[0];
        this.persist.setPersist('TASK_DOC', this.taskDetails);
      }
    )
   }
  }

  ngOnDestroy() {
    this.persist.clearPersist('TASK_DOC');
  }

}
