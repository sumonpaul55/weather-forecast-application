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
            <section className='h-screen flex justify-center mt-5'>
                <div className="container mx-auto">
                    <div>
                        <CityWeather weathers={weatherInfo}></CityWeather>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default page