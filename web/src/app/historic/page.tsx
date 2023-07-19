'use client'

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CSVLink } from "react-csv";

export default function Historic() {
  const [file, setFile] = useState<any>()
  const router = useRouter()

  async function handleSubmit (e: any) {
    e.preventDefault()

    const fileResponse = await api.get('/conversation')
    
    setFile(fileResponse.data)
  }

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center ">
      <Button size='lg' variant="link" className='absolute top-2 left-2' type="button" onClick={() => router.push('/')}>
      <ChevronLeft />
        Come back to chat
      </Button>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Button size='lg' className='text-xl h-16' type="submit">Generate historic conversation</Button>
          {file && <CSVLink data={file} className="inline-flex bg-slate-400 h-10 hover:bg-slate-300 text-xl items-center justify-center rounded-md font-medium ring-offset-background transition-colors">Download</CSVLink>}
      </form>
    </div>
  )
}
