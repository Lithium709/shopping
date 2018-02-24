
export  class BlogPost {
    public id: number;
    public title: string;
    public shortDescription: string;
    public longDescription: string;
    public seoDescription: string;
    public imageLink: string;
    public publish: boolean;
    public priority: number;
    public date: string;
    blogCategory: {
        id:number;
        name:any;
    }
}
