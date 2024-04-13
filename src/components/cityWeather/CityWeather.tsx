"use client"
import { getFarenhiteToCelcius, millisecondsToTime } from '@/actions/getdata/getData';
import shiny from "@/asstes/img/shiny.jpg"
import cloudy from "@/asstes/img/cloudy.jpg"
import breakcloudy from "@/asstes/img/breackcloudy.jpg"
import React from 'react'
import { FaTemperatureFull } from 'react-icons/fa6';
import Image from 'next/image';

const CityWeather = ({ weathers }: any) => {
    console.log(weathers)
    const { name, dt, weather, main }: any = weathers;
    const { date, time }: any = millisecondsToTime(dt)
    // destructer temp data from main
    const { temp, feels_like, temp_min, temp_max, grnd_level, pressure, humidity, sea_level

    }: any = main;
    const celciusTemp: any = getFarenhiteToCelcius(temp).toFixed(2)
    const feelikeTemp: any = getFarenhiteToCelcius(feels_like).toFixed(2)
    const mintemp: any = getFarenhiteToCelcius(temp_min).toFixed(2)
    const maximumTemp: any = getFarenhiteToCelcius(temp_max).toFixed(2)
    return (
        <section>
            <div className='container mx-auto'>
                <div className='border flex justify-between px-2'>
                    <h1 className='text-center sm:text-lg md:text-xl lg:text-2xl font-bold'>City: <span className='text-indigo-800'>{name}</span></h1>
                    <h2 className='md:text-xl font-semibold'>Date: {date}</h2>
                </div>
                <div className='grid sm:grid-cols-2 gap-5 mt-7 items-center'>
                    <div className='flex justify-between items-center dm:w-8/12 p-3 border'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex'>
                                <span className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl'><FaTemperatureFull /></span>
                                <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>{celciusTemp}<span className='font-medium'><sup>O</sup></span></h1>
                            </div>
                            <div>
                                {
                                    weather?.map((condition: any, idx: number) => (
                                        <div key={idx} className='flex gap-2 flex-col items-start'>
                                            <div>
                                                <h4 className=''>Sky: <span className='text-pink-600'>{condition?.main}</span></h4>
                                                <h4 className=''>Sky: <span className='text-pink-600'>{condition?.description}</span></h4>
                                            </div>
                                            <Image src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather" width={10} height={10} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h4>Feel like: {feelikeTemp} <sup>o</sup></h4>
                            <h4>Maximum Temp: {maximumTemp} <sup>o</sup></h4>
                            <h4>Minimum Temp: {mintemp} <sup>o</sup></h4>
                            <h4>grnd_level: {grnd_level} </h4>
                            <h4>pressure: {pressure} </h4>
                            <h4>humidity: {humidity} </h4>
                            <h4>sea_level: {sea_level} </h4>
                        </div>
                    </div>
                    <div className='md:w-4/12'></div>
                </div>
            </div>
        </section>
    )
}
export default CityWeather
