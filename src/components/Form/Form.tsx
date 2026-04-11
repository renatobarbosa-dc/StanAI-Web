import './Form.css'

export function Form() {
    return(
        <div className='form-container'>
            <div className="input">
                <p>Qual wiki vamos explorar hoje?</p>
                <input placeholder="https://pt.stardewvalleywiki.com/Stardew_Valley_Wiki"/>
            </div>

            <div className="input">
                <p>O que você quer saber?</p>
                <input placeholder="Digite sua pergunta..."/>
            </div>
        </div>
    )
}