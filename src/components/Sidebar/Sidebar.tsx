import "./Sidebar.css";
import { ChevronLeft, Moon } from "lucide-react";

export function ChatSidebar() {
  return (
    <div className="sidebar">
      <div className="menu-header">
        <h1 className="menu-title">StanAI</h1>

        <div className="arrow-left">
          <ChevronLeft></ChevronLeft>
        </div>
      </div>

      <div className="new-page-button-container">
        <button className="new-page-button">Nova Página</button>
      </div>

      <p className="recents">Recentes:</p>

      <div className="menu">
        <button className="old-page">babd</button>
        <button className="old-page">inwew</button>
        <button className="old-page">niwuqvbr</button>
      </div>

     <div className="moon-container">
       <Moon></Moon>
     </div>
    </div>
  );
}
