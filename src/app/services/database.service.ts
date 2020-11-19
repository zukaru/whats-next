import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userId: string

  taskList = [];
  activeEntryId: string;
  temporaryEntry: any;

  constructor(
    private afs: AngularFirestore
  ) { }


   fetchEntries() {
    return this.afs.collection('tasks')
      .get()
  }

  // where('userId', '==', this.userId)


  getEntry(entryId: string) {
    return this.taskList.find((el) => el.id === entryId);
  }

  deleteEntry(entryId: string): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).delete()
  }



  updateEntry(entryId: string, data: unknown): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).set(data)
  }
}
