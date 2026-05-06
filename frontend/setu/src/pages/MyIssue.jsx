import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../../context/authContext';
import { userDataContext } from '../../context/userContext';
import axios from 'axios';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh",
];

const categories = [
  { value: 'paani', label: 'Water Problem', icon: '💧' },
  { value: 'naala', label: 'Drainage Problem', icon: '🚰' },
  { value: 'sewage', label: 'Sewage Problem', icon: '🔧' },
  { value: 'roads', label: 'Roads & Footpath', icon: '🚧' },
  { value: 'electricity', label: 'Electricity', icon: '💡' },
  { value: 'other', label: 'Other', icon: '📋' },
];

const inputClass = "w-full bg-[#f0f9f7] border border-[#b2ddd5] rounded-lg px-3 py-2.5 text-sm text-[#444] outline-none focus:border-[#0f6e56] focus:ring-1 focus:ring-[#0f6e56] placeholder:text-[#aaa] transition";
const labelClass = "text-xs text-[#666] uppercase tracking-wide font-semibold block mb-1.5";

const MyIssue = () => {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '', description: '', category: '',
    state: '', city: '', address: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);
      await axios.post(serverUrl + '/api/issue/submit', data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Issue submitted successfully!');
      navigate('/myissue',{replace:true});
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f0f9f7] py-10 px-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-[#0f6e56] rounded-full" />
          <span className="text-[#0f6e56] text-xs font-semibold tracking-widest uppercase">Citizen Portal</span>
        </div>
        <h1 className="text-3xl font-bold text-[#444]">Report an Issue</h1>
        <p className="text-[#777] mt-1 text-sm">
          Fill in the details below and we will forward it to the concerned authority
        </p>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT — Form Fields */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Issue Title */}
            <div className="bg-white border border-[#b2ddd5] rounded-xl p-5">
              <h3 className="text-[#444] font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0f6e56] text-white text-xs flex items-center justify-center font-bold">1</span>
                Basic Information
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Issue Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Water logging in front of house"
                    onChange={handleChange}
                    value={formData.title}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Category Grid */}
                <div>
                  <label className={labelClass}>Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <div
                        key={cat.value}
                        onClick={() => setFormData({ ...formData, category: cat.value })}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border cursor-pointer transition-all text-center
                          ${formData.category === cat.value
                            ? 'border-[#0f6e56] bg-[#e1f5ee]'
                            : 'border-[#b2ddd5] bg-[#f0f9f7] hover:border-[#0f6e56]'
                          }`}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-xs text-[#444] font-medium leading-tight">{cat.label}</span>
                      </div>
                    ))}
                  </div>
                  <input type="hidden" name="category" value={formData.category} required />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white border border-[#b2ddd5] rounded-xl p-5">
              <h3 className="text-[#444] font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0f6e56] text-white text-xs flex items-center justify-center font-bold">2</span>
                Location Details
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>State</label>
                    <select
                      name="state"
                      onChange={handleChange}
                      value={formData.state}
                      className={inputClass}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Your city"
                      onChange={handleChange}
                      value={formData.city}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Full Address</label>
                  <textarea
                    name="address"
                    placeholder="House no., Street, Locality..."
                    onChange={handleChange}
                    value={formData.address}
                    rows={2}
                    className={inputClass + ' resize-none'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-[#b2ddd5] rounded-xl p-5">
              <h3 className="text-[#444] font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0f6e56] text-white text-xs flex items-center justify-center font-bold">3</span>
                Problem Description
              </h3>
              <div>
                <label className={labelClass}>Describe Your Problem</label>
                <textarea
                  name="description"
                  placeholder="Explain the issue in detail — since when, how severe, what impact..."
                  onChange={handleChange}
                  value={formData.description}
                  rows={5}
                  className={inputClass + ' resize-none'}
                  required
                />
                <p className="text-[#aaa] text-xs mt-1">More detail = faster resolution</p>
              </div>
            </div>

          </div>

          {/* RIGHT — Image + Submit */}
          <div className="lg:w-80 flex flex-col gap-5">

            {/* Image Upload */}
            <div className="bg-white border border-[#b2ddd5] rounded-xl p-5">
              <h3 className="text-[#444] font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0f6e56] text-white text-xs flex items-center justify-center font-bold">4</span>
                Upload Photo
              </h3>

              <div
                onClick={() => document.getElementById('imageInput').click()}
                className={`border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden
                  ${preview ? 'border-[#0f6e56]' : 'border-[#b2ddd5] hover:border-[#0f6e56] hover:bg-[#f0f9f7]'}
                `}
                style={{ minHeight: '220px' }}
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-56 object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 p-8 text-center h-56">
                    <div className="w-12 h-12 rounded-full bg-[#e1f5ee] flex items-center justify-center">
                      <span className="text-2xl">📸</span>
                    </div>
                    <p className="text-[#444] text-sm font-medium">Click to upload photo</p>
                    <p className="text-[#aaa] text-xs">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>

              {preview && (
                <button
                  type="button"
                  onClick={() => { setPreview(null); setImage(null); }}
                  className="mt-2 text-xs text-red-400 hover:text-red-600 w-full text-center"
                >
                  Remove photo
                </button>
              )}

              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>

            {/* Summary Card */}
            <div className="bg-[#e1f5ee] border border-[#b2ddd5] rounded-xl p-4">
              <p className="text-[#0f6e56] text-xs font-semibold uppercase tracking-wide mb-3">Submission Summary</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Title', value: formData.title || '—' },
                  { label: 'Category', value: categories.find(c => c.value === formData.category)?.label || '—' },
                  { label: 'Location', value: formData.city && formData.state ? `${formData.city}, ${formData.state}` : '—' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <span className="text-[#777] text-xs">{item.label}</span>
                    <span className="text-[#444] text-xs font-medium text-right truncate max-w-[140px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0f6e56] hover:bg-[#085041] disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-sm transition-all w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit Issue →'}
            </button>

            <p className="text-[#aaa] text-xs text-center">
              Your complaint will be forwarded to the concerned department within 24 hours.
            </p>

          </div>
        </div>
      </form>
    </div>
  );
};

export default MyIssue;