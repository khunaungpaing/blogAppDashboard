import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  img_url: any = '';
  categories!: Array<any>;
  postForm: FormGroup;
  selectedImage: any;

  constructor(private categoryService: CategoriesService,
              private fb: FormBuilder,
              private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }

  get fc() {
    return this.postForm.controls
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value;
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
    this.postService.uploadPost(this.selectedImage, postData);
    this.postForm.reset();
    this.img_url = '';
  }
}
