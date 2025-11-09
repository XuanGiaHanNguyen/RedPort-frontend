import { BrowserRouter, Routes, Route } from "react-router-dom"
import Base from "./pages/Default"
import Navigation from "./component/header"
import AlertsCenter from "./pages/Alert"
import CommunityReports from "./pages/Community"

export default function App() {
  return (
    <BrowserRouter>
      <Navigation  /> {/* works fine for now */}
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/alert" element={<AlertsCenter />} />
          <Route path="/community" element={<CommunityReports />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
