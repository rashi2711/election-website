import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center relative overflow-hidden">
      {/* Enhanced Election-Themed Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Voting-Related Elements */}
        {/* Ballot Box 1 */}
        <div className="absolute top-20 left-16 w-16 h-20 bg-gray-700/20 border-2 border-yellow-500/30 rounded-lg transform -rotate-6 shadow-md">
          <div className="w-10 h-3 bg-yellow-500/30 mx-auto mt-2"></div>
          <div className="w-12 h-1 bg-yellow-500/20 mx-auto mt-4"></div>
        </div>

        {/* Ballot Box 2 */}
        <div className="absolute bottom-32 right-20 w-20 h-24 bg-gray-700/20 border-2 border-yellow-500/30 rounded-lg transform rotate-8 shadow-md">
          <div className="w-12 h-4 bg-yellow-500/30 mx-auto mt-3"></div>
          <div className="w-14 h-1 bg-yellow-500/20 mx-auto mt-5"></div>
        </div>

        {/* Checkmark 1 */}
        <div className="absolute top-1/3 left-1/4 w-12 h-12 border-b-3 border-r-3 border-yellow-400/50 transform rotate-45 opacity-60"></div>

        {/* Checkmark 2 */}
        <div className="absolute bottom-1/4 right-1/3 w-10 h-10 border-b-3 border-r-3 border-yellow-400/50 transform rotate-45 opacity-50"></div>

        {/* Ballot Paper 1 */}
        <div className="absolute top-1/5 right-1/5 w-14 h-18 bg-gray-700/20 border border-yellow-500/30 rounded-md transform -rotate-10">
          <div className="w-8 h-1 bg-yellow-500/20 mx-auto mt-3"></div>
          <div className="w-8 h-1 bg-yellow-500/20 mx-auto mt-2"></div>
        </div>

        {/* Ballot Paper 2 */}
        <div className="absolute bottom-1/5 left-1/3 w-16 h-20 bg-gray-700/20 border border-yellow-500/30 rounded-md transform rotate-12">
          <div className="w-10 h-1 bg-yellow-500/20 mx-auto mt-4"></div>
          <div className="w-10 h-1 bg-yellow-500/20 mx-auto mt-3"></div>
        </div>
      </div>

      {/* "Welcome IISER" in Top-Center */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <h1 className="text-5xl font-extrabold text-yellow-400 tracking-tight animate-bounce animate-once animate-ease-out drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]">
          IISERB Smart Vote
        </h1>
      </div>

      {/* Admin and Voter Buttons in Top-Right Corner */}
      <div className="absolute top-5 right-5 flex space-x-4 z-10">
        <button
          onClick={() => navigate('/admin-login')}
          className="px-6 py-2 bg-gray-800/80 backdrop-blur-md text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/30 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Admin Login
        </button>
        <button
          onClick={() => navigate('/voter-login')}
          className="px-6 py-2 bg-gray-800/80 backdrop-blur-md text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/30 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Voter
        </button>
      </div>

      {/* Center Buttons */}
      <div className="mt-8 flex flex-col items-center space-y-5 z-10">
        <button
          onClick={() => navigate('/add-candidate')}
          className="relative w-64 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 text-2xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
        >
          <span className="relative z-10">Fill Candidature Form</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <button
          onClick={() => navigate('/rules')}
          className="relative w-64 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 text-2xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
        >
          <span className="relative z-10">View Election Rules</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
      <footer className="absolute bottom-0 w-full bg-white/5 backdrop-blur-md py-4 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="font-semibold text-indigo-300">IISER Election Portal</span>
            <span className="text-white/70">© 2025</span>
          </div>
          <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
            <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
              Contact Us
            </a>
            <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
              FAQ
            </a>
            <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
              Election Guidelines
            </a>
            <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;