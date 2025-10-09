import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeData from '../data/resume.json';

const AboutMe = ({ fullPage = false }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const generateResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        const { personal_info, education } = resumeData;
        
        // Basic greetings
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            return `Hello! I'm ${personal_info.name}, a ${education.major} student at ${education.institution}. How can I assist you today?`;
        }
        
        // About me
        if (lowerMessage.includes('who are you') || lowerMessage.includes('about you')) {
            return `I'm ${personal_info.name}, a ${education.major} student at ${education.institution} with a passion for programming, teaching, and technology.`;
        }
        
        // Experience & Leadership
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('leadership')) {
            return resumeData.experience_and_leadership.map(exp => (
                `**${exp.title} at ${exp.organization}** (${exp.dates})\n                ${exp.description}`
            )).join('\n\n');
        }
        
        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
            const { programming_and_technologies, languages } = resumeData.skills;
            return `Here are my skills and technologies I work with:\n` +
                   `• Proficient: ${programming_and_technologies.proficient.join(', ')}\n` +
                   `• Intermediate: ${programming_and_technologies.intermediate.join(', ')}\n` +
                   `• Familiar: ${programming_and_technologies.familiar.join(', ')}\n\n` +
                   `Languages: ${Object.entries(languages).map(([lang, level]) => `${lang} (${level})`).join(', ')}`;
        }
        
        // Projects & Competitions
        if (lowerMessage.includes('project') || lowerMessage.includes('competition')) {
            return resumeData.projects_and_competitions.map(proj => 
                `**${proj.name}** (${proj.date})\n${proj.description}`
            ).join('\n\n');
        }
        
        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return `You can contact me through:\n` +
                   `• Email: ${personal_info.email}\n` +
                   `• LinkedIn: ${personal_info.linkedin}\n` +
                   `• GitHub: ${personal_info.github}`;
        }
        
        // Education
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
            const { education } = resumeData;
            return `**${education.major}**\n` +
                   `${education.institution} (Expected ${education.expected_graduation})\n` +
                   `GPA: ${education.gpa}\n\n` +
                   `Relevant Coursework:\n` +
                   education.relevant_coursework.map(course => `• ${course}`).join('\n');
        }
        
        // Default response
        return `I'm sorry, I didn't understand your question. Here are some things you can ask me about:\n` +
               `• My experience\n` +
               `• My skills and technologies\n` +
               `• My projects\n` +
               `• My education\n` +
               `• How to contact me`;
    };

    const commonQuestions = [
        'What is your experience?',
        'What technologies do you work with?',
        'Tell me about your projects',
        'How can I contact you?',
        'What is your education background?',
        'What are your key skills?'
    ];

    const findResponse = (message) => {
        return generateResponse(message);
    };

    const handleSendMessage = () => {
        if (!currentMessage.trim()) return;

        // Add user message
        const userMessage = { text: currentMessage, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = { text: findResponse(currentMessage), sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Initial message
    useEffect(() => {
        const welcomeMessage = {
            text: `Hello! I'm ${resumeData.personal_info.name}, a ${resumeData.education.major} student at ${resumeData.education.institution}. Ask me anything about my background and experience.`,
            sender: 'bot'
        };
        setMessages([welcomeMessage]);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        const messagesContainer = document.querySelector('.custom-scrollbar');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, [messages]);

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-black-100 to-black-200 text-white overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 bg-black-100/80 backdrop-blur-md p-4 border-b border-gray-800/50 flex items-center justify-between"
            >
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <h2 className="text-lg font-medium text-white">
                        Chat with Adrian
                    </h2>
                </div>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
            </motion.div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
                ref={messagesEndRef}
            >
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl p-4 ${message.sender === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                                        : 'bg-gray-800/80 text-gray-100 rounded-bl-none backdrop-blur-sm'
                                    } shadow-lg transform transition-all duration-200 hover:scale-[1.02]`}
                            >
                                <p className="leading-relaxed">{message.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        className="flex space-x-2 p-3 bg-gray-800/50 rounded-2xl w-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <motion.div
                className="flex-shrink-0 p-4 border-t border-gray-800/50 bg-black/40 backdrop-blur-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex space-x-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full bg-gray-900/70 border border-gray-700/50 rounded-xl px-4 py-3 pr-12 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            <button className="text-gray-500 hover:text-gray-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim()}
                        className="bg-white hover:bg-gray-100 text-gray-900 px-5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45 -translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </motion.button>
                </div>

                {/* Quick questions */}
                <motion.div
                    className="mt-3 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {commonQuestions.map((question, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentMessage(question)}
                            className="text-xs bg-gray-800/70 hover:bg-gray-700/80 text-gray-200 px-3 py-1.5 rounded-full transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
                        >
                            {question}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutMe;
// Estilos personalizados para la barra de desplazamiento
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.7);
  }
`;

// Añadir estilos al documento
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
