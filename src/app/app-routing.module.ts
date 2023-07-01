import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategroiesComponent} from "./categroies/categroies.component";
import {AllPostsComponent} from "./posts/all-posts/all-posts.component";
import {CreatePostComponent} from "./posts/create-post/create-post.component";

const routes: Routes = [
  {path: '', redirectTo: '/post', pathMatch: "full"},
  {path: 'category', component: CategroiesComponent},
  {path: 'post', component: AllPostsComponent},
  {path: 'post/new', component: CreatePostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
