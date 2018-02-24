import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[footer-host]',
})
export class FooterDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}