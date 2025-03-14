"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Navigation */}
      <nav className="px-4 py-6 sticky top-0 z-10 bg-[#111111]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ul className="flex justify-center space-x-8">
            <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Articles</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Projects</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Speaking</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Uses</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col items-start">
          {/* Profile Image */}
          <div className={`
            rounded-full overflow-hidden mb-8
            transition-all duration-300 ease-in-out
            ${isScrolled ? 'w-16 h-16' : 'w-24 h-24'}
          `}>
            <Image
              src="/profile-placeholder.jpg"
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            Software designer, founder, and amateur astronaut.
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            I'm Spencer, a software designer and entrepreneur based in New York City. 
            I'm the founder and CEO of Planetaria, where we develop technologies that 
            empower regular people to explore space on their own terms.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-.799 17.52h1.83L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.52-.64 1.3-1.1 2.2-1.1 1.76 0 2.8 1.44 2.8 3.2v2.8z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Added extra content to enable scrolling */}
        <div className="mt-32 space-y-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Sample Content Section {i + 1}</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
