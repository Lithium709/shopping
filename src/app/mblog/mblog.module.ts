import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { NavblogComponent } from './navblog/navblog.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BlogPostsComponent, NavblogComponent]
})
export class MblogModule { }
