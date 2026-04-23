import './Form.css'
import { Send } from 'lucide-react'
import { useState } from 'react'

interface FormProps {
  onSubmit: (url: string, question: string) => void
}

export function Form({ onSubmit }: FormProps) {
  const [url, setUrl] = useState('')
  const [question, setQuestion] = useState('')

  const handleSubmit = () => {
    if (!url.trim() || !question.trim()) return
    onSubmit(url, question)
  }

  return (
    <div className='form-container'>
      <p className='title-forms'>Qual wiki vamos explorar hoje?</p>
      <div className='form-input'>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://pt.stardewvalleywiki.com/Stardew_Valley_Wiki"
        />
        <button onClick={handleSubmit}></button>
      </div>

      <p className='title-forms'>O que você quer saber?</p>
      <div className='form-input'>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Onde fica a cueca do prefeito?"
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button onClick={handleSubmit}><Send /></button>
      </div>
    </div>
  )
}