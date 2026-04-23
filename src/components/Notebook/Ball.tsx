import { useEffect, useRef, useState } from 'react'

interface BallProps {
  visible?: boolean
}

export function Ball({ visible = true }: BallProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(10)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const BALL_SIZE = 72

    const observer = new ResizeObserver(() => {
      const quantity = Math.floor(el.clientHeight / BALL_SIZE)
      setCount(quantity)
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        visibility: visible ? 'visible' : 'hidden'
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ball" />
      ))}
    </div>
  )
}
