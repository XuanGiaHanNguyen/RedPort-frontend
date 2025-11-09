import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Activity,
  AlertTriangle,
  X,
  ExternalLink,
  Users,
} from "lucide-react";

const mockDisasters = [
  {
    id: 1,
    type: "Earthquake",
    location: "Japan",
    severity: "critical",
    coords: { lat: 35.68, lng: 139.69 },
    evacuated: 15000,
    description:
      "Magnitude 7.8 earthquake struck the region causing widespread damage.",
    news: [
      { title: "Latest Updates on Japan Earthquake", url: "#" },
      { title: "Rescue Operations Underway", url: "#" },
      { title: "Government Response Update", url: "#" },
    ],
    communityReports: [
      {
        author: "Local Resident",
        time: "2h ago",
        message: "Roads damaged in downtown area",
      },
      {
        author: "Community Center",
        time: "4h ago",
        message: "Shelter open at central hub",
      },
      {
        author: "Volunteer Group",
        time: "6h ago",
        message: "Medical supplies needed",
      },
    ],
  },
  {
    id: 2,
    type: "Flood",
    location: "India",
    severity: "high",
    coords: { lat: 20.59, lng: 78.96 },
    evacuated: 8000,
    description:
      "Heavy monsoon rains causing severe flooding in multiple districts.",
    news: [
      { title: "Flood Waters Rising Across Region", url: "#" },
      { title: "Emergency Response Mobilized", url: "#" },
      { title: "Monsoon Forecast Update", url: "#" },
    ],
    communityReports: [
      {
        author: "NGO Worker",
        time: "1h ago",
        message: "Food supplies being distributed",
      },
      {
        author: "Local Admin",
        time: "3h ago",
        message: "Water levels still rising",
      },
    ],
  },
  {
    id: 3,
    type: "Wildfire",
    location: "California, USA",
    severity: "medium",
    coords: { lat: 36.77, lng: -119.41 },
    evacuated: 3000,
    description:
      "Wildfire spreading across 5,000 acres with strong winds fueling spread.",
    news: [
      { title: "Firefighters Battle Large Wildfire", url: "#" },
      { title: "Air Quality Alert Issued", url: "#" },
    ],
    communityReports: [
      {
        author: "Fire Department",
        time: "30m ago",
        message: "Evacuation zones expanded",
      },
      {
        author: "Resident",
        time: "2h ago",
        message: "Heavy smoke in the area",
      },
    ],
  },
  {
    id: 4,
    type: "Hurricane",
    location: "Florida, USA",
    severity: "high",
    coords: { lat: 27.99, lng: -81.76 },
    evacuated: 5000,
    description:
      "Category 4 hurricane approaching with dangerous winds and storm surge.",
    news: [
      { title: "Hurricane Warning Continues", url: "#" },
      { title: "Evacuation Orders in Effect", url: "#" },
    ],
    communityReports: [
      {
        author: "Emergency Manager",
        time: "45m ago",
        message: "All shelters at capacity",
      },
      { author: "Resident", time: "1h ago", message: "Boarding up homes" },
    ],
  },
  {
    id: 5,
    type: "Volcano",
    location: "Indonesia",
    severity: "critical",
    coords: { lat: -6.2, lng: 106.8 },
    evacuated: 12000,
    description: "Volcanic eruption with ash column reaching 30,000 feet.",
    news: [
      { title: "Volcano Eruption Alert Level Raised", url: "#" },
      { title: "Ash Spreading Across Region", url: "#" },
      { title: "International Aid Incoming", url: "#" },
    ],
    communityReports: [
      {
        author: "Geological Survey",
        time: "1h ago",
        message: "Seismic activity ongoing",
      },
      {
        author: "Evacuee",
        time: "2h ago",
        message: "Safe at evacuation center",
      },
    ],
  },
];

