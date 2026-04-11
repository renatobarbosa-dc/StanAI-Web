import { Ball } from "./Ball";
import "./Notebook.css";

export function Notebook() {
  return (
    <div className="notebook"> 
      <Ball />

      <div className="main-container">
        <div className="logo-container">
          <img className="logo-svg" src="src\assets\maria-teresa.png"></img>
          <div className="logo-title">StanAI</div>
        </div>

        <div className="forms-container">
            insira o form
        </div>
      </div>
      
    </div>
  );
}
