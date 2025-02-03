import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import React from 'react';

const LandingFooter = () => {
  return (
    <footer className="py-4">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
        {/* Branding and Copyright */}
        <p className="text-sm">&copy; 2025 Propella. Built with ❤️ by Abhinav</p>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <CiLinkedin className="w-6 h-6 text-gray-400" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
