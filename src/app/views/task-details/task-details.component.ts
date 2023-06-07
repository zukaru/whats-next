import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task-model';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  isopen = false;
  taskDetails: TaskModel;
  id: string;
  taskIndex: number;
  amountDue: string;
  hasTaskObSub: Subscription;
  totalPayments: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    public db: DatabaseService,
    private afs: AngularFirestore,
    private cs: CloudStorageService,
    private rtdb: AngularFireDatabase
  ) { }

  ngOnInit(): void {


    // Synchronously get doc ID from params
    this.activatedRoute.params
    .subscribe(v => this.id = v.docID);

    // Asynchronously get notified when
    // taskList array is populated in Database Service
    // and update index of current task detail
    this.hasTaskObSub = this.db.hasTasksObs$
    .subscribe(
      v =>  {

        if(v !== true) {
          return
        }
        let index = this.db.getIndexByID(this.id).toString();
        console.log(index)

        this.taskIndex = Number(index);
        console.log(this.db.taskList[this.taskIndex]);
      }
    )

  }

  ngOnDestroy() {
    this.hasTaskObSub.unsubscribe();
    this.cs.files = [];
  }

  closeModal() {
    this.isopen = false;
  }

  // updateField(name: string, field: string, id: string) {
  //   let newInfo = prompt(`Please update the ${name}`);

  //   if(!newInfo) {
  //     return
  //   }

  //   this.afs.doc(`tasks/${id}`)
  //   .update({[field]: `${newInfo}`})
  //   .then((v) => {
  //     alert(`Successfully updated ${name}.`)
  //   })
  // }

  deleteStatusUpdate(docID: string, index: number, length) {
    // get task document
    // remove selected update from statusUpdate array
    //
    let confirmDelete = false;
    confirmDelete = confirm(`You're about to delete status update NO. ${index + 1} `);

    if (!confirmDelete || length <= 1) {
      return
    }
    let statusUpdates = this.db.getTaskByID(docID).statusUpdates;
    statusUpdates.splice(index, 1);


    this.afs.doc(`tasks/${this.id}`)
    .update({statusUpdates})
    .then(() => {
      alert('Successfully deleted status!')
    })
  }

  editDescription(e, id: string) {
    this.afs.doc(`tasks/${id}`)
    .update({description: `${e.task_description}`})
    .then((v) => {
      alert(`Successfully updated Task Description.`)
    })
  }

  updateDeviceStatus(device: string, status: number) {
    let newStatus = status === 0 ? 1 : 0;
    this.rtdb.database.ref(`users/${this.id}`)
    .update({[device]: newStatus})
    .then(v => alert(`Updated ${device} successfully`))

  }

}
