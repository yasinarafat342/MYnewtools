import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageSquare, Video, Users, ChevronDown, Filter, X } from 'lucide-react';
import { useInteractions } from '../InteractionContext';

const Timeline = () => {
  const { timelineData } = useInteractions();
  const [filter, setFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য (Real project standard)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = [
    { label: 'All Activities', value: 'All', icon: <Filter size={16} /> },
    { label: 'Calls', value: 'Call', icon: <Phone size={16} /> },
    { label: 'Messages', value: 'Text', icon: <MessageSquare size={16} /> },
    { label: 'Video Chats', value: 'Video', icon: <Video size={16} /> },
    { label: 'Meetups', value: 'Meetup', icon: <Users size={16} /> },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return <Phone size={18} className="text-green-600" />;
      case 'Text': return <MessageSquare size={18} className="text-blue-500" />;
      case 'Video': return <Video size={18} className="text-purple-500" />;
      case 'Meetup': return <Users size={18} className="text-yellow-600" />;
      default: return <Users size={18} className="text-gray-400" />;
    }
  };

  const filteredData = filter === 'All' 
    ? timelineData 
    : timelineData.filter(item => item.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-4xl font-black text-[#1E293B]">Timeline</h1>

        {/* --- Custom Professional Filter --- */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 shadow-sm text-sm font-bold
              ${isOpen ? 'border-blue-500 ring-2 ring-blue-50 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
          >
            {filterOptions.find(opt => opt.value === filter)?.icon}
            <span>{filterOptions.find(opt => opt.value === filter)?.label}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in zoom-in duration-200">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors
                    ${filter === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className={filter === option.value ? 'text-blue-600' : 'text-gray-400'}>
                    {option.icon}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

     
      {filter !== 'All' && (
        <div className="flex items-center gap-2 mb-6">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Filter:</span>
           <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
              {filter}
              <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => setFilter('All')} />
           </div>
        </div>
      )}

     
      <div className="flex flex-col gap-4">
        {filteredData.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                <Filter className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-400 font-bold italic">No {filter !== 'All' ? filter : ''} interactions found.</p>
          </div>
        ) : (
          filteredData.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-5 rounded-2xl border border-gray-50 bg-white shadow-sm transition-all hover:shadow-md hover:translate-x-1"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl shadow-inner">
                {getIcon(item.type)}
              </div>

              <div className="flex flex-col flex-1">
                <p className="text-sm font-bold text-gray-600">
                  <span className="text-blue-600 font-black">{item.type}</span> with {item.person}
                </p>
                <p className="text-[11px] font-black text-gray-300 uppercase tracking-wide mt-1">
                  {item.date}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;