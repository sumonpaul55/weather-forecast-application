"use client"
import { getFarenhiteToCelcius, millisecondsToTime } from '@/actions/getdata/getData'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaTemperatureHigh } from "react-icons/fa";

const UsersInfo = () => {
    const [userLocation, setUserLocation] = useState("")
    const [temp, setTemp] = useState("")
    const [sunrise, setSunrise] = useState("")

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
            const { name, sys, main }: any = userLocation;
            setUserLocation(`${name}, ${sys.country}`)

            // get farenhite from temp
            const celcius = getFarenhiteToCelcius(main?.temp).toFixed(2)
            setTemp(celcius)

            // get milisecond to time and setState
            const sunriseTime: any = millisecondsToTime(sys.sunrise)
            setSunrise(sunriseTime.time)
        } catch (error) {
            toast(`${error} Invalid Api requiest`, {
                position: "bottom-right"
            });
        }
    }
    return (
        <>
            {temp &&
                <div className='flex gap-5 w-full justify-end items-center'>
                    <span className='text-black text-sm md:text-base font-bold'>{userLocation}</span>
                    <div className='text-black text-sm md:text-base font-bold flex items-center gap-1'>
                        <FaTemperatureHigh color="#4bd" /> {temp} <span><sup>0</sup>C</span></div>
                    <div className='items-center gap-1 hidden sm:flex capitalize'><span className='hidden sm:block'>sunrise:</span> {sunrise}</div>
                    {/* <div className='flex items-center gap-1'><span className='hidden sm:block'>sunset:</span> {sunset}</div> */}
                </div>
            }

        </>
    )
}

export default UsersInfo