import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const resumeData = {
        personal: {
            name: "Miguel Angel Cruz Reyes",
            email: "cruzmiguelangel858@gmail.com",
            phone: "(+52) 2212848351",
            location: "Puebla, México",
            github: "github.com/nova-cz",
            linkedin: "linkedin.com/in/miguelcr4",
        },
        education: {
            degree: "Computer Science Engineering",
            school: "Benemérita Universidad Autónoma de Puebla (BUAP)",
            gpa: "3.9/4.0",
            graduation: "Summer 2027",
            courses: [
                "Data Structures",
                "Object-Oriented Programming",
                "Advanced Databases",
                "Operating Systems",
                "Cybersecurity",
                "Web Applications",
                "CISCO Networking",
                "Robotics",
                "IoT",
                "Artificial Intelligence",
                "Networking",
                "Linear Algebra",
                "Discrete Mathematics",
            ],
        },
        experience: [
            {
                title: "Competitive Programming Club Member",
                org: "ICPC - BUAP",
                location: "Puebla, México",
                date: "May 2024 - January 2025",
                desc: "Active member in the International College Programming Contest (ICPC). Mentoring in classes related to algorithms and mathematics.",
            },
            {
                title: "Robotics FTC Mentor",
                org: "FIRST Tech Challenge - AZTROID",
                location: "Puebla, México",
                date: "June 2022 - December 2024",
                desc: "Instructed students in 3D modeling with Onshape and SolidWorks, mechanics, electronics, and Java programming. Guided a team at the state level to enhance technical and problem-solving skills.",
            },
            {
                title: "Judge and Mentor - Legion Kids Initiative",
                org: "Legion Kids",
                location: "Puebla, México",
                date: "April 2024",
                desc: "Founded and led Legion Kids to support children struggling with post-pandemic learning gaps. Taught math and basic English to 22 children aged 9 to 11.",
            },
        ],
        projects: [
            {
                name: "Resume Analyzer",
                date: "August 2025",
                tech: "React, JavaScript, TypeScript, Tailwind CSS, Anthropic API (Claude), Puter.js",
                desc: "Developed to help university students optimize their resumes using AI, improving their chances of securing interviews.",
            },
            {
                name: "YC Directory",
                date: "July 2025",
                tech: "Next.js, TypeScript, Shadcn/ui, Sanity.io, MongoDB",
                desc: "Created a centralized platform for startups and developers to register and promote their projects.",
            },
            {
                name: "Lane Line Detection",
                date: "October 2025",
                tech: "Python, OpenCV, NumPy",
                desc: "Developed a system to detect road lane lines in real time from video feeds using computer vision for driver-assistance systems.",
            },
            {
                name: "ExpenseTracker",
                date: "March 2025",
                tech: "Swift, SwiftUI, SwiftUICharts, Collections, UIFontIcon, iCloud",
                desc: "Personal finance management app with customizable categories, transaction history, multi-currency support, and secure iCloud backup.",
            },
            {
                name: "Track My Bus",
                date: "March 2024",
                tech: "Dart, Google Maps API, IntelliJ IDEA",
                desc: "Mobile app providing real-time bus tracking and arrival updates for my university.",
            },
        ],
        awards: [
            {
                name: "FEPRO - TrackMyBus",
                date: "September 2024",
                desc: "4th place in the advanced software applications category.",
            },
            {
                name: "FEPRO - Competitive Programming",
                date: "September 2024",
                desc: "2nd place in the competitive programming tournament.",
            },
            {
                name: "Talent Land Hackathon",
                date: "April 2025",
                desc: "7th place in the Capital One track with SATelite project.",
            },
            {
                name: "First Tech Challenge (FIRST)",
                date: "2019 - 2022",
                desc: "6th place out of 30 at National Robotics Competition. Awarded 'Control Award' for outstanding participation.",
            },
        ],
        skills: {
            proficient: ["HTML", "CSS3", "C/C++", "Python", "JavaScript"],
            intermediate: [
                "Git",
                "FastAPI",
                "Angular",
                "Java",
                "Express.js",
                "Firebase",
                "TypeScript",
                "React",
                "Next.js",
                "Django REST",
                "Node.js",
                "PostgreSQL",
                "Swift",
                "Figma",
                "Tailwind CSS",
                "Bootstrap",
                "Supabase",
            ],
            familiar: ["Docker", "PHP", "OpenCV", "Appwrite", "Sentry"],
        },
        languages: ["Spanish (Native)", "English (C1)", "German (A1)"],
    };

    const predefinedQuestions = [
        "Who are you?",
        "What's your experience?",
        "What technologies do you use?",
        "Tell me about your projects",
        "How can I contact you?",
        "What's your education?",
        "What awards have you won?",
        "What languages do you speak?",
    ];

    const generateResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();

        if (msg.includes("who") || msg.includes("yourself") || msg.includes("introduce")) {
            return `Hi! I'm ${resumeData.personal.name}, a Computer Science Engineering student at BUAP with a GPA of ${resumeData.education.gpa}. I'm passionate about programming, teaching, and technology. Currently involved in mentoring, competitive programming, and full-stack development projects. What would you like to know?`;
        }

        if (msg.includes("experience") || msg.includes("work") || msg.includes("job")) {
            return resumeData.experience
                .map(
                    (exp) =>
                        `💼 ${exp.title}\n${exp.org} • ${exp.date}\n📍 ${exp.location}\n${exp.desc}`
                )
                .join("\n\n");
        }

        if (msg.includes("technolog") || msg.includes("skills") || msg.includes("tech") || msg.includes("program")) {
            return `🚀 Proficient:\n${resumeData.skills.proficient.join(", ")}\n\n⚙️ Intermediate:\n${resumeData.skills.intermediate.join(
                ", "
            )}\n\n📚 Familiar:\n${resumeData.skills.familiar.join(
                ", "
            )}\n\n🌍 Languages:\n${resumeData.languages.join(", ")}`;
        }

        if (msg.includes("project") || msg.includes("about")) {
            return `🎯 Some of my projects:\n\n${resumeData.projects
                .map(
                    (proj) =>
                        `💡 ${proj.name} (${proj.date})\n🛠️ ${proj.tech}\n📝 ${proj.desc}`
                )
                .join("\n\n")}`;
        }

        if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("phone")) {
            return `📞 Connect with me:\n\n📧 Email: ${resumeData.personal.email}\n📱 Phone: ${resumeData.personal.phone}\n🔗 LinkedIn: ${resumeData.personal.linkedin}\n💻 GitHub: ${resumeData.personal.github}\n📍 Location: ${resumeData.personal.location}`;
        }

        if (msg.includes("education") || msg.includes("degree") || msg.includes("university") || msg.includes("school") || msg.includes("courses")) {
            return `🎓 Education:\n\n${resumeData.education.degree}\n${resumeData.education.school}\n\nGPA: ${resumeData.education.gpa}\nGraduation: ${resumeData.education.graduation}\n\n📚 Relevant Courses:\n${resumeData.education.courses.join(" · ")}`;
        }

        if (msg.includes("award") || msg.includes("achievement") || msg.includes("competition") || msg.includes("hackathon")) {
            return `🏆 Awards & Achievements:\n\n${resumeData.awards
                .map((award) => `⭐ ${award.name} (${award.date})\n${award.desc}`)
                .join("\n\n")}`;
        }

        if (msg.includes("language") || msg.includes("speak") || msg.includes("hablas")) {
            return `🌍 Languages I speak:\n\n${resumeData.languages
                .map((lang) => `• ${lang}`)
                .join("\n")}`;
        }

        return `I'm not sure I understand. I can help you with:\n• My professional experience\n• Technologies I use\n• My projects\n• My education\n• How to contact me\n• Awards and achievements\n• Languages I speak`;
    };

    const handleSendMessage = (text = input) => {
        const message = text || input;
        if (!message.trim()) return;

        const userMsg = { text: message, sender: "user", id: Date.now() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const response = generateResponse(message);
            const botMsg = { text: response, sender: "bot", id: Date.now() + 1 };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        setMessages([
            {
                text: `Hi! I'm ${resumeData.personal.name}. I can answer any questions about my experience, education, projects, and more. What would you like to know?`,
                sender: "bot",
                id: 0,
            },
        ]);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-950 to-black flex flex-col overflow-hidden">
            {/* === Animations & Background === */}
            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.5; }
          30% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .msg-animate { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .header-animate { animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .typing-dot { animation: typing 1.4s infinite; }
        .float-animate { animation: float 3s ease-in-out infinite; }
        .glow-animate { animation: glow 3s ease-in-out infinite; }
      `}</style>

            {/* === Floating Background Lights === */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl float-animate" />
                <div
                    className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float-animate"
                    style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* === Header === */}
            <div className="header-animate relative z-10 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-6">
                <div className="flex items-center justify-between max-w-5xl mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
                            <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-400/30 blur-md animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Miguel Angel Cruz</h1>
                            <p className="text-sm text-blue-300">Computer Science Engineer • Full Stack Developer</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 glow-animate" />
                        <div
                            className="w-3 h-3 rounded-full bg-red-400 glow-animate"
                            style={{ animationDelay: "0.3s" }}
                        />
                        <div
                            className="w-3 h-3 rounded-full bg-green-400 glow-animate"
                            style={{ animationDelay: "0.6s" }}
                        />
                    </div>
                </div>
            </div>

            {/* === Chat Messages === */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-5 max-w-5xl mx-auto w-full relative z-10">
                {messages.map((msg, idx) => (
                    <div
                        key={msg.id}
                        className={`msg-animate flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        style={{ animationDelay: `${idx * 80}ms` }}
                    >
                        <div
                            className={`max-w-2xl rounded-2xl px-6 py-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${msg.sender === "user"
                                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-lg shadow-blue-500/20 border border-blue-400/30"
                                    : "bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-gray-100 rounded-bl-none border border-white/10 shadow-lg shadow-slate-900/50"
                                }`}
                        >
                            <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                                {msg.text}
                            </p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="msg-animate flex justify-start">
                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-gray-100 rounded-2xl rounded-bl-none px-6 py-4 border border-white/10 backdrop-blur-md">
                            <div className="flex gap-2">
                                <div className="typing-dot w-3 h-3 bg-blue-400 rounded-full" style={{ animationDelay: "0s" }} />
                                <div className="typing-dot w-3 h-3 bg-blue-400 rounded-full" style={{ animationDelay: "0.2s" }} />
                                <div className="typing-dot w-3 h-3 bg-blue-400 rounded-full" style={{ animationDelay: "0.4s" }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* === Input Section === */}
            <div className="relative z-10 border-t border-white/10 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-xl p-6 pb-8">
                <div className="max-w-5xl mx-auto space-y-4">
                    <div className="flex flex-wrap gap-2 justify-start">
                        {predefinedQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSendMessage(q)}
                                className="text-xs bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-slate-700/80 hover:to-slate-600/80 text-gray-300 hover:text-white px-4 py-2.5 rounded-full border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg"
                                style={{
                                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.08
                                        }s both`,
                                }}
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about my experience..."
                            className="flex-1 bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-md"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!input.trim()}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:shadow-none"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
