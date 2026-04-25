import { useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Notebook } from './components/Notebook/Notebook'
import { ThemeProvider } from './contexts/ThemeContext';
import "./styles/global.css";

export interface Chat {
  id: string
  title: string
  wikiUrl: string
  messages: { role: 'user' | 'ai', content: string }[]
}

const loadChats = (): Chat[] => {
  const saved = localStorage.getItem('stanai-chats')
  return saved ? JSON.parse(saved) : []
}

export function App() {
  const [chats, setChats] = useState<Chat[]>(loadChats)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  const saveChats = (updated: Chat[]) => {
    setChats(updated)
    localStorage.setItem('stanai-chats', JSON.stringify(updated))
  }

  const handleNewChat = () => {
    setActiveChatId(null) // volta pro home
  }

  const handleSelectChat = (id: string) => {
    setActiveChatId(id)
  }

  const handleDeleteChat = (id: string) => {
    const updated = chats.filter(c => c.id !== id)
    saveChats(updated)
    if (activeChatId === id) setActiveChatId(null)
  }

  const handleSaveChat = (chat: Chat) => {
    const exists = chats.find(c => c.id === chat.id)
    const updated = exists
      ? chats.map(c => c.id === chat.id ? chat : c)
      : [chat, ...chats]
    saveChats(updated)
    setActiveChatId(chat.id)
  }

  const activeChat = chats.find(c => c.id === activeChatId) ?? null

  return (
    <div>
      <ThemeProvider>
        <Sidebar
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />
        <Notebook
          activeChat={activeChat}
          onSaveChat={handleSaveChat}
        />
      </ThemeProvider>
    </div>
  )
}