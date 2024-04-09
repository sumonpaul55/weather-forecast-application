"use client"
import React from 'react'
import CityTable from './CityTable'

const DisplayCities = ({ cities }: any) => {
    // console.log(cities)
    return (
        <section>
            <div className='container mx-auto'>
                <h1 className='text-xl font-bold text-center'>All Cities</h1>
                {/* city table */}
                <table className='w-full mt-5 border overflow-x-scroll'>
                    <thead>
                        <tr className='font-semibold capitalize text-sm lg:text-lg'>
                            <td className='text-capitalize border px-2'>No.</td>
                            <td className='text-capitalize border px-2'>city name</td>
                            <td className='text-capitalize border px-2'>Country</td>
                            <td className='text-capitalize border px-2'>code</td>
                            <td className='text-capitalize border px-2'>timezone</td>
                            <td className='text-capitalize border px-2'>population</td>
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
        </section>
    )
}

export default DisplayCities