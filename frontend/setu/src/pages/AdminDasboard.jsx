import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/authContext';
import { userDataContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  'pending':     { label: 'Pending',     bg: '#FAEEDA', color: '#854F0B', dot: '#EF9F27', activeBg: '#EF9F27' },
  'in-progress': { label: 'In Progress', bg: '#E6F1FB', color: '#0C447C', dot: '#378ADD', activeBg: '#378ADD' },
  'resolved':    { label: 'Resolved',    bg: '#E1F5EE', color: '#085041', dot: '#1D9E75', activeBg: '#1D9E75' },
};

const categoryConfig = {
  'paani':       { label: 'Water Problem',    icon: 'ti-droplet',          bg: '#E1F5EE', iconColor: '#0f6e56', textColor: '#085041' },
  'naala':       { label: 'Drainage Problem', icon: 'ti-ripple',           bg: '#E1F5EE', iconColor: '#0f6e56', textColor: '#085041' },
  'sewage':      { label: 'Sewage Problem',   icon: 'ti-tool',             bg: '#FAEEDA', iconColor: '#BA7517', textColor: '#633806' },
  'roads':       { label: 'Roads',            icon: 'ti-road',             bg: '#E6F1FB', iconColor: '#185FA5', textColor: '#0C447C' },
  'electricity': { label: 'Electricity',      icon: 'ti-bolt',             bg: '#E1F5EE', iconColor: '#0f6e56', textColor: '#085041' },
  'other':       { label: 'Other',            icon: 'ti-file-description', bg: '#F1EFE8', iconColor: '#5F5E5A', textColor: '#444441' },
};

