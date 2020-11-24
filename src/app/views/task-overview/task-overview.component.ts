import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit, OnDestroy {
  fetchEntrySub: Subscription;
  hasTasks = false;

  constructor(
    public db: DatabaseService,
    private persist: PersistService,
  ) { }

  ngOnInit(): void {

    window.scrollTo(0, 0);

    if(this.persist.getPersist(this.persist.USER_ID)) {
      this.fetchEntrySub = this.db.fetchEntries()
      .subscribe(
        (res) => {
          this.hasTasks = res.empty;
          this.db.taskList = res.docs.map(
            (d) => {
              const id = d.id as string;
              let task = d.data() as TaskModel;
              task.docID = id;
              console.log(task);
              return task;
            });
        }

      );
      
    }


  }


  ngOnDestroy(): void {
    this.fetchEntrySub.unsubscribe();

  }

  calcAmtDue(price: string, payments: string[]) {
    
    let totalPayments = Number(this.db.getTotalPayments(payments));    

    return price === '' ? `Not Listed` : `${Number(price) - totalPayments}`;
  }

}
