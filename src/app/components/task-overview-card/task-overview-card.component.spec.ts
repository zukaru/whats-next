import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOverviewCardComponent } from './task-overview-card.component';

describe('TaskOverviewCardComponent', () => {
  let component: TaskOverviewCardComponent;
  let fixture: ComponentFixture<TaskOverviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskOverviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
