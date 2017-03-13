export class Weather {
    cod: number = 0;
    weather: [{
        description: string
    }] = [{
        description: "Unavailable"
    }];
    main: {
      temp: number
    } = {
      temp: 1
    };

    name: string;

    constructor(values: Object = {}) {
        Object.assign(this,values);
    }
}
