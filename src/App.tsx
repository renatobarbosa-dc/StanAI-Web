import { Notebook } from "./components/Notebook/Notebook";
import { ChatSidebar } from "./components/Sidebar/Sidebar";
import "./styles/global.css";

export function App() {
  return (
    <div className="App">
     <ChatSidebar/>
      <Notebook />
    </div>
  );
}
