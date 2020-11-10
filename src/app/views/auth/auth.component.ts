import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

  signInSuccess(e: FirebaseUISignInSuccessWithAuthResult) {
    this.route.navigateByUrl('/task-overview');
  }

}
