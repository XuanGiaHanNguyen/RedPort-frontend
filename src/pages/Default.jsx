import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Activity,
  AlertTriangle,
  X,
  ExternalLink,
  Users,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

// -------------------- Detail Panel --------------------
function DetailPanel({ disaster, onClose }) {
  if (!disaster) {
    return (
      <div className="w-[400px] bg-white border-l border-gray-200 p-6 shadow-lg h-screen flex items-center justify-center text-gray-500 text-center">
        <p>Select a disaster marker on the map to view details.</p>
      </div>
    );
  }

  return (
    <div className="w-[400px] bg-white border-l border-gray-200 p-6 shadow-lg overflow-y-auto h-screen">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{disaster.type}</h2>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" /> {disaster.location}
          </p>
        </div>
      </div>

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

      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <p className="text-sm text-gray-700 mb-3">{disaster.description}</p>
        <div>
          <p className="text-xs text-gray-600 font-medium">EVACUATED</p>
          <p className="text-lg font-bold text-gray-900">
            {disaster.evacuated.toLocaleString()}
          </p>
        </div>
      </div>

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
              target="_blank"
              rel="noopener noreferrer"
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

// -------------------- Map --------------------
function DisasterMap({ selectedDisaster, onMarkerClick }) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // 🌎 Initialize centered on Florida
    const map = L.map(mapContainer.current, {
      zoomControl: true,
      minZoom: 2,
      maxZoom: 19,
      attributionControl: false,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      maxBoundsViscosity: 1.0,
    }).setView([27.99, -81.76], 5);

    // Add OSM tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      noWrap: true,
    }).addTo(map);

    mapInstance.current = map;

    const createCustomIcon = (severity, isSelected) => {
      const color =
        severity === "critical"
          ? "#dc2626"
          : severity === "high"
          ? "#ea580c"
          : "#ca8a04";
      return L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width:${isSelected ? 16 : 12}px;
          height:${isSelected ? 16 : 12}px;
          background-color:${color};
          border:2px solid white;
          border-radius:50%;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          ${isSelected ? "transform:scale(1.2);" : ""}
        "></div>`,
      });
    };

    // Add all disaster markers
    mockDisasters.forEach((disaster) => {
      const marker = L.marker([disaster.coords.lat, disaster.coords.lng], {
        icon: createCustomIcon(disaster.severity, false),
      }).addTo(map);

      marker.on("click", () => {
        onMarkerClick(disaster.id);
        map.setView([disaster.coords.lat, disaster.coords.lng], 5, {
          animate: true,
        });
      });

      marker.bindTooltip(
        `<strong>${disaster.type}</strong><br/>${disaster.location}`,
        {
          direction: "top",
          offset: [0, -10],
        }
      );

      markersRef.current[disaster.id] = { marker, disaster };
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [onMarkerClick]);

  // Update marker when selected
  useEffect(() => {
    if (!mapInstance.current) return;
    Object.entries(markersRef.current).forEach(([id, { marker, disaster }]) => {
      const isSelected = selectedDisaster === Number(id);
      const color =
        disaster.severity === "critical"
          ? "#dc2626"
          : disaster.severity === "high"
          ? "#ea580c"
          : "#ca8a04";
      marker.setIcon(
        L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width:${isSelected ? 16 : 12}px;
            height:${isSelected ? 16 : 12}px;
            background-color:${color};
            border:2px solid white;
            border-radius:50%;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
            ${isSelected ? "transform:scale(1.2);" : ""}
          "></div>`,
        })
      );
    });
  }, [selectedDisaster]);

  return(
     <div className="w-full h-full bg-white relative">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-2 left-13 border-2 border-neutral-300 bg-white rounded-sm p-3 border border-gray-200 z-[1000]">
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

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 z-[1000]">
        <p className="text-xs text-gray-600 font-medium">
          Global Disaster Heat Map
        </p>
      </div>
    </div>
  );
}

// -------------------- Main App --------------------
export default function DisasterMapApp() {
  const [selectedDisaster, setSelectedDisaster] = useState(4);
  const selectedDisasterData = selectedDisaster
    ? mockDisasters.find((d) => d.id === selectedDisaster)
    : null;

  return (
    <div className="flex h-screen w-screen ">
      <div className="flex-1">
        <DisasterMap
          selectedDisaster={selectedDisaster}
          onMarkerClick={setSelectedDisaster}
        />
      </div>

      {/* Always show the right panel */}
      <DetailPanel
        disaster={selectedDisasterData}
        onClose={() => setSelectedDisaster(null)}
      />
    </div>
  );
}
