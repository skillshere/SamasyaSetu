// src/pages/AdminPanel.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/authContext';
import { userDataContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  'pending': { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  'resolved': { label: 'Resolved', color: 'bg-green-500/20 text-green-400 border border-green-500/30' },
};

const categoryIcon = {
  'paani': '💧',
  'naala': '🚰',
  'sewage': '⚠️',
  'other': '📋',
};

const AdminDashboard = () => {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Admin nahi hai toh redirect karo
    if (userData && userData.role !== 'admin') {
      navigate('/');
    }
    fetchAdminIssues();
  }, [userData]);

  const fetchAdminIssues = async () => {
    try {
      const res = await axios.get(serverUrl + '/api/issue/adminIssues', {
        withCredentials: true
      });
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
      // Local state update karo
      setIssues(issues.map(issue =>
        issue._id === issueId ? { ...issue, status } : issue
      ));
    } catch (error) {
      console.log(error);
    }
  };

  // Filter issues
  const filteredIssues = filter === 'all'
    ? issues
    : issues.filter(issue => issue.status === filter);

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-900 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-white text-3xl font-bold">Admin Panel</h1>
          <p className="text-zinc-400 text-sm mt-1">
            {userData?.city}, {userData?.state} — {issues.length} total issues
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          {[
            { label: 'Pending', value: issues.filter(i => i.status === 'pending').length, color: 'text-yellow-400' },
            { label: 'In Progress', value: issues.filter(i => i.status === 'in-progress').length, color: 'text-blue-400' },
            { label: 'Resolved', value: issues.filter(i => i.status === 'resolved').length, color: 'text-green-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-800 px-4 py-2 rounded-xl text-center">
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-zinc-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'in-progress', 'resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
              filter === f
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {f === 'all' ? 'All Issues' : f}
          </button>
        ))}
      </div>

      {/* Issues List */}
      {filteredIssues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-7xl">📭</span>
          <p className="text-zinc-400">No issues found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue._id}
              className="bg-zinc-800 rounded-2xl overflow-hidden flex flex-row border border-zinc-700 hover:border-orange-500/30 transition-all"
            >
              {/* Image */}
              <div className="w-48 flex-shrink-0">
                {issue.image ? (
                  <img
                    src={`${serverUrl}/${issue.image}`}
                    alt="issue"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-700 flex items-center justify-center min-h-[160px]">
                    <span className="text-5xl">{categoryIcon[issue.category] || '📋'}</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between p-5 flex-1 gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{categoryIcon[issue.category]}</span>
                      <span className="text-zinc-500 text-xs uppercase">{issue.category}</span>
                    </div>
                    <h2 className="text-white font-bold text-xl">{issue.title}</h2>
                    <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{issue.description}</p>
                  </div>


                  {/* Status Badge */}
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusConfig[issue.status]?.color}`}>
                    {statusConfig[issue.status]?.label}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 text-xs">📍 {issue.city}, {issue.state}</span>
                    <span className="text-zinc-500 text-xs">👤 {issue.userId?.username} — {issue.userId?.email}</span>
                    <span className="text-zinc-600 text-xs">
                      {new Date(issue.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                    <div className='text-yellow-500 mt-2 hover:text-blue-500 cursor-pointer' onClick={()=>{
                      navigate(`/details/${issue._id}`);
                    }}>View Details</div>
                  </div>

                  {/* Status Update Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(issue._id, 'pending')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        issue.status === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-zinc-700 text-zinc-400 hover:bg-yellow-500/20'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateStatus(issue._id, 'in-progress')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        issue.status === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-zinc-700 text-zinc-400 hover:bg-blue-500/20'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(issue._id, 'resolved')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        issue.status === 'resolved'
                          ? 'bg-green-500 text-white'
                          : 'bg-zinc-700 text-zinc-400 hover:bg-green-500/20'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;