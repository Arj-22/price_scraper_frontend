"use client"
import { ref, listAll, StorageReference, getDownloadURL, list, getMetadata, deleteObject } from "firebase/storage";
import { storage } from '../../../firebase/config'
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState, useTransition } from "react";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Download, Loader, Trash } from "lucide-react";
import { toast } from "sonner";

export const PricesTable = () => {

    const [files, setFiles] = useState<StorageReference[]>([])
    const [isPending, startTransition] = useTransition()
  
    const [tab, setTab] = useState("")
  
    const onChangeTab = (selection: string) => {
  
      setTab(selection)
  
      const listRef = ref(storage, `files/${selection}`)
      startTransition(() => {
        listAll(listRef)
        .then((res) =>{
  
          setFiles([])
  
          res.items.forEach((itemRef) => {
            // All the items under listRef.
  
            // TODO: Find a way to order the list of files
  
            // getMetadata(itemRef)
            // .then((metadata) => {
            //   console.log(metadata.timeCreated)
            // })
  
  
            setFiles(files => [itemRef, ...files])
  
  
          });
  
  
        }).catch((error) => {
          console.log(error)
        });
      })
  
    }
  
  
    useEffect(() => {
      onChangeTab("Tuin")
    }, [])
  
    const getDownloadLink = (filePath: string) => {
      getDownloadURL(ref(storage, filePath))
      .then((url) => {
          // console.log(url)
  
              const link = document.createElement("a");
              link.setAttribute("href", url);
  
              document.body.appendChild(link);
              link.click();
  
              toast.success("Starting Download")
      })
      .catch((error) => {
        toast.error("Cannot Download")
      })
    }
  
    const onDelete = (filePath: string) => {
      console.log(filePath)
  
      const deleteRef = ref(storage, filePath);
  
      // Delete the file
      deleteObject(deleteRef).then(() => {
        // File deleted successfully
        console.log("Success")
        toast.success("Successfully Deleted")
        // revalidatePath("/recent-prices")
        onChangeTab(tab)
  
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      });
    }
  return (
    <>
     <div className="flex flex-row justify-between py-6">
      <p className='text-2xl'>Recent files</p>
      </div>

    <div className="flex flex-col p-4 justify-center">
    <Tabs onValueChange={(val) => onChangeTab(val)} defaultValue="Tuin" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="Tuin">Tuin</TabsTrigger>
        <TabsTrigger value="Garden Buildings">Garden Buildings</TabsTrigger>
        <TabsTrigger value="Simply Log Cabins">Simply Log Cabins</TabsTrigger>
        <TabsTrigger value="Waltons">Waltons</TabsTrigger>
        <TabsTrigger value="Quick Gardens">Quick Gardens</TabsTrigger>

      </TabsList>
      <TabsContent value="Tuin">
        <div className="p-4">
          <p className="text-xl">Tuin Prices</p>
        </div>
      </TabsContent>
      <TabsContent value="Garden Buildings">
        <div className="p-4">
          <p className="text-xl">Garden Buildings Prices</p>
        </div>
      </TabsContent>
      <TabsContent value="Simply Log Cabins">
        <div className="p-4">
          <p className="text-xl">Simply Log Cabins Prices</p>
        </div>
      </TabsContent>
      <TabsContent value="Waltons">
        <div className="p-4">
          <p className="text-xl">Waltons Prices</p>
        </div>
      </TabsContent>
      <TabsContent value="Quick Gardens">
        <div className="p-4">
          <p className="text-xl">Quick Gardens Prices</p>
        </div>
      </TabsContent>
    </Tabs>
    </div>

    {isPending ?
    (<Loader className="m-2 h-6 w-6 animate-spin"/>) :
    (
    <Table className="w-[60%] ">
    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    <TableHeader>
      <TableRow>
        <TableHead className="w-[400px]">File Name</TableHead>
        {/* <TableHead>Status</TableHead>
        <TableHead>Method</TableHead> */}
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {files.map((file) => (
        <TableRow key={file.name}>
          <TableCell className="font-medium">{file.name}</TableCell>
          {/* <TableCell>{invoice.paymentStatus}</TableCell>
          <TableCell>{invoice.paymentMethod}</TableCell> */}
          <TableCell className="text-right">

            <Dialog>
              <DialogTrigger>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4"/>
                <p className="text-md">Delete</p>
              </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                  <div className="flex flex-row pt-4 justify-between">
                    <DialogClose>
                    <Button variant="destructive" onClick={() => onDelete(file.fullPath)}>
                      <p>Delete</p>
                    </Button>
                    </DialogClose>
                    <DialogClose>
                    <Button variant="outline">
                      Cancel
                    </Button>
                    </DialogClose>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button onClick={() => getDownloadLink(file.fullPath)} className="my-2 xl:mx-2" disabled={isPending}>
            <Download className="mr-2 h-4 w-4"/>
              <p className="text-md">Download</p>
            </Button>

          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    {/* <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter> */}
  </Table>)}
    </>
  )
}