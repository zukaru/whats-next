import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: TaskModel[];

  constructor() { }

  
}
