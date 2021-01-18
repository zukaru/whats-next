import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import {  debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search: ElementRef;

  @Output() query = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.search.nativeElement, 'keyup')
     .pipe(
       map(e => (<HTMLInputElement>e.target).value),
       debounceTime(500)
     )
    .subscribe(
      data => this.query.emit(data)
    );
  }
  


}
