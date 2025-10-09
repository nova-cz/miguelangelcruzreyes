import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutMe from '../components/AboutMe';

const AboutMePage = () => {
  const { pathname } = useLocation();

  // Usar useLayoutEffect para asegurar que el scroll ocurra antes de que el navegador pinte
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  

  return (
    <div className="h-screen flex flex-col bg-black pt-20 overflow-hidden">
      {/* pt-20 para respetar el navbar */}
      <div className="flex-1 flex justify-center items-center pt-2 px-4 py-0 md:px-10">
        {/* Contenedor del chat */}
        <div className="w-full max-w-4xl h-[75vh] bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800/50 overflow-hidden">
          <AboutMe fullPage={true} />
        </div>
      </div>
    </div>
  );
  
  
};

export default AboutMePage;
