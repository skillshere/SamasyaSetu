import React, { useState, useEffect } from "react";
import mcf from "../assets/drainage_img.png";
import mcf2 from "../assets/mcf_img.png";
import mcf3 from "../assets/track_image.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Report Your Issue",
    desc: "Report water-related issues in your area with photos and descriptions",
    image: mcf,
    badge: "Water & Drainage",
    position: "center",
  },
  {
    title: "Your Problem is Our Problem!",
    desc: "We make sure your issue reaches the right authority directly",
    image: mcf2,
    badge: "Government Connect",
    position: "center",
  },
  {
    title: "Track the Status",
    desc: "Check the status of your report and get real-time updates",
    image: mcf3,
    badge: "Live Tracking",
    position: "top",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '320px' }}
    >

      {/* Background Image */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${slides[current].image})`,
          backgroundSize: 'cover',
          backgroundPosition: slides[current].position,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content — buttons ke liye padding */}
      <div className="absolute inset-0 flex flex-col justify-center pl-12 pr-14 md:pl-20 md:pr-24 max-w-2xl">

        {/* Badge */}
        <span className="inline-block bg-[#0f6e56] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit tracking-wide">
          {slides[current].badge}
        </span>

        {/* Title */}
        <h2 className="text-white text-2xl md:text-5xl font-bold leading-tight mb-2 drop-shadow-lg">
          {slides[current].title}
        </h2>

        {/* Description */}
        <p className="text-zinc-200 text-sm md:text-lg leading-relaxed mb-4 max-w-md">
          {slides[current].desc}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/issue')}
            className="bg-[#0f6e56] hover:bg-[#085041] text-white px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all"
          >
            + Report Problem
          </button>
          <button
            onClick={() => navigate('/about')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/40 px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all backdrop-blur-sm"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/30 border border-white/20 text-white rounded-full flex items-center justify-center text-lg transition-all backdrop-blur-sm z-10"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/30 border border-white/20 text-white rounded-full flex items-center justify-center text-lg transition-all backdrop-blur-sm z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-12 md:left-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-8' : 'bg-white/40 w-4'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div
          className="h-full bg-[#0f6e56] transition-all duration-300"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

    </div>
  );
};

export default Slider;