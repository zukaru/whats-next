import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {
  fetchEntrySub: Subscription;
  sortedTaskList: TaskModel[];
  queriedTaskList: TaskModel[] | undefined;
  hideSortedTaskList = false;
  querying = false;
  

  constructor(
    public db: DatabaseService
  ) { }

  searchTasks(query: string) {
    if (query === '') {
      this.hideSortedTaskList = false;
      this.queriedTaskList = undefined;
      return
    }
    this.hideSortedTaskList = true;
    this.querying = true;

    this.queriedTaskList = this.db.taskList
    .filter (
      (el) => {
       return el.fName.toLowerCase().includes(query.toLowerCase())  ||
       el.lName.toLowerCase().includes(query.toLowerCase())  ||
       el.phoneNums[0].includes(query) || 
       el.description.toLowerCase().includes(query.toLowerCase());
      }
    )
    
    this.querying = false;
  }

  ngOnInit(): void {
    this.db.hasTasksObs$
    .subscribe((v) => {
      if(v) {
        this.sortedTaskList = [...this.db.taskList];
        this.sortedTaskList.sort((a,b) => {
          let dateA = new Date(a.dateCreated as string).getTime();
          let dateB = new Date(b.dateCreated as string).getTime();
          return dateB - dateA;
        })  
      }
      
    })
  }



}
