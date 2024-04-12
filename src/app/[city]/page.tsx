
import GetCities, { getWeather } from '@/actions/cities/cities'
import CityWeather from '@/components/cityWeather/CityWeather'
import React from 'react'


const page = async ({ params }: any) => {
    const { city } = params;
    let cityName = city;

    if (city.includes("%20")) {
        const cityNames: any = city.split("%20")
        cityName = `${cityNames[0]} ${cityNames[1]}`
    }
    const { results }: any = await GetCities();
    const oneCity: any = await results?.find((specificCity: any) => {
        return (cityName.toLowerCase() === specificCity?.name.toLowerCase())
    })

    const latLon: object = {
        lat: oneCity?.coordinates?.lat,
        lon: oneCity?.coordinates?.lon
    }
    // get weather data by lat and lon
    const weatherInfo: any = await getWeather(latLon);
    // console.log(weatherInfo)
    return (
        <main>
            <section className='h-screen flex justify-center items-center'>
                <div className="container mx-auto">
                    <div>
                        <CityWeather weather={weatherInfo}></CityWeather>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default page