import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleQuickLinkClick = (e, href) => {
        e.preventDefault();

        if (href.startsWith('#')) {
            if (isHomePage) {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        {
            name: "Instagram",
            url: "https://www.instagram.com/ngl.mike/?next=%2F",
            icon: Instagram,
            color: "hover:text-pink-400"
        },
        {
            name: "GitHub",
            url: "https://github.com/nova-cz",
            icon: Github,
            color: "hover:text-gray-300"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/miguelcr4/",
            icon: Linkedin,
            color: "hover:text-blue-400"
        }
    ];

    return (
        <footer className="bg-black border-t border-white/10 relative overflow-hidden">
            <style>{`
        @keyframes slideUpIn {
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

        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        .animate-slideUpIn {
          animation: slideUpIn 0.8s ease-out forwards;
        }

        .animate-floatIcon {
          animation: floatIcon 3s ease-in-out infinite;
        }

        .glow-on-hover {
          transition: all 0.3s ease;
          position: relative;
        }

        .glow-on-hover::before {
          content: '';
          position: absolute;
          inset: -8px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .glow-on-hover:hover::before {
          opacity: 1;
        }
      `}</style>

            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                style={{ animation: "float 5s ease-in-out infinite" }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                style={{ animation: "float 7s ease-in-out infinite 1s" }} />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Left/Center Mobile: Name & Description */}
                    <div className="flex flex-col justify-center items-center md:items-start space-y-4 animate-slideUpIn text-center md:text-left md:col-span-1">
                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                            Miguel Angel
                        </h3>
                        <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Cruz Reyes
                        </p>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Full Stack Developer crafting elegant digital experiences with modern technologies.
                        </p>
                    </div>

                    {/* Center: Social Links */}
                    <div className="flex flex-col items-center justify-center space-y-4 animate-slideUpIn md:col-span-1" style={{ animationDelay: "0.2s" }}>
                        <h4 className="text-lg font-semibold text-white mb-2">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`glow-on-hover group relative p-3 rounded-full border border-white/10 text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-2`}
                                        title={social.name}
                                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                        <Icon className="w-6 h-6 relative z-10 animate-floatIcon" style={{ animationDelay: `${index * 0.2}s` }} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Quick Links - Hidden on Mobile */}
                    <div className="hidden md:flex flex-col justify-center items-end text-right space-y-4 animate-slideUpIn md:col-span-1" style={{ animationDelay: "0.1s" }}>
                        <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
                        <nav className="space-y-3 text-gray-400">
                            <a
                                href="#hero"
                                onClick={(e) => handleQuickLinkClick(e, '#hero')}
                                className="block hover:text-white transition-colors duration-300 group cursor-pointer"
                            >
                                <span className="group-hover:-translate-x-2 transition-transform duration-300 inline-block">Home</span>
                            </a>
                            <a
                                href="#work"
                                onClick={(e) => handleQuickLinkClick(e, '#work')}
                                className="block hover:text-white transition-colors duration-300 group cursor-pointer"
                            >
                                <span className="group-hover:-translate-x-2 transition-transform duration-300 inline-block">Projects</span>
                            </a>
                            <a
                                href="#experience"
                                onClick={(e) => handleQuickLinkClick(e, '#experience')}
                                className="block hover:text-white transition-colors duration-300 group cursor-pointer"
                            >
                                <span className="group-hover:-translate-x-2 transition-transform duration-300 inline-block">Experience</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleQuickLinkClick(e, '#contact')}
                                className="block hover:text-white transition-colors duration-300 group cursor-pointer"
                            >
                                <span className="group-hover:-translate-x-2 transition-transform duration-300 inline-block">Contact</span>
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                {/* Bottom: Copyright & Scroll to Top */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © 2025 Miguel Angel Cruz Reyes. All rights reserved.
                    </p>

                    {/* Scroll to Top Button */}
                    {showScrollTop && (
                        <button
                            onClick={scrollToTop}
                            className="group relative p-2 rounded-full border border-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/10"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;