import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  queriedTaskList: TaskModel[];
  querying = false;

  constructor(
    public db: DatabaseService
  ) { }

  ngOnInit(): void {
  }


  searchTasks(query: string) {
    if (query === '') {
      this.queriedTaskList = [];
      return
    }
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

}
