import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  postArray!: Array<any>;
  isEmpty: boolean = true;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
      this.isEmpty = val.length == 0;
    })
  }


  onDelete(postImgPath: any, id: any) {
    this.postService.deleteImg(postImgPath, id);
  }

  feature(id: any, value: boolean) {
    const featuredData = {
      isFeatured: value
    }
    this.postService.markFeatured(id, featuredData);
  }

}
