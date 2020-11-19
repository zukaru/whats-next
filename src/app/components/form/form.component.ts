import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';
import { TaskModel } from '../../models/task-model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  taskSubmitted = false;
  
  constructor(
    private afs: AngularFirestore,
    private db: DatabaseService,
    private persist: PersistService,
    private route: Router
  ) { }

  ngOnInit(): void {

    
  }


  taskFormSubmit(f: NgForm) {
    

    const task = {
      userId: this.persist.getPersist('USER_ID'),
      fName: f.value.fName,
      lName: f.value.lName,
      phoneNums: f.value.phoneNums,
      taskDesc: f.value.task_description,
      status: f.value.status,
      price: f.value.price,
      deadline: f.value.due_date,
      whois: f.value.whois,

      entryId: '',
      }
      if ( this.persist.getPersist('USER_ID') ){
          this.afs.collection('tasks')
        .add(task)
        .then((docRef) => {
          let addTaskId = {...task};
          addTaskId.entryId = docRef.id;
          f.reset();
        })
        .then(() => {
          this.taskSubmitted = true;
          setTimeout(() => {
            this.taskSubmitted = false;
          }, 4000)
        } )
        .catch(() => alert('Something went wrong, try again.'))
    } else {
      let redirect = confirm("You're not signed in. You must be signed in to submit a journal entry. Do you want to be redirected to sign in or sign up?");
      if (redirect) {
        this.persist.setPersist('TEMP_ENTRY', {...task});
        this.route.navigateByUrl('/auth')
      }
    }
  }

}
