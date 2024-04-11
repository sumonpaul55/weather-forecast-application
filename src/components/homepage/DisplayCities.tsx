"use client"
import React, { useEffect, useState } from 'react'
import CityTable from './CityTable'
const DisplayCities = ({ allcity }: any) => {
    const [userLocation, setUserLocation] = useState("")
    const [search, setSearch] = useState("")
    const [cities, setCities] = useState(allcity)

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
            const { city, country, county } = userLocation?.results[0]?.components;
            setUserLocation(`${county}, ${city}, ${country}`)
        } catch (error) {
            console.log(error)
        }
    }

    // getting data according to input field
    useEffect(() => {
        if (search) {
            const searchedCity = allcity.filter((city: any) => {
                return city.name.toLowerCase().includes(search)
            })
            setCities(searchedCity)
        } else {
            setCities(allcity)
        }
    }, [search, allcity])


    // handle search funtionality
    const handleSearch = (e: any) => {
        setSearch(e.target.value)
    }


    return (
        <section className='mt-1'>
            <div className='container mx-auto'>
                <div className='flex gap-2 text-white items-center justify-end'>
                    <h1 className='md:text-lg text-center text-black text-sm'>Your Location: </h1>
                    <span className='text-black text-sm'>{userLocation}</span>
                </div>

                {/* city table */}
                <div className='overflow-x-auto pb-5 mt-10'>
                    <div className='flex items-center justify-between'>
                        <h1 className='md:text-xl font-bold text-center text-white text-sm'>All Cities</h1>
                        <div className='flex justify-end items-center gap-2'>
                            <label htmlFor="">Search By Country</label>
                            <input onChange={handleSearch} type="text" placeholder='Search Country' className='outline-none border-none max-w-[500px] rounded-md py-1 px-2' />
                        </div>
                    </div>
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