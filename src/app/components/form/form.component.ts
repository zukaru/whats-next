import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/guards/dirty-form.guard';
import { DatabaseService } from 'src/app/services/database.service';
import { PersistService } from 'src/app/services/persist.service';
import { TaskModel } from '../../models/task-model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, CanComponentDeactivate {
  taskSubmitted = false;
  @ViewChild('f') public form: NgForm;
  @Output() isFormDirty = new EventEmitter<boolean>();
  
  constructor(
    private afs: AngularFirestore,
    private persist: PersistService,
    private route: Router
  ) { }

  ngOnInit(): void {

  }


  

  emitIsFormDirty(value: boolean) {
    this.isFormDirty.emit(value);
  }


  public canDeactivate() {
    console.log('it is working');
    return true;
  }



  taskFormSubmit(f: NgForm) {
    

    console.log()

    const task: TaskModel = {
      userID: this.persist.getPersist('USER_ID'),
      fName: f.value.fName,
      lName: f.value.lName,
      phoneNums: [f.value.phoneNums],
      description: f.value.task_description,
      price: f.value.price,
      payments: [f.value.payment],
      dateCreated: new Date().toLocaleDateString(),
      email: f.value.email,
      statusUpdates: [{
        status: f.value.status,
        date: new Date().toLocaleDateString(),
        notes: f.value.status_notes,
        whoIs: f.value.whoIs
      }],
      docID: '',
      address: f.value.address,
      deadline: f.value.deadline,

      }

      if ( this.persist.getPersist(this.persist.USER_ID) ){
        console.log(task);
        this.afs.collection('tasks')
        .add(task)
        .then((docRef) => {

          this.taskSubmitted = true;
          setTimeout(() => {
            this.taskSubmitted = false;
          }, 4000)



          f.resetForm();
          this.emitIsFormDirty(false);
        })
        .then(() => {
          this.taskSubmitted = true;
          setTimeout(() => {
            this.taskSubmitted = false;
          }, 4000)
        } )
        .catch((e) => console.log('Something went wrong, try again.', e))
    } else {
      let redirect = confirm("You're not signed in. You must be signed in to submit a journal entry. Do you want to be redirected to sign in or sign up?");
      if (redirect) {
        this.persist.setPersist('TEMP_ENTRY', {...task});
        this.route.navigateByUrl('/auth')
      }
    }
  }

}
