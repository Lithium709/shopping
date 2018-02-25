import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from "../../lib/service/data/BlogPost";

@Component({
    selector: 'app-blog-posts',
    templateUrl: './blog-posts.component.html',
    styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {

    @Input() blogPosts: BlogPost[];

    constructor() {
    }

    ngOnInit() {

    }

}
