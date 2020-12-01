import { Route } from '@angular/compiler/src/core';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-task-details-menu',
  templateUrl: './task-details-menu.component.html',
  styleUrls: ['./task-details-menu.component.scss']
})
export class TaskDetailsMenuComponent implements OnInit, OnDestroy {
  toggleMenuObs = fromEvent(window, 'scroll');
  toggleMenuSub: Subscription;
  isOpen = false;
  @Input() docID: string;

  constructor(
    private afs: AngularFirestore,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.toggleMenuSub = this.toggleMenuObs
    .pipe(throttleTime(1000))
    .subscribe(() => {
      this.isOpen = false;
    });
    
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

}
