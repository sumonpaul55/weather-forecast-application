"use client"
import { getFarenhiteToCelcius, millisecondsToTime } from '@/actions/cities/cities'
import React, { useEffect, useState } from 'react'
import { FaTemperatureHigh } from "react-icons/fa";

const UsersInfo = () => {
    const [userLocation, setUserLocation] = useState("")
    const [temp, setTemp] = useState("")
    const [sunrise, setSunrise] = useState("")
    const [sunset, setSunset] = useState("")


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
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
        try {
            const res = await fetch(apiUrl)
            const userLocation = await res.json();
            console.log(userLocation)
            const { name, sys, main }: any = userLocation;
            setUserLocation(`${name}, ${sys.country}`)
            // get farenhite from temp
            const celcius = getFarenhiteToCelcius(main?.temp).toFixed(2)
            setTemp(celcius)
            setSunrise(millisecondsToTime(sys.sunrise))
            setSunset(millisecondsToTime(sys.sunset))

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {temp &&
                <div className='flex gap-5 w-full justify-end items-center'>
                    <span className='text-black hidden sm:block text-sm md:text-base'>{userLocation}</span>
                    <div className='text-black text-sm md:text-base font-bold flex items-center gap-1'>
                        <FaTemperatureHigh color="#4bd" /> {temp} <span><sup>0</sup>C</span></div>
                    <span className=''>sunrise: {sunrise}</span>
                    <span className=''>sunset: {sunset}</span>
                </div>
            }

        </>
    )
}

export default UsersInfo