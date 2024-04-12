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