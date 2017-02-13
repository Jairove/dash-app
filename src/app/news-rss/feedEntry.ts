export class FeedEntry {
    title: string;
    author: string;
    pubDate: string;
    link: string;
    img: string;
    content: string;
    description: string;

    constructor(values: Object = {}) {
        Object.assign(this,values);
    }
}