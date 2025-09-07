"use client"
import { useState, useRef, useTransition } from "react"
import { sendMessage } from "@/lib/action" // server action
export type Message = {
  id: string
  text: string
  createdAt: string
  sender: "USER" | "COACH"
  coachId?: string
  userId?: string
}

export default function ChatInput({
  coachId,
  onNewMessage,
}: {
  coachId: string
  onNewMessage: (msg: Message) => void
}) {
  const [text, setText] = useState("")
  const [isPending, startTransition] = useTransition()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  function handleSend() {
    if (!text.trim()) return

    startTransition(async () => {
      try {
        if (!coachId) throw new Error("coachId is required")

        // الناتج الخام من sendMessage
        const rawMessage = await sendMessage(coachId, text)

        // تحويل rawMessage ليكون متوافق مع النوع Message
        const newMessage: Message = {
          id: rawMessage.id,
          text: rawMessage.text,
          createdAt: rawMessage.createdAt,
          sender: rawMessage.sender === "coach" ? "COACH" : "USER", // تحويل صارم
          coachId: coachId,
          userId: undefined,
        }

        onNewMessage(newMessage)
        setText("")
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <div className='flex gap-2 p-4 border-t border-gray-700 bg-gray-800'>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        className='flex-1 px-4 py-3 rounded-full bg-gray-700 text-white'
        placeholder='Type a message...'
      />
      <button
        onClick={handleSend}
        disabled={isPending}
        className={`px-5 py-3 rounded-full font-semibold ${
          isPending ? "bg-gray-500" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {isPending ? "Sending..." : "Send"}
      </button>
      <div ref={messagesEndRef} />
    </div>
  )
}
