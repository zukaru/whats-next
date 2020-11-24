import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TaskModel } from '../models/task-model';
import { PersistService } from './persist.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  taskList: TaskModel[] ;
  activeEntryId: string;
  temporaryEntry: any;

  constructor(
    private afs: AngularFirestore,
    private persist: PersistService
  ) { }


   fetchEntries() {
    return this.afs.collection('tasks', ref => ref.where('userID', '==', this.persist.getPersist(this.persist.USER_ID)))
      .get()
  }

  // where('userId', '==', this.userId)

  getTotalPayments(payments: string[]) {
    return payments.reduce((acc, val) => {
      return acc + Number(val);
    }, 0)
  }


  getEntry(entryId: string) {
    return this.taskList.find((el) => el.userID === entryId);
  }

  deleteEntry(entryId: string): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).delete()
  }



  updateEntry(entryId: string, data: unknown): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).set(data)
  }
}
