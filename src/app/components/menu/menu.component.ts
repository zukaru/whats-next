import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public af: AngularFireAuth,
    private route: Router,
    private persist: PersistService
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.af.signOut()
      .then(
        () => {
          this.route.navigateByUrl('');
          this.persist.clearPersist(this.persist.USER_ID)
          alert("You have logged out.");
            
        }
      )
  }

}
