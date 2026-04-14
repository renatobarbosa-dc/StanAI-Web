import './Form.css'
import { Send } from 'lucide-react'

export function Form() {
    return(
        <div className='form-container'>
                <p className='title-forms'>Qual wiki vamos explorar hoje?</p>

                <div className='form-input'>
                    <input  placeholder="https://pt.stardewvalleywiki.com/Stardew_Valley_Wiki"/>
                    <button><Send /></button>
                </div>
                
                <p className='title-forms'>O que você quer saber?</p>
                <div className='form-input'>
                    <input  placeholder="Onde fica a cueca do prefeito?"/>
                    <button><Send /></button>
                </div>
        </div>
    )
}