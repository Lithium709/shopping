import { Component, OnInit } from '@angular/core';
import {productService} from "../../lib/service/product.service";
import {BlogPost} from "../../lib/service/data/BlogPost";
import {BlogCategory} from "../../lib/service/data/BlogCategory";

@Component({
  selector: 'app-navblog',
  templateUrl: './navblog.component.html',
  styleUrls: ['./navblog.component.scss']
})
export class NavblogComponent implements OnInit {
    public blogPosts:BlogPost[];
    public blogPostsByCategory:BlogPost[];
    public blogCategories:BlogCategory[];
    public currentCategory: BlogCategory;
  constructor(private productService: productService) { }

  ngOnInit() {
      this.productService.getBlogPost().subscribe((data)=>{
          this.blogPosts = data.sort(function(a,b){
              let c = +new Date(a.date);
              let d = +new Date(b.date);
              return d-c;
          });
          console.log(this.blogPosts);
          this.blogPostsByCategory = this.blogPosts;
      });
      this.productService.getBlogCategory().subscribe((data)=>{
          this.blogCategories = data;
      });
  }

  onBlogCategoryClick(blogCategory:BlogCategory){
      this.currentCategory = blogCategory;
      this.blogPostsByCategory = this.blogPosts.filter(e=>e.blogCategory.id==this.currentCategory.id);
  }

}
