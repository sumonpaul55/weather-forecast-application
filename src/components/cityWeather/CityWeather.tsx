"use client"

import React from 'react'

const CityWeather = ({ weather }: any) => {
    console.log(weather)
    const { name }: any = weather;



    return (
        <div>
            <h1 className='text-center sm:text-lg md:text-xl lg:text-2xl font-bold'>City: <span className='text-indigo-800'>{name}</span></h1>
        </div>
    )
}
export default CityWeather
