import { Ball } from "./Ball"
import { Form } from "../Form/Form"
import { Loading } from "../Loading/Loading"
import { Chat } from "../Chat/Chat"
import "./Notebook.css"
import { useState } from 'react'

type View = "home" | "loading" | "chat"

interface Message {
  role: "user" | "ai"
  content: string
}

export function Notebook() {
  const [view, setView] = useState<View>("home")
  const [messages, setMessages] = useState<Message[]>([])
  const [wikiUrl, setWikiUrl] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = async (url: string, question: string) => {
    setWikiUrl(url)
    setView("loading")

    // substituir aqui pela chamada de API real QUANDO TIVER
    await new Promise(res => setTimeout(res, 2000))
    const fakeResponse = "Resposta da wiki aqui..."

    setMessages([
      { role: "user", content: question },
      { role: "ai", content: fakeResponse }
    ])
    setView("chat")
  }

  const handleNewMessage = async (question: string) => {
    const updated = [...messages, { role: "user" as const, content: question }]
    setMessages(updated)
    setIsTyping(true) // começa loading

    // substituir aqui pela chamada de API real QUANDO TIVER
    await new Promise(res => setTimeout(res, 1000))
    const fakeResponse = "Outra resposta da wiki..."

    setIsTyping(false) // para loading
    setMessages([...updated, { role: "ai" as const, content: fakeResponse }])
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