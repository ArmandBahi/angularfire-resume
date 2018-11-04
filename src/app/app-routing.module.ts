import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotesComponent } from './pages/notes/notes.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SkillsComponent } from './pages/skills/skills.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'skills', component: SkillsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
