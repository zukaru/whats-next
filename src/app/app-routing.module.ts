import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirtyFormGuard } from './guards/dirty-form.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { AuthComponent } from './views/auth/auth.component';
import { CreateTaskComponent } from './views/create-task/create-task.component';
import { ImagesComponent } from './views/images/images.component';
import { SearchComponent } from './views/search/search.component';
import { TaskDetailsComponent } from './views/task-details/task-details.component';
import { TaskOverviewComponent } from './views/task-overview/task-overview.component';


const routes: Routes = [
  
  {
    path: 'task-overview',
    component: TaskOverviewComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'hidden-tasks',
    component: TaskOverviewComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'create-task',
    component: CreateTaskComponent,
    canActivate: [IsLoggedInGuard],
    canDeactivate: [DirtyFormGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path:'task-details/:docID',
    component: TaskDetailsComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path:'task-details/:docID/edit',
    component: CreateTaskComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path:'task-details/:docID/images',
    component: ImagesComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: '',
    component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
