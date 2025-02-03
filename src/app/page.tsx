"use client";

import { useInitBackground } from "@/app/initBackground";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Loading } from "@/components/Loading";
import { Navigation } from "@/components/Navigation";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleBackgroundReady = useCallback(() => {
    // Tunggu sedikit lebih lama sebelum menghilangkan loading
    setTimeout(() => {
      setIsLoading(false);
      // Tambah delay kecil sebelum menampilkan konten
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 1000);
  }, []);

  useInitBackground(handleBackgroundReady);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      <div id="liquid-background" className="fixed inset-0 w-full h-full z-0" />
      
      <Navigation />
      
      {contentVisible && (
        <motion.main
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
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-7xl font-black mb-6 text-white tracking-wider drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                Muhammad Azka Lufthansa
              </h1>
              <h2 className="text-4xl text-white tracking-wide font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                Software Developer
              </h2>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex gap-6 justify-center"
              >
                <SocialLink href="https://github.com/AzkaLufthansa" icon={<FaGithub />} />
                <SocialLink href="https://www.linkedin.com/in/azkalufthansa/" icon={<FaLinkedin />} />
                <SocialLink href="azkalufthansa3@gmail.com" icon={<FaEnvelope />} />
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section className="py-20 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
        </motion.main>
      )}
    </div>
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

// const ProjectCard: React.FC<{ title: string; description: string; tech: string[] }> = ({
//   title,
//   description,
//   tech
// }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg"
//   >
//     <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
//     <p className="text-gray-100 mb-4">{description}</p>
//     <div className="flex flex-wrap gap-2">
//       {tech.map((t) => (
//         <span key={t} className="px-3 py-1 bg-blue-500/30 rounded-full text-sm text-white">
//           {t}
//         </span>
//       ))}
//     </div>
//   </motion.div>
// );

export default Page;
