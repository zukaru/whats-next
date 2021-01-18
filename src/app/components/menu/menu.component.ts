import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  menuOpen = false;

  

  

  constructor(
    public af: AngularFireAuth,
    private route: Router,
    private db: DatabaseService,
    private persist: PersistService,
    private renderer: Renderer2,
    @Inject (DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    

  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.document.body, 'overflow')
    this.renderer.removeStyle(this.document.body, 'height')
  }

  toggleMenu() {
    if(!this.menuOpen) {
      this.menuOpen = true;
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden')
      this.renderer.setStyle(this.document.body, 'height', '100%')
      
    } else {
      this.menuOpen = false;
      this.renderer.removeStyle(this.document.body, 'overflow')
      this.renderer.removeStyle(this.document.body, 'height')
    }
  }


  signOut() {
    this.af.signOut()
      .then(
        () => {
          this.route.navigateByUrl('');
          this.persist.clearPersist(this.persist.USER_ID)
          this.db.taskList = undefined;
        }
      )
      .catch(() => alert("Something went wrong. Try to log out again."))
  }

}
