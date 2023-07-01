import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CategroiesComponent} from './categroies/categroies.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import {AllPostsComponent} from './posts/all-posts/all-posts.component';
import {CreatePostComponent} from './posts/create-post/create-post.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategroiesComponent,
    AllPostsComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAXz4Q-epH7-trUh1WsBQxi4bVHuKHNFDs",
      authDomain: "blogapp-af815.firebaseapp.com",
      projectId: "blogapp-af815",
      storageBucket: "blogapp-af815.appspot.com",
      messagingSenderId: "122600767669",
      appId: "1:122600767669:web:be05f27071c5da27ed3efc",
      measurementId: "G-7GQGZ3ZRJP"
    }, "firebaseConfig"),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
