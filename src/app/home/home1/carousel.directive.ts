import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[carousel-host]',
})
export class CarouselDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}