"use client"
import React, { useEffect, useState } from 'react'
import CityTable from './CityTable'
const DisplayCities = ({ allcity }: any) => {
    const [userLocation, setUserLocation] = useState("")
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState("")
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
                return city.name.toLowerCase().includes(search.toLowerCase())
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


    // filtering the city base on population
    useEffect(() => {
        if (selected) {
            const selectedValu = selected.split("-")
            const selectedCity = allcity.filter((city: any) => {
                return selectedValu[0] <= city?.population && selectedValu[1] >= city?.population
            })
            setCities(selectedCity)
            // clear the search bar
            setSearch("")
        }
    }, [selected, allcity])

    // handle filter by population functionality
    const hanldeSelect = (e: any) => {
        setSelected(e.target.value)
    }

    return (
        <section className='mt-1 px-2 md:px-0'>
            <div className='container mx-auto'>
                <div className='flex gap-2 text-white items-center justify-end'>
                    <h1 className='md:text-lg text-center text-black text-sm'>Your Location: </h1>
                    <span className='text-black text-sm'>{userLocation}</span>
                </div>

                {/* city table */}
                <div className='overflow-x-auto pb-5 mt-10'>
                    <div className='flex items-center justify-between'>
                        <h1 className='md:text-xl font-bold text-center text-white text-sm hidden sm:block'>All Cities</h1>
                        <div className='flex justify-end items-center gap-2'>
                            <label htmlFor="">Population</label>
                            <select className='p-1 rounded-md outline-0' onChange={hanldeSelect}>
                                <option className='text-sm p-2' value="">--Select--</option>
                                <option className='text-sm p-2' value="0-5000">0-5000</option>
                                <option className='text-sm p-2' value="5000-10000">5000-10000</option>
                                <option className='text-sm p-2' value="10000-20000">10000-20000</option>
                                <option className='text-sm p-2' value="20000-30000">20000-30000</option>
                                <option className='text-sm p-2' value="30000-40000">30000-40000</option>
                                <option className='text-sm p-2' value="40000-50000">40000-50000</option>
                                <option className='text-sm p-2' value="50000-60000">50000-60000</option>
                                <option className='text-sm p-2' value="60000-80000">60000-80000</option>
                                <option className='text-sm p-2' value="100000-999999">100000+</option>
                            </select>
                        </div>
                        <div className='flex justify-end items-center gap-2 relative'>
                            <label htmlFor="">Search</label>
                            <input onChange={handleSearch} type="text" placeholder='City Name' value={search} className='outline-none border-none md:max-w-[500px] rounded-md py-1 px-2' />

                            <div className='absolute w-full top-10 bg-white'>
                                {
                                    cities?.map((items: any, idx: number) => (
                                        search && search !== items?.name &&
                                        <div className='px-4 py-2 hover:bg-sky-500 cursor-pointer' onClick={() => setSearch(items?.name)} key={idx}>{items?.name}</div>
                                    ))
                                }
                            </div>
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
                                cities?.length < 1 && !search ? <tr><td className='p-2'>{`No Country found with "${selected}`}</td></tr>
                                    : cities?.map((city: any, idx: number) => (
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