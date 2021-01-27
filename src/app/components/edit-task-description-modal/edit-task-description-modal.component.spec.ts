import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskDescriptionModalComponent } from './edit-task-description-modal.component';

describe('EditTaskDescriptionModalComponent', () => {
  let component: EditTaskDescriptionModalComponent;
  let fixture: ComponentFixture<EditTaskDescriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskDescriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
