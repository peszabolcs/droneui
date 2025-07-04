import { useState } from 'react'
import './InspectionHistory.css'

interface InspectionRecord {
  id: string
  aircraftId: string
  aircraftType: string
  timestamp: Date
  droneId: string
  duration: number
  anomaliesFound: number
  aiConfidence: number
  status: 'completed' | 'in_progress' | 'failed'
  images: string[]
  notes: string
}

export default function InspectionHistory() {
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list')
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null)

  const mockData: InspectionRecord[] = [
    {
      id: 'INS-2024-001',
      aircraftId: 'N123AA',
      aircraftType: 'Boeing 737-800',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      droneId: 'DRONE-001',
      duration: 45,
      anomaliesFound: 2,
      aiConfidence: 94.5,
      status: 'completed',
      images: ['wing-damage.jpg', 'fuselage-check.jpg', 'engine-inspection.jpg'],
      notes: 'Minor surface scratches detected on left wing. Recommended maintenance scheduled.'
    },
    {
      id: 'INS-2024-002',
      aircraftId: 'N456BB',
      aircraftType: 'Airbus A320',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      droneId: 'DRONE-002',
      duration: 38,
      anomaliesFound: 0,
      aiConfidence: 98.2,
      status: 'completed',
      images: ['full-scan.jpg', 'landing-gear.jpg'],
      notes: 'Aircraft passed all inspection criteria. No anomalies detected.'
    },
    {
      id: 'INS-2024-003',
      aircraftId: 'N789CC',
      aircraftType: 'Boeing 787-9',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      droneId: 'DRONE-001',
      duration: 62,
      anomaliesFound: 1,
      aiConfidence: 91.8,
      status: 'completed',
      images: ['composite-check.jpg', 'wing-inspection.jpg', 'tail-section.jpg', 'engines.jpg'],
      notes: 'Composite panel showing signs of weathering. Within acceptable parameters.'
    },
    {
      id: 'INS-2024-004',
      aircraftId: 'N321DD',
      aircraftType: 'Airbus A350',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      droneId: 'DRONE-003',
      duration: 0,
      anomaliesFound: 0,
      aiConfidence: 0,
      status: 'failed',
      images: [],
      notes: 'Inspection failed due to weather conditions. Rescheduled for next available slot.'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#00ff88'
      case 'in_progress': return '#ffaa00'
      case 'failed': return '#ff3b30'
      default: return '#ffffff'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return '#00ff88'
    if (confidence >= 85) return '#ffaa00'
    return '#ff3b30'
  }

  const formatDuration = (minutes: number) => {
    if (minutes === 0) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const downloadReport = (record: InspectionRecord) => {
    console.log('Downloading report for:', record.id)
  }

  const exportData = () => {
    console.log('Exporting inspection data...')
  }

  return (
    <div className="inspection-history">
      <div className="history-header">
        <h2>Inspection History</h2>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋 List
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
              onClick={() => setViewMode('gallery')}
            >
              🖼️ Gallery
            </button>
          </div>
          <button className="export-btn btn-gradient" onClick={exportData}>
            📊 Export Data
          </button>
        </div>
      </div>

      <div className="history-stats">
        <div className="stat-card glass-panel">
          <div className="stat-value">247</div>
          <div className="stat-label">Total Inspections</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">94.2%</div>
          <div className="stat-label">Success Rate</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">42</div>
          <div className="stat-label">Anomalies Found</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">96.1%</div>
          <div className="stat-label">Avg. AI Confidence</div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="history-list">
          {mockData.map(record => (
            <div key={record.id} className="history-item glass-panel">
              <div className="item-header">
                <div className="item-info">
                  <h3>{record.aircraftType}</h3>
                  <div className="item-subtitle">
                    {record.aircraftId} • {record.timestamp.toLocaleString()}
                  </div>
                </div>
                <div className="item-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(record.status) }}
                  >
                    {record.status}
                  </span>
                </div>
              </div>

              <div className="item-content">
                <div className="item-details">
                  <div className="detail-row">
                    <span className="detail-label">Drone:</span>
                    <span className="detail-value">{record.droneId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{formatDuration(record.duration)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Anomalies:</span>
                    <span className="detail-value">{record.anomaliesFound}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">AI Confidence:</span>
                    <span 
                      className="detail-value confidence-value"
                      style={{ color: getConfidenceColor(record.aiConfidence) }}
                    >
                      {record.aiConfidence > 0 ? `${record.aiConfidence}%` : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="item-images">
                  {record.images.slice(0, 3).map((_, index) => (
                    <div key={index} className="image-thumbnail">
                      <div className="image-placeholder">
                        📸
                      </div>
                    </div>
                  ))}
                  {record.images.length > 3 && (
                    <div className="image-more">
                      +{record.images.length - 3}
                    </div>
                  )}
                </div>
              </div>

              <div className="item-notes">
                <p>{record.notes}</p>
              </div>

              <div className="item-actions">
                <button 
                  className="action-btn"
                  onClick={() => setSelectedRecord(record)}
                >
                  👁️ View Details
                </button>
                <button 
                  className="action-btn"
                  onClick={() => downloadReport(record)}
                >
                  📥 Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="history-gallery">
          {mockData.map(record => (
            <div key={record.id} className="gallery-item glass-panel">
              <div className="gallery-header">
                <h4>{record.aircraftType}</h4>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(record.status) }}
                >
                  {record.status}
                </span>
              </div>
              
              <div className="gallery-images">
                {record.images.slice(0, 4).map((_, index) => (
                  <div key={index} className="gallery-image">
                    <div className="image-placeholder">
                      📸
                    </div>
                  </div>
                ))}
                {record.images.length === 0 && (
                  <div className="no-images">
                    No images available
                  </div>
                )}
              </div>

              <div className="gallery-info">
                <div className="info-item">
                  <span className="info-label">ID:</span>
                  <span className="info-value">{record.aircraftId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Confidence:</span>
                  <span 
                    className="info-value"
                    style={{ color: getConfidenceColor(record.aiConfidence) }}
                  >
                    {record.aiConfidence > 0 ? `${record.aiConfidence}%` : 'N/A'}
                  </span>
                </div>
              </div>

              <button 
                className="gallery-action btn-gradient"
                onClick={() => setSelectedRecord(record)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Inspection Details</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedRecord(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-section">
                  <h4>Aircraft Information</h4>
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{selectedRecord.aircraftType}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{selectedRecord.aircraftId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Inspection ID:</span>
                    <span className="detail-value">{selectedRecord.id}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Inspection Data</h4>
                  <div className="detail-row">
                    <span className="detail-label">Drone:</span>
                    <span className="detail-value">{selectedRecord.droneId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{formatDuration(selectedRecord.duration)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Anomalies:</span>
                    <span className="detail-value">{selectedRecord.anomaliesFound}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">AI Confidence:</span>
                    <span 
                      className="detail-value"
                      style={{ color: getConfidenceColor(selectedRecord.aiConfidence) }}
                    >
                      {selectedRecord.aiConfidence > 0 ? `${selectedRecord.aiConfidence}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="notes-section">
                <h4>Notes</h4>
                <p>{selectedRecord.notes}</p>
              </div>

              <div className="images-section">
                <h4>Images ({selectedRecord.images.length})</h4>
                <div className="modal-images">
                  {selectedRecord.images.map((image, index) => (
                    <div key={index} className="modal-image">
                      <div className="image-placeholder">
                        📸
                      </div>
                      <span className="image-name">{image}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}