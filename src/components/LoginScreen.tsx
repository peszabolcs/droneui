import { useState } from 'react'
import './LoginScreen.css'

interface LoginScreenProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      onLogin()
    }
  }

  return (
    <div className="login-screen">
      <div className="login-background">
        <div className="login-overlay" />
      </div>
      
      <div className="login-container">
        <div className="login-panel glass-panel">
          <div className="login-header">
            <div className="logo">
              <div className="logo-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
                  <path d="M24 16L16 20V28L24 32L32 28V20L24 16Z" fill="url(#gradient)"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00bfff" />
                      <stop offset="100%" stopColor="#8a2be2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1>FlightCore</h1>
            </div>
            <p className="login-subtitle">RWS-700 Runway Watch System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username / Email</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-gradient login-button">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>Admin Access Only</p>
          </div>
        </div>
      </div>
    </div>
  )
}