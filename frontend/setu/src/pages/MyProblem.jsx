import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/authContext';
import { IoMdArrowRoundBack } from "react-icons/io";
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

const MyProblem = () => {
  const { serverUrl } = useContext(authDataContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const res = await axios.get(serverUrl + '/api/issue/myIssue', {
          withCredentials: true
        });
        setIssues(res.data);
        console.log('Fetched issues:', res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyIssues();
  }, []);

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-400">Loading your issues...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-900 p-6 relative ">
      <IoMdArrowRoundBack
        className="text-2xl text-white  cursor-pointer absolute left-6 top-3 "
        onClick={() => navigate(-1)}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-8 mt-5">
        <div>
          <h1 className="text-white text-3xl font-bold">My Issues</h1>
          <p className="text-zinc-400 text-sm mt-1">{issues.length} issue{issues.length !== 1 ? 's' : ''} submitted</p>
        </div>
        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-2 rounded-full text-sm font-semibold">
          Total: {issues.length}
        </span>
      </div>

      {/* Empty State */}
      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-7xl">📭</span>
          <h2 className="text-white text-xl font-semibold">No Issues Yet</h2>
          <p className="text-zinc-400 text-center">You have not submitted any issue yet</p>
        </div>
      ) : (

        /* Issues List — Horizontal Cards */
        <div className="flex flex-col gap-4">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-zinc-800 rounded-2xl overflow-hidden flex flex-row hover:bg-zinc-750 transition-all border border-zinc-700 hover:border-orange-500/30"
            >
              {/* Left — Image */}
              <div className="w-48 min-h-full flex-shrink-0">
                {issue.image ? (
                  <img
                    src={`${serverUrl}/${issue.image}`}
                    alt="issue"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-700 flex items-center justify-center min-h-[140px]">
                    <span className="text-5xl">{categoryIcon[issue.category] || '📋'}</span>
                  </div>
                )}
              </div>

              {/* Right — Details */}
              <div className="flex flex-col justify-between p-5 flex-1 gap-2">

                {/* Top row */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryIcon[issue.category] || '📋'}</span>
                      <span className="text-zinc-500 text-xs uppercase tracking-wider">{issue.category}</span>
                    </div>
                    <h2 className="text-white font-bold text-xl">{issue.title}</h2>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 ${statusConfig[issue.status]?.color}`}>
                    {statusConfig[issue.status]?.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm line-clamp-2">{issue.description}</p>

                {/* Bottom row */}
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-xs flex items-center gap-1">
                      📍 {issue.city}, {issue.state}
                    </span>
                    <span className="text-zinc-600 text-xs">
                      🏠 {issue.address}
                    </span>
                  </div>
                  <span className="text-zinc-600 text-xs">
                    {new Date(issue.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProblem;