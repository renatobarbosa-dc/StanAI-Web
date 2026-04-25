import "./Sidebar.css";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface SidebarProps {
  chats: Chat[]
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
}

export function Sidebar({ chats, onNewChat, onSelectChat, onDeleteChat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div className="sidebar-collapsed">
        <div className="arrow-right" onClick={toggleSidebar}>
            <ChevronRight />
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="menu-header">
        <h1 className="menu-title">StanAI</h1>
        <div className="arrow-left" onClick={toggleSidebar}>
          <ChevronLeft />
        </div>
      </div>

      <div className="new-page-button-container">
        <button className="new-page-button" onClick={onNewChat}>Nova Página</button>
      </div>

      <p className="recents">Recentes:</p>

      <div className="menu">
        {chats.map(chat => (
          <button key={chat.id} className="old-page" onClick={() => onSelectChat(chat.id)}>
            {chat.title}
            <Trash
              className="trash-icon"
              size="1rem"
              onClick={e => {
                e.stopPropagation()
                onDeleteChat(chat.id)
              }}
            />
          </button>
        ))}
      </div>

      <div className="theme-button-container">
        <ThemeToggle />
      </div>
    </div>
  );
}