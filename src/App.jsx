import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Base from "./pages/Default"
import Navigation from "./component/header"
import AlertsCenter from "./pages/Alert"
import CommunityReports from "./pages/Community"
import ReportEmergency from "./component/pop-up/Report"

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" />
      <Navigation  /> {/* works fine for now */}
      <div className="pt-19"> 
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/report" element={<ReportEmergency />} />
          <Route path="/alert" element={<AlertsCenter />} />
          <Route path="/community" element={<CommunityReports />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
