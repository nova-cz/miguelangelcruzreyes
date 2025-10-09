import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener('scroll', handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link to="/" className="logo">
          Miguel CR
        </Link>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => {
              // Si estamos en la página de inicio, usamos enlaces de ancla
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
                // Si estamos en otra página, usamos Link para navegar a la página de inicio con el hash
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