import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/asstes/img/logo.png"
const Navbar = () => {
    return (
        <nav className='bg-sky-100 border-b border-[#8f8d9e] py-1'>
            <div className="container mx-auto">
                <div className="logo">
                    <Link href="/">
                        <Image src={logo} width="100" height="60" priority alt='Weather logo' className='w-16' />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar