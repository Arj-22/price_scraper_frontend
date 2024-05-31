"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, Plus, Search } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { useFilePicker } from 'use-file-picker'
import { sendProductsToAPI } from '@/actions/sendProducts'
import { Switch } from '@/components/ui/switch'
import {writeCsv}  from '@/actions/exportCsv'
import { toast } from 'sonner'


const ProductUploader = () => {

    const [fileName, setFileName] = useState("");

    const [file, setFile] = useState<string[]>([]);

    const [hasHeaders, setHasHeaders] = useState(false);

    const [competitor, setCompetitor] = useState("")

    const [response, setResponse] = useState<string[]>([])

    const [isPending, startTransition] = useTransition() 

    const { openFilePicker, filesContent, loading } = useFilePicker({
        accept: '.csv',
      });

      useEffect(()=>{

        // Select file and display the links

        filesContent.map((file) => {
            setFileName(file.name)

            // TODO: Add a better way to check if the last item is empty

            let result = file.content.split("\r\n")

            if(hasHeaders){
                result.shift()
            }

            result.splice(-1, 1);

            setFile(result)

        })

      }, [filesContent, hasHeaders])

  const handleScrape = () =>{

    startTransition(() => {
        const res = sendProductsToAPI(file, competitor)
        res.then((value) => {
            console.log("response Value")

            console.log(value)
    
            setResponse(value)
    
            const status = writeCsv(value, competitor)
            status.then((val)=>{
                console.log(val)
                if(val == false){
                    toast.error("Could Not Scrape")
                }else{
                    toast.success("Pages Scraped Successfully")
                }
            }).catch((err) => {
                toast.error("Could Not Scrape Pages")
            })

            })
            .catch((err) => {
                console.log(err)
            })
        })
   }

  return (
    <>
    <div className='px-12 lg:px-40 pb-10'>

        <div className="flex mb-10 mt-5 justify-center">
            Add Products from CSV File  
        </div>
        
        <div className="md:flex flex-row">
        <div className='my-2 md:pr-2 md:my-0'>
            <Select onValueChange={(val) => setCompetitor(val) }>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Competitor" />
            </SelectTrigger>
            <SelectContent >
                <SelectItem value="Garden Buildings">Garden Buildings</SelectItem>
                <SelectItem value="Tuin">Tuin</SelectItem>
                <SelectItem value="Simply Log Cabins">Simply Log Cabins</SelectItem>
                <SelectItem value="Waltons">Waltons</SelectItem>
                <SelectItem value="Quick Gardens">Quick Gardens</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <Input className="my-2 mr-2 md:my-0" placeholder="Choose a CSV File" disabled value={fileName}/>
        <Button variant="outline" onClick={() => openFilePicker()}>
            Choose File
        </Button>

        </div>

        <div className='pt-4 flex flex-row'>
            <div className='flex flex-row w-max border-2 rounded-lg p-2 '>
                <h1 className='px-4'>Has Headers</h1>
                <Switch checked={hasHeaders} onCheckedChange={() => setHasHeaders(!hasHeaders)} />
            </div>
            <div className='px-2'>
                {fileName &&             
                <Button onClick={handleScrape} disabled={isPending}>
                    Scrape Pages
                </Button> }

            </div>
            {isPending && ( 
                <Loader className='m-2 h-6 w-6 animate-spin'/>
            )}

        </div>
        <div className='p-10'>
            <div className='py-4'>
                <h3 className='text-lg font-semibold'>
                    {fileName && competitor}
                </h3>
            </div>
            <ul className='list-disc'>
            {file.map((link, index) =>{
                return(
                    <li key={index}>{link}</li>
                )
            })}
            </ul>
        </div>
    </div>
    </>
  )
}

export default ProductUploader