import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

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

  return (
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

        <button onClick={handleContactClick} className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default NavBar;