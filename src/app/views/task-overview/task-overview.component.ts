import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  showNoTaskMsg = false;
  

  constructor(
    public db: DatabaseService,
    public route: Router
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
        //Concats first and last names to query them together
       return (
        `${el.fName} ${el.lName}`.toLowerCase().includes(query.toLowerCase())  ||
        `${el.lName} ${el.fName}`.toLowerCase().includes(query.toLowerCase())  ||
        el.phoneNums.includes(query) || 
        el.description.toLowerCase().includes(query.toLowerCase())
       )
      }
    )
    
    this.querying = false;
  }

  ngOnInit(): void {
    console.log(this.route.url)
    // if(this.route.url === '/task-overview') 
      this.db.hasTasksObs$
      .subscribe((v) => {
        if(v) {
          if(this.route.url === '/task-overview') {
            this.sortedTaskList = [...this.db.taskList];
            this.sortedTaskList = this.sortedTaskList.filter(task => {
              if (task.hideTask === false) {
                return task;
              }  
            })
          this.sortedTaskList.sort((a,b) => {
            let dateA = new Date(a.dateCreated as string).getTime();
            let dateB = new Date(b.dateCreated as string).getTime();
            return dateB - dateA;
          }) 
          }
          if(this.route.url === '/hidden-tasks') {
            this.sortedTaskList = [...this.db.taskList];
            this.sortedTaskList.sort((a,b) => {
              let dateA = new Date(a.dateCreated as string).getTime();
              let dateB = new Date(b.dateCreated as string).getTime();
              return dateB - dateA;
            }) 
          }
          
          this.showNoTaskMsg = false;
        } 

        if(v === false) {
          this.showNoTaskMsg = true;
        }
        
      })

    
  }



}
