"use client"
import React from 'react'
import CityTable from './CityTable'

const DisplayCities = ({ cities }: any) => {
    // console.log(cities)
    return (
        <section>
            <div className='container mx-auto'>
                <h1 className='text-xl font-bold text-center text-white'>All Cities</h1>
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