function DetailPanel({ disaster, onClose }) {
  if (!disaster) return null;

  return (
    <div className="w-[400px] bg-white border-l border-gray-200 p-6 shadow-lg overflow-y-auto h-[750px]">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{disaster.type}</h2>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" /> {disaster.location}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Severity Badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
          disaster.severity === "critical"
            ? "bg-red-100 text-red-800"
            : disaster.severity === "high"
            ? "bg-orange-100 text-orange-800"
            : "bg-amber-100 text-amber-800"
        }`}
      >
        {disaster.severity.charAt(0).toUpperCase() + disaster.severity.slice(1)}{" "}
        Severity
      </span>

      {/* Key Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <p className="text-sm text-gray-700 mb-3">{disaster.description}</p>
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-gray-600 font-medium">EVACUATED</p>
            <p className="text-lg font-bold text-gray-900">
              {disaster.evacuated.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Related News */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Related News
        </h3>
        <div className="space-y-2">
          {disaster.news.map((newsItem, idx) => (
            <a
              key={idx}
              href={newsItem.url}
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 underline">
                {newsItem.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Community Reports */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Community Reports
        </h3>
        <div className="space-y-3">
          {disaster.communityReports.map((report, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm text-gray-900">
                  {report.author}
                </p>
                <p className="text-xs text-gray-500">{report.time}</p>
              </div>
              <p className="text-sm text-gray-700">{report.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DisasterMap({ selectedDisaster, onMarkerClick }) {
  const mapContainer = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [clickableMarkers, setClickableMarkers] = useState([]);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !mapContainer.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = mapContainer.current.clientWidth;
    canvas.height = mapContainer.current.clientHeight;

    const drawMap = () => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#fafafa");
      gradient.addColorStop(1, "#f5f5f5");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // grid
      ctx.strokeStyle = "rgba(200, 200, 200, 0.2)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      const markers = [];

      mockDisasters.forEach((disaster) => {
        const x = ((disaster.coords.lng + 180) / 360) * canvas.width;
        const y = ((90 - disaster.coords.lat) / 180) * canvas.height;
        const isSelected = selectedDisaster === disaster.id;
        const baseRadius = isSelected ? 12 : 10;

        if (isSelected) {
          ctx.shadowColor =
            disaster.severity === "critical" ? "#dc2626" : "#ea580c";
          ctx.shadowBlur = 12;
        }

        ctx.fillStyle =
          disaster.severity === "critical"
            ? "#dc2626"
            : disaster.severity === "high"
            ? "#ea580c"
            : "#ca8a04";

        ctx.beginPath();
        ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.beginPath();
        ctx.arc(x, y + 2, baseRadius + 1, 0, Math.PI * 2);
        ctx.fill();

        markers.push({ id: disaster.id, x, y, radius: baseRadius + 15 });
      });

      // only update markers *once per draw*, not per frame re-render
      setClickableMarkers(markers);
    };

    const animate = () => {
      drawMap();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [selectedDisaster]); // <-- only redraw when selection changes

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    clickableMarkers.forEach((marker) => {
      const distance = Math.hypot(x - marker.x, y - marker.y);
      if (distance < marker.radius) {
        onMarkerClick(marker.id);
      }
    });
  };

  return (
    <div
      ref={mapContainer}
      className="w-full h-[750px] bg-white relative cursor-pointer"
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0"
      />

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <Activity className="w-3 h-3" />
          <span className="font-medium">Active: {mockDisasters.length}</span>
        </div>
        <div className="flex gap-3">
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
        <p className="text-xs text-gray-600 font-medium">
          Global Disaster Heat Map
        </p>
      </div>
    </div>
  );
}

export default function Default() {
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const selectedDisasterData = selectedDisaster
    ? mockDisasters.find((d) => d.id === selectedDisaster)
    : null;

  return (
    <div className="flex w-full">
      {/* Map fills remaining space */}
      <div className="flex-1 h-full">
        <DisasterMap
          selectedDisaster={selectedDisaster}
          onMarkerClick={setSelectedDisaster}
        />
      </div>

      {/* Detail panel slides in */}
      {selectedDisasterData && (
        <DetailPanel
          disaster={selectedDisasterData}
          onClose={() => setSelectedDisaster(null)}
        />
      )}
    </div>
  );
}
