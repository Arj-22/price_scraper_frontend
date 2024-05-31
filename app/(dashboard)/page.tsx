"use client"

import ProductUploader from "./_components/ProductUploader";
import { FileContext } from "@/Contexts/FileContext";
import { useState } from "react";


export default function Home() {

  const [file, setFile] = useState<string[]>([]) 

  return (
    <>
    <div className="px-6 md:px-20 flex flex-row justify-between">
      <div className=" w-full">
        <FileContext.Provider value={{file, setFile}}>
          <div>
              <ProductUploader/>
          </div>
        </FileContext.Provider>
      </div>
    </div>
    </>
  );
}
