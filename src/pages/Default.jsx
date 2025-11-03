import { useState, useEffect, useRef } from "react"
import { AlertCircle, MapPin, Thermometer, Wind, TrendingUp, Search, Bell, Settings, ChevronDown, Activity, Users, Clock } from "lucide-react"

// Mock disaster data
const disasterData = [
  {
    id: "1",
    type: "Wildfire",
    location: "California, USA",
    coords: { lat: 36.7783, lng: -119.4179 },
    severity: "critical",
    intensity: 85,
    affectedArea: 1250,
    evacuated: 12500,
    description: "Rapidly spreading wildfire threatening residential areas. Evacuations in progress.",
    lastUpdated: "2 mins ago"
  },
  {
    id: "2",
    type: "Earthquake",
    location: "Tokyo, Japan",
    coords: { lat: 35.6762, lng: 139.6503 },
    severity: "high",
    intensity: 72,
    affectedArea: 890,
    evacuated: 8900,
    description: "6.2 magnitude earthquake detected. Aftershocks expected in the next 24 hours.",
    lastUpdated: "15 mins ago"
  },
  {
    id: "3",
    type: "Flood",
    location: "Mumbai, India",
    coords: { lat: 19.0760, lng: 72.8777 },
    severity: "critical",
    intensity: 90,
    affectedArea: 2100,
    evacuated: 15000,
    description: "Severe monsoon flooding affecting low-lying areas. Emergency services deployed.",
    lastUpdated: "5 mins ago"
  },
  {
    id: "4",
    type: "Hurricane",
    location: "Florida, USA",
    coords: { lat: 27.9944, lng: -81.7603 },
    severity: "high",
    intensity: 78,
    affectedArea: 1800,
    evacuated: 11200,
    description: "Category 3 hurricane approaching coastline. Storm surge warnings issued.",
    lastUpdated: "8 mins ago"
  },
  {
    id: "5",
    type: "Drought",
    location: "Sydney, Australia",
    coords: { lat: -33.8688, lng: 151.2093 },
    severity: "medium",
    intensity: 65,
    affectedArea: 950,
    evacuated: 0,
    description: "Severe water shortage affecting agricultural regions. Water restrictions in effect.",
    lastUpdated: "1 hour ago"
  }
]

function Header() {
  const [notifications, setNotifications] = useState(3)
  
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Naturalized
            </h1>
            <p className="text-sm text-gray-600">Real-time Natural Disaster Detection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search disasters..."
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <div className="w-2 h-2 rounded-full bg-green-600 absolute inset-0 animate-ping" />
            </div>
            <span className="text-sm font-medium text-gray-700">Active Monitoring</span>
          </div>

          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {notifications}
              </span>
            )}
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

