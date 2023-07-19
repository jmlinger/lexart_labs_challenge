'use client'

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";
import assistentAvatar from '../../public/android.png'
import userAvatar from '../../public/user.png'
import { useRouter } from "next/navigation";

interface Imessage {
  role: string
  message: string
  group?: string
  options?: string[]
  info?: string[]
  references?: string[]
}

interface Ilogin {
  name?: string
  password?: string
}

export default function Home() {
  const [messages, setMessages] = useState<Array<Imessage>>([])
  const [input, setInput] = useState<string>('')
  const [login, setLogin] = useState<Ilogin>()
  const container = useRef<HTMLDivElement>(null)
  const router = useRouter()
  
  const lastMessage = messages[messages.length - 1]

  const messageResponseTime = 2000

  async function sendMessage() {
    const answerResponse = await api.post(
      '/answer', 
      {
        message: messages[messages.length - 1].message
      }
    )
    setTimeout(() => {
      setMessages([...messages, {
        role: 'assistent',
        ...answerResponse.data
      }])
    }, messageResponseTime);
  }

  async function sendLogin() {
    const loginResponse = await api.post(
      '/login', 
      login
    )
    
  setTimeout(() => {
      setMessages([...messages, {
        role: 'assistent',
        ...loginResponse.data
      }])
  }, messageResponseTime);
  }

  async function sendConversation() {
    await api.post(
      '/conversation', 
      {
        userName: login?.name,
        text: JSON.stringify(messages)
      }
    )
    
    setTimeout(() => {
      router.push('/historic')
    }, 7000);
  }

  const scroll = () => {
    container.current?.scrollTo(0, 10000)
  }

  useEffect(() => {
    if (login?.name) {
      sendMessage()   
    }
    
    if (login?.password) {
      sendLogin()
    }
  }, [login])

  useEffect(() => {
    scroll()
    if (lastMessage?.role === 'user' || lastMessage?.role === 'assistent' && lastMessage?.message.includes('financial assistent')) {
      sendMessage() 
    }      

    if (lastMessage?.role === 'assistent' && lastMessage?.message.includes('Thank you')) {
      sendConversation()
    }
  }, [messages])
  
  function handleSubmit(e: any) {
    e.preventDefault()
    setInput('')

    if (lastMessage?.role === 'assistent' && lastMessage?.message.includes('username')) {
      return setLogin({
        name: input
      })
    }

    if (lastMessage?.role === 'assistent' && lastMessage?.message.includes('password')) {
      return setLogin({
        ...login,
        password: input
      })
    }

    setMessages([...messages, {
      role: 'user',
      message: input
    }])
  }

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content] gap-5">
        <CardHeader>
          <CardTitle>FinChat</CardTitle>
          <CardDescription>A financial information chat bot.</CardDescription>
        </CardHeader>
        <CardContent ref={container} className="space-y-4 overflow-auto scroll-smooth">
          {messages.map(({role, message, options, info, references }, index) => {
            return (
              <div key={index} className="flex gap-3 text-slate-600 text-sm">
                { role === 'user' && (
                    <Avatar className="place-self-start">
                      <AvatarFallback>JM</AvatarFallback>
                      <AvatarImage src={userAvatar.src}/>
                    </Avatar>
                )}

                { role === 'assistent' && (
                  <Avatar>
                    <AvatarFallback>MR</AvatarFallback>
                    <AvatarImage src={assistentAvatar.src}/>
                  </Avatar>
                )}

                { options && (
                  <div className="text-justify leading-relaxed">
                    <span className="block font-bold text-slate-700">{role === 'user' ? 'User' : 'Assistent'}</span>
                    {message}
                    <div>
                      {options?.map((option, index) => (
                        <details key={index}>
                          <summary className="cursor-pointer font-bold">{option}</summary>
                          <p className="ml-4">
                            {info && info[index]} {' '}
                            For more information click {' '}
                            <a className="font-bold underline" href={references && references[index]} target="_blank">here</a>.
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                { (!options) && (
                   <p className="ext-justify leading-relaxed t">
                    <span className="block font-bold text-slate-700">{role === 'user' ? 'User' : 'Assistent'}</span>
                    {message}
                 </p>
                )}
               
              </div>
            )
          })}
        </CardContent>
        <CardFooter className="space-x-2" >
          <form className="w-full flex gap-2" onSubmit={handleSubmit}>
            <Input placeholder="type here" value={input} onChange={(e) => setInput(e.target.value)}/>
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
