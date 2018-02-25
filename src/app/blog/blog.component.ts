import { Component, OnInit,Input } from '@angular/core';
import {BlogPost} from "../lib/service/data/BlogPost";
import { ActivatedRoute } from '@angular/router';
import { productService } from '../lib/service/product.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    blogPostId: string;
    public blogPosts: BlogPost[];
    blogPost: BlogPost;


  constructor (private productService: productService,
               private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
     this.activeRoute.params.subscribe(params => {
          this.blogPostId = params["title"];
          this.productService.getBlogPostByTitle(this.blogPostId).subscribe(blogPost => {
               this.blogPost = blogPost[0];

          })
      });
  }


}
