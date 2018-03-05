import {Category} from "./category";

export class MenuCategory{
    constructor(
        public id?: number,
        public name?: string,
        public position?: number,
        public attention?:boolean,
        public imageLink?:string,
        public publish?: boolean,
        public branches?: Array<Category>
    ) {
    }
}
