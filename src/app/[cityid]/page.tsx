import GetCities, { getWeather } from '@/actions/getdata/getData'
import CityWeather from '@/components/cityWeather/CityWeather'
import React from 'react'


const page = async ({ params }: any) => {
    const { cityid } = params;
    const { results }: any = await GetCities();
    const oneCity: any = await results?.find((specificCity: any) => {
        return (cityid === specificCity?.geoname_id)
    })

    const latLon: object = {
        lat: oneCity?.coordinates?.lat,
        lon: oneCity?.coordinates?.lon
    }
    const weatherInfo: any = await getWeather(latLon);
    return (
        <main>
            <CityWeather weathers={weatherInfo}></CityWeather>
        </main>

    )
}

export default page