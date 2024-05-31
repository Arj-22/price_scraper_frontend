import { Menu } from 'lucide-react'
import React from 'react'
import Actions from './Actions'

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 border-b-2'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <div className=''>
          Price Scraper
        </div>
        <Actions/>
      </div>

    </nav>
  )
}

export default Navbar