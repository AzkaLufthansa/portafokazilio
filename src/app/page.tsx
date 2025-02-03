"use client";

import { useInitBackground } from "@/app/initBackground";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);

  useEffect(() => {
    // Simulasi loading minimum 1 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useInitBackground();

  // Handler untuk background ready
  const handleBackgroundReady = () => {
    setIsBackgroundReady(true);
  };

  useEffect(() => {
    const bgElement = document.getElementById('liquid-background');
    if (bgElement) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            handleBackgroundReady();
          }
        });
      });
      
      observer.observe(bgElement, { childList: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      <main className="relative w-full min-h-screen overflow-x-hidden">
        <div id="liquid-background" className="fixed inset-0 w-full h-full" />
        
        <AnimatePresence>
          {isBackgroundReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Hero Section */}
              <section className="min-h-screen flex items-center justify-center px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <h1 className="text-7xl font-black mb-6 text-white tracking-wider drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                    Akaziadyne Levith
                  </h1>
                  <h2 className="text-4xl text-white tracking-wide font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    Software Developer
                  </h2>
                  <div className="mt-8 flex gap-6 justify-center">
                    <SocialLink href="https://github.com/yourusername" icon={<FaGithub />} />
                    <SocialLink href="https://linkedin.com/in/yourusername" icon={<FaLinkedin />} />
                    <SocialLink href="mailto:your@email.com" icon={<FaEnvelope />} />
                  </div>
                </motion.div>
              </section>

              {/* About Section */}
              <section className="py-20 px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto bg-black/30 backdrop-blur-lg rounded-xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
                  <p className="text-gray-100 leading-relaxed">
                    Seorang software developer yang passionate dalam menciptakan solusi digital yang inovatif.
                    Dengan pengalaman dalam pengembangan web modern dan mobile applications.
                  </p>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white text-2xl hover:text-blue-300 transition-colors duration-300"
  >
    {icon}
  </motion.a>
);

const ProjectCard: React.FC<{ title: string; description: string; tech: string[] }> = ({
  title,
  description,
  tech
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg"
  >
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-100 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="px-3 py-1 bg-blue-500/30 rounded-full text-sm text-white">
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

export default Page;
