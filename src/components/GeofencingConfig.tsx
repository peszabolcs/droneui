import { useState } from 'react'
import './GeofencingConfig.css'

interface Zone {
  id: string
  name: string
  type: 'safe' | 'caution' | 'no-fly'
  coordinates: { x: number; y: number }[]
  altitudeMin: number
  altitudeMax: number
  active: boolean
}

export default function GeofencingConfig() {
  const [selectedTool, setSelectedTool] = useState<'select' | 'draw' | 'edit'>('select')
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [showAltitudeLimits, setShowAltitudeLimits] = useState(true)
  const [aircraftView, setAircraftView] = useState('top')

  const [zones, setZones] = useState<Zone[]>([
    {
      id: 'zone-1',
      name: 'Safe Zone - Fuselage',
      type: 'safe',
      coordinates: [
        { x: 0.3, y: 0.2 },
        { x: 0.7, y: 0.2 },
        { x: 0.7, y: 0.8 },
        { x: 0.3, y: 0.8 }
      ],
      altitudeMin: 5,
      altitudeMax: 50,
      active: true
    },
    {
      id: 'zone-2',
      name: 'Caution Zone - Wings',
      type: 'caution',
      coordinates: [
        { x: 0.1, y: 0.35 },
        { x: 0.9, y: 0.35 },
        { x: 0.9, y: 0.65 },
        { x: 0.1, y: 0.65 }
      ],
      altitudeMin: 10,
      altitudeMax: 30,
      active: true
    },
    {
      id: 'zone-3',
      name: 'No-Fly Zone - Engines',
      type: 'no-fly',
      coordinates: [
        { x: 0.15, y: 0.45 },
        { x: 0.25, y: 0.45 },
        { x: 0.25, y: 0.55 },
        { x: 0.15, y: 0.55 }
      ],
      altitudeMin: 0,
      altitudeMax: 100,
      active: true
    }
  ])

  const getZoneColor = (type: string, active: boolean) => {
    const opacity = active ? 0.3 : 0.1
    switch (type) {
      case 'safe': return `rgba(0, 255, 136, ${opacity})`
      case 'caution': return `rgba(255, 170, 0, ${opacity})`
      case 'no-fly': return `rgba(255, 59, 48, ${opacity})`
      default: return `rgba(255, 255, 255, ${opacity})`
    }
  }

  const getZoneBorderColor = (type: string) => {
    switch (type) {
      case 'safe': return '#00ff88'
      case 'caution': return '#ffaa00'
      case 'no-fly': return '#ff3b30'
      default: return '#ffffff'
    }
  }

  const addZone = () => {
    const newZone: Zone = {
      id: `zone-${Date.now()}`,
      name: `New Zone ${zones.length + 1}`,
      type: 'safe',
      coordinates: [
        { x: 0.4, y: 0.4 },
        { x: 0.6, y: 0.4 },
        { x: 0.6, y: 0.6 },
        { x: 0.4, y: 0.6 }
      ],
      altitudeMin: 5,
      altitudeMax: 50,
      active: true
    }
    setZones([...zones, newZone])
    setSelectedZone(newZone)
  }

  const deleteZone = (zoneId: string) => {
    setZones(zones.filter(z => z.id !== zoneId))
    if (selectedZone?.id === zoneId) {
      setSelectedZone(null)
    }
  }

  const toggleZone = (zoneId: string) => {
    setZones(zones.map(z => 
      z.id === zoneId ? { ...z, active: !z.active } : z
    ))
  }

  const updateZone = (updatedZone: Zone) => {
    setZones(zones.map(z => z.id === updatedZone.id ? updatedZone : z))
    setSelectedZone(updatedZone)
  }

  const saveConfiguration = () => {
    console.log('Saving geofencing configuration:', zones)
  }

  const loadTemplate = () => {
    console.log('Loading geofencing template...')
  }

  return (
    <div className="geofencing-config">
      <div className="config-header">
        <h2>Geofencing Configuration</h2>
        <div className="header-actions">
          <button className="action-btn secondary" onClick={loadTemplate}>
            📋 Load Template
          </button>
          <button className="action-btn btn-gradient" onClick={saveConfiguration}>
            💾 Save Config
          </button>
        </div>
      </div>

      <div className="config-layout">
        <div className="config-sidebar">
          <div className="tool-panel glass-panel">
            <h3>Tools</h3>
            <div className="tool-buttons">
              <button 
                className={`tool-btn ${selectedTool === 'select' ? 'active' : ''}`}
                onClick={() => setSelectedTool('select')}
              >
                <span className="tool-icon">👆</span>
                Select
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'draw' ? 'active' : ''}`}
                onClick={() => setSelectedTool('draw')}
              >
                <span className="tool-icon">✏️</span>
                Draw Zone
              </button>
              <button 
                className={`tool-btn ${selectedTool === 'edit' ? 'active' : ''}`}
                onClick={() => setSelectedTool('edit')}
              >
                <span className="tool-icon">✂️</span>
                Edit Zone
              </button>
            </div>
          </div>

          <div className="zones-panel glass-panel">
            <div className="panel-header">
              <h3>Safety Zones</h3>
              <button className="add-zone-btn" onClick={addZone}>
                ➕ Add Zone
              </button>
            </div>
            
            <div className="zones-list">
              {zones.map(zone => (
                <div 
                  key={zone.id}
                  className={`zone-item ${selectedZone?.id === zone.id ? 'selected' : ''}`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="zone-header">
                    <div className="zone-info">
                      <div 
                        className="zone-color-indicator"
                        style={{ backgroundColor: getZoneBorderColor(zone.type) }}
                      />
                      <span className="zone-name">{zone.name}</span>
                    </div>
                    <div className="zone-controls">
                      <button 
                        className={`toggle-btn ${zone.active ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleZone(zone.id)
                        }}
                      >
                        {zone.active ? '👁️' : '🚫'}
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteZone(zone.id)
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="zone-details">
                    <span className="zone-type">{zone.type}</span>
                    <span className="zone-altitude">
                      {zone.altitudeMin}-{zone.altitudeMax}ft
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="settings-panel glass-panel">
            <h3>Display Settings</h3>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox"
                  checked={showAltitudeLimits}
                  onChange={(e) => setShowAltitudeLimits(e.target.checked)}
                />
                Show Altitude Limits
              </label>
            </div>
            <div className="setting-item">
              <label>Aircraft View:</label>
              <select 
                value={aircraftView}
                onChange={(e) => setAircraftView(e.target.value)}
              >
                <option value="top">Top View</option>
                <option value="side">Side View</option>
                <option value="3d">3D View</option>
              </select>
            </div>
          </div>
        </div>

        <div className="config-main">
          <div className="diagram-container glass-panel">
            <div className="diagram-header">
              <h3>Aircraft Safety Zones - {aircraftView.toUpperCase()} View</h3>
              <div className="diagram-controls">
                <button className="zoom-btn">🔍➕</button>
                <button className="zoom-btn">🔍➖</button>
                <button className="reset-btn">🎯</button>
              </div>
            </div>

            <div className="aircraft-diagram">
              <svg width="100%" height="100%" viewBox="0 0 800 400">
                {/* Aircraft outline */}
                <g className="aircraft-outline">
                  {/* Fuselage */}
                  <ellipse 
                    cx="400" 
                    cy="200" 
                    rx="280" 
                    ry="40" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.5)" 
                    strokeWidth="2"
                  />
                  {/* Wings */}
                  <ellipse 
                    cx="400" 
                    cy="200" 
                    rx="380" 
                    ry="80" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.3)" 
                    strokeWidth="1"
                  />
                  {/* Cockpit */}
                  <circle 
                    cx="680" 
                    cy="200" 
                    r="15" 
                    fill="rgba(0, 191, 255, 0.3)" 
                    stroke="#00bfff" 
                    strokeWidth="1"
                  />
                  {/* Engines */}
                  <ellipse cx="300" cy="160" rx="20" ry="30" fill="rgba(255, 59, 48, 0.3)" stroke="#ff3b30" strokeWidth="1"/>
                  <ellipse cx="300" cy="240" rx="20" ry="30" fill="rgba(255, 59, 48, 0.3)" stroke="#ff3b30" strokeWidth="1"/>
                </g>

                {/* Safety zones */}
                {zones.map(zone => (
                  <g key={zone.id} className="safety-zone">
                    <polygon
                      points={zone.coordinates.map(coord => 
                        `${coord.x * 800},${coord.y * 400}`
                      ).join(' ')}
                      fill={getZoneColor(zone.type, zone.active)}
                      stroke={getZoneBorderColor(zone.type)}
                      strokeWidth={selectedZone?.id === zone.id ? "3" : "1"}
                      strokeDasharray={zone.active ? "none" : "5,5"}
                      className="zone-polygon"
                      onClick={() => setSelectedZone(zone)}
                    />
                    {selectedZone?.id === zone.id && zone.coordinates.map((coord, index) => (
                      <circle
                        key={index}
                        cx={coord.x * 800}
                        cy={coord.y * 400}
                        r="4"
                        fill="#00bfff"
                        stroke="#ffffff"
                        strokeWidth="1"
                        className="control-point"
                      />
                    ))}
                  </g>
                ))}

                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {showAltitudeLimits && selectedZone && (
                <div className="altitude-overlay">
                  <div className="altitude-info">
                    <h4>{selectedZone.name}</h4>
                    <div className="altitude-range">
                      <span>Min: {selectedZone.altitudeMin}ft</span>
                      <span>Max: {selectedZone.altitudeMax}ft</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="config-properties">
          {selectedZone && (
            <div className="properties-panel glass-panel">
              <h3>Zone Properties</h3>
              
              <div className="property-group">
                <label>Zone Name</label>
                <input 
                  type="text"
                  value={selectedZone.name}
                  onChange={(e) => updateZone({...selectedZone, name: e.target.value})}
                />
              </div>

              <div className="property-group">
                <label>Zone Type</label>
                <select 
                  value={selectedZone.type}
                  onChange={(e) => updateZone({...selectedZone, type: e.target.value as any})}
                >
                  <option value="safe">Safe Zone</option>
                  <option value="caution">Caution Zone</option>
                  <option value="no-fly">No-Fly Zone</option>
                </select>
              </div>

              <div className="property-group">
                <label>Altitude Range</label>
                <div className="altitude-inputs">
                  <div className="altitude-input">
                    <label>Min (ft)</label>
                    <input 
                      type="number"
                      value={selectedZone.altitudeMin}
                      onChange={(e) => updateZone({...selectedZone, altitudeMin: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="altitude-input">
                    <label>Max (ft)</label>
                    <input 
                      type="number"
                      value={selectedZone.altitudeMax}
                      onChange={(e) => updateZone({...selectedZone, altitudeMax: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="property-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={selectedZone.active}
                    onChange={(e) => updateZone({...selectedZone, active: e.target.checked})}
                  />
                  Zone Active
                </label>
              </div>

              <div className="property-actions">
                <button 
                  className="property-btn secondary"
                  onClick={() => setSelectedZone(null)}
                >
                  Close
                </button>
                <button 
                  className="property-btn danger"
                  onClick={() => deleteZone(selectedZone.id)}
                >
                  Delete Zone
                </button>
              </div>
            </div>
          )}

          <div className="legend-panel glass-panel">
            <h3>Legend</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#00ff88' }} />
                <span>Safe Zone</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ffaa00' }} />
                <span>Caution Zone</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ff3b30' }} />
                <span>No-Fly Zone</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#00bfff' }} />
                <span>Aircraft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}