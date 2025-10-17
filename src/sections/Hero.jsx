import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  const modelContainerRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  // Detectar cuando el usuario presiona fuerte (mouse down o touch)
  useEffect(() => {
    const container = modelContainerRef.current;
    if (!container) return;

    const handlePointerDown = () => {
      setIsPressed(true);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    const handlePointerCancel = () => {
      setIsPressed(false);
    };

    // Solo permitir movimiento del modelo cuando está presionado
    const handlePointerMove = (e) => {
      if (!isPressed) {
        // Si no está presionado, no hacer nada (permitir scroll)
        return;
      }
      // Si está presionado, el modelo 3D maneja el movimiento
      e.preventDefault();
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerCancel);
    container.addEventListener("pointermove", handlePointerMove, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerCancel);
      container.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isPressed]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 relative z-20 pointer-events-auto">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Transforming
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Impact</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Miguel, a passionate developer.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12 relative z-10"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure
          ref={modelContainerRef}
          className={`${isPressed ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            pointerEvents: isPressed ? "auto" : "none",
            touchAction: isPressed ? "none" : "auto",
          }}
        >
          <div className="hero-3d-layout pointer-events-auto">
            <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;