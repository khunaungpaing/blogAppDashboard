import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  postArray!: Array<any>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;
    })
  }

  onEdit() {

  }

  onDelete() {

  }
}
