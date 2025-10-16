  import { useState, useEffect } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { FileText, Download, X } from "lucide-react";
  import { navLinks } from "../constants";

  const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showCVModal, setShowCVModal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    // Ruta de tu CV (ajusta según donde esté guardado tu PDF)
    const cvPath = "/Resume2025.pdf"; // Coloca tu CV en la carpeta public como cv.pdf

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 100) {
          setVisible(true);
          setScrolled(false);
        } else {
          if (currentScrollY < lastScrollY) {
            setVisible(true);
          } else if (currentScrollY > lastScrollY) {
            setVisible(false);
          }
          setScrolled(currentScrollY > 10);
        }

        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
      if (showCVModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [showCVModal]);

    const handleNavClick = (e, link) => {
      if (link === '/about-me') {
        if (!isHomePage) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (link.startsWith('#')) {
        e.preventDefault();
        
        if (isHomePage) {
          const element = document.querySelector(link);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/');
          setTimeout(() => {
            const element = document.querySelector(link);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    const handleContactClick = (e) => {
      e.preventDefault();
      
      if (isHomePage) {
        const element = document.querySelector('#contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('#contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    const handleDownloadCV = () => {
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = 'Miguel_Angel_Cruz_Reyes_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <>
        <header 
          className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${
            visible ? "visible" : "hidden"
          }`}
          style={{
            transform: visible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="inner">
            <Link to="/" className="logo">
              Miguel CR
            </Link>

            <nav className="desktop">
              <ul>
                {navLinks.map(({ link, name }) => (
                  <li key={name} className="group">
                    {link === '/about-me' ? (
                      <Link 
                        to={link}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        <span>{name}</span>
                        <span className="underline" />
                      </Link>
                    ) : (
                      <a 
                        href={link}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        <span>{name}</span>
                        <span className="underline" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {/* Botón CV */}
              <button 
                onClick={() => setShowCVModal(true)}
                className="cv-btn group flex items-center gap-2"
                title="Ver CV"
              >
                <FileText className="w-4 h-4" />
                <span>CV</span>
              </button>

              {/* Botón Contact */}
              <button onClick={handleContactClick} className="contact-btn group">
                <div className="inner">
                  <span>Contact me</span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Modal CV */}
        {showCVModal && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setShowCVModal(false)}
          >
            <div 
              className="relative w-[95%] h-[95vh] max-w-5xl bg-slate-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con botones */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-slate-900 via-slate-900/95 to-transparent">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Curriculum Vitae
                </h3>
                
                <div className="flex items-center gap-2">
                  {/* Botón Descargar */}
                  <button
                    onClick={handleDownloadCV}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>

                  {/* Botón Cerrar */}
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <iframe
                src={`${cvPath}#toolbar=0`}
                className="w-full h-full"
                title="CV Preview"
              />
            </div>
          </div>
        )}

        {/* Estilos para el botón CV */}
        <style>{`
          .cv-btn {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            color: white;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .cv-btn:hover {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
            border-color: rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
          }

          .cv-btn svg {
            transition: transform 0.3s ease;
          }

          .cv-btn:hover svg {
            transform: scale(1.1);
          }
        `}</style>
      </>
    );
  };

  export default NavBar;