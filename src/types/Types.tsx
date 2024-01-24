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

export type KidsWeatherType = {
    response_datetime: string,
    weathery_info: [{
        serial_id: string,
        initial_weathery_name: string,
        custom_weathery_name: string,
        sensors: [
            {
                unit_id: string,
                serial_id: string,
                initial_weathery_name: string,
                custom_weathery_name: string,
                dispatch_datetime: string,
                current: {
                    status: string,
                    temp: string,
                    humi: string,
                    wbgt: string,
                    inws: string,
                    avws: string,
                }
                alert: string | {
                    inws_flag: boolean,
                    avws_flag: boolean,
                },
                threshold: {
                    wbgt_caution_threshold: string,
                    wbgt_alarm_threshold: string,
                    inws_alarm_threshold: string,
                    avws_alarm_threshold: string,
                }
            }
        ]
    }]
};

export type SensorsType =
    {
        unit_id: string,
        serial_id: string,
        initial_weathery_name: string,
        custom_weathery_name: string,
        dispatch_datetime: string,
        current: {
            status: string,
            temp: string,
            humi: string,
            wbgt: string,
            inws: string,
            avws: string,
        }
        alert: string | {
            inws_flag: boolean,
            avws_flag: boolean,
        },
        threshold: {
            wbgt_caution_threshold: string,
            wbgt_alarm_threshold: string,
            inws_alarm_threshold: string,
            avws_alarm_threshold: string,
        }

    };

export type WorkflowType = {
    date: string;
    weekDay: number;
    detail: string;
};

export type PieType = {
    name: string;
    value: number;
    color?: string;
    angle?: number;
};

export type ScheduleDataType = {
    day: string;
    week: string;
    detail: string;
}

type CameraResponseType = {
    AccessToken: string,
    url: string
}