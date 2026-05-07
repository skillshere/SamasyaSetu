import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  'pending':     { label: 'Pending',     bg: '#FAEEDA', color: '#854F0B', dot: '#EF9F27' },
  'in-progress': { label: 'In Progress', bg: '#E6F1FB', color: '#0C447C', dot: '#378ADD' },
  'resolved':    { label: 'Resolved',    bg: '#E1F5EE', color: '#085041', dot: '#1D9E75' },
};

const categoryConfig = {
  'paani':       { label: 'Water Problem',    icon: 'ti-droplet',          bg: '#E1F5EE', iconColor: '#0f6e56', textColor: '#085041' },
  'naala':       { label: 'Drainage Problem', icon: 'ti-ripple',           bg: '#E1F5EE', iconColor: '#0f6e56', textColor: '#085041' },
  'sewage':      { label: 'Sewage Problem',   icon: 'ti-tool',             bg: '#FAEEDA', iconColor: '#BA7517', textColor: '#633806' },
  'roads':       { label: 'Roads',            icon: 'ti-road',             bg: '#E6F1FB', iconColor: '#185FA5', textColor: '#0C447C' },
  'electricity': { label: 'Electricity',      icon: 'ti-bolt',             bg: '#E1F5EE', iconColor: '#0f6e56', textColor: '#085041' },
  'other':       { label: 'Other',            icon: 'ti-file-description', bg: '#F1EFE8', iconColor: '#5F5E5A', textColor: '#444441' },
};

const MyProblem = () => {
  const { serverUrl } = useContext(authDataContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const res = await axios.get(serverUrl + '/api/issue/myIssue', { withCredentials: true });
        setIssues(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyIssues();
  }, []);

  const filtered = filter === 'all' ? issues : issues.filter(i => i.status === filter);

  const counts = {
    all:           issues.length,
    pending:       issues.filter(i => i.status === 'pending').length,
    'in-progress': issues.filter(i => i.status === 'in-progress').length,
    resolved:      issues.filter(i => i.status === 'resolved').length,
  };

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#0f6e56] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#777] text-sm">Loading your issues...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
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
                <div className="w-[3px] h-4 bg-[#0f6e56]" style={{borderRadius: 0}}></div>
                <span className="text-[#0f6e56] text-xs font-semibold tracking-widest uppercase">Citizen Portal</span>
              </div>
              <h1 className="text-[#333] text-2xl font-bold">My Issues</h1>
            </div>
          </div>
          <button
            onClick={() => navigate('/issue')}
            className="bg-[#0f6e56] hover:bg-[#085041] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            + Report New
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { key: 'all',         label: 'Total',       bg: '#E1F5EE', border: '#0f6e56',  num: '#085041', text: '#0F6E56', active: true  },
            { key: 'pending',     label: 'Pending',     bg: '#FAEEDA', border: '#FAC775',  num: '#633806', text: '#854F0B', active: false },
            { key: 'in-progress', label: 'In Progress', bg: '#E6F1FB', border: '#B5D4F4',  num: '#042C53', text: '#0C447C', active: false },
            { key: 'resolved',    label: 'Resolved',    bg: '#E1F5EE', border: '#9FE1CB',  num: '#04342C', text: '#085041', active: false },
          ].map(s => (
            <div
              key={s.key}
              onClick={() => setFilter(s.key)}
              style={{
                background: s.bg,
                borderColor: filter === s.key ? s.num : s.border,
                borderWidth: filter === s.key ? '2px' : '0.5px',
                borderStyle: 'solid',
              }}
              className="rounded-xl p-4 cursor-pointer transition-all"
            >
              <p style={{ color: s.num }} className="text-2xl font-bold">{counts[s.key]}</p>
              <p style={{ color: s.text }} className="text-xs font-medium mt-1">{s.label}</p>
            </div>
          ))}
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
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#b2ddd5] rounded-2xl flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 rounded-full bg-[#e1f5ee] flex items-center justify-center">
              <i className="ti ti-clipboard-x" style={{ fontSize: '26px', color: '#0f6e56' }} aria-hidden="true" />
            </div>
            <div className="text-center">
              <h2 className="text-[#444] text-lg font-semibold">No Issues Found</h2>
              <p className="text-[#999] text-sm mt-1">
                {filter === 'all'
                  ? "You haven't submitted any issue yet."
                  : `No ${filter.replace('-', ' ')} issues found.`}
              </p>
            </div>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/issue')}
                className="bg-[#0f6e56] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#085041] transition"
              >
                + Report Your First Issue
              </button>
            )}
          </div>
        ) : (

          /* Issues List */
          <div className="flex flex-col gap-4">
            {filtered.map((issue) => {
              const status = statusConfig[issue.status] || statusConfig['pending'];
              const cat = categoryConfig[issue.category] || categoryConfig['other'];
              return (
                <div
                  key={issue._id}
                  className="bg-white rounded-2xl overflow-hidden flex border border-[#b2ddd5] hover:border-[#0f6e56] transition-all"
                >
                  {/* Left — Icon Panel */}
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

                  {/* Right — Content */}
                  <div className="flex flex-col justify-between p-4 flex-1 gap-2 min-w-0">

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
                      </div>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[#777] text-sm line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>

                    {/* Bottom */}
                    <div className="flex justify-between items-center pt-2 border-t border-[#e8f5f0]">
                      <div className="flex items-center gap-3">
                        <span className="text-[#777] text-xs flex items-center gap-1">
                          <i className="ti ti-map-pin" style={{ fontSize: '12px', color: '#0f6e56' }} aria-hidden="true" />
                          {issue.city}, {issue.state}
                        </span>
                        {issue.address && (
                          <span className="text-[#aaa] text-xs hidden sm:flex items-center gap-1">
                            <i className="ti ti-home" style={{ fontSize: '12px' }} aria-hidden="true" />
                            {issue.address.length > 25 ? issue.address.slice(0, 25) + '...' : issue.address}
                          </span>
                        )}
                      </div>
                      <span className="text-[#aaa] text-xs flex items-center gap-1">
                        <i className="ti ti-calendar" style={{ fontSize: '12px' }} aria-hidden="true" />
                        {new Date(issue.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
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

export default MyProblem;