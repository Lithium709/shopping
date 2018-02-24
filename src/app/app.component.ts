import {
    Component, ViewChild, ElementRef, AfterViewInit, HostListener, ComponentFactoryResolver,
    OnDestroy, Inject
} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {FooterDirective} from "./footer.directive";
import {FooterComponent} from "./footer/footer.component";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

    public scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
    @ViewChild(FooterDirective) footerHost: FooterDirective;

    constructor(private router: Router,
                private meta: Meta,
                private titleService: Title,
                // private slimLoadingBarService: SlimLoadingBarService,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    mainclass: boolean;

    ngOnInit() {
        // this.slimLoadingBarService.start();
       // if (isPlatformBrowser(this.platformId)) {
           // document.getElementById("loader").style.display = 'none';
       /// }
        this.router.events.subscribe(evt => {
            this.mainclass = false;
          //  if (isPlatformBrowser(this.platformId)) {
             //   window.scrollTo(0, 0);
           // }
           // this.slimLoadingBarService.complete();
        });

        this.meta.addTag({name: 'keyword', content: 'Angushop, angular, eccommerce, template, Material Design'});
        this.meta.addTag({name: 'description', content: 'Angushop - Angular 4 Shop Template Material Design'});
        this.meta.addTag({name: 'robots', content: 'index, follow'});
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loadComponent();
        }, 2000);
    }

    loadComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FooterComponent);
        let viewContainerRef = this.footerHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }
}
