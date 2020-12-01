import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {
  fetchEntrySub: Subscription;
  

  constructor(
    public db: DatabaseService
  ) { }

  ngOnInit(): void {




if(!this.db.taskList) { 
    this.fetchEntrySub = this.db.fetchEntries()
      .pipe(
        map(actions => actions.map(a => a.payload.doc))
      )
      .subscribe(
        (res) => {
          console.log(res)
          this.db.hasTasks = res.length > 0;
          this.db.taskList = res.map(
            (d) => {
              const id = d.id;
              let task = d.data();
              task.docID = id;
              console.log(task);
              return task;
            }
          )
        }
      )
  }
}

  calcAmtDue(price: string, payments: string[]) {
    
    let totalPayments = Number(this.db.getTotalPayments(payments));  
    
    console.log(price)

      if (( !price || price === '0')) {

      return 'Not Listed';

    } else if(  (Number(price) - Number(totalPayments) === 0)) {

      return 'Paid In Full';

    } else {

      return `${Number(price) - totalPayments}`;
      
    }
    
  }

}
