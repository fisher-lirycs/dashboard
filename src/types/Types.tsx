export type WeatherType = {
    coord: {
        lon: number,
        lat: number,
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string,
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
        deg: number,
        gust: number,
    },
    rain: {
        oneh: number,
    },
    clouds: {
        all: number,
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    code: number;
    name: string;
    id: number;
    timezone: number;

};

export type WorkflowType = {
    date: string;
    weekDay: number;
    detail: string;
};