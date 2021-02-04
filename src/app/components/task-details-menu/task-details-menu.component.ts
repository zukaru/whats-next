import { Route } from '@angular/compiler/src/core';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { concatMap, throttleTime } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-task-details-menu',
  templateUrl: './task-details-menu.component.html',
  styleUrls: ['./task-details-menu.component.scss']
})
export class TaskDetailsMenuComponent implements OnInit, OnDestroy {
  docID: string;
  toggleMenuObs = fromEvent(window, 'scroll');
  toggleMenuSub: Subscription;
  isOpen = false;
  closeStatusModal = false;

  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {

    this.toggleMenuSub = this.toggleMenuObs
    .pipe(throttleTime(1000))
    .subscribe(() => {
      this.isOpen = false;
    });

    this.activatedRoute.params
    .subscribe((v)=> {
      this.docID = v.docID;
    })
    
  }

  ngOnDestroy() {
    this.toggleMenuSub.unsubscribe();
  }

  closeMenu() {
    this.isOpen = false;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  edit() {
    
  }

  delete(id: string) {
    let confirm = prompt('You are about to delete a task. If you wish to continue, please type DELETE in uppercase.')
    if(confirm !== 'DELETE') {
      return
    }
    this.afs.doc(`tasks/${id}`)
    .delete()
    .then(
      () => {
        window.history.back();
      }
    )
  }

  hideTask(docID: string) {
    let conf = confirm('Are you sure you want to hide this task?');
    if (!conf) { return }
    this.afs.doc(`tasks/${docID}`)
    .update({hideTask: true})
    .then(() => {
      alert('Task hidden successfully');
      history.back();
    })
  }

  addUpdate(event, docID: string) {

    event.date = new Date().toLocaleDateString()
    let updatedDoc = [...this.db.getTaskByID(docID).statusUpdates, event];
    this.afs.doc(`tasks/${docID}`)
    .update({statusUpdates : updatedDoc})
    .then(() => {
      this.closeStatusModal = false;
      this.toggleMenu();
    })
  }

}
