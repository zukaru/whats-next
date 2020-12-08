import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  uiShown = false;
  constructor(
    public route: Router,
    public afAuth: AngularFireAuth,
    private persist: PersistService,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.afAuth.user
    .subscribe(
      v => v !== null ? this.route.navigateByUrl('/task-overview') : false
    )
  }

  signInSuccess(event: FirebaseUISignInSuccessWithAuthResult) {
    this.route.navigateByUrl('/task-overview');
    const userID = event.authResult.user.uid;
    this.persist.setPersist(this.persist.USER_ID, userID);

    this.db.fetchEntries()
      .pipe(
        map(actions => actions.map(a => a.payload.doc))
      )
      .subscribe(
        (res) => {
          this.db.hasTasks = res.length > 0;
          this.db.taskList = res.map(
            (d) => {
              const id = d.id;
              let task = d.data();
              task.docID = id;
              return task;
            }
          )
        }
      )
  }

}