const AdminDashboard = () => {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (userData && userData.role !== 'admin') navigate('/');
    fetchAdminIssues();
  }, [userData]);

  const fetchAdminIssues = async () => {
    try {
      const res = await axios.get(serverUrl + '/api/issue/adminIssues', { withCredentials: true });
      setIssues(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (issueId, status) => {
    try {
      await axios.patch(
        serverUrl + '/api/issue/updateStatus',
        { issueId, status },
        { withCredentials: true }
      );
      setIssues(issues.map(issue =>
        issue._id === issueId ? { ...issue, status } : issue
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredIssues = filter === 'all' ? issues : issues.filter(i => i.status === filter);

  const counts = {
    pending:       issues.filter(i => i.status === 'pending').length,
    'in-progress': issues.filter(i => i.status === 'in-progress').length,
    resolved:      issues.filter(i => i.status === 'resolved').length,
  };

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#0f6e56] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#777] text-sm">Loading issues...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] px-6 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-[3px] h-4 bg-[#0f6e56]" />
              <span className="text-[#0f6e56] text-xs font-semibold tracking-widest uppercase">Admin Portal</span>
            </div>
            <h1 className="text-[#333] text-2xl font-bold">Admin Panel</h1>
            <p className="text-[#777] text-sm mt-1">
              {userData?.city}, {userData?.state} — {issues.length} total issues
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            {[
              { key: 'pending',     label: 'Pending',     bg: '#FAEEDA', border: '#FAC775', num: '#633806', text: '#854F0B' },
              { key: 'in-progress', label: 'In Progress', bg: '#E6F1FB', border: '#B5D4F4', num: '#042C53', text: '#0C447C' },
              { key: 'resolved',    label: 'Resolved',    bg: '#E1F5EE', border: '#9FE1CB', num: '#04342C', text: '#085041' },
            ].map(s => (
              <div
                key={s.key}
                style={{ background: s.bg, borderColor: s.border }}
                className="border rounded-xl px-4 py-2.5 text-center min-w-[80px]"
              >
                <p style={{ color: s.num }} className="text-xl font-bold">{counts[s.key]}</p>
                <p style={{ color: s.text }} className="text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {[
            { key: 'all',         label: 'All Issues'  },
            { key: 'pending',     label: 'Pending'     },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'resolved',    label: 'Resolved'    },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition
                ${filter === tab.key
                  ? 'bg-[#0f6e56] text-white'
                  : 'bg-white text-[#777] border border-[#b2ddd5] hover:border-[#0f6e56] hover:text-[#0f6e56]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredIssues.length === 0 ? (
          <div className="bg-white border border-[#b2ddd5] rounded-2xl flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 rounded-full bg-[#e1f5ee] flex items-center justify-center">
              <i className="ti ti-clipboard-x" style={{ fontSize: '26px', color: '#0f6e56' }} aria-hidden="true" />
            </div>
            <div className="text-center">
              <h2 className="text-[#444] text-lg font-semibold">No Issues Found</h2>
              <p className="text-[#999] text-sm mt-1">
                {filter === 'all' ? 'No issues submitted yet.' : `No ${filter.replace('-', ' ')} issues found.`}
              </p>
            </div>
          </div>
        ) : (

          <div className="flex flex-col gap-4">
            {filteredIssues.map((issue) => {
              const status = statusConfig[issue.status] || statusConfig['pending'];
              const cat = categoryConfig[issue.category] || categoryConfig['other'];
              return (
                <div
                  key={issue._id}
                  className="bg-white rounded-2xl overflow-hidden flex border border-[#b2ddd5] hover:border-[#0f6e56] transition-all"
                >
                  {/* Left Icon Panel */}
                  <div
                    className="w-28 flex-shrink-0 flex flex-col items-center justify-center gap-2 relative"
                    style={{ background: cat.bg }}
                  >
                    <i
                      className={`ti ${cat.icon}`}
                      style={{ fontSize: '28px', color: cat.iconColor }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-medium text-center px-2 leading-tight"
                      style={{ color: cat.textColor }}
                    >
                      {cat.label}
                    </span>
                    {/* Status dot */}
                    <div
                      className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{ background: status.dot }}
                    />
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col justify-between p-4 flex-1 gap-3 min-w-0">

                    {/* Top */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span
                          className="text-xs font-semibold uppercase tracking-wide"
                          style={{ color: cat.iconColor }}
                        >
                          {cat.label}
                        </span>
                        <h2 className="text-[#333] font-semibold text-base truncate">{issue.title}</h2>
                        <p className="text-[#777] text-sm line-clamp-2 leading-relaxed mt-0.5">
                          {issue.description}
                        </p>
                      </div>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-[#555] flex items-center gap-1.5">
                        <i className="ti ti-map-pin" style={{ fontSize: '12px', color: cat.iconColor }} aria-hidden="true" />
                        {issue.city}, {issue.state}
                      </span>
                      <span className="text-xs text-[#555] flex items-center gap-1.5">
                        <i className="ti ti-user" style={{ fontSize: '12px', color: cat.iconColor }} aria-hidden="true" />
                        {issue.userId?.username} — {issue.userId?.email}
                      </span>
                      <span className="text-xs text-[#aaa] flex items-center gap-1.5">
                        <i className="ti ti-calendar" style={{ fontSize: '12px' }} aria-hidden="true" />
                        {new Date(issue.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Bottom — View + Status Buttons */}
                    <div className="flex justify-between items-center pt-2 border-t border-[#e8f5f0]">
                      <button
                        onClick={() => navigate(`/details/${issue._id}`)}
                        className="text-xs text-[#0f6e56] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <i className="ti ti-external-link" style={{ fontSize: '13px' }} aria-hidden="true" />
                        View Details
                      </button>

                      {/* Status Update Buttons */}
                      <div className="flex gap-2">
                        {['pending', 'in-progress', 'resolved'].map(s => {
                          const sc = statusConfig[s];
                          const isActive = issue.status === s;
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(issue._id, s)}
                              style={{
                                background: isActive ? sc.activeBg : '#f0f9f7',
                                color: isActive ? 'white' : '#555',
                                borderColor: isActive ? sc.activeBg : '#b2ddd5',
                              }}
                              className="px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize"
                            >
                              {sc.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;