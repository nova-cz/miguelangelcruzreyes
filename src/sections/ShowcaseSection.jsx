import { useRef, useState, useEffect } from "react";
import { X, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI Resume Analyzer",
    shortDesc: "Smart resume analysis powered by AI technology",
    fullDesc: "An intelligent resume analyzer that uses AI to provide comprehensive feedback and improvements on your resume. Get instant insights on formatting, content optimization, and professional recommendations.",
    image: "/public/images/project1.png",
    bgColor: "#E8D7FF",
    accentColor: "#8B5CF6",
    technologies: ["React", "Node.js", "AI/ML", "TailwindCSS", "Express"],
    repo: "https://github.com/nova-cz/ai-resume-analyzer",
    deploy: "https://puter.com/app/ai-resume-analyzer-163",
    features: ["AI-powered analysis", "Real-time feedback", "Resume optimization tips", "Export functionality"]
  },
  {
    id: 2,
    title: "YC Directory",
    shortDesc: "Discover and explore innovative startups",
    fullDesc: "A comprehensive startup directory showcasing Y Combinator companies. Browse through innovative startups, explore their details, and discover the next big thing in the tech industry.",
    image: "/public/images/project3.png",
    bgColor: "#FFEFDB",
    accentColor: "#F59E0B",
    technologies: ["React", "Next.js", "MongoDB", "TypeScript", "TailwindCSS"],
    repo: "https://github.com/nova-cz/YCDirectory",
    deploy: "https://yc-directory-five-sigma.vercel.app",
    features: ["Startup database", "Advanced search", "Detailed company profiles", "Real-time updates"]
  },
  {
    id: 3,
    title: "Movie Platform",
    shortDesc: "Stream and discover your favorite movies",
    fullDesc: "A modern movie streaming platform built with Appwrite backend. Browse thousands of movies, create personalized watchlists, and get recommendations based on your preferences.",
    image: "/public/images/project4.png",
    bgColor: "#FFE7EB",
    accentColor: "#EC4899",
    technologies: ["React", "Appwrite", "MongoDB", "TailwindCSS", "JavaScript"],
    repo: "https://github.com/nova-cz/movie-appwrite_project",
    deploy: "https://movie-appwrite-project.vercel.app",
    features: ["Movie streaming", "Watchlist management", "User recommendations", "Smooth playback"]
  },
];

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes modalBackdropBlur {
          from {
            backdrop-filter: blur(0px);
          }
          to {
            backdrop-filter: blur(12px);
          }
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .modal-backdrop {
          animation: modalBackdropBlur 0.4s ease-out forwards;
        }
        .modal-content {
          animation: modalSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      <div className="modal-content relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="sticky top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="p-8 md:p-16">
          {/* Header Image with overlay */}
          <div className="mb-12 rounded-2xl overflow-hidden h-64 md:h-96 relative group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
            {project.title}
          </h1>
          <p className="text-lg mb-8" style={{ color: project.accentColor }}>
            {project.shortDesc}
          </p>

          {/* Divider */}
          <div className="w-20 h-1 rounded-full mb-8" style={{ backgroundColor: project.accentColor }} />

          {/* Description */}
          <div className="mb-12 pb-12 border-b border-white/10">
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 group">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 rounded-full border text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: `${project.accentColor}15`,
                    borderColor: project.accentColor,
                    color: project.accentColor
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{
                backgroundColor: project.accentColor,
                boxShadow: `0 0 30px ${project.accentColor}40`
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = `0 0 50px ${project.accentColor}70`}
              onMouseLeave={(e) => e.target.style.boxShadow = `0 0 30px ${project.accentColor}40`}
            >
              <ExternalLink className="w-5 h-5" />
              Visit Live Demo
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold border-2 hover:translate-y-[-2px] transition-all duration-300"
              style={{
                borderColor: project.accentColor,
                backgroundColor: `${project.accentColor}15`,
                color: project.accentColor
              }}
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const index = cardsRef.current.indexOf(element);
          element.style.animation = `slideUpIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s forwards`;
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="work" className="min-h-screen bg-black py-32 px-4 md:px-8">
      <style>{`
        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cardHoverFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .card-container {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-container:hover {
          animation: cardHoverFloat 3s ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6" style={{ color: "#000000" }}>
            My Projects
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r rounded-full" style={{
            backgroundImage: `linear-gradient(to right, #8B5CF6, #F59E0B, #EC4899)`
          }} />
          <p className="text-gray-400 text-lg mt-4">Exploring ideas through code</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* First Project - Large Feature */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="lg:col-span-2 opacity-0 card-container group cursor-pointer"
            onClick={() => setSelectedProject(projects[0])}
          >
            <div 
              className="h-full rounded-3xl overflow-hidden border-2 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col"
              style={{
                backgroundColor: projects[0].bgColor,
                borderColor: `${projects[0].accentColor}40`
              }}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-10 md:p-16 flex flex-col md:flex-row gap-12 h-full">
                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 text-white">
                      {projects[0].title}
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {projects[0].fullDesc}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={projects[0].deploy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{
                        backgroundColor: projects[0].accentColor,
                        boxShadow: `0 0 20px ${projects[0].accentColor}40`
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Demo
                    </a>
                    <a
                      href={projects[0].repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300 hover:translate-y-[-2px]"
                      style={{
                        borderColor: projects[0].accentColor,
                        backgroundColor: `${projects[0].accentColor}10`,
                        color: projects[0].accentColor
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Code
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2 overflow-hidden rounded-2xl">
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: hoveredCard === 0 ? "scale(1.08) rotate(1deg)" : "scale(1) rotate(0deg)"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          {projects.slice(1).map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[idx + 1] = el)}
              className="opacity-0 card-container group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredCard(idx + 1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="h-full rounded-3xl overflow-hidden border-2 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col"
                style={{
                  backgroundColor: project.bgColor,
                  borderColor: `${project.accentColor}40`
                }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br" style={{
                  backgroundImage: `linear-gradient(135deg, ${project.bgColor}80 0%, ${project.accentColor}20 100%)`
                }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: hoveredCard === idx + 1 ? "scale(1.12) rotate(-1deg)" : "scale(1) rotate(0deg)"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-3 transition-colors duration-300 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: `${project.accentColor}15`,
                            borderColor: project.accentColor,
                            color: project.accentColor
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 text-white rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md"
                        style={{
                          backgroundColor: project.accentColor
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live
                      </a>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all duration-300 hover:translate-y-[-1px]"
                        style={{
                          borderColor: project.accentColor,
                          backgroundColor: `${project.accentColor}10`,
                          color: project.accentColor
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default AppShowcase;