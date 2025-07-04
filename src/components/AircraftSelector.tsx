import { useState } from 'react'
import './AircraftSelector.css'

interface Aircraft {
  id: string
  type: string
  manufacturer: string
  model: string
  variant: string
  description: string
  image: string
  inspectionTime: number
  lastInspected?: Date
  status: 'available' | 'in_use' | 'maintenance'
}

export default function AircraftSelector() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null)

  const aircraftData: Aircraft[] = [
    {
      id: 'A320-001',
      type: 'A320',
      manufacturer: 'Airbus',
      model: 'A320',
      variant: 'A320-200',
      description: 'Single-aisle, narrow-body commercial aircraft',
      image: 'a320.jpg',
      inspectionTime: 35,
      lastInspected: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'available'
    },
    {
      id: 'B737-001',
      type: 'B737',
      manufacturer: 'Boeing',
      model: '737',
      variant: '737-800',
      description: 'Single-aisle commercial aircraft, most popular variant',
      image: 'b737.jpg',
      inspectionTime: 40,
      lastInspected: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'available'
    },
    {
      id: 'B787-001',
      type: 'B787',
      manufacturer: 'Boeing',
      model: '787',
      variant: '787-9 Dreamliner',
      description: 'Wide-body, long-haul commercial aircraft with composite construction',
      image: 'b787.jpg',
      inspectionTime: 60,
      lastInspected: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'in_use'
    },
    {
      id: 'A350-001',
      type: 'A350',
      manufacturer: 'Airbus',
      model: 'A350',
      variant: 'A350-900',
      description: 'Wide-body, long-range commercial aircraft',
      image: 'a350.jpg',
      inspectionTime: 55,
      lastInspected: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'available'
    },
    {
      id: 'A380-001',
      type: 'A380',
      manufacturer: 'Airbus',
      model: 'A380',
      variant: 'A380-800',
      description: 'Double-deck, wide-body, four-engine commercial aircraft',
      image: 'a380.jpg',
      inspectionTime: 90,
      lastInspected: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: 'maintenance'
    },
    {
      id: 'B777-001',
      type: 'B777',
      manufacturer: 'Boeing',
      model: '777',
      variant: '777-300ER',
      description: 'Wide-body, long-range commercial aircraft',
      image: 'b777.jpg',
      inspectionTime: 65,
      lastInspected: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'available'
    }
  ]

  const filteredAircraft = aircraftData.filter(aircraft => {
    const matchesSearch = aircraft.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aircraft.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aircraft.variant.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || aircraft.status === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#00ff88'
      case 'in_use': return '#ffaa00'
      case 'maintenance': return '#ff3b30'
      default: return '#ffffff'
    }
  }

  const loadInspectionPath = (aircraft: Aircraft) => {
    console.log('Loading inspection path for:', aircraft.type)
    setSelectedAircraft(aircraft)
  }

  const configureAircraft = (aircraft: Aircraft) => {
    console.log('Configuring aircraft:', aircraft.type)
  }

  const startInspection = (aircraft: Aircraft) => {
    console.log('Starting inspection for:', aircraft.type)
  }

  return (
    <div className="aircraft-selector">
      <div className="selector-header">
        <h2>Aircraft Selector</h2>
        <div className="header-stats">
          <span className="stat-item">
            <span className="stat-value">{aircraftData.length}</span>
            <span className="stat-label">Aircraft Types</span>
          </span>
          <span className="stat-item">
            <span className="stat-value">{aircraftData.filter(a => a.status === 'available').length}</span>
            <span className="stat-label">Available</span>
          </span>
        </div>
      </div>

      <div className="selector-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search aircraft types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <button
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'available' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('available')}
          >
            Available
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'in_use' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('in_use')}
          >
            In Use
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'maintenance' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('maintenance')}
          >
            Maintenance
          </button>
        </div>
      </div>

      <div className="aircraft-grid">
        {filteredAircraft.map(aircraft => (
          <div 
            key={aircraft.id} 
            className={`aircraft-card glass-panel ${aircraft.status}`}
          >
            <div className="card-header">
              <div className="aircraft-type">
                <h3>{aircraft.type}</h3>
                <span className="aircraft-variant">{aircraft.variant}</span>
              </div>
              <div 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(aircraft.status) }}
              >
                {aircraft.status}
              </div>
            </div>

            <div className="aircraft-image">
              <div className="image-placeholder">
                ✈️
              </div>
              <div className="image-overlay">
                <span className="manufacturer">{aircraft.manufacturer}</span>
              </div>
            </div>

            <div className="aircraft-info">
              <p className="description">{aircraft.description}</p>
              
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Est. Inspection Time</span>
                  <span className="info-value">{aircraft.inspectionTime} min</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Inspected</span>
                  <span className="info-value">
                    {aircraft.lastInspected 
                      ? aircraft.lastInspected.toLocaleDateString()
                      : 'Never'
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="action-btn secondary"
                onClick={() => loadInspectionPath(aircraft)}
                disabled={aircraft.status === 'maintenance'}
              >
                📋 Load Path
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => configureAircraft(aircraft)}
              >
                ⚙️ Configure
              </button>
              <button 
                className="action-btn primary btn-gradient"
                onClick={() => startInspection(aircraft)}
                disabled={aircraft.status !== 'available'}
              >
                🚁 Start Inspection
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAircraft.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No aircraft found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      {selectedAircraft && (
        <div className="modal-overlay" onClick={() => setSelectedAircraft(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Inspection Path: {selectedAircraft.type}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedAircraft(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="path-preview">
                <h4>Predefined Inspection Route</h4>
                <div className="path-steps">
                  <div className="path-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h5>Fuselage Inspection</h5>
                      <p>Complete external hull scan for damage, corrosion, or structural issues</p>
                    </div>
                  </div>
                  <div className="path-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h5>Wing Structure Analysis</h5>
                      <p>Detailed scan of wing surfaces, control surfaces, and attachment points</p>
                    </div>
                  </div>
                  <div className="path-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h5>Engine Cowling Check</h5>
                      <p>Visual inspection of engine housings and inlet/outlet conditions</p>
                    </div>
                  </div>
                  <div className="path-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h5>Landing Gear Examination</h5>
                      <p>Inspection of landing gear components and hydraulic systems</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="path-actions">
                <button 
                  className="btn-gradient modal-action"
                  onClick={() => {
                    startInspection(selectedAircraft)
                    setSelectedAircraft(null)
                  }}
                >
                  🚁 Begin Inspection
                </button>
                <button 
                  className="secondary-btn modal-action"
                  onClick={() => setSelectedAircraft(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}