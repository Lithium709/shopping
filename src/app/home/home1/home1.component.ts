import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, ComponentFactoryResolver} from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import * as _ from "lodash";
import {productService} from "../../lib/service/product.service";
import {AboutDirective} from "./about.directive";
import {CarouselDirective} from "./carousel.directive";
import {InstagramDirective} from "./instagram.directive";
import {SeotextDirective} from "./seotext.directive";
import {AboutComponent} from "../about/about.component";
import {CarouselComponent} from "../carousel/carousel.component";
import {SeotextComponent} from "../seotext/seotext.component";
import {InstagramComponent} from "../instagram/instagram.component";

@Component({
    selector: 'app-home1',
    templateUrl: './home1.component.html',
    styleUrls: ['./home1.component.scss'],
    animations:[
        trigger('fade', [
            state('shown' , style({ opacity: 1 })), 
            state('hidden', style({ opacity: 0 })),
            transition('* => *', animate('.5s'))
        ]),
    ]
})
export class Home1Component implements OnInit, AfterViewInit {
    private objectNavigation = {};
    public currentSlider :number =0;
    public  mainSliders : any[];
    @ViewChild(AboutDirective) aboutHost: AboutDirective;
    @ViewChild(CarouselDirective) carouselHost: CarouselDirective;
    @ViewChild(InstagramDirective) instagramHost: InstagramDirective;
    @ViewChild(SeotextDirective) seotextHost: SeotextDirective;
    constructor(
        private router: Router,
        private productService: productService,
        private componentFactoryResolver: ComponentFactoryResolver
    ){

        this.productService.getMainSliders().subscribe((data)=>{
            console.log('Loading main slider');
            console.log(data);
            this.mainSliders = data;
        });
    }

    ngOnInit(){
       // mainSliders
    }

    // Detail Product
    detailProduct(e){
        let product = e.slug.split(' ').join('-');
        this.router.navigate(['product/' + product]);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loadCarouselComponent();
            this.loadAboutComponent();
            this.loadSeotextComponent();
            this.loadInstagramComponent();
        }, 2000);
    }

    loadAboutComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(AboutComponent);
        let viewContainerRef = this.aboutHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }

    loadCarouselComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CarouselComponent);
        let viewContainerRef = this.carouselHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }

    loadSeotextComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SeotextComponent);
        let viewContainerRef = this.seotextHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }

    loadInstagramComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(InstagramComponent);
        let viewContainerRef = this.instagramHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }

}
