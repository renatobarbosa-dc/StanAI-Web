import { useState } from 'react'
import { Send } from 'lucide-react'
import './Chat.css'
import { PuffLoader } from 'react-spinners'

interface Message {
  role: "user" | "ai"
  content: string
}

interface ChatProps {
  messages: Message[]
  wikiUrl: string
  onNewMessage: (question: string) => void
  isTyping: boolean
}

export function Chat({ messages, wikiUrl, onNewMessage, isTyping }: ChatProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onNewMessage(input)
    setInput('')
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.role === "ai" && (
              <img className="logo-svg small" src="src/assets/maria-teresa.png" />
            )}
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message ai">
            <PuffLoader color="#4a7c59" size={48} />
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          disabled={isTyping}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Continue perguntando..."
        />
        <button onClick={handleSend}><Send /></button>
      </div>
    </div>
  )
}