function DisasterMap({ center, onMarkerClick, selectedDisaster }) {
  const mapContainer = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [clickableMarkers, setClickableMarkers] = useState([])
  const [pulsePhase, setPulsePhase] = useState(0)

  useEffect(() => {
    if (!canvasRef.current || !mapContainer.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = mapContainer.current.clientWidth
    canvas.height = mapContainer.current.clientHeight

    const drawMap = (phase) => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#fafafa")
      gradient.addColorStop(1, "#f5f5f5")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      ctx.strokeStyle = "rgba(200, 200, 200, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i <= canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i <= canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      const markers = []

      disasterData.forEach((disaster, index) => {
        const x = ((disaster.coords.lng + 180) / 360) * canvas.width
        const y = ((90 - disaster.coords.lat) / 180) * canvas.height

        const isSelected = selectedDisaster === disaster.id
        const baseRadius = isSelected ? 12 : 10
        const pulseRadius = baseRadius + Math.sin(phase + index * 0.5) * 3

        // Animated ripple effect
        if (disaster.severity === "critical") {
          for (let i = 3; i >= 0; i--) {
            const rippleRadius = 40 + (phase * 20 + i * 15) % 60
            const opacity = 0.15 - ((phase * 20 + i * 15) % 60) / 400
            ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`
            ctx.beginPath()
            ctx.arc(x, y, rippleRadius, 0, Math.PI * 2)
            ctx.fill()
          }
        } else {
          ctx.fillStyle = `rgba(239, 68, 68, ${0.12 - index * 0.02})`
          ctx.beginPath()
          ctx.arc(x, y, 35, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main marker with glow
        if (isSelected) {
          ctx.shadowColor = disaster.severity === "critical" ? "#dc2626" : "#ea580c"
          ctx.shadowBlur = 20
        }

        ctx.fillStyle =
          disaster.severity === "critical" ? "#dc2626" : disaster.severity === "high" ? "#ea580c" : "#ca8a04"
        ctx.beginPath()
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0

        // White border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 3
        ctx.stroke()

        // Subtle shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.beginPath()
        ctx.arc(x, y + 2, pulseRadius + 1, 0, Math.PI * 2)
        ctx.fill()

        markers.push({ id: disaster.id, x, y, radius: baseRadius + 15 })
      })

      setClickableMarkers(markers)
    }

    const animate = () => {
      setPulsePhase((p) => p + 0.05)
      drawMap(pulsePhase)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [pulsePhase, selectedDisaster])

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    clickableMarkers.forEach((marker) => {
      const distance = Math.hypot(x - marker.x, y - marker.y)
      if (distance < marker.radius) {
        onMarkerClick(marker.id)
      }
    })
  }

  return (
    <div ref={mapContainer} className="w-full h-full bg-white relative cursor-pointer overflow-hidden">
      <canvas ref={canvasRef} onClick={handleCanvasClick} className="absolute inset-0" />
      
      {/* Map overlay controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <Activity className="w-3 h-3" />
          <span className="font-medium">Active Disasters: {disasterData.length}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-xs text-gray-600">Critical</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-600" />
            <span className="text-xs text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-600" />
            <span className="text-xs text-gray-600">Medium</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
        <p className="text-xs text-gray-600 font-medium">Global Disaster Heat Map</p>
      </div>
    </div>
  )
}

function AlertPanel({ selectedDisaster, onCenterMap, onSelectDisaster }) {
  const sortedDisasters = [...disasterData].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })

  const totalEvacuated = disasterData.reduce((sum, d) => sum + d.evacuated, 0)
  const totalAffected = disasterData.reduce((sum, d) => sum + d.affectedArea, 0)

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Enhanced Summary Stats */}
      <div className="border-b border-gray-200 p-5 bg-white">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Emergency Overview</h2>
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {disasterData.filter((d) => d.severity === "critical").length}
            </div>
            <div className="text-xs text-red-700 font-medium">Critical</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {disasterData.filter((d) => d.severity === "high").length}
            </div>
            <div className="text-xs text-orange-700 font-medium">High</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
            <div className="text-2xl font-bold text-amber-600">
              {disasterData.filter((d) => d.severity === "medium").length}
            </div>
            <div className="text-xs text-amber-700 font-medium">Medium</div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {sortedDisasters.map((disaster) => (
            <div
              key={disaster.id}
              className={`rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedDisaster === disaster.id
                  ? "border-red-400 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
              }`}
              onClick={() => {
                onSelectDisaster(disaster.id)
                onCenterMap(disaster.coords)
              }}
            >
              <div className="pb-2 pt-3 px-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <AlertCircle
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        disaster.severity === "critical"
                          ? "text-red-600"
                          : disaster.severity === "high"
                          ? "text-orange-600"
                          : "text-amber-600"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-gray-900">{disaster.type}</div>
                      <div className="text-xs mt-1 text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {disaster.location}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${
                      disaster.severity === "critical"
                        ? "bg-red-600 text-white"
                        : disaster.severity === "high"
                        ? "bg-orange-600 text-white"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {disaster.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              {selectedDisaster === disaster.id && (
                <div className="px-4 pb-4 space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-gray-600">Intensity</span>
                      </div>
                      <div className="text-sm font-bold text-gray-900">{disaster.intensity}%</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-gray-600">Affected</span>
                      </div>
                      <div className="text-sm font-bold text-gray-900">{disaster.affectedArea} km²</div>
                    </div>
                  </div>

                  {disaster.evacuated > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-gray-900">Evacuations</span>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{disaster.evacuated.toLocaleString()}</div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                    <p className="font-semibold mb-2 flex items-center gap-2 text-gray-900 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      Situation Report
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{disaster.description}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                      <Clock className="w-3 h-3" />
                      <span>Updated {disaster.lastUpdated}</span>
                    </div>
                    <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      View Safety Guidelines
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Base() {
  const [selectedDisaster, setSelectedDisaster] = useState(null)
  const [center, setCenter] = useState({ lat: 20, lng: 0 })

  const handleMarkerClick = (id) => {
    setSelectedDisaster(selectedDisaster === id ? null : id)
    const disaster = disasterData.find(d => d.id === id)
    if (disaster) {
      setCenter(disaster.coords)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-88px)]">
        <div className="flex-1">
          <DisasterMap 
            center={center} 
            onMarkerClick={handleMarkerClick}
            selectedDisaster={selectedDisaster}
          />
        </div>

        <div className="w-96 overflow-hidden shadow-xl">
          <AlertPanel 
            selectedDisaster={selectedDisaster} 
            onCenterMap={(coords) => setCenter(coords)}
            onSelectDisaster={(id) => setSelectedDisaster(selectedDisaster === id ? null : id)}
          />
        </div>
      </div>
    </div>
  )
}