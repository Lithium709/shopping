export class Store{
    constructor(
        public id?: number,
        public brand?: string,
        public trc?: string,
        public city?: string,
        public street?: string,
        public street_num?: string,
        public phone?: string,
        public work_time?: string,
        public geoloc?: string,
        public coords?: string,
        public atelier?: boolean,
        public delivery?: boolean,
        public fashiontailor?: boolean,
        public front_img?: string,
        public front_url_static?: string,
    ) {
        this.atelier = false;
        this.delivery = false;
        this.fashiontailor = false;
    }
}