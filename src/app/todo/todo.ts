export class Todo {
    _userid: string;
    _id: number;
    title: string = '';
    complete: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this,values);
    }
}
