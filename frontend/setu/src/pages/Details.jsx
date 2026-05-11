import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../../context/authContext';
import { userDataContext } from '../../context/userContext';

const statusConfig = {
  'pending':     { label: 'Pending',     bg: '#FAEEDA', color: '#854F0B', dot: '#EF9F27' },
  'in-progress': { label: 'In Progress', bg: '#E6F1FB', color: '#0C447C', dot: '#378ADD' },
  'resolved':    { label: 'Resolved',    bg: '#E1F5EE', color: '#085041', dot: '#1D9E75' },
};

const categoryConfig = {
  'paani':       { label: 'Water Problem',    icon: 'ti-droplet',          bg: '#E1F5EE', iconColor: '#0f6e56' },
  'naala':       { label: 'Drainage Problem', icon: 'ti-ripple',           bg: '#E1F5EE', iconColor: '#0f6e56' },
  'sewage':      { label: 'Sewage Problem',   icon: 'ti-tool',             bg: '#FAEEDA', iconColor: '#BA7517' },
  'roads':       { label: 'Roads',            icon: 'ti-road',             bg: '#E6F1FB', iconColor: '#185FA5' },
  'electricity': { label: 'Electricity',      icon: 'ti-bolt',             bg: '#E1F5EE', iconColor: '#0f6e56' },
  'other':       { label: 'Other',            icon: 'ti-file-description', bg: '#F1EFE8', iconColor: '#5F5E5A' },
};

const Details = () => {
  const { issueid } = useParams();
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [issueDetails, setIssueDetails] = useState(null);

  useEffect(() => {
    if (!userData) { navigate('/login'); return; }
    fetchIssueDetails();
  }, [userData]);

  const fetchIssueDetails = async () => {
    try {
      const res = await axios.get(serverUrl + `/api/issue/details/${issueid}`, {
        withCredentials: true
      });
      setIssueDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!issueDetails) return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#0f6e56] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#777] text-sm">Loading issue details...</p>
      </div>
    </div>
  );

  const status = statusConfig[issueDetails.status] || statusConfig['pending'];
  const cat = categoryConfig[issueDetails.category] || categoryConfig['other'];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] px-6 py-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white border border-[#b2ddd5] flex items-center justify-center hover:bg-[#e1f5ee] transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f6e56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-[3px] h-4 bg-[#0f6e56]" />
              <span className="text-[#0f6e56] text-xs font-semibold tracking-widest uppercase">Citizen Portal</span>
            </div>
            <h1 className="text-[#333] text-2xl font-bold">Issue Details</h1>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#b2ddd5] rounded-2xl overflow-hidden">

          {/* Image or Icon Banner */}
          {issueDetails.image ? (
            <div className="w-full h-56 overflow-hidden">
              <img
                src={`${serverUrl}/${issueDetails.image}`}
                alt="issue"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-full h-36 flex flex-col items-center justify-center gap-2"
              style={{ background: cat.bg }}
            >
              <i className={`ti ${cat.icon}`} style={{ fontSize: '40px', color: cat.iconColor }} aria-hidden="true" />
              <span className="text-sm font-medium" style={{ color: cat.iconColor }}>{cat.label}</span>
            </div>
          )}

          <div className="p-6 flex flex-col gap-5">

            {/* Title + Status */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <i className={`ti ${cat.icon}`} style={{ fontSize: '14px', color: cat.iconColor }} aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: cat.iconColor }}>
                    {cat.label}
                  </span>
                </div>
                <h2 className="text-[#333] text-xl font-bold">{issueDetails.title}</h2>
              </div>
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold flex-shrink-0 flex items-center gap-1.5"
                style={{ background: status.bg, color: status.color }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: status.dot }}
                />
                {status.label}
              </span>
            </div>

            <hr className="border-[#e8f5f0]" />

            {/* Description */}
            <div>
              <p className="text-xs text-[#999] uppercase tracking-wide font-semibold mb-2">Description</p>
              <p className="text-[#555] text-sm leading-relaxed">{issueDetails.description}</p>
            </div>

            <hr className="border-[#e8f5f0]" />

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-[#f0f9f7] rounded-xl p-4 border border-[#b2ddd5]">
                <p className="text-xs text-[#999] uppercase tracking-wide font-semibold mb-2 flex items-center gap-1.5">
                  <i className="ti ti-map-pin" style={{ fontSize: '12px', color: '#0f6e56' }} aria-hidden="true" />
                  Location
                </p>
                <p className="text-[#333] text-sm font-medium">{issueDetails.city}, {issueDetails.state}</p>
              </div>

              <div className="bg-[#f0f9f7] rounded-xl p-4 border border-[#b2ddd5]">
                <p className="text-xs text-[#999] uppercase tracking-wide font-semibold mb-2 flex items-center gap-1.5">
                  <i className="ti ti-home" style={{ fontSize: '12px', color: '#0f6e56' }} aria-hidden="true" />
                  Address
                </p>
                <p className="text-[#333] text-sm font-medium">{issueDetails.address}</p>
              </div>

              <div className="bg-[#f0f9f7] rounded-xl p-4 border border-[#b2ddd5]">
                <p className="text-xs text-[#999] uppercase tracking-wide font-semibold mb-2 flex items-center gap-1.5">
                  <i className="ti ti-calendar" style={{ fontSize: '12px', color: '#0f6e56' }} aria-hidden="true" />
                  Reported On
                </p>
                <p className="text-[#333] text-sm font-medium">
                  {new Date(issueDetails.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>

              <div className="bg-[#f0f9f7] rounded-xl p-4 border border-[#b2ddd5]">
                <p className="text-xs text-[#999] uppercase tracking-wide font-semibold mb-2 flex items-center gap-1.5">
                  <i className="ti ti-tag" style={{ fontSize: '12px', color: '#0f6e56' }} aria-hidden="true" />
                  Category
                </p>
                <p className="text-[#333] text-sm font-medium">{cat.label}</p>
              </div>

            </div>

            <hr className="border-[#e8f5f0]" />

            {/* Reported By */}
            <div>
              <p className="text-xs text-[#999] uppercase tracking-wide font-semibold mb-3">Reported By</p>
              <div className="flex items-center gap-3 bg-[#f0f9f7] border border-[#b2ddd5] rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#0f6e56] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {(issueDetails.userId?.username || 'U').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-[#333] text-sm font-semibold">{issueDetails.userId?.username}</p>
                  <p className="text-[#777] text-xs mt-0.5">{issueDetails.userId?.email}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 w-full bg-white border border-[#b2ddd5] text-[#0f6e56] font-semibold py-3 rounded-xl text-sm hover:bg-[#e1f5ee] transition"
        >
          ← Back to Issues
        </button>

      </div>
    </div>
  );
};

export default Details;