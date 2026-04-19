import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2B4E41] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-7xl font-black mb-6 tracking-tighter italic">KeenKeeper</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 opacity-80">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Social Links</h4>
            <div className="flex justify-center gap-4">
              {/* Instagram */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B4E41] hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* Facebook - Manual SVG to bypass library error */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B4E41] hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B4E41] hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;