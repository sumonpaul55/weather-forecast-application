export default async function GetCities() {
    const response = await fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");
    const allcities = await response.json();
    return allcities
}

export async function weather(city: string) {
    const response = await fetch("api of weather");
    const weatherifo = await response.json();
    return weatherifo
}