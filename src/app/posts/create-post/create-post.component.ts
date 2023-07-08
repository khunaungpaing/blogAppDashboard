import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  img_url: any = '';
  categories!: Array<any>;
  postForm!: FormGroup;
  selectedImage: any;
  post: any;
  formStatus: string = 'Add New';
  docId: any;


  constructor(private categoryService: CategoriesService,
              private fb: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute) {

    this.route.queryParams.subscribe(val => {
      this.docId = val['id']
      if (this.docId) {
        this.postService.findById(this.docId).subscribe(post => {
          this.post = post;
          this.postForm.controls['title'].setValue(this.post.title);
          this.postForm.controls['permalink'].setValue(this.post.permalink);
          this.postForm.controls['excerpt'].setValue(this.post.excerpt);
          this.postForm.controls['category'].setValue(`${this.post.category.categoryId}-${this.post.category.category}`);
          this.postForm.controls['content'].setValue(this.post.content);
          this.img_url = this.post.postImgPath;
          this.formStatus = 'Edit';
        })
      }
    })
  }

  get fc() {
    return this.postForm.controls
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value;
    });

    this
      .postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });

  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = e => this.img_url = e.target?.result

    reader.readAsDataURL(event.target.files[0])
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {

    console.log(this.postForm.value)
    let postForm = this.postForm.value;
    let splitted = postForm.category.split('-');

    const postData: Post = {
      title: postForm.title,
      permalink: postForm.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: postForm.excerpt,
      content: postForm.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postService.uploadPost(this.selectedImage, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.img_url = '';
  }

  onKeyChange($event: any) {
    this.postForm.controls['permalink'].setValue(this.postForm.value.title.replace(/\s+/g, '-'));
  }
}
