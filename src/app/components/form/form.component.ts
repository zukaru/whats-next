import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { TaskModel } from '../../models/task-model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

    
  }


  taskFormSubmit(e) {
    console.log(e)
  }

}
