import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthContainerComponent } from './components/auth/auth-container/auth-container.component';

import { RegisterComponent } from './components/auth/register/register.component';
import { MemberGridComponent } from './components/members/member-grid/member-grid.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LikesComponent } from './components/likes/likes.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: AuthContainerComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'binds',
        component: MemberGridComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'likes',
        component: LikesComponent,
      },
      {
        path: 'edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard]
      },
      {
        path: ':username',
        component: MemberDetailComponent
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
