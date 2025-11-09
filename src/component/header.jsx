import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, MapPin, BarChart3, AlertTriangle, X, Users} from "lucide-react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: "Live Map", icon: MapPin, path: "/" },
    { label: "Alerts", icon: AlertTriangle, path: "/alert" },
    { label: "Community", icon: Users, path: "/community" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-1">
      <div className="px-4 py-3 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-600 text-white">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RedPort</h1>
            <p className="text-xs text-gray-500">Real-time alerts and community reports for anything. </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            )
          })}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-2">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => {
                  navigate(path)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}
