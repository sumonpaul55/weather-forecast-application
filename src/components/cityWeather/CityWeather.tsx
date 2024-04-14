"use client"
import { getFarenhiteToCelcius, millisecondsToTime } from '@/actions/getdata/getData';
import shiny from "@/asstes/img/shiny.jpg"
import cloudy from "@/asstes/img/cloudy.jpg"
import fewCloudes from "@/asstes/img/breackcloudy.jpg"
import brokenCloude from "@/asstes/img/brokenCloude.jpg"
import React, { useState } from 'react'
import { FaTemperatureFull } from 'react-icons/fa6';
import Image from 'next/image';

const CityWeather = ({ weathers }: any) => {
    const [farenHite, setFarenhite] = useState(false)
    const { name, dt, weather, main, wind, sys }: any = weathers;
    const { date, time }: any = millisecondsToTime(dt)
    // destructer temp data from main
    const { temp, feels_like, temp_min, temp_max, grnd_level, pressure, humidity, sea_level }: any = main;
    const celciusTemp: any = getFarenhiteToCelcius(temp).toFixed(2)
    const feelikeTemp: any = getFarenhiteToCelcius(feels_like).toFixed(2)
    const mintemp: any = getFarenhiteToCelcius(temp_min).toFixed(2)
    const maximumTemp: any = getFarenhiteToCelcius(temp_max).toFixed(2)
    // getting sky condition
    const akyCondition: any = weather?.map((condition: any, idx: number) => {
        return condition?.description.toLowerCase()
    })
    return (
        <section className={`h-screen pt-5 ${akyCondition[0] === "overcast clouds" ? "bg-gray-400" : akyCondition[0] === "broken clouds" ? "bg-slate-600" : akyCondition[0] === "few clouds" ? "bg-gray-300" : "white"}`}>
            <div className='container mx-auto'>
                <div className='flex justify-evenly px-2 py-20 rounded-md weather-page'>
                    <h1 className='text-center sm:text-lg md:text-xl lg:text-2xl font-bold'>City: <span className=''>{name}, {sys?.country}</span></h1>
                    <h2 className='md:text-xl font-semibold'>Date: {date}</h2>
                </div>
                <div className='flex gap-5 mt-12 items-center'>
                    <div className='flex justify-between items-center md:w-7/12 p-2 md:p-4 bg-white bg-opacity-70 rounded-md'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex'>
                                <span className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl'><FaTemperatureFull /></span>
                                <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>{!farenHite ? celciusTemp : main?.temp}<span className='font-medium'><sup>O</sup></span></h1>
                            </div>
                            <div>
                                {
                                    weather?.map((condition: any, idx: number) => (
                                        <div key={idx} className=''>
                                            <div className='flex gap-2 justify-between items-center'>
                                                <div>
                                                    <h4 className=''>Sky: <span className='text-indigo-700'>{condition?.main}</span></h4>
                                                    <h4 className=''>Description: <span className='text-indigo-700'>{condition?.description}</span></h4>
                                                </div>
                                                <Image src={`https://openweathermap.org/img/wn/${condition?.icon}.png`} alt="weather" className='w-[100px] animate-pulse' width={50} height={50} />
                                            </div>
                                            <div>
                                                <h1 className='md:text-xl font-semibold'>Wind</h1>
                                                <div className='flex justify-between gap-3'>
                                                    <h5>Speed: <span className='text-indigo-700 font-semibold'>{wind?.speed}</span></h5>
                                                    <h5>Deg: <span className='text-indigo-700 font-semibold'>{wind?.deg}</span></h5>
                                                    <h5>Gust: <span className='text-indigo-700 font-semibold'>{wind?.gust}</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='space-y-3'>
                            <h4 className='font-semibold'>Feel like: <span className='font-semibold text-indigo-600'>{!farenHite ? feelikeTemp : main?.feels_like}<sup>o</sup></span> </h4>
                            <h4 className='font-semibold'>Maximum Temp: <span className='font-semibold text-indigo-600'>{!farenHite ? maximumTemp : main?.temp_max}<sup>o</sup></span> </h4>
                            <h4 className='font-semibold'>Minimum Temp: <span className='font-semibold text-indigo-600'>{!farenHite ? mintemp : main?.temp_min}<sup>o</sup></span> </h4>
                            <h4 className='font-semibold'>grnd_level: <span className='font-semibold text-indigo-600'>{grnd_level}</span> </h4>
                            <h4 className='font-semibold'>pressure: <span className='font-semibold text-indigo-600'>{pressure}</span> </h4>
                            <h4 className='font-semibold'>humidity: <span className='font-semibold text-indigo-600'>{humidity}</span> </h4>
                            <h4 className='font-semibold'>sea_level: <span className='font-semibold text-indigo-600'>{sea_level}</span> </h4>
                        </div>
                    </div>
                    <div className='flex-1 relative'>
                        <Image src={akyCondition[0] === "overcast clouds" ? cloudy : akyCondition[0] === "few clouds" ? fewCloudes : akyCondition[0] === "broken clouds" ? brokenCloude : shiny} alt={akyCondition[0]} width={500} height={200} className='w-full rounded-md animate-pulse' style={{ animationDelay: "4s", animationDuration: "3s" }} />
                        <h2 className='text-white font-bold sm:text-xl md:text-xl absolute bottom-7 left-[20%]'>Sky condition</h2>
                    </div>
                </div>
                <div className='mt-10 text-center'>
                    <button className='bg-indigo-600 text-white px-2 py-1' onClick={() => setFarenhite(!farenHite)}>Switch to Farenhite</button>
                </div>
            </div>
        </section>
    )
}
export default CityWeather
