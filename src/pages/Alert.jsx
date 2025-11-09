import { useState } from "react"
import {
  AlertCircle,
  Bell,
  Clock,
  MapPin,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Info,
  Siren,
} from "lucide-react"

const mockAlerts = {
  disasterTypes: [
    "Earthquake",
    "Flood",
    "Wildfire",
    "Hurricane",
    "Volcano",
    "Tornado",
    "Tsunami",
  ],
  locations: [
    "California, USA",
    "Tokyo, Japan",
    "Jakarta, Indonesia",
    "New Delhi, India",
    "Florida, USA",
    "Manila, Philippines",
    "Mexico City, Mexico",
  ],
  alerts: [
    {
      id: 1,
      type: "Earthquake",
      location: "Tokyo, Japan",
      severity: "critical",
      message:
        "Magnitude 7.8 earthquake detected near Tokyo. Aftershocks expected — evacuate tall structures.",
      time: "10 mins ago",
      affected: "15,000+",
      reports: 120,
    },
    {
      id: 2,
      type: "Flood",
      location: "New Delhi, India",
      severity: "high",
      message:
        "Heavy monsoon rains have caused flash flooding in low-lying areas.",
      time: "30 mins ago",
      affected: "8,200",
      reports: 74,
    },
    {
      id: 3,
      type: "Wildfire",
      location: "California, USA",
      severity: "medium",
      message:
        "Wildfire spreading rapidly in Sierra National Forest due to dry conditions.",
      time: "1 hr ago",
      affected: "3,000+",
      reports: 52,
    },
    {
      id: 4,
      type: "Hurricane",
      location: "Florida, USA",
      severity: "high",
      message:
        "Category 4 hurricane approaching the coast. Evacuation orders in place for Miami-Dade area.",
      time: "2 hrs ago",
      affected: "12,500",
      reports: 88,
    },
    {
      id: 5,
      type: "Volcano",
      location: "Jakarta, Indonesia",
      severity: "critical",
      message:
        "Mount Merapi shows intense seismic activity — eruption alert raised to Level 4.",
      time: "3 hrs ago",
      affected: "6,000",
      reports: 41,
    },
  ],
  notificationMethods: ["Email", "SMS", "Push"],
}

export default function AlertsCenter() {
  const [subscribedTypes, setSubscribedTypes] = useState(["Wildfire", "Earthquake"])
  const [subscribedLocations, setSubscribedLocations] = useState(["California, USA"])
  const [notificationMethods, setNotificationMethods] = useState(["Email", "Push"])

  const [openSection, setOpenSection] = useState("types")

  const toggleType = (type) => {
    setSubscribedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleLocation = (location) => {
    setSubscribedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    )
  }

  const toggleMethod = (method) => {
    setNotificationMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    )
  }

  const toggleDropdown = (section) =>
    setOpenSection((prev) => (prev === section ? null : section))

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* LEFT PANEL - Settings */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" />
          <h2 className="text-sm font-semibold text-slate-800">Alert Preferences</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Disaster Types */}
          <div>
            <button
              onClick={() => toggleDropdown("types")}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              <span>Disaster Types</span>
              {openSection === "types" ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openSection === "types" && (
              <div className="mt-2 space-y-2 pl-2">
                {mockAlerts.disasterTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={subscribedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Locations */}
          <div>
            <button
              onClick={() => toggleDropdown("locations")}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              <span>Locations</span>
              {openSection === "locations" ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openSection === "locations" && (
              <div className="mt-2 space-y-2 pl-2">
                {mockAlerts.locations.map((location) => (
                  <label
                    key={location}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={subscribedLocations.includes(location)}
                      onChange={() => toggleLocation(location)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      {location}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Notification Methods */}
          <div>
            <button
              onClick={() => toggleDropdown("methods")}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              <span>Notification Methods</span>
              {openSection === "methods" ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openSection === "methods" && (
              <div className="mt-2 space-y-2 pl-2">
                {mockAlerts.notificationMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={notificationMethods.includes(method)}
                      onChange={() => toggleMethod(method)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* REPORT AN EMERGENCY BOX */}
        <div className="p-4 rounded-lg border-1 border-slate-100 bg-red-50/60">
          <div className="flex items-start gap-3">
            <div className="bg-red-100 rounded-full p-2">
              <Siren className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-700">
                Report an Emergency
              </h3>
              <p className="text-xs text-red-600 mt-1">
                See a disaster or hazard nearby? Help the community by submitting a report.
              </p>
              <button
                className="mt-3 w-full text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition rounded-md py-2"
                onClick={() => alert("Emergency report form coming soon!")}
              >
                Report Emergency
              </button>
            </div>
          </div>
        </div>
        </div>

        
      </div>

      {/* RIGHT PANEL - Alerts Feed */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className=" space-y-4">
            {mockAlerts.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-lg shadow-sm p-5 transition hover:shadow-md `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        alert.severity === "critical"
                          ? "bg-red-100"
                          : alert.severity === "high"
                          ? "bg-orange-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <AlertCircle
                        className={`w-5 h-5 ${
                          alert.severity === "critical"
                            ? "text-red-600"
                            : alert.severity === "high"
                            ? "text-orange-600"
                            : "text-yellow-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{alert.type}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wide ${
                      alert.severity === "critical"
                        ? "bg-red-100 text-red-700"
                        : alert.severity === "high"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <p className="text-sm text-slate-700 mb-3 leading-relaxed">{alert.message}</p>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {alert.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {alert.affected} affected
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      {alert.reports} community reports
                    </span>
                  </div>
                  <button className="text-neutral-400 hover:text-neutral-500 font-medium">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
