import {Item} from "./item";

export class Order {
    buyer? : string;
    cancelled? :boolean;
    delivered? :boolean;
    deliveryAllowed? : boolean;
    hasTroubles? : boolean;
    id? : number;
    orderDate? : string;
    paid? : boolean;
    state? : string;
    total?:number;
    phone?: string;
    area? :string;
    city? :string;
    warehouse? :string;
    street? :string;
    house? :string;
    flat? :string;
    orderLines:Array<{
        id? : number;
        item : {id : number};
        quantity: number;
        price: number;
        quantityToReturn? : number;
        article? : string;
    }>
}