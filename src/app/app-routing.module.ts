import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
import { CreateTaskComponent } from './views/create-task/create-task.component';
import { TaskOverviewComponent } from './views/task-overview/task-overview.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'task-overview',
    component: TaskOverviewComponent
  },
  {
    path: 'create-task',
    component:CreateTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
