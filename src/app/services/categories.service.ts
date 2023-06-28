import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore) { }

  saveData(data:Category){
    this.afs.collection('categories').add(data).then(docRef=>{
      console.log(docRef);
    }).catch(err=> console.log(err));
  }
}
