import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  taskDetails: TaskModel;
  docID: string;
  taskIndex: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public db: DatabaseService,
    private persist: PersistService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {




    this.activatedRoute.params
      .subscribe( v =>  this.taskIndex = v.docID )

    // this.activatedRoute.params.pipe(
    //   concatMap(
    //     (v) => {
    //       this.docID = v.docID;
    //       return this.afs.doc(`tasks/${v.docID}`).snapshotChanges()
    //     }
    //   )
    // )
    // .subscribe( v =>  this.taskDetails = v.payload.data() as TaskModel )
  }

  ngOnDestroy() {
  }

  updateField(name: string, field: string, id: string) {
    let newInfo = prompt(`Please update the ${name}`);

    if(!newInfo) {
      return;
    }

    this.afs.doc(`tasks/${id}`)
    .update({[field]: `${newInfo}`})
    .then((v) => {
      this.taskDetails[field] = newInfo;
      console.log(v)
    })


  }

}
