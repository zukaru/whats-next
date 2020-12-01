import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsMenuComponent } from './task-details-menu.component';

describe('TaskDetailsMenuComponent', () => {
  let component: TaskDetailsMenuComponent;
  let fixture: ComponentFixture<TaskDetailsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
