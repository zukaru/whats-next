import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit, OnDestroy {
  fetchEntrySub: Subscription

  constructor(
    public db: DatabaseService,
    private persist: PersistService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    if(this.persist.getPersist('USER_ID')) {
      this.fetchEntrySub = this.db.fetchEntries()
      .subscribe(
        (res) => {
          this.db.taskList = res.docs.map(
            (d) => {
              let obj = {task: d.data(), id: d.id};
              console.log(obj);
              return obj;
              
            });
        }

      );
      
    }


  }


  ngOnDestroy(): void {
    this.fetchEntrySub.unsubscribe();

  }

}
