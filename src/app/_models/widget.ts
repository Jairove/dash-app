export class Widget {
    _userid: string;
    _id: number;
    type: string = '';
    colSize:  string = '';
    pos: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this,values);
    }
}
