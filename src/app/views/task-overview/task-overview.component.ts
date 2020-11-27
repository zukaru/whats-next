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
export class TaskOverviewComponent implements OnInit, OnDestroy {
  fetchEntrySub: Subscription;
  

  constructor(
    public db: DatabaseService,
    private persist: PersistService,
  ) { }

  ngOnInit(): void {

    window.scrollTo(0, 0);



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
    

    // if (this.db.taskList) {

    // } else if(this.persist.getPersist(this.persist.USER_ID)) {
    //   this.fetchEntrySub = this.db.fetchEntries()
      
    // .subscribe(
    //   (res) => {
    //     this.hasTasks = res.empty;
    //     this.db.taskList = res.docs.map(
    //       (d) => {
    //         const id = d.id as string;
    //         let task = d.data() as TaskModel;
    //         task.docID = id;
    //         console.log(task);
    //         return task;
    //       });
    //   }

    // );
      
    // } 


  }


  ngOnDestroy(): void {
    


  }

  calcAmtDue(price: string, payments: string[]) {
    
    let totalPayments = Number(this.db.getTotalPayments(payments));    

    return (price === '' || price === '0') ? '' : `${Number(price) - totalPayments}`;
  }

}




// .subscribe(
//   (res) => {
//     this.hasTasks = res.empty;
//     this.db.taskList = res.docs.map(
//       (d) => {
//         const id = d.id as string;
//         let task = d.data() as TaskModel;
//         task.docID = id;
//         console.log(task);
//         return task;
//       });
//   }

// );
