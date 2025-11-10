import { useState } from "react";
import { X, Upload, MapPin, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast"

export default function ReportEmergency() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "",
    location: "",
    description: "",
    image: null,
  });
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Emergency report submitted!"); 
    navigate(from); // redirects back to AlertsCenter
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative p-6">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate(from)}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-slate-800">
            Report an Emergency
          </h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Please provide accurate details to help emergency responders and the
          community act quickly.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              Disaster Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select a type</option>
              <option>Earthquake</option>
              <option>Flood</option>
              <option>Wildfire</option>
              <option>Hurricane</option>
              <option>Tornado</option>
              <option>Volcano</option>
              <option>Tsunami</option>
              <option>Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Miami, Florida"
                required
                className="w-full border border-slate-300 rounded-md p-2 pl-9 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe what you observed..."
              required
              className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              Upload Photo (optional)
            </label>
            <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-md p-3 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer">
              <Upload className="w-4 h-4" />
              {form.image ? form.image.name : "Upload image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white text-sm font-medium py-2.5 rounded-md hover:bg-red-700 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
