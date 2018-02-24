
export class Product{
    id: number;
    article: string;
    nameUA: string;
    nameRU: string;
    nameEN: string;
    slug: string;
    description: string;
    price: number;
    oldPrice: number;
    pattern: string;
    style: string;
    collection: string;
    composition: string;
    image: string;
    branches: [
        {
            id: number;
            description: string;
        }
    ];
    color: string;
    wishList: number;
    photos: [
        {
            id: number;
            link: string;
        }
    ];
    items: [
        {
            id: number;
            model: string;
            size: string;
            stock : number;
            growth: string;

        }

    ]
}