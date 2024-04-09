import React from 'react'
interface CityDataProps {
    city: any,
    idxnumber: number
}
const CityTable: React.FC<CityDataProps> = ({ city, idxnumber }) => {
    return (
        <tr className='capitalize text-sm lg:text-lg'>
            <td className='text-capitalize border px-2'>{idxnumber + 1}</td>
            <td className='text-capitalize border px-2'>city name</td>
            <td className='text-capitalize border px-2'>Country</td>
            <td className='text-capitalize border px-2'>code</td>
            <td className='text-capitalize border px-2'>timezone</td>
            <td className='text-capitalize border px-2'>population</td>
        </tr>
    )
}

export default CityTable