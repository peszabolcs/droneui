import { useState } from 'react'
import './EmergencyOverride.css'

interface EmergencyOverrideProps {
  droneId: string
}

export default function EmergencyOverride({ droneId }: EmergencyOverrideProps) {
  const [isControlActive, setIsControlActive] = useState(false)
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 })

  const handleTakeControl = () => {
    setIsControlActive(true)
  }

  const handleReleaseControl = () => {
    setIsControlActive(false)
    setJoystickPosition({ x: 0, y: 0 })
  }

  const handleEmergencyStop = () => {
    setIsControlActive(false)
    setJoystickPosition({ x: 0, y: 0 })
  }

  const handleReturnToDock = () => {
    setIsControlActive(false)
    setJoystickPosition({ x: 0, y: 0 })
  }

  return (
    <div className="emergency-override">
      <div className="emergency-header">
        <div className="drone-info">
          <h2>Emergency Override</h2>
          <div className="drone-id">Controlling: {droneId}</div>
        </div>
        <div className="connection-status">
          <div className="status-indicator active" />
          <span>Connected</span>
        </div>
      </div>

      <div className="override-grid">
        <div className="control-panel glass-panel">
          <div className="panel-header">
            <h3>Manual Control</h3>
            <div className={`control-status ${isControlActive ? 'active' : 'inactive'}`}>
              {isControlActive ? 'ACTIVE' : 'STANDBY'}
            </div>
          </div>

          <div className="control-actions">
            {!isControlActive ? (
              <button 
                className="take-control-btn btn-gradient"
                onClick={handleTakeControl}
              >
                <span className="btn-icon">🎮</span>
                Take Control
              </button>
            ) : (
              <button 
                className="release-control-btn"
                onClick={handleReleaseControl}
              >
                <span className="btn-icon">🔄</span>
                Release Control
              </button>
            )}
          </div>

          <div className="emergency-actions">
            <button 
              className="emergency-btn emergency-stop"
              onClick={handleEmergencyStop}
            >
              <span className="btn-icon">🛑</span>
              Emergency Stop
            </button>
            
            <button 
              className="emergency-btn return-dock"
              onClick={handleReturnToDock}
            >
              <span className="btn-icon">🏠</span>
              Return to Dock
            </button>
          </div>
        </div>

        <div className="joystick-panel glass-panel">
          <div className="panel-header">
            <h3>Directional Control</h3>
            <div className="joystick-coordinates">
              X: {joystickPosition.x.toFixed(2)}, Y: {joystickPosition.y.toFixed(2)}
            </div>
          </div>

          <div className="joystick-container">
            <div className="joystick-area">
              <div className="joystick-background">
                <div className="joystick-center" />
                <div className="joystick-rings">
                  <div className="ring ring-1" />
                  <div className="ring ring-2" />
                  <div className="ring ring-3" />
                </div>
              </div>
              <div 
                className={`joystick-knob ${isControlActive ? 'active' : ''}`}
                style={{
                  transform: `translate(${joystickPosition.x * 60}px, ${joystickPosition.y * 60}px)`
                }}
              />
            </div>
          </div>

          <div className="control-indicators">
            <div className="indicator-row">
              <div className="indicator">
                <span className="indicator-label">Throttle</span>
                <div className="indicator-bar">
                  <div 
                    className="indicator-fill" 
                    style={{ height: `${Math.abs(joystickPosition.y) * 100}%` }}
                  />
                </div>
              </div>
              <div className="indicator">
                <span className="indicator-label">Yaw</span>
                <div className="indicator-bar">
                  <div 
                    className="indicator-fill" 
                    style={{ height: `${Math.abs(joystickPosition.x) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flight-data glass-panel">
          <div className="panel-header">
            <h3>Flight Data</h3>
            <div className="data-timestamp">
              Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="data-grid">
            <div className="data-item">
              <span className="data-label">Altitude</span>
              <span className="data-value">150 ft</span>
            </div>
            <div className="data-item">
              <span className="data-label">Speed</span>
              <span className="data-value">12.5 mph</span>
            </div>
            <div className="data-item">
              <span className="data-label">Heading</span>
              <span className="data-value">270°</span>
            </div>
            <div className="data-item">
              <span className="data-label">Battery</span>
              <span className="data-value">87%</span>
            </div>
            <div className="data-item">
              <span className="data-label">Signal</span>
              <span className="data-value">Strong</span>
            </div>
            <div className="data-item">
              <span className="data-label">Mode</span>
              <span className="data-value">{isControlActive ? 'Manual' : 'Auto'}</span>
            </div>
          </div>
        </div>

        <div className="safety-panel glass-panel">
          <div className="panel-header">
            <h3>Safety Systems</h3>
            <div className="safety-status">
              <div className="status-indicator active" />
              All Clear
            </div>
          </div>

          <div className="safety-checklist">
            <div className="safety-item">
              <div className="safety-icon">✅</div>
              <span>Geofencing Active</span>
            </div>
            <div className="safety-item">
              <div className="safety-icon">✅</div>
              <span>Collision Avoidance</span>
            </div>
            <div className="safety-item">
              <div className="safety-icon">✅</div>
              <span>Return-to-Home Ready</span>
            </div>
            <div className="safety-item">
              <div className="safety-icon">✅</div>
              <span>Emergency Stop Armed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}