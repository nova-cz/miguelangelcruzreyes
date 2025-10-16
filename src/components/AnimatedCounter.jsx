import { useRef, useState, useEffect } from "react";

const CounterItem = ({ value, suffix, label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden p-8 md:p-10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
      style={{
        background: "linear-gradient(135deg, rgba(30, 30, 45, 0.6) 0%, rgba(20, 20, 35, 0.8) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        minHeight: "160px",
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
          }}
        />
      </div>

      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        {/* Counter Number */}
        <div
          className="text-5xl md:text-6xl font-bold transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500"
          style={{
            color: isVisible ? "white" : "rgba(255, 255, 255, 0.5)",
            animation: isVisible ? "slideInUp 0.6s ease-out" : "none",
          }}
        >
          {displayValue}<span className="text-3xl text-blue-400 ml-1">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-gray-400 text-sm md:text-base font-medium transition-colors duration-300 group-hover:text-gray-300">
          {label}
        </p>
      </div>
    </div>
  );
};

const AnimatedCounter = () => {
  const counterItems = [
    { value: 2, suffix: "+", label: "Years of Experience" },
    { value: 25, suffix: "+", label: "Projects Completed" },
    { value: 10, suffix: "+", label: "Technologies Mastered" },
    { value: 100, suffix: "%", label: "Dedication to Quality" },
  ];

  return (
    <div id="counter" className="py-8 md:py-12 px-4 md:px-8 bg-black relative overflow-hidden">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {counterItems.map((item, index) => (
            <div
              key={index}
              style={{
                animation: `slideInUp 0.6s ease-out ${0.1 + index * 0.1}s both`,
              }}
            >
              <CounterItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounter;