"use server"

import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';


export const testScraper = async (productUrl: string) => {

    if(!productUrl){
        return "No Data"
    }; 
    try{

        // Cheerio Web Scraper
        // const res = await axios.get(productUrl)

        // const $ = cheerio.load(res.data)

        // // console.log(res.data)

        // const title = $('h1').text()

        // const turnaround = $('.free-delivery-label').text().trim()

        // // console.log(turnaround)

        // const flooring = 


        // Puppeteer API 

        console.log("Puppeteer")

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(productUrl)

        // await page.screenshot({ path: "./files/test.png"})

        // const html = await page.content()


        // console.log(html)

        const title = await page.evaluate(() => document.title)

        // console.log(title)

        // const size = 


        const tabOptions = await page.evaluate(() => {

            try{
                const ulTag = document.querySelector(".ui-tabs-nav.ui-corner-all.ui-helper-reset.ui-helper-clearfix.ui-widget-header")
                // const liTags = document.querySelectorAll(".ui-tabs-tab.ui-corner-top.ui-state-default.ui-tab.ui-tabs-active.ui-state-active")
    
                const liTags = ulTag!.querySelectorAll('li')
    
                const options: string[] = []
    
                liTags.forEach((tag) =>{
                    options.push(tag.innerHTML)
                })

                page.click(options[1])

                page.screenshot({path: "./files/ss.png"})
    
                return options
            }
            catch(e){
                console.log(e)
            }


        })


        // console.log(tabOptions)



        const selectOptions = await page.evaluate(() => {

            const options = document.querySelector('.options-tab')

            const extras = options!.querySelectorAll('.property-row.frow.fwrap')

            // const [response] = Promise.all([
            //     page.waitForNavigation(),
            //     page.click()
            // ])

            return extras[3].innerHTML
        })

        console.log(selectOptions)
        await browser.close();

        
    }
    catch(error){
        console.log(error)
    }

    // const $ = await cheerio.fromURL(productUrl)

    // return productUrl

    // try{ 

    // }
}