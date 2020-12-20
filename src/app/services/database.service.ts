import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TaskModel } from '../models/task-model';
import { PersistService } from './persist.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //  Used for UI features to determine if there are Tasks
  hasTasks: boolean | undefined = undefined;


  taskList: TaskModel[] ;
  activeEntryId: string;
  temporaryEntry: any;

  constructor(
    private afs: AngularFirestore,
    private persist: PersistService
  ) { }


   fetchEntries() {
    return this.afs.collection<TaskModel>('tasks', ref => ref
    .where('userID', '==', this.persist.getPersist(this.persist.USER_ID)))
    .snapshotChanges()
  }

  getIndexByID(id: string) {
    return this.taskList.findIndex(el => el.docID === id);
  }


  getTaskByID(id: string): TaskModel {
    return this.taskList.find(el => {
      return el.docID === id;
    });
  }


  getTotalPayments(payments) {
    return payments.reduce((acc, val) => {
      return acc + Number(val.payment || 0);
    }, 0)
  }


  calcAmtDue(price: string, payments) {
    
    let totalPayments = Number(this.getTotalPayments(payments));  

      if (( !price || price === '0')) {

      return 'Not Listed';

    } else if(  (Number(price) - Number(totalPayments) === 0)) {

      return 'Paid In Full';

    } else {

      return `${Number(price) - totalPayments}`;
      
    }
    
  }

}
