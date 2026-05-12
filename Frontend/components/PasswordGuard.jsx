// components/PasswordGuard.jsx
'use client'

import { useState, useEffect } from 'react'

export default function PasswordGuard({ children }) {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem('app_authorized')
    if (saved === 'true') setAuthorized(true)
    setLoading(false)
  }, [])

  const handleSubmit = () => {
    if (password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
      sessionStorage.setItem('app_authorized', 'true')
      setAuthorized(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (loading) return null

  if (authorized) return children

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#f5f5f5'
    }}>
      <div style={{
        background: '#fff', padding: '40px', borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', minWidth: '320px', textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '24px', fontSize: '20px', color: '#111' }}>🔒 Введите пароль</h2>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Пароль"
          autoFocus
          style={{
            width: '100%', padding: '12px 16px', fontSize: '16px',
            border: `1px solid ${error ? '#e53e3e' : '#ddd'}`, borderRadius: '8px',
            outline: 'none', boxSizing: 'border-box', marginBottom: '8px'
          }}
        />
        {error && <p style={{ color: '#e53e3e', fontSize: '14px', marginBottom: '12px' }}>Неверный пароль</p>}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '12px', background: '#111', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '8px'
          }}
        >
          Войти
        </button>
      </div>
    </div>
  )
}