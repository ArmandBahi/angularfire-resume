import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotesComponent } from './notes/notes.component';
import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';


const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'login', component: UserProfileComponent },
  { path: 'notes', component: NotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
