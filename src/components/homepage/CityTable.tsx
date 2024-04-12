import Link from 'next/link';
import React from 'react'
interface CityDataProps {
    city: any;
    idxnumber: number
}

const CityTable: React.FC<CityDataProps> = ({ city, idxnumber }) => {

    // console.log("city", city)

    return (
        <tr className='capitalize text-sm lg:text-lg text-center text-indigo-100'>
            <td className='text-capitalize border p-2'>{idxnumber + 1}</td>
            <td className='text-capitalize border p-2'>
                <Link href={`${city?.geoname_id}`}>{city?.name}</Link>
            </td>
            <td className='text-capitalize border p-2'>{city?.cou_name_en}</td>
            <td className='text-capitalize border p-2'>{city?.country_code}</td>
            <td className='text-capitalize border p-2'>{city?.timezone}</td>
            <td className='text-capitalize border p-2'>{city?.population}</td>
        </tr>
    )
}

export default CityTable