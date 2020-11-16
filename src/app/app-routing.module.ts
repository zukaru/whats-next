import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirtyFormGuard } from './guards/dirty-form.guard';
import { AuthComponent } from './views/auth/auth.component';
import { CreateTaskComponent } from './views/create-task/create-task.component';
import { SearchComponent } from './views/search/search.component';
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
    component:CreateTaskComponent,
    canDeactivate: [DirtyFormGuard]
  },
  {
    path: 'search',
    component: SearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
