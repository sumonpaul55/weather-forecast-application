"use client"
import React, { useEffect, useState } from 'react'
import CityTable from './CityTable'
const DisplayCities = ({ cities }: any) => {
    const [userLocation, setUserLocation] = useState("")
    //    get user location 
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                getUsersCurrentLocation(latitude, longitude)
            }, error => {
                setUserLocation(error.message)
            })
        } else {
            setUserLocation("Geolocation is not supported by this browser.")
        }
    }, [])
    // function for get user's location using opencagedata api
    const getUsersCurrentLocation = async (lat: any, long: any) => {
        const query: any = `${lat},${long}`
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.NEXT_PUBLIC_APIKEY}&language=en&pretty=1`
        try {
            const res = await fetch(apiUrl)
            const userLocation = await res.json();
            const { city, country, county } = userLocation.results[0].components;
            setUserLocation(`${county}, ${city}, ${country}`)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(process.env.NEXT_PUBLIC_APIKEY)

    return (
        <section className='mt-5'>
            <div className='container mx-auto'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-bold text-center text-white'>All Cities</h1>
                    <div className='flex gap-2 text-white'>
                        <h1 className='md:text-lg text-center text-black'>Your Location: </h1>
                        <span className='text-black'>{userLocation}</span>
                    </div>
                </div>
                {/* city table */}
                <div className='overflow-x-auto pb-5'>
                    <table className='w-full mt-5 border text-white'>
                        <thead>
                            <tr className='capitalize text-sm lg:text-lg'>
                                <th className='text-capitalize border px-2'>No.</th>
                                <th className='text-capitalize border px-2'>city name</th>
                                <th className='text-capitalize border px-2'>Country</th>
                                <th className='text-capitalize border px-2'>code</th>
                                <th className='text-capitalize border px-2'>timezone</th>
                                <th className='text-capitalize border px-2'>population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cities?.map((city: any, idx: number) => (
                                    <CityTable key={idx} city={city} idxnumber={idx}></CityTable>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default DisplayCities