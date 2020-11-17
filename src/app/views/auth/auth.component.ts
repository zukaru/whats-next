import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public route: Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.user
    .subscribe(
      v => v !== null ? this.route.navigate(['/task-overview']) : false
    )
  }

  signInSuccess(e: FirebaseUISignInSuccessWithAuthResult) {
    this.route.navigateByUrl('/task-overview');
  }

}
