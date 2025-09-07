"use client"

import React, { useEffect, useState } from "react"
import { getCoachChatsAction, sendMessageFromCoach } from "@/lib/action"

const CoachMessagesPage = () => {
  type Message = {
    id: string
    text: string | null
    sender: "USER" | "COACH"
    createdAt: string
  }

  type UserChat = {
    id: string
    userId: string
    userName: string
    userImage?: string
    lastMessage?: string
    messages: Message[]
  }
  const [chats, setChats] = useState<UserChat[]>([])
  const [selectedChat, setSelectedChat] = useState<UserChat | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const storedCoachId =
    typeof window !== "undefined" ? localStorage.getItem("coachId") : null

  useEffect(() => {
    if (!storedCoachId) {
      setError("Coach not logged in")
      setLoading(false)
      return
    }

    async function fetchChats() {
      try {
        const res = await getCoachChatsAction(storedCoachId!)
        if (res.success && res.chats) setChats(res.chats)
        else setError(res.message || "Failed to load chats")
      } catch (err) {
        console.error(err)
        setError("Error loading chats")
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [storedCoachId])

  const handleSend = async () => {
    if (!selectedChat) return alert("Please select a chat")
    if (!newMessage.trim()) return alert("Please type a message")
    if (!storedCoachId) return alert("Coach not logged in")

    try {
      const messageResult = await sendMessageFromCoach(
        selectedChat.userId,
        storedCoachId,
        newMessage
      )

      const newMsg: Message = {
        id: messageResult.id,
        text: messageResult.text,
        sender: "COACH",
        createdAt: messageResult.createdAt,
      }

      setSelectedChat(prev =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMsg],
              lastMessage: newMsg.text || "",
            }
          : prev
      )

      setChats(prev =>
        prev.map(c =>
          c.id === selectedChat.id
            ? {
                ...c,
                messages: [...c.messages, newMsg],
                lastMessage: newMsg.text || "",
              }
            : c
        )
      )

      setNewMessage("") 
    } catch (err: any) {
      console.error("Error sending message:", err)
      alert(err.message)
    }
  }

  if (!storedCoachId) return <p className='p-5 text-red-500'>{error}</p>

  return (
    <div className='flex h-screen bg-gray-800 text-white'>
      <aside className='w-80 border-r border-gray-700 overflow-y-auto'>
        <h2 className='text-xl font-bold p-4 border-b border-gray-700'>
          Chats
        </h2>
        {!loading && chats.length === 0 && (
          <p className='p-4 text-gray-400'>No chats yet for this coach.</p>
        )}
        {error && <p className='p-4 text-red-500'>{error}</p>}
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`flex items-center p-4 gap-3 cursor-pointer hover:bg-gray-700 transition ${
              selectedChat?.id === chat.id ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <img
              src={chat.userImage || "/images/default-user.png"}
              alt={chat.userName}
              className='w-12 h-12 rounded-full object-cover'
            />
            <div className='flex flex-col'>
              <span className='font-semibold'>{chat.userName}</span>
              <span className='text-gray-400 text-sm truncate'>
                {chat.lastMessage}
              </span>
            </div>
          </div>
        ))}
      </aside>

      <main className='flex-1 flex flex-col p-5'>
        {!selectedChat && (
          <p className='text-gray-400'>Select a chat to start messaging</p>
        )}
        {selectedChat && (
          <>
            <h2 className='font-bold text-lg mb-4'>{selectedChat.userName}</h2>
            <div className='flex-1 overflow-y-auto flex flex-col gap-2 mb-2'>
              {selectedChat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-2 rounded max-w-xs ${
                    msg.sender === "USER"
                      ? "bg-orange-500 self-start"
                      : "bg-gray-700 self-end"
                  }`}
                >
                  {msg.text}
                  <span className='block text-[10px] text-gray-300 text-right mt-1'>
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              <input
                type='text'
                className='flex-1 p-2 rounded bg-gray-700 text-white'
                placeholder='Type a message...'
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
              />
              <button
                className='bg-blue-600 p-2 rounded hover:bg-blue-500'
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default CoachMessagesPage
