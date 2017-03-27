export class Widget {
    _userid: string;
    _id: number;
    type: string = '';
    colSize:  string = '';

    constructor(values: Object = {}) {
        Object.assign(this,values);
    }
}
