import "./Sidebar.css";
import { ChevronLeft, ChevronRight, Moon, Trash, Sun } from "lucide-react";
import { useState } from "react";

export function ChatSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); 


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
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
        <button className="new-page-button">Nova Página</button>
      </div>

      <p className="recents">Recentes:</p>

      <div className="menu">
        <button className="old-page">
          Resident Evil Wiki
          <Trash className="trash-icon" size="1rem" />
        </button>

        <button className="old-page">
          Silent Hill Wiki
          <Trash className="trash-icon" size="1rem" />
        </button>

        <button className="old-page">
          Metal Gear Wiki
          <Trash className="trash-icon" size="1rem" />
        </button>
      </div>

      <div className="theme-button-container">
        <button className="theme-button" onClick={toggleTheme}>
          {isDarkTheme ? <Moon size="1.2rem" /> : <Sun size="1.2rem" />}
        </button>
      </div>
    </div>
  );
}