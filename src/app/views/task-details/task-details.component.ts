import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/models/task-model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  isopen = false;
  taskDetails: TaskModel;
  docID: string;
  taskIndex: string;
  amountDue: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public db: DatabaseService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {




    this.activatedRoute.params
      .subscribe( v =>  {this.taskIndex = v.docID; console.log(this.taskIndex)})

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

  closeModal(v) {
    this.isopen = false;
  }

  updateField(name: string, field: string, id: string) {
    let newInfo = prompt(`Please update the ${name}`);

    if(!newInfo) {
      return
    }

    this.afs.doc(`tasks/${id}`)
    .update({[field]: `${newInfo}`})
    .then((v) => {
      alert(`Successfully updated ${name}.`)
    })


  }

  deleteStatusUpdate(docID: string, index: number, length) {
    // get task document
    // remove selected update from statusUpdate array
    // 
    let confirmDelete = false;
    console.log(length)
    confirmDelete = confirm(`You're about to delete status update NO. ${index + 1} `);

    if (!confirmDelete || length <= 1) {
      return
    }
    let statusUpdates = this.db.getTaskByID(docID).statusUpdates;
    statusUpdates.splice(index, 1);


    this.afs.doc(`tasks/${docID}`)
    .update({statusUpdates})
    .then(() => {
      alert('Successfully deleted status!')
    })
  }

}
