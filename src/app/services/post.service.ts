import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _collectionName: string = 'posts';

  constructor(private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private toastr: ToastrService,
              private router: Router) {
  }

  uploadPost(selectedImage: any, postData: Post, formStatus: string, id?: any) {
    const filepath = `postIMG/${Date.now()}`;
    this.storage.upload(filepath, selectedImage).then(() => {
      this.storage.ref(filepath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        formStatus == 'Edit' ?
          this.update(id, postData) :
          this.saveData(postData);
        this.router.navigate(['/post']).then(() => {
        });
      })
    })
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

  findById(id: any) {
    return this.afs.doc(`${this._collectionName}/${id}`).valueChanges();
  }

  update(id: any, postData: any) {
    this.afs.doc(`${this._collectionName}/${id}`).update(postData).then(() => {
      this.toastr.success('Data updated successfully...');
    })
  }

  deleteImg(postImgPath: any, id: any) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: any) {
    this.afs.doc(`${this._collectionName}/${id}`).delete().then(() => {
      this.toastr.warning('Data Deleted...')
    })
  }

  private saveData(postData: Post) {
    this.afs.collection(this._collectionName).add(postData).then(docRef => {
        this.toastr.success('Post status Success...');
      }
    );
  }

  markFeatured(id: any, featuredData: any) {
    this.afs.doc(`${this._collectionName}/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured Status Updated...');
    })
  }
}
