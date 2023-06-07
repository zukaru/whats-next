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


      this.afAuth.user.subscribe(
        v => v !== null ? this.route.navigateByUrl('/hoods') : false
      )


  }

  signInSuccess(event: FirebaseUISignInSuccessWithAuthResult) {
    this.route.navigateByUrl('/hoods')
    const userID = event.authResult.user.uid;
    this.persist.setPersist(this.persist.USER_ID, userID);
    this.db.testAFS()

    .subscribe(
      (v) => {
        this.db.taskList = v.map(
          v => {
            let id = v.key;
            let obj = v.payload.val();
            return {id: id, ...obj as Object}

          }
        )
        this.db.hasTasks = v.length > 0;
        if (this.db.hasTasks) {
          this.db.hasTasksObs$.next(true);
        }

      }
    )
  }

}
