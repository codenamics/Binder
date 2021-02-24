import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AuthContainerComponent } from './components/auth/auth-container/auth-container.component';
import { MemberGridComponent } from './components/members/member-grid/member-grid.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LikesComponent } from './components/likes/likes.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { HomeComponent } from './components/home/home.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './components/members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { MemberMessagesComponent } from './components/members/member-messages/member-messages.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    HomeComponent,
    AuthContainerComponent,
    MemberGridComponent,
    MessagesComponent,
    LikesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    MemberMessagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgxUiLoaderModule.forRoot({
      bgsOpacity: 1,
      overlayColor: '#2d47c944',
      fgsColor: '#ff6866',
      hasProgressBar: false,
      fgsSize: 110,
      fgsType: 'square-jelly-box',

      text: 'Binding...',
      textColor: '#FFFFFF',
      textPosition: 'center-center',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
