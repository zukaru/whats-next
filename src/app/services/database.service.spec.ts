import { DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import mockFirebase from 'mock-firebase-ts';
import { from, Observable, of, scheduled } from 'rxjs';
import { environment } from 'src/environments/environment';
import { task1, task2, taskList } from '../mock-data/tasks.mock';
import { firebase } from '../../__mocks__/firebase'

import { DatabaseService } from './database.service';
import { PersistService } from './persist.service';
import { TaskModel } from '../models/task-model';

type DocumentChangeAction = (val: TaskModel) => TaskModel;

fdescribe('DatabaseService', () => {
  let service: DatabaseService;
  let spy: jasmine.Spy;
  let de: DebugElement;

  const mockChangeAction: DocumentChangeAction = (val: TaskModel): TaskModel => val;

  

  beforeEach(async(() => {



  


    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      providers: [
        AngularFirestore,
        PersistService
      ]
    });


      service = TestBed.inject(DatabaseService);

      spyOn(service, 'fetchTasks');
      

      

    
    
    
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchTasks should have been called', () => {
    let taskList: TaskModel[];

    let fetchTask = service.fetchTasks();
    

    expect(service.fetchTasks).toHaveBeenCalled();


  })
});
