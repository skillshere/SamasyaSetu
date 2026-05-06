import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 relative">
      <IoMdArrowRoundBack
        className="text-2xl text-gray-600  cursor-pointer absolute left-10 top-5"
        onClick={() => navigate(-1)}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Citizens' Voice, Reaching the Government
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            SamasyaSetu is a digital platform that bridges the gap between
            citizens and government departments — register your complaints,
            track their status, and get them resolved.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              title: "File a Complaint",
              desc: "Describe your problem in simple words and submit it easily.",
              icon: "📝",
              bg: "bg-blue-100",
            },
            {
              title: "Real-time Status",
              desc: "Track every step of your complaint live.",
              icon: "📊",
              bg: "bg-green-100",
            },
            {
              title: "Secure Platform",
              desc: "Your data and identity are completely safe with us.",
              icon: "🛡️",
              bg: "bg-yellow-100",
            },
            {
              title: "Fast Resolution",
              desc: "The concerned department works directly on your complaint.",
              icon: "⏱️",
              bg: "bg-teal-100",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.bg} rounded-xl p-5 border border-gray-200`}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-gray-50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-xl font-medium text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Every citizen has the right to be heard. SamasyaSetu is a bridge
            that creates a direct connection between the common person and the
            government system — without any middleman, without any hassle.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-800 text-center mb-6 underline decoration-slate-900">
            How Does It Work?
          </h2>
          <div className="divide-y divide-gray-100">
            {[
              {
                step: 1,
                title: "Register / Login",
                desc: "Create your account or log in to get started.",
              },
              {
                step: 2,
                title: "Describe Your Issue",
                desc: "Write your complaint in detail and submit it.",
              },
              {
                step: 3,
                title: "Forward to Department",
                desc: "Your complaint is automatically assigned to the relevant department.",
              },
              {
                step: 4,
                title: "Get It Resolved",
                desc: "Track the status and wait for your complaint to be resolved.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start py-4">
                <div className="min-w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-sm">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-purple-50 rounded-xl p-8">
          <p className="text-purple-800 font-medium mb-4">
            Report your problem today !
          </p>
          <Link
            to="/issue"
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-purple-700 transition"
          >
            Register Your Problem →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
