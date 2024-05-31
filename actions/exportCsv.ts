"use server"

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config'

export const writeCsv = async (data: Array<string>, competitor: string) =>{
    
    try {

        console.log(data)

        const arr = []

        let csvContent = ""; 

        data.forEach((item) => {
            
            csvContent += item.replace(/[^\x00-\x7F]/g, "") + "\n"
        })

        console.log(csvContent)

        var csv = new Blob([csvContent], {type: 'text/csv'})

        // saveFile
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today. getDate();
        const currentDate = date + "-" + month + "-" + year;
        // const id = Math.floor(Math.random() * 10000) + 1;
        const timeStamp = new Date().getTime();
        const fileRef = ref(storage, `files/${competitor}/${competitor}_${currentDate}_${timeStamp}.csv`)

        const uploadTask = uploadBytesResumable(fileRef, csv)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
                console.log(progress)
            },
            (error) => {
                console.log("Error uploading file: ", error)
            }

        )

      } catch (error) {
        console.error(error);
        // res.status(500).send('Internal Server Error');
        console.log("Export CSV Error")

        return false

        // return new Error("Cannot Scrape Page")
      }
} 
