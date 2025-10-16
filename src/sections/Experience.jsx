import { useRef, useEffect } from "react";

const expCards = [
  {
    title: "Founder and Mentor – Legion Kids Initiative",
    date: "April 2024",
    company: "Puebla, Mexico",
    review:
      "Founded and led Legion Kids to support children struggling with post-pandemic learning gaps, fostering curiosity and academic confidence through interactive sessions.",
    responsibilities: [
      "Founded and led Legion Kids to support children with post-pandemic learning gaps",
      "Taught math and basic English to 22 children aged 9 to 11",
    ],
    imgPath: "/images/experiencia/legionkids.jpg",
    link: "https://drive.google.com/drive/u/1/folders/1cITTvs7rIWoxBcYISP4f54v562kbmNpg",
  },
  {
    title: "Mentor of a Robotics Team – FTC AZTROID (FIRST Tech Challenge)",
    date: "June 2022 - December 2024",
    company: "ROBOTICS FTC – Puebla, Mexico",
    review:
      "Guided high school students in robotics, teaching 3D modeling with Onshape and SolidWorks, electronics, and programming in block-based languages and Java. Enhanced students’ problem-solving and teamwork skills through competition mentoring at the state level.",
    responsibilities: [
      "Instructed students in 3D modeling, electronics, and programming (Java & block-based)",
      "Led competitive robotics training and team management",
      "Enhanced students’ technical and problem-solving abilities through mentorship",
    ],
    imgPath: "/images/experiencia/mentor.jpg",
    link: "https://drive.google.com/drive/u/1/folders/1cITTvs7rIWoxBcYISP4f54v562kbmNpg",
  },
];

const Experience = () => {
  const cardsRef = useRef([]);
  const imageRef = useRef([]);

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
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-lg">💼</span>
            <span className="text-sm text-gray-400">My Career Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Work
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Experience
            </span>
          </h1>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
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
              {card.link && (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition-all"
                >
                  Ver
                </a>
              )}

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
    </section>
  );
};

export default Experience;
