import './DroneDashboard.css'

interface DroneDashboardProps {
  droneId: string
}

export default function DroneDashboard({ droneId }: DroneDashboardProps) {
  const mockDroneData = {
    'DRONE-001': {
      name: 'Alpha-1',
      battery: 87,
      coordinates: { lat: 40.7128, lng: -74.0060 },
      altitude: 150,
      speed: 12.5,
      flightMode: 'autonomous',
      status: 'active',
      warnings: [],
      lastUpdate: new Date().toISOString()
    },
    'DRONE-002': {
      name: 'Beta-2',
      battery: 45,
      coordinates: { lat: 40.7589, lng: -73.9851 },
      altitude: 0,
      speed: 0,
      flightMode: 'manual',
      status: 'standby',
      warnings: ['Low Battery'],
      lastUpdate: new Date().toISOString()
    },
    'DRONE-003': {
      name: 'Gamma-3',
      battery: 92,
      coordinates: { lat: 40.7505, lng: -73.9934 },
      altitude: 0,
      speed: 0,
      flightMode: 'manual',
      status: 'charging',
      warnings: [],
      lastUpdate: new Date().toISOString()
    }
  }

  const drone = mockDroneData[droneId as keyof typeof mockDroneData] || mockDroneData['DRONE-001']

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return '#00ff88'
    if (battery > 30) return '#ffaa00'
    return '#ff3b30'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#00ff88'
      case 'standby': return '#ffaa00'
      case 'charging': return '#00bfff'
      default: return '#ff3b30'
    }
  }

  return (
    <div className="drone-dashboard">
      <div className="drone-header">
        <h2>{drone.name}</h2>
        <div className="drone-id">ID: {droneId}</div>
      </div>

      <div className="dashboard-grid">
        <div className="status-card glass-panel">
          <div className="card-header">
            <h3>Flight Status</h3>
            <div 
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(drone.status) }}
            />
          </div>
          <div className="status-content">
            <div className="status-item">
              <span className="label">Mode:</span>
              <span className="value">{drone.flightMode}</span>
            </div>
            <div className="status-item">
              <span className="label">Status:</span>
              <span className="value">{drone.status}</span>
            </div>
            <div className="status-item">
              <span className="label">Last Update:</span>
              <span className="value">{new Date(drone.lastUpdate).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="battery-card glass-panel">
          <div className="card-header">
            <h3>Battery</h3>
            <div className="battery-percentage">{drone.battery}%</div>
          </div>
          <div className="battery-visual">
            <div className="battery-container">
              <div 
                className="battery-fill"
                style={{ 
                  width: `${drone.battery}%`,
                  backgroundColor: getBatteryColor(drone.battery)
                }}
              />
            </div>
          </div>
        </div>

        <div className="coordinates-card glass-panel">
          <div className="card-header">
            <h3>GPS Coordinates</h3>
          </div>
          <div className="coordinates-content">
            <div className="coordinate-item">
              <span className="label">Latitude:</span>
              <span className="value">{drone.coordinates.lat.toFixed(6)}</span>
            </div>
            <div className="coordinate-item">
              <span className="label">Longitude:</span>
              <span className="value">{drone.coordinates.lng.toFixed(6)}</span>
            </div>
            <div className="coordinate-item">
              <span className="label">Altitude:</span>
              <span className="value">{drone.altitude} ft</span>
            </div>
            <div className="coordinate-item">
              <span className="label">Speed:</span>
              <span className="value">{drone.speed} mph</span>
            </div>
          </div>
        </div>

        <div className="camera-feed glass-panel">
          <div className="card-header">
            <h3>Live Camera Feed</h3>
            <div className="feed-status">
              <div className="live-indicator" />
              LIVE
            </div>
          </div>
          <div className="camera-container">
            <div className="camera-placeholder">
              <div className="camera-icon">📹</div>
              <p>Camera Feed Placeholder</p>
              <div className="crosshair">
                <div className="crosshair-h" />
                <div className="crosshair-v" />
              </div>
            </div>
          </div>
        </div>

        <div className="warnings-card glass-panel">
          <div className="card-header">
            <h3>Warnings & Alerts</h3>
            <div className="warning-count">
              {drone.warnings.length}
            </div>
          </div>
          <div className="warnings-content">
            {drone.warnings.length > 0 ? (
              drone.warnings.map((warning, index) => (
                <div key={index} className="warning-item">
                  <span className="warning-icon">⚠️</span>
                  <span className="warning-text">{warning}</span>
                </div>
              ))
            ) : (
              <div className="no-warnings">
                <span className="success-icon">✅</span>
                <span>All systems normal</span>
              </div>
            )}
          </div>
        </div>

        <div className="flight-controls glass-panel">
          <div className="card-header">
            <h3>Quick Controls</h3>
          </div>
          <div className="controls-grid">
            <button className="control-btn btn-gradient">
              Return to Base
            </button>
            <button className="control-btn btn-gradient">
              Start Mission
            </button>
            <button className="control-btn btn-gradient">
              Pause Flight
            </button>
            <button className="control-btn emergency-btn">
              Emergency Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}