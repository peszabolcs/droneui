import { useState, useEffect } from 'react'
import './NotificationFeed.css'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationFeedProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationFeed({ isOpen, onClose }: NotificationFeedProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      message: 'Drone ALPHA-1 inspection completed successfully',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'warning',
      message: 'Battery low on BETA-2 (45% remaining)',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      message: 'GAMMA-3 charging cycle initiated',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      type: 'error',
      message: 'GPS signal lost on ALPHA-1 (recovered)',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true
    },
    {
      id: '5',
      type: 'info',
      message: 'New aircraft model A380 added to database',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    }
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return 'ℹ️'
      case 'warning': return '⚠️'
      case 'error': return '🚨'
      case 'success': return '✅'
      default: return 'ℹ️'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return '#00bfff'
      case 'warning': return '#ffaa00'
      case 'error': return '#ff3b30'
      case 'success': return '#00ff88'
      default: return '#00bfff'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? 'warning' : 'info',
        message: Math.random() > 0.5 
          ? 'Drone position updated' 
          : 'System status check completed',
        timestamp: new Date(),
        read: false
      }
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 50))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`notification-feed ${isOpen ? 'open' : ''}`}>
      <div className="notification-header">
        <div className="header-left">
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <span className="no-notif-icon">🔕</span>
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <div className="notification-icon-wrapper">
                  <span 
                    className="notification-icon"
                    style={{ color: getNotificationColor(notification.type) }}
                  >
                    {getNotificationIcon(notification.type)}
                  </span>
                  {!notification.read && <div className="unread-dot" />}
                </div>
                <div className="notification-text">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
              </div>
              <div 
                className="notification-badge"
                style={{ backgroundColor: getNotificationColor(notification.type) }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}