import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[about-host]',
})
export class AboutDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}