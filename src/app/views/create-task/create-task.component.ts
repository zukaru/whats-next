import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/guards/dirty-form.guard';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, CanComponentDeactivate {
  childFormDirty = false;

  constructor(
    public route: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  isChildFormDirty(bool: boolean) {
    this.childFormDirty = bool;
  }

  canDeactivate() {
    if(this.childFormDirty) {
      return confirm('You have unsaved form data. If you navigate away, the data will be lost. Are you sure you want to leave?');
    } else {
      return true;
    }
  }

}
