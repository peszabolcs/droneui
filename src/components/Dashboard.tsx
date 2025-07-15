import { useState } from 'react'
import './Dashboard.css'
import DroneDashboard from './DroneDashboard'
import EmergencyOverride from './EmergencyOverride'
import InspectionHistory from './InspectionHistory'
import AircraftSelector from './AircraftSelector'
import GeofencingConfig from './GeofencingConfig'
import NotificationFeed from './NotificationFeed'

interface DashboardProps {
  onLogout: () => void
}

type ActiveView = 'drone' | 'emergency' | 'history' | 'aircraft' | 'geofencing'

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('drone')
  const [selectedDrone, setSelectedDrone] = useState('DRONE-001')
  const [isNotificationOpen, setIsNotificationOpen] = useState(true)

  const drones = [
    { id: 'DRONE-001', name: 'Alpha-1', status: 'active' },
    { id: 'DRONE-002', name: 'Beta-2', status: 'standby' },
    { id: 'DRONE-003', name: 'Gamma-3', status: 'charging' },
  ]

  const renderActiveView = () => {
    switch (activeView) {
      case 'drone':
        return <DroneDashboard droneId={selectedDrone} />
      case 'emergency':
        return <EmergencyOverride droneId={selectedDrone} />
      case 'history':
        return <InspectionHistory />
      case 'aircraft':
        return <AircraftSelector />
      case 'geofencing':
        return <GeofencingConfig />
      default:
        return <DroneDashboard droneId={selectedDrone} />
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
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
            <span>FlightCore</span>
          </div>
          
          <div className="drone-selector">
            <label>Active Drone</label>
            <select 
              value={selectedDrone} 
              onChange={(e) => setSelectedDrone(e.target.value)}
              className="drone-select"
            >
              {drones.map(drone => (
                <option key={drone.id} value={drone.id}>
                  {drone.name} ({drone.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeView === 'drone' ? 'active' : ''}`}
            onClick={() => setActiveView('drone')}
          >
            <span className="nav-icon">🎯</span>
            Drone Dashboard
          </button>
          
          <button 
            className={`nav-item ${activeView === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveView('emergency')}
          >
            <span className="nav-icon">🚨</span>
            Emergency Override
          </button>
          
          <button 
            className={`nav-item ${activeView === 'history' ? 'active' : ''}`}
            onClick={() => setActiveView('history')}
          >
            <span className="nav-icon">📋</span>
            Inspection History
          </button>
          
          <button 
            className={`nav-item ${activeView === 'aircraft' ? 'active' : ''}`}
            onClick={() => setActiveView('aircraft')}
          >
            <span className="nav-icon">✈️</span>
            Aircraft Selector
          </button>
          
          <button 
            className={`nav-item ${activeView === 'geofencing' ? 'active' : ''}`}
            onClick={() => setActiveView('geofencing')}
          >
            <span className="nav-icon">🗺️</span>
            Geofencing Config
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="main-header">
          <h1>{activeView.charAt(0).toUpperCase() + activeView.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
          <button 
            className="notification-toggle"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <span className="nav-icon">🔔</span>
            Notifications
          </button>
        </div>

        <div className="main-content">
          {renderActiveView()}
        </div>
      </div>

      <NotificationFeed isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </div>
  )
}