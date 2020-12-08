import { Target } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ValueProvider, ViewChild, EventEmitter } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { debounce, debounceTime, map } from 'rxjs/operators';

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
    )
  }
  


}
