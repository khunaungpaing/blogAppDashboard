import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from "../environments/environment";
import { CategroiesComponent } from './categroies/categroies.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategroiesComponent
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
    },"firebaseConfig"),
    AngularFirestoreModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
