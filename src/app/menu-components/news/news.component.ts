import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';

import { BlogCategory } from "../../lib/service/data/BlogCategory";
import { BlogPost } from "../../lib/service/data/BlogPost";
import { productService } from "../../lib/service/product.service";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


    private blogPosts: BlogPost[];
    public blogPosts1: BlogPost[];
    public blogPosts2: BlogPost[];
    public htmlBlocks:any[];
    @Input() id:number;
  constructor(private productService: productService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
      this.productService.getBlogPost().subscribe((data)=>{
          this.blogPosts = data;
          this.blogPosts1 = data.filter(i=>i.priority===1 && i.publish);
          this.blogPosts2 = data.filter(i=>i.priority===2 && i.publish);
      });

      this.productService.getRightHtmlBlocks(this.id).subscribe((data=>{
           this.htmlBlocks = data;
      }));

  }

    onClick($event) {
        if (isPlatformBrowser(this.platformId)) {
            document.getElementById("megamenuNews").style.display = "none";
            var el = document.getElementById("topmainmenu");
            el.classList.remove("wsoffcanvasopener");
        }
    }

}
