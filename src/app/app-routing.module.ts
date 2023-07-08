import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategroiesComponent} from "./categroies/categroies.component";
import {AllPostsComponent} from "./posts/all-posts/all-posts.component";
import {CreatePostComponent} from "./posts/create-post/create-post.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./services/auth.guard";
import {SubscriberComponent} from "./layouts/subscriber/subscriber.component";

const routes: Routes = [
  {path: '', component: AllPostsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategroiesComponent, canActivate: [AuthGuard]},
  {path: 'post', component: AllPostsComponent, canActivate: [AuthGuard]},
  {path: 'post/new', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'subscriber', component: SubscriberComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
