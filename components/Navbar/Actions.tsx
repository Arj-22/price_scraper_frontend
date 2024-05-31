"use client"
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { redirect } from 'next/navigation'
import Link from 'next/link'

const Actions = () => {

    const [isOpen, setIsOpen] = useState(false)


    const handleOpen = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }
  return (
    <>
        <div className='hidden md:flex'>
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li><a href='/'>Home</a></li>
            <li><a href='/recent-prices'>Recent Prices</a></li>
            </ul>
        </div>
        <div className='flex flex-col md:hidden'>
            {/* <Button variant="ghost" onClick={handleOpen}>
                {isOpen ? <X/> : <Menu/>}
            </Button>
            {isOpen && (
                <div className='py-4'>
                    <ul className=''>
                        <li className='py-2'><a href='/'>Home</a></li>
                        <li className='py-2'><a href='/recent-prices'>Recent</a></li>
                    </ul>
                </div>
            )} */}


            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost">
                        {/* {isOpen ? <X/> : <Menu/>} */}
                        <Menu/>
                    </Button>  
                </PopoverTrigger>
                <PopoverContent className='flex flex-col w-auto'>
                    {/* <ul className='flex flex-col px-2'>
                        <li className='py-2 border-b-2 text-md'><a href='/'>Home</a></li>
                        <li className='py-2 border-b-2 text-md'><a href='/recent-prices'>Recent</a></li>
                    </ul> */}

                    <Link href="/" className='hover:bg-slate-100 p-2 rounded-md text-center'>
                        Home
                    </Link>
                    <Link href="/recent-prices" className='hover:bg-slate-100 p-2 rounded-md text-center'>
                        Recent Prices
                    </Link>
                </PopoverContent>
            </Popover>
        </div>
        

    </>
  )
}

export default Actions