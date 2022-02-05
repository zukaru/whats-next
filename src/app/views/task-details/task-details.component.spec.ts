import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ɵROUTER_PROVIDERS } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EditTaskDescriptionModalComponent } from 'src/app/components/edit-task-description-modal/edit-task-description-modal.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { StatusFormModalComponent } from 'src/app/components/status-form-modal/status-form-modal.component';
import { TaskDetailsMenuComponent } from 'src/app/components/task-details-menu/task-details-menu.component';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';
import { DatabaseService } from 'src/app/services/database.service';

import { TaskDetailsComponent } from './task-details.component';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TaskDetailsComponent,
        SpinnerComponent,
        HeaderComponent,
        StatusFormModalComponent,
        EditTaskDescriptionModalComponent,
        TaskDetailsMenuComponent

        
      ],
      providers: [
        ActivatedRoute,
        DatabaseService,
        AngularFirestore,
        CloudStorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
