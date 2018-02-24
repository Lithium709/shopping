import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[seotext-host]',
})
export class SeotextDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}