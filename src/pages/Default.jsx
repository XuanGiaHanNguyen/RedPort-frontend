import { useState, useEffect, useRef } from "react"
import { AlertCircle, MapPin, Thermometer, Wind, TrendingUp, AlertTriangle } from "lucide-react"
import Icon from "../assets/Icon.png"

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
    description: "Severe water shortage affecting agricultural regions. Water restrictions in effect.",
    lastUpdated: "1 hour ago"
  }
]

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-lg">
           <img src={Icon} alt="Description of image" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Naturalized</h1>
            <p className="text-sm text-gray-600">Real-time Natural Disaster Detection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-ping"/>
            <span className="text-sm font-medium text-gray-700">Active Monitoring</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4" />
            My Location
          </button>
        </div>
      </div>
    </header>
  )
}

function DisasterMap({ center, onMarkerClick }) {
  const mapContainer = useRef(null)
  const canvasRef = useRef(null)
  const [clickableMarkers, setClickableMarkers] = useState([])

  useEffect(() => {
    if (!canvasRef.current || !mapContainer.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = mapContainer.current.clientWidth
    canvas.height = mapContainer.current.clientHeight

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#ffffff")
    gradient.addColorStop(1, "#f5f5f5")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "rgba(200, 200, 200, 0.15)"
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

      ctx.fillStyle = `rgba(239, 68, 68, ${0.1 - index * 0.02})`
      ctx.beginPath()
      ctx.arc(x, y, 35, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle =
        disaster.severity === "critical" ? "#dc2626" : disaster.severity === "high" ? "#ea580c" : "#ca8a04"
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2.5
      ctx.stroke()

      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.beginPath()
      ctx.arc(x, y + 2, 11, 0, Math.PI * 2)
      ctx.fill()

      markers.push({ id: disaster.id, x, y })
    })

    setClickableMarkers(markers)
  }, [])

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    clickableMarkers.forEach((marker) => {
      const distance = Math.hypot(x - marker.x, y - marker.y)
      if (distance < 25) {
        onMarkerClick(marker.id)
      }
    })
  }

  return (
    <div ref={mapContainer} className="w-full h-full bg-white relative cursor-pointer overflow-hidden">
      <canvas ref={canvasRef} onClick={handleCanvasClick} className="absolute inset-0" />
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
        Natural Disaster Heat Map
      </div>
    </div>
  )
}

function AlertPanel({ selectedDisaster, onCenterMap }) {
  const sortedDisasters = [...disasterData].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Summary Stats */}
      <div className="border-b border-gray-200 p-4 bg-neutral-50">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {disasterData.filter((d) => d.severity === "critical").length}
            </div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {disasterData.filter((d) => d.severity === "high").length}
            </div>
            <div className="text-xs text-gray-600">High</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {disasterData.filter((d) => d.severity === "medium").length}
            </div>
            <div className="text-xs text-gray-600">Medium</div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {sortedDisasters.map((disaster) => (
            <div
              key={disaster.id}
              className={`rounded-lg border-2 cursor-pointer transition-all ${
                selectedDisaster === disaster.id
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => onCenterMap(disaster.coords)}
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
                      <div className="text-xs mt-1 text-gray-600">{disaster.location}</div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
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
                <div className="px-4 pb-4 space-y-4">
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>
                        {disaster.coords.lat.toFixed(2)}°, {disaster.coords.lng.toFixed(2)}°
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span>{disaster.intensity}% Intensity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span>{disaster.affectedArea} km² Affected</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 text-sm border border-blue-100">
                    <p className="font-semibold mb-1 flex items-center gap-2 text-gray-900">
                      <TrendingUp className="w-4 h-4" />
                      Details
                    </p>
                    <p className="text-gray-700">{disaster.description}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Last Updated: {disaster.lastUpdated}</p>
                    <button className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                      Get Safety Guidelines
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
    setSelectedDisaster(id)
    const disaster = disasterData.find(d => d.id === id)
    if (disaster) {
      setCenter(disaster.coords)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        {/* Map Section */}
        <div className="flex-1">
          <DisasterMap center={center} onMarkerClick={handleMarkerClick} />
        </div>

        {/* Alert Panel */}
        <div className="w-96 overflow-hidden">
          <AlertPanel selectedDisaster={selectedDisaster} onCenterMap={(coords) => setCenter(coords)} />
        </div>
      </div>
    </div>
  )
}