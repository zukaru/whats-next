import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagesModalComponent } from './add-images-modal.component';

describe('AddImagesModalComponent', () => {
  let component: AddImagesModalComponent;
  let fixture: ComponentFixture<AddImagesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImagesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
