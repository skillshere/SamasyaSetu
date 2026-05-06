import React, { useContext } from 'react';
import Slider from '../components/Slides';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../../context/userContext';
import drainageImg from '../assets/drainage_img.png';
import mcfImg from '../assets/mcf_img.png';
import trackImg from '../assets/track_image.png';

const Home = () => {
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const steps = [
    { step: '01', title: 'Click Photo', desc: 'Take a clear photo of the issue in your area.' },
    { step: '02', title: 'Fill Details', desc: 'Describe your problem with location and category.' },
    { step: '03', title: 'Auto Assign', desc: 'Complaint is sent to the right authority automatically.' },
    { step: '04', title: 'Track Status', desc: 'Get real-time updates until your issue is resolved.' },
  ];

  const categories = [
    { icon: '🚧', label: 'Roads' },
    { icon: '💧', label: 'Water Supply' },
    { icon: '💡', label: 'Electricity' },
    { icon: '🗑️', label: 'Sanitation' },
    { icon: '🏥', label: 'Health' },
    { icon: '🏫', label: 'Education' },
  ];

  const testimonials = [
    { initials: 'RK', name: 'Rahul K.', city: 'Delhi', text: 'My road complaint was resolved in just 3 days! Great initiative.' },
    { initials: 'PS', name: 'Priya S.', city: 'Haryana', text: 'Finally a platform where citizens are actually heard. Love it!' },
    { initials: 'AM', name: 'Amit M.', city: 'Faridabad', text: 'Water supply issue fixed after years. Thank you SamasyaSetu!' },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f0f9f7]">

      {/* Slider */}
      <Slider />

      {/* Stats Bar */}
      <div className="bg-[#0f6e56] py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-10">
          {[
            { number: '500+', label: 'Problems Reported' },
            { number: '20+', label: 'Cities Covered' },
            { number: '80%', label: 'Issues Resolved' },
            { number: '15+', label: 'Departments Connected' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-white text-2xl font-bold">{stat.number}</p>
              <p className="text-[#9FE1CB] text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report CTA Section with image */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6 py-14">
          <div className="flex-1">
            <span className="text-[#0f6e56] text-xs font-semibold tracking-widest uppercase">Citizen Portal</span>
            <h2 className="text-[#444] text-3xl font-bold mt-2 mb-4 leading-tight">
              Have a Problem? <br /> Don't Worry, We're Here.
            </h2>
            <p className="text-[#777] text-sm leading-relaxed mb-6">
              Report your issue and we will make sure it reaches the right authority. 
              Whether it's a broken road, water supply failure, or electricity issue — 
              SamasyaSetu ensures your voice is heard.
            </p>
            <button
              onClick={() => navigate(userData ? '/issue' : '/login')}
              className="bg-[#0f6e56] hover:bg-[#085041] text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all"
            >
              + Report a Problem
            </button>
          </div>
          <div className="flex-1 w-full">
            <img
              src={drainageImg}
              alt="Report Issue"
              className="w-full h-64 object-cover rounded-xl border border-[#b2ddd5]"
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-14 px-6 bg-[#f0f9f7]">
        <p className="text-center text-[#0f6e56] text-xs font-semibold tracking-widest uppercase mb-2">Simple Process</p>
        <h2 className="text-center text-[#444] text-2xl font-bold mb-10">How to Submit Your Problem?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="bg-white border border-[#b2ddd5] rounded-xl p-5 relative">
              <span className="text-[#0f6e56] text-3xl font-bold opacity-20 absolute top-4 right-4">{step.step}</span>
              <div className="w-8 h-8 rounded-full bg-[#0f6e56] flex items-center justify-center text-white text-sm font-bold mb-3">
                {step.step}
              </div>
              <h3 className="text-[#444] font-bold text-sm mb-1">{step.title}</h3>
              <p className="text-[#777] text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Authority Connect Section with image */}
      <div className="bg-[#0f6e56]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8 px-6 py-14">
          <div className="flex-1">
            <span className="text-[#9FE1CB] text-xs font-semibold tracking-widest uppercase">Government Connect</span>
            <h2 className="text-white text-3xl font-bold mt-2 mb-4 leading-tight">
              Your Problem Reaches <br /> the Right Authority
            </h2>
            <p className="text-[#9FE1CB] text-sm leading-relaxed mb-6">
              SamasyaSetu is directly connected to 15+ government departments.
              No middlemen, no delays — your complaint is auto-assigned to the
              right official in your area instantly.
            </p>
            <div className="flex gap-3 flex-wrap">
              {['Roads Dept.', 'Water Board', 'Electricity', 'Health Dept.'].map((dept, i) => (
                <span key={i} className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1 rounded-full">
                  {dept}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <img
              src={mcfImg}
              alt="Authority Connect"
              className="w-full h-64 object-cover rounded-xl border border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-14 px-6 bg-white">
        <p className="text-center text-[#0f6e56] text-xs font-semibold tracking-widest uppercase mb-2">Report Issues In</p>
        <h2 className="text-center text-[#444] text-2xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(userData ? '/issue' : '/login')}
              className="bg-[#f0f9f7] border border-[#b2ddd5] rounded-xl p-4 text-center cursor-pointer hover:bg-[#e1f5ee] hover:border-[#0f6e56] transition-all"
            >
              <div className="text-3xl">{cat.icon}</div>
              <p className="text-[#444] text-xs font-semibold mt-2">{cat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Track Section with image */}
      <div className="bg-[#f0f9f7]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6 py-14">
          <div className="flex-1">
            <span className="text-[#0f6e56] text-xs font-semibold tracking-widest uppercase">Live Tracking</span>
            <h2 className="text-[#444] text-3xl font-bold mt-2 mb-4 leading-tight">
              Track Your Complaint <br /> in Real Time
            </h2>
            <p className="text-[#777] text-sm leading-relaxed mb-6">
              Once you submit your complaint, you can track every step of the process.
              Know when it's received, assigned, in progress, and finally resolved — 
              all from your dashboard.
            </p>
            <div className="flex flex-col gap-2">
              {['Complaint Received', 'Assigned to Department', 'Work In Progress', 'Issue Resolved'].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0f6e56] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <p className="text-[#444] text-sm">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <img
              src={trackImg}
              alt="Track Status"
              className="w-full h-64 object-cover rounded-xl border border-[#b2ddd5]"
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-14 px-6 bg-white">
        <p className="text-center text-[#0f6e56] text-xs font-semibold tracking-widest uppercase mb-2">Citizen Stories</p>
        <h2 className="text-center text-[#444] text-2xl font-bold mb-8">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#f0f9f7] border border-[#b2ddd5] rounded-xl p-5">
              <p className="text-[#0f6e56] text-3xl leading-none mb-2">"</p>
              <p className="text-[#555] text-sm leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#b2ddd5]">
                <div className="w-9 h-9 rounded-full bg-[#0f6e56] flex items-center justify-center text-white text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#444] text-xs font-semibold">{t.name}</p>
                  <p className="text-[#999] text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#0f6e56] py-14 px-6 text-center">
        <h2 className="text-white text-2xl font-bold mb-3">Ready to Make a Change?</h2>
        <p className="text-[#9FE1CB] text-sm mb-6 max-w-md mx-auto">
          Join thousands of citizens who are already making their voices heard across India.
        </p>
        <button
          onClick={() => navigate(userData ? '/issue' : '/login')}
          className="bg-white text-[#0f6e56] font-bold px-10 py-3 rounded-lg text-sm hover:bg-[#e1f5ee] transition"
        >
          Report Your Problem Now →
        </button>
      </div>

      {/* Footer */}
      <div className="bg-[#085041] text-center py-5">
        <p className="text-[#9FE1CB] text-xs">
          © 2024 SamasyaSetu — Awaaz Uthao, Badlaav Lao
        </p>
      </div>

    </div>
  );
};

export default Home;