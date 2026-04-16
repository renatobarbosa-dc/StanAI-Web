import { Notebook } from "./components/Notebook/Notebook";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/global.css";

export function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Sidebar/>
        <Notebook />
      </div>
    </ThemeProvider>
  );
}
