export default async function GetCities() {
    const response = await fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");
    const allcities = await response.json();
    return allcities
}

// get weather info using lat and long
export async function getWeather(latLon: object) {
    // console.log(latLon)
    const { lat, lon }: any = latLon;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`);
    const weatherifo = await response.json();
    return weatherifo
}

// convert firenhite to celcius

export const getFarenhiteToCelcius = (farenhite: any) => {
    return (farenhite - 32) / 1.8;
}


// get time from milisecond
export function millisecondsToTime(milliseconds: any) {
    var date = new Date(milliseconds);

    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();

    var timeString = hours.toString().padStart(2, '0') + ":" +
        minutes.toString().padStart(2, '0') + ":" +
        seconds.toString().padStart(2, '0');

    return timeString;
}