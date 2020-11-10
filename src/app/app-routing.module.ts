import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
import { TaskOverviewComponent } from './views/task-overview/task-overview.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'task-overview',
    component: TaskOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
