
import GetCities, { getWeather } from '@/actions/cities/cities'
import CityWeather from '@/components/cityWeather/CityWeather'
import React from 'react'


const page = async ({ params }: any) => {
    const { cityid } = params;
    console.log(cityid)

    const { results }: any = await GetCities();
    const oneCity: any = await results?.find((specificCity: any) => {
        return (cityid === specificCity?.geoname_id)
    })

    console.log(oneCity)

    const latLon: object = {
        lat: oneCity?.coordinates?.lat,
        lon: oneCity?.coordinates?.lon
    }
    // get weather data by lat and lon
    const weatherInfo: any = await getWeather(latLon);
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