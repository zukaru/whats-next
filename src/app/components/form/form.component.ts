import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PersistService } from 'src/app/services/persist.service';
import { TaskModel } from '../../models/task-model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit  {
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





  taskFormSubmit(f: NgForm) {
    


    let task: TaskModel = {
      userID: this.persist.getPersist('USER_ID'),
      fName: f.value.fName,
      lName: f.value.lName,
      phoneNums: f.value.phoneNums,
      description: f.value.task_description,
      price: f.value.price,
      
      dateCreated: new Date().toLocaleDateString(),
      email: f.value.email,
      statusUpdates: [{
        status: f.value.status,
        date: new Date().toLocaleDateString(),
        notes: f.value.status_notes,
        whoIs: f.value.whoIs,
        payment: f.value.payment,
        deadline: f.value.deadline
      }],
      docID: '',
      address: f.value.address,

      }

      if ( this.persist.getPersist(this.persist.USER_ID) ){
        console.log(task);
        this.afs.collection('tasks')
        .add(task)
        .then((docRef) => {

          this.taskSubmitted = true;
          setTimeout(() => {
            this.taskSubmitted = false;
            f.resetForm();
          }, 4000);

          this.emitIsFormDirty(false);



         
        })
        
        .catch((e) => console.log('Something went wrong, try again.', e));
    } else {
      let redirect = confirm("You're not signed in. You must be signed in to submit a task entry. Do you want to be redirected to sign in or sign up?");
      if (redirect) {
        this.persist.setPersist('TEMP_TASK', {...task});
        this.route.navigateByUrl('/auth');
      }
    }
  }

}
