import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Upload, Calendar, MapPin } from "lucide-react";

const mockCommunityReports = [
  {
    id: "report-001",
    author: "Maria L.",
    timestamp: "Nov 9, 2025 · 2:47 PM",
    location: "Downtown Riverside",
    content:
      "Heavy flooding on Main Street near the bridge. Cars are getting stuck and water is rising quickly. Avoid the area if possible!",
    image: true,
    severity: "critical",
    likes: 12,
    comments: 4,
    liked: false
  },
  {
    id: "report-002",
    author: "James K.",
    timestamp: "Nov 9, 2025 · 1:15 PM",
    location: "North Hill",
    content:
      "Power outage affecting several blocks. Local crews are on-site but expect delays until evening.",
    image: false,
    severity: "high",
    likes: 8,
    comments: 2,
    liked: false
  },
  {
    id: "report-003",
    author: "Aisha P.",
    timestamp: "Nov 9, 2025 · 12:38 PM",
    location: "East Market District",
    content:
      "Strong winds knocked over a few trees near the park. City workers are clearing the road now.",
    image: true,
    severity: "medium",
    likes: 5,
    comments: 1,
    liked: false
  }
];

export default function CommunityReports() {
  const [reports, setReports] = useState(mockCommunityReports);

  const toggleLike = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id
          ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked }
          : r
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Submit Report Form */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              Submit a New Report
            </h3>
            <textarea
              placeholder="Describe what you’re experiencing..."
              rows={3}
              className="w-full text-sm border border-slate-300 rounded-md p-3 text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 resize-none"
            />
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition">
                <Upload className="w-4 h-4" />
                Add Photos
              </button>
              <button className="flex-1 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition">
                Submit Report
              </button>
            </div>
          </div>

          {/* Reports Feed */}
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
                      {report.author.substring(0, 1)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{report.author}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {report.timestamp}
                        <MapPin className="w-3 h-3 ml-2" />
                        {report.location}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wide ${
                      report.severity === "critical"
                        ? "bg-red-100 text-red-700"
                        : report.severity === "high"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {report.severity}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                  {report.content}
                </p>

                {report.image && (
                  <div className="mb-3 w-full h-40 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                    [Photo from: {report.location}]
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-5 text-xs text-slate-500">
                  <button
                    onClick={() => toggleLike(report.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      report.liked
                        ? "text-red-600"
                        : "hover:text-red-500 text-slate-500"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        report.liked ? "fill-current text-red-600" : ""
                      }`}
                    />
                    {report.likes}
                  </button>

                  <button className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {report.comments}
                  </button>

                  <button className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
