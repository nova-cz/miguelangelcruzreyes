import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar navbar si estamos en la parte superior (menos de 100px)
      if (currentScrollY < 100) {
        setVisible(true);
        setScrolled(false);
      } else {
        // Si scrolleamos hacia arriba, mostrar navbar
        if (currentScrollY < lastScrollY) {
          setVisible(true);
        }
        // Si scrolleamos hacia abajo, ocultar navbar
        else if (currentScrollY > lastScrollY) {
          setVisible(false);
        }
        
        // Cambiar estado de "scrolled" para estilos
        setScrolled(currentScrollY > 10);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
            {navLinks.map(({ link, name }) => {
              if (isHomePage) {
                if (name === 'About Me') {
                  return (
                    <li key={name} className="group">
                      <Link to="/about-me" onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo(0, 0);
                        window.location.href = '/about-me';
                      }}>
                        <span>{name}</span>
                        <span className="underline" />
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={name} className="group">
                      <a href={link}>
                        <span>{name}</span>
                        <span className="underline" />
                      </a>
                    </li>
                  );
                }
              } else {
                if (link.startsWith('#')) {
                  return (
                    <li key={name} className="group">
                      <Link to={`/${link}`}>
                        <span>{name}</span>
                        <span className="underline" />
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={name} className="group">
                      <Link to={link}>
                        <span>{name}</span>
                        <span className="underline" />
                      </Link>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </nav>

        {isHomePage ? (
          <a href="#contact" className="contact-btn group">
            <div className="inner">
              <span>Contact me</span>
            </div>
          </a>
        ) : (
          <Link to="/#contact" className="contact-btn group">
            <div className="inner">
              <span>Contact me</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;