import { Ball } from "./Ball"
import { Form } from "../Form/Form"
import { Loading } from "../Loading/Loading"
import { Chat } from "../Chat/Chat"
import { useState, useEffect } from 'react'
import "./Notebook.css"

type View = "home" | "loading" | "chat"

interface Message {
  role: "user" | "ai"
  content: string
}

interface NotebookProps {
  activeChat: Chat | null
  onSaveChat: (chat: Chat) => void
}

export function Notebook({ activeChat, onSaveChat }: NotebookProps) {
  const [view, setView] = useState<View>("home")
  const [messages, setMessages] = useState<Message[]>([])
  const [wikiUrl, setWikiUrl] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages)
      setWikiUrl(activeChat.wikiUrl)
      setView('chat')
    } else {
      setMessages([])
      setWikiUrl('')
      setView('home')
    }
  }, [activeChat?.id])

  const handleSubmit = async (url: string, question: string) => {
    setWikiUrl(url)
    setView('loading')

    // sua API aqui
    await new Promise(res => setTimeout(res, 1500))
    const fakeResponse = 'Resposta da wiki aqui...'

    const newMessages = [
      { role: 'user' as const, content: question },
      { role: 'ai' as const, content: fakeResponse }
    ]

    setMessages(newMessages)
    setView('chat')

    onSaveChat({
      id: crypto.randomUUID(),
      title: question.slice(0, 30), // usa a pergunta como título
      wikiUrl: url,
      messages: newMessages
    })
  }

  const handleNewMessage = async (question: string) => {
    const updated = [...messages, { role: 'user' as const, content: question }]
    setMessages(updated)
    setIsTyping(true) // começa loading
  
    // sua API aqui — substitua pelo await da chamada real
    await new Promise(res => setTimeout(res, 1500))
    const fakeResponse = 'Outra resposta...'
  
    setIsTyping(false) // para loading
    const final = [...updated, { role: 'ai' as const, content: fakeResponse }]
    setMessages(final)
  
    if (activeChat) {
      onSaveChat({ ...activeChat, messages: final })
    }
  }
  
  return (
    <div className="notebook">
      <Ball visible={view !== "loading"} />
  
      <div className="main-container">
        {view === "home" && (
          <>
            <div className="logo-container">
              <img className="logo-svg" src="src/assets/maria-teresa.png" />
              <div className="logo-title">StanAI</div>
            </div>
            <div className="forms-container">
              <Form onSubmit={handleSubmit} />
            </div>
          </>
        )}
  
        {view === "chat" && (
          <Chat messages={messages} wikiUrl={wikiUrl} onNewMessage={handleNewMessage} isTyping={isTyping} />
        )}
      </div>
  
      {view === "loading" && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
    </div>
  )
}