'use client'

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Ifile {
  name: string
  url: string
}

export default function Historic() {
  const [file, setFile] = useState<Ifile>()
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
          <a className={`${file ? 'block' : 'hidden'} inline-flex bg-slate-400 h-10 hover:bg-slate-300 text-xl items-center justify-center rounded-md font-medium ring-offset-background transition-colors`} href={file?.url} download={file?.name}>Download</a>
      </form>
    </div>
  )
}
