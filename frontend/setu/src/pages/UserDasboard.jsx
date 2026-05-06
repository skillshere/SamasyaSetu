import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/authContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { serverUrl } = useContext(authDataContext);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('view');
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchUserProfile(); }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(serverUrl + '/api/profile/myprofile', { withCredentials: true });
      setUser(res.data);
      setForm(res.data);
    } catch (err) { console.log(err); }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(serverUrl + '/api/profile/update', form, { withCredentials: true });
      setUser(res.data);
      setMsg('Profile updated successfully!');
      setTimeout(() => { setMsg(''); setActiveTab('view'); }, 1500);
    } catch (err) { console.log(err); }
  };

  if (!user) return (
    <div className="min-h-screen bg-[#f0f9f7] flex items-center justify-center">
      <p className="text-[#444] font-medium">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f0f9f7] p-6 relative">
      <IoMdArrowRoundBack
        className="text-2xl text-gray-600  cursor-pointer absolute left-8 top-4"
        onClick={() => navigate(-1)}
      />

      {/* Tabs */}
      <div className="flex gap-3 mb-6 mt-8">
        {['view', 'edit'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab
                ? 'bg-[#0f6e56] text-white border border-[#0f6e56]'
                : 'bg-white text-[#444] border border-[#b2ddd5] hover:bg-[#e1f5ee]'
              }`}>
            {tab === 'view' ? 'My Profile' : 'Edit Profile'}
          </button>
        ))}
      </div>

      {/* View Tab */}
      {activeTab === 'view' && (
        <div className="bg-white rounded-xl p-6 border border-[#b2ddd5] max-w-lg shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-[#0f6e56] flex items-center justify-center text-xl font-medium text-white">
              {(user.username || 'U').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-[#444]">{user.username}</p>
              <p className="text-[#777] text-sm">{user.email}</p>
              <span className="text-xs px-3 py-1 mt-1 inline-block rounded-full bg-[#e1f5ee] text-[#0f6e56] font-medium">
                {user.role}
              </span>
            </div>
          </div>

          <hr className="border-[#b2ddd5] mb-4" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#999] text-xs uppercase tracking-wide mb-1">City</p>
              <p className="text-[#444] font-medium">{user.city || '—'}</p>
            </div>
            <div>
              <p className="text-[#999] text-xs uppercase tracking-wide mb-1">State</p>
              <p className="text-[#444] font-medium">{user.state || '—'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[#999] text-xs uppercase tracking-wide mb-1">Address</p>
              <p className="text-[#444] font-medium">{user.address || '—'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tab */}
      {activeTab === 'edit' && (
        <div className="bg-white rounded-xl p-6 border border-[#b2ddd5] max-w-lg shadow-sm">
          {msg && (
            <p className="bg-[#e1f5ee] text-[#0f6e56] border border-[#b2ddd5] text-sm px-4 py-2 rounded-lg mb-4">
              {msg}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4">
            {['username', 'email', 'address'].map(field => (
              <div key={field}>
                <label className="text-xs text-[#999] uppercase tracking-wide capitalize block mb-1">
                  {field}
                </label>
                <input
                  value={form[field] || ''}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-[#f0f9f7] border border-[#b2ddd5] rounded-lg px-3 py-2 text-sm text-[#444] outline-none focus:border-[#0f6e56] focus:ring-1 focus:ring-[#0f6e56]"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              {['city', 'state'].map(field => (
                <div key={field}>
                  <label className="text-xs text-[#999] uppercase tracking-wide capitalize block mb-1">
                    {field}
                  </label>
                  <input
                    value={form[field] || ''}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-[#f0f9f7] border border-[#b2ddd5] rounded-lg px-3 py-2 text-sm text-[#444] outline-none focus:border-[#0f6e56] focus:ring-1 focus:ring-[#0f6e56]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={handleUpdate}
              className="px-5 py-2 bg-[#0f6e56] text-white rounded-lg text-sm font-medium hover:bg-[#085041] transition">
              Save Changes
            </button>
            <button onClick={() => setActiveTab('view')}
              className="px-5 py-2 bg-white text-[#444] border border-[#b2ddd5] rounded-lg text-sm hover:bg-[#f0f9f7] transition">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;