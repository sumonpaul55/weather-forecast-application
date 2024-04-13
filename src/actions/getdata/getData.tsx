import toast from "react-hot-toast";

export default async function GetCities() {
    try {
        const response = await fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");
        const allcities = await response.json();
        return allcities
    } catch (error) {
        toast(`${error} Invalid API requiest`, {
            position: "bottom-center"
        })
    }
}

// get weather info using lat and long
export async function getWeather(latLon: object) {
    // console.log(latLon)
    try {
        const { lat, lon }: any = latLon;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`);
        const weatherifo = await response.json();
        return weatherifo
    } catch (error) {
        toast(`${error} Invalid API requiest`, {
            position: "bottom-center"
        })
    }
}

// convert firenhite to celcius

export const getFarenhiteToCelcius = (farenhite: any) => {
    return (farenhite - 32) / 1.8;
}


// get time from milisecond
export function millisecondsToTime(milliseconds: any) {

    // Convert Unix timestamp to milliseconds
    const usersmilliseconds: any = milliseconds * 1000;

    // Create a new Date object
    const date: any = new Date(usersmilliseconds);

    // Extract the components of the date
    const year: any = date.getFullYear();
    const month: any = (date.getMonth() + 1).toString().padStart(2, '0');
    const day: any = date.getDate().toString().padStart(2, '0');
    const hours: any = date.getHours().toString().padStart(2, '0');
    const minutes: any = date.getMinutes().toString().padStart(2, '0');
    const seconds: any = date.getSeconds().toString().padStart(2, '0');

    // Construct the date and time string
    const dateTime = {
        date: year + '-' + month + '-' + day,
        time: hours + ':' + minutes + ':' + seconds
    }


    return dateTime;
}
