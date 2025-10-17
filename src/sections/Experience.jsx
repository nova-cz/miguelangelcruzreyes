import { useRef, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const expCards = [
  {
    title: "Founder and Mentor – Legion Kids Initiative",
    date: "April 2024 - June 2024",
    company: "Puebla, Mexico",
    review:
      "Founded and led Legion Kids to support children struggling with post-pandemic learning gaps, fostering curiosity and academic confidence through interactive sessions.",
    responsibilities: [
      "Founded and led Legion Kids to support children with post-pandemic learning gaps",
      "Taught math and basic English to 22 children aged 9 to 11",
    ],
    imgPath: "/images/experiencia/legionkids.jpg",
    link: "https://drive.google.com/drive/u/1/folders/1cITTvs7rIWoxBcYISP4f54v562kbmNpg",
    galleryFolder: "legionkids"
  },
  {
    title: "Mentor of a Robotics Team – FTC AZTROID (FIRST Tech Challenge)",
    date: "June 2022 - December 2024",
    company: "ROBOTICS FTC – Puebla, Mexico",
    review:
      "Guided high school students in robotics, teaching 3D modeling with Onshape and SolidWorks, electronics, and programming in block-based languages and Java. Enhanced students' problem-solving and teamwork skills through competition mentoring at the state level.",
    responsibilities: [
      "Instructed students in 3D modeling, electronics, and programming (Java & block-based)",
      "Led competitive robotics training and team management",
      "Enhanced students' technical and problem-solving abilities through mentorship",
    ],
    imgPath: "/images/experiencia/mentor.jpg",
    link: "https://drive.google.com/drive/u/1/folders/1cITTvs7rIWoxBcYISP4f54v562kbmNpg",
    galleryFolder: "aztroid"
  },
];

const GalleryModal = ({ isOpen, onClose, title, galleryFolder, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo nubloso */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-500/10">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>
          </div>

          {/* Gallery */}
          <div className="relative bg-black/40">
            {/* Imagen principal */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Contador */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-sm text-gray-200">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* Botones de navegación */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-full transition-colors backdrop-blur"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-full transition-colors backdrop-blur"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto bg-black/30 border-t border-blue-500/10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    idx === currentIndex
                      ? "ring-2 ring-blue-400 scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const cardsRef = useRef([]);
  const imageRef = useRef([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // Simular imágenes de las carpetas
  const folderImages = {
    aztroid: [
      // "/images/aztroid/1.JPG",
      "/images/aztroid/2.JPG",
      "/images/aztroid/3.jpg",
      // "/images/aztroid/4.HEIC",
      "/images/aztroid/5.JPG",
      "/images/aztroid/6.PNG",
    ],
    legionkids: [
      "/images/legionkids/1.JPG",
      "/images/legionkids/2.JPG",
      // "/images/legionkids/3.MP4",
      "/images/legionkids/4.JPG",
      "/images/legionkids/5.JPG",
      "/images/legionkids/6.JPG",
      "/images/legionkids/7.JPG",
      "/images/legionkids/8.JPG",
      "/images/legionkids/9.JPG",
      // "/images/legionkids/10.MP4",
      "/images/legionkids/11.JPG",
      "/images/legionkids/12.JPG",
      "/images/legionkids/13.JPG",
      "/images/legionkids/14.JPG",
      "/images/legionkids/15.JPG",
      "/images/legionkids/16.JPG",
    ],
  };

  const openGallery = (card) => {
    setSelectedProject(card.title);
    setGalleryImages(folderImages[card.galleryFolder] || []);
    setModalOpen(true);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.style.animation = `slideUp 0.7s ease-out ${index * 0.15}s forwards`;
          observer.unobserve(card);
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardHover = (index, isEntering) => {
    const card = cardsRef.current[index];
    const image = imageRef.current[index];

    if (isEntering) {
      card.style.transform = "translateY(-8px)";
      card.style.boxShadow = "0 20px 40px rgba(59, 130, 246, 0.2)";
      if (image) image.style.transform = "scale(1.05)";
    } else {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
      if (image) image.style.transform = "scale(1)";
    }
  };

  return (
    <section id="experience" className="py-24 bg-black">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-20">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-lg">💼</span>
              <span className="text-sm text-gray-400">My Career Overview</span>
            </div>
          </div>

          <h1 className="text-center text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Work
            <span className="block text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Experience
            </span>
          </h1>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {expCards.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-400 cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(20,20,30,0.8) 100%)",
                border: "1px solid rgba(100,150,255,0.1)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
              </div>

              {/* "Ver" Button */}
              <button
                onClick={() => openGallery(card)}
                className="absolute top-4 right-4 px-6 py-2 rounded-full font-bold text-sm z-10 group/btn overflow-hidden transition-all hover:scale-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)",
                }}
              >
                <span className="relative z-10 text-white flex items-center gap-2">
                  <span>📸</span>
                  Ver Galería
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>

              <div className="relative p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image */}
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative h-40 md:h-52 overflow-hidden rounded-xl">
                      <img
                        ref={(el) => (imageRef.current[index] = el)}
                        src={card.imgPath}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-400"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        {card.company}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-2">{card.date}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {card.review}
                    </p>

                    {/* Responsibilities */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-3">
                        {card.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border gradient */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(168,85,247,0.1) 100%)",
                  border: "1px solid rgba(100,150,255,0.2)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProject}
        galleryFolder={selectedProject}
        images={galleryImages}
      />
    </section>
  );
};

export default Experience;