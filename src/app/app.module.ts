import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';

// Materialize
import { MaterializeModule } from 'angular2-materialize';

// AngularFire Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesComponent } from './notes/notes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    MaterializeModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-resume'),
    AngularFirestoreModule.enablePersistence()
  ],
  declarations: [ AppComponent, NotesListComponent, NotesComponent, UserProfileComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
