import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[instagram-host]',
})
export class InstagramDirective{
    constructor(public viewContainerRef: ViewContainerRef) {}
}