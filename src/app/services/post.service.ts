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

  uploadPost(selectedImage: any, postData: Post) {
    const filepath = `postIMG/${Date.now()}`;
    console.log(filepath);
    this.storage.upload(filepath, selectedImage).then(() => {
      console.log('post image uploaded successful')
      this.storage.ref(filepath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        this.saveData(postData);
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

  private saveData(postData: Post) {
    this.afs.collection(this._collectionName).add(postData).then(docRef => {
        this.toastr.success('Post status Success...');
        this.router.navigate(['/post']);
      }
    );
  }
}
