"use client"

import { useState, useEffect, useRef, use } from "react"
import ChatInput from "../../../../components/ChatInput"
import { getChatMessages } from "@/lib/action"
import { getCoachById } from "@/lib/data"

export type Message = {
  id: string
  text: string
  sender: "USER" | "COACH"
  createdAt: string
  coachId?: string
  userId?: string
}
type MsgFromServer = {
  id: string
  text?: string
  sender: "USER" | "COACH"
  createdAt: string
}

type Coach = {
  id: string
  name: string
  imageUrl?: string | null
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ coachId: string }>
}) {
  const { coachId } = use(params)

  const [messages, setMessages] = useState<Message[]>([])
  const [coachData, setCoachData] = useState<Coach | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)

        const coachRes = await getCoachById(coachId)
        if (!isMounted) return
        if (!coachRes.success || !coachRes.coach) {
          setError("Coach not found.")
          return
        }
        setCoachData(coachRes.coach)

        const msgs = await getChatMessages(coachId)
        if (!isMounted) return

        setMessages(
          (msgs as MsgFromServer[]).map(msg => ({
            id: msg.id,
            text: msg.text ?? "",
            sender: msg.sender, 
            createdAt: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        )
      } catch (err) {
        console.error(err)
        if (isMounted) setError("Failed to load chat.")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [coachId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (loading)
    return (
      <div className='flex items-center justify-center mt-20 min-h-[60vh]'>
        <div className='w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin'></div>
        <span className='ml-4 text-white text-lg font-semibold'>
          Loading...
        </span>
      </div>
    )
  if (error) return <p className='text-center mt-20 text-red-400'>{error}</p>
  if (!coachData)
    return <p className='text-center mt-20 text-gray-400'>Coach not found.</p>

  return (
    <div className='flex flex-col h-screen mt-15 bg-gray-900 text-white'>
      <div className='flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10'>
        <div className='flex items-center'>
          <img
            src={coachData.imageUrl || "/images/default-coach.png"}
            alt={coachData.name}
            className='w-12 h-12 rounded-full object-cover shadow-md mr-3'
          />
          <span className='text-white font-semibold text-lg'>
            {coachData.name}
          </span>
        </div>
        <div className='flex space-x-4'>
          <button className='text-green-500 hover:text-green-400 text-xl'>
            📞
          </button>
          <button className='text-blue-500 hover:text-blue-400 text-xl'>
            🎥
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {messages.length === 0 && (
          <p className='text-center text-gray-400 mt-20'>
            No messages yet. Start the conversation!
          </p>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.sender === "USER" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow-md text-sm break-words ${
                msg.sender === "USER"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <p>{msg.text}</p>
              <span className='text-[10px] text-gray-300 block text-right mt-1'>
                {msg.createdAt}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className='p-4 border-t border-gray-700 bg-gray-900'>
        <ChatInput
          coachId={coachId}
          onNewMessage={(msg: Message) =>
            setMessages(prev => [
              ...prev,
              { ...msg, text: msg.text ?? "", sender: msg.sender },
            ])
          }
        />
      </div>
    </div>
  )
}
