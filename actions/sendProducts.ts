"use server"
import axios from "axios"
import fs from 'fs/promises';
export const sendProductsToAPI = async (links: string[], competitor: string) => {

    let endpoint;

    const apiRoute = process.env.WEBSCRAPER_API

    if(competitor == "Tuin"){
         endpoint = "tuin-scraper"
    }
    if(competitor == "Garden Buildings"){
        endpoint = "gardenBuildings-scraper"
    }
    if(competitor == "Waltons"){
        endpoint = "waltons-scraper"
    }

    if(competitor == "Quick Gardens"){
        endpoint = "quickGarden-scraper"
    }
    if(competitor == "Simply Log Cabins"){
        endpoint = "simplyLogCabins-scraper"
    }

    try{
        const response = await axios.post(`${apiRoute}${endpoint}`, links)

        const data = response.data

        const csv = await data.split('\r\n')

        console.log(csv)


        let headers = csv[0].split(',')

        console.log("headers")
        console.log(headers)

        console.log("response")
        console.log(response.data)

        return csv

    }catch(error){

        console.log(error)
    }
}
