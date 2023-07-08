import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  private _collectionName: string = 'subscribers';

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
  }

  loadData() {
    return this.afs.collection(this._collectionName).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  deleteData(id: any) {
    this.afs.doc(`${this._collectionName}/${id}`).delete().then(() => {
      this.toastr.warning('Data Deleted...')
    })
  }
}
