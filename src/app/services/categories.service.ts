import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Category} from "../models/category";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _collectionName = 'categories';

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
  }

  saveData(data: Category) {
    this.afs.collection(this._collectionName).add(data).then(docRef => {
      console.log(docRef);
      this.toastr.success('Data Insert Successfully');
    }).catch(err => {
      console.log(err)
    });
  }

  loadData() {
    return this.afs.collection(this._collectionName).snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    );
  }

  update(id: string, editData: Category) {
    this.afs.doc(`${this._collectionName}/${id}`).update(editData).then(docRef => {
      this.toastr.success('Edit Data Success...')
    })
  }

  delete(id: string) {
    this.afs.doc(`${this._collectionName}/${id}`).delete().then(docRef => {
      this.toastr.success('Delete Success')
    })
  }

}
