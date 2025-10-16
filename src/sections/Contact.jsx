import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Animate form inputs on mount
  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll("input, textarea, button");
    if (inputs) {
      gsap.from(inputs, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }
  }, []);

  // Success message animation
  useEffect(() => {
    if (isSubmitted && successRef.current) {
      const tl = gsap.timeline();

      // Dramatic entrance
      tl.fromTo(
        successRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: -50,
          rotateX: -90,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      )
        // Gentle pulse effect
        .to(successRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
        })
        // Smooth exit after 3 seconds
        .to(successRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.in",
          delay: 2.6,
        });
    }
  }, [isSubmitted]);

  // Loading spinner animation
  useEffect(() => {
    if (loading && loadingRef.current) {
      gsap.to(loadingRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none",
      });
    }
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitted(false);

    // Animate form out
    gsap.to(formRef.current, {
      opacity: 0.3,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.out",
    });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Clear the form
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);

        // Animate form back in
        gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        // Hide success message after animation completes
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3600);
      }, 1000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setLoading(false);

      // Animate form back in on error
      gsap.to(formRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="flex-center section-padding relative">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Contact Me – I'm Ready to Help"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid-12-cols mt-8">
          <div className="xl:col-span-5">
            <div className="relative flex-center card-border rounded-xl p-10">
              {/* Loading Overlay with GSAP */}
              {loading && (
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md flex items-center justify-center rounded-xl z-10">
                  <div className="relative">
                    <div
                      ref={loadingRef}
                      className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                    />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-blue-400 border-l-purple-400 rounded-full animate-ping opacity-20" />
                  </div>
                </div>
              )}

              {/* Success Alert - Positioned above form */}
              {isSubmitted && (
                <div
                  ref={successRef}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-4 z-20 w-[calc(100%-4rem)]"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
                    </div>

                    <div className="relative px-6 py-4 flex items-center gap-4">
                      {/* Animated checkmark */}
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">
                          Message sent successfully! ✨
                        </h3>
                        <p className="text-green-100 text-sm">
                          I’ll get back to you soon. Thanks for reaching out!
                        </p>
                      </div>

                      {/* Sparkle effect */}
                      <div className="absolute top-2 right-2">
                        <span className="text-2xl animate-pulse">✨</span>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your full name?"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  ></textarea>
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
