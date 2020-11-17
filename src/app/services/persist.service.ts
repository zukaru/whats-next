import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersistService {
  userId: string

  journalEntryList = [];
  activeEntryId: string;
  temporaryEntry: any;

  constructor(
    private afs: AngularFirestore
  ) { }


  // fetchEntries() {
  //   return this.afs.collection('entries', ref => ref.where('userId', '==', this.db.userId))
  //     .get()
  // }


  getEntry(entryId: string) {
    return this.journalEntryList.find((el) => el.id === entryId);
  }

  deleteEntry(entryId: string): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).delete()
  }


  updateEntry(entryId: string, data: unknown): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).set(data)
  }





  
  setPersist(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getPersist(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  clearPersist(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error deleting from localStorage', e);
    }
  }

  
}
