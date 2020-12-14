import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFormModalComponent } from './status-form-modal.component';

describe('StatusFormModalComponent', () => {
  let component: StatusFormModalComponent;
  let fixture: ComponentFixture<StatusFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
