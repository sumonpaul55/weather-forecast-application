import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/asstes/img/logo.png"
import UsersInfo from '../usersInfo/UsersInfo'
const Navbar = () => {
    return (
        <nav className='bg-sky-100 border-b border-[#8f8d9e] py-1 px-2 sm:px-0'>
            <div className="container mx-auto">
                <div className='flex items-center gap-5'>
                    <div className="logo">
                        <Link href="/" className='flex items-center gap-2'>
                            <Image src={logo} width="100" height="60" priority alt='Weather logo' className='w-16' />
                            <h1 className='text-xl font-bold hidden sm:block'>Weather</h1>
                        </Link>
                    </div>
                    <div className='flex-1'>
                        <UsersInfo></UsersInfo>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar