import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthComponent } from './views/auth/auth.component';
import { TaskOverviewComponent } from './views/task-overview/task-overview.component';
import { CreateTaskComponent } from './views/create-task/create-task.component';
import { FirebaseUIModule } from 'firebaseui-angular';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormComponent } from './components/form/form.component';
import { TaskOverviewCardComponent } from './components/task-overview-card/task-overview-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchComponent } from './views/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TaskDetailsComponent } from './views/task-details/task-details.component';
import { TaskDetailsMenuComponent } from './components/task-details-menu/task-details-menu.component';
import { AnimateOnViewDirective } from './directives/animate-on-view.directive';
import { StatusFormModalComponent } from './components/status-form-modal/status-form-modal.component';
import { EditTaskDescriptionModalComponent } from './components/edit-task-description-modal/edit-task-description-modal.component';
import { ImagesComponent } from './views/images/images.component';
import { AddImagesModalComponent } from './components/add-images-modal/add-images-modal.component';
import { firebaseUiAuthConfig } from './firebaseconfig'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    AuthComponent,
    TaskOverviewComponent,
    CreateTaskComponent,
    FormComponent,
    TaskOverviewCardComponent,
    SearchBarComponent,
    SearchComponent,
    SpinnerComponent,
    TaskDetailsComponent,
    TaskDetailsMenuComponent,
    AnimateOnViewDirective,
    StatusFormModalComponent,
    EditTaskDescriptionModalComponent,
    ImagesComponent,
    AddImagesModalComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
