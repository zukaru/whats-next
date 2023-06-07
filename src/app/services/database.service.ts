import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskModel } from '../models/task-model';
import { TaskUpdate } from '../models/task-update';
import { PersistService } from './persist.service';
import { Message } from '../models/message';
import { HoodControl } from '../models/hood-control-model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // Path for querying users
  USER_ID = 'userID';

  //  Used for UI features to determine if there are Tasks
  hasTasks: boolean | undefined = undefined;

  hasTasksObs$ = new BehaviorSubject<boolean | undefined>(undefined);

  taskListObs$: Observable<[TaskModel]>


  taskList = [];
  activeEntryId: string;
  temporaryEntry: any;

  constructor(
    private afs: AngularFirestore,
    private rtdb: AngularFireDatabase,
    private persist: PersistService
  ) { }



  testAFS() {
    return this.rtdb.list<SnapshotAction<HoodControl[]>>("users").snapshotChanges()
  }

   fetchTasks() {
    return this.afs.collection<TaskModel>('tasks', ref => ref
    .where(this.USER_ID, '==', this.persist.getPersist(this.persist.USER_ID))
    //Query last index of taskUpdates array status does not equal 'hide'
    )
    .snapshotChanges()
  }

  getIndexByID(id: string) {
    return this.taskList.findIndex(el => el.id === id);
  }


  getTaskByID(id: string): TaskModel {
    return this.taskList.find(task => {
      return task.docID === id;
    });
  }


  getTotalPayments(payments: TaskUpdate[]): number {
    return payments.reduce((acc: number, taskUpdate) => {
      return acc + Number(taskUpdate.payment || 0);
    }, 0)
  }

  // Possible return values
  // Number with a type of string
  // 'Paid In Full'
  // 'Not Listed'
  calcAmtDue(price: string, payments): string {

    let totalPayments = Number(this.getTotalPayments(payments));

      if (( !price )) {

      return 'Not Listed';

    } else if(  (Number(price) - Number(totalPayments) <= 0)) {

      // return 'Paid In Full';
      return `${Number(price) - totalPayments}`;

    } else {

      return `${Number(price) - totalPayments}`;

    }

  }

  updateField(name: string, field: string, id: string) {
    let newInfo = prompt(`Please update the ${name}`);

    if(!newInfo) {
      return
    }

    this.afs.doc(`tasks/${id}`)
    .update({[field]: `${newInfo}`})
    .then((v) => {
      alert(`Successfully updated ${name}.`)
    })
  }

}
