"use client"

import { testScraper } from '@/actions/scrapePage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'


export const SingleProductScraper = () => {

    const [productURL, setProductsURL] = useState("");

    const [data, setData] = useState("")


    const handleSubmit = async () => {
        const data = await testScraper(productURL)


        await setData(data!)

    }

    useEffect(()=>{
        console.log(data)
    }, [data])

  return (
    <div className='px-40 pb-10'>


        <div className="flex mb-10 mt-5 justify-center">
            Scrape Individual Pages
        </div>
        <div className="flex flex-row">
        <Input className="mr-2" placeholder="Enter a product URL" onChange={(e) => {setProductsURL(e.target.value)}}/>
        <Button variant="outline" onClick={handleSubmit}>
            Scrape Page
        </Button>
        </div>
    </div>
  )
}
