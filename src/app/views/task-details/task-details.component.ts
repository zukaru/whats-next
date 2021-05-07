import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  hasTaskObSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public db: DatabaseService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {


    // Synchronously get doc ID from params
    this.activatedRoute.params
    .subscribe(v => this.docID = v.docID);

    // Asynchronously get notified when
    // taskList array is populated in Database Service
    // and update index of current task detail
    this.hasTaskObSub = this.db.hasTasksObs$
    .subscribe(
      v =>  {
        
        if(v !== true) {
          return
        }
        let index = this.db.getIndexByID(this.docID).toString();
        if(index === '-1') {
          history.back()
        }
        
        this.taskIndex = index;
        console.log(this.db.taskList[this.taskIndex]);
      }
    )

  }

  ngOnDestroy() {
    this.hasTaskObSub.unsubscribe();
  }

  closeModal() {
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

  editDescription(e, id: string) {
    this.afs.doc(`tasks/${id}`)
    .update({description: `${e.task_description}`})
    .then((v) => {
      alert(`Successfully updated Task Description.`)
    })
  }

}
