"use client"

import { createContext } from "react"
// import { FilesWithPath }


interface FileContextType {
  file: string[];
  setFile: React.Dispatch<React.SetStateAction<string[]>>;
}



export const FileContext = createContext<FileContextType>({
    file: [],
    setFile: () => {}
})