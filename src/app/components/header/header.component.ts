import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    public location: Location,
    public route: Router
  ) { 
  }

  ngOnInit(): void {
  }

  previousRoute() {
    window.history.back();
  }

}
