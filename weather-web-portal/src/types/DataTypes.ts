
export type CityTempData = {
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number,
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    id: number,
    name: string,
}


export type Weather = {
    main : string;
    description : string;
    temp : number,
    feels_like : number,
    humidity : number;
    visibility : number;
    windSpeed: number;
    windDeg: number;
    name: string;
    dateTime: number;
}