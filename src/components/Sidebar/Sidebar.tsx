import "./Sidebar.css";
import { ChevronLeft, Moon, Trash } from "lucide-react";

export function ChatSidebar() {
  return (
    <div className="sidebar">
      <div className="menu-header">
        <h1 className="menu-title">StanAI</h1>

        <div className="arrow-left">
          <ChevronLeft/>
        </div>
      </div>

      <div className="new-page-button-container">
        <button className="new-page-button">Nova Página</button>
      </div>

      <p className="recents">Recentes:</p>

      <div className="menu">
        <button className="old-page">
          Resident Evil Wiki
          <Trash className="trash-icon" size="1rem"/>
        </button>

        <button className="old-page">
          Silent Hill Wiki
          <Trash className="trash-icon" size="1rem"/>
        </button>

        <button className="old-page">
          Metal Gear Wiki
          <Trash className="trash-icon" size="1rem"/>
        </button>
      </div>

     <div className="moon-container">
       <Moon />
     </div>
    </div>
  );
}
