import React from 'react';
import { Phone, MessageSquare, Video, Users, ChevronDown } from 'lucide-react';
import { useInteractions } from '../InteractionContext'; // কন্টেক্সট ইম্পোর্ট

const Timeline = () => {
  const { timelineData } = useInteractions(); // গ্লোবাল ডাটা নেওয়া হচ্ছে

  // আইকন সিলেক্ট করার ফাংশন
  const getIcon = (type) => {
    switch (type) {
      case 'Call':
        return <Phone size={18} className="text-green-600" />;
      case 'Text':
        return <MessageSquare size={18} className="text-blue-500" />;
      case 'Video':
        return <Video size={18} className="text-purple-500" />;
      case 'Meetup':
        return <Users size={18} className="text-yellow-600" />;
      default:
        return <Users size={18} className="text-gray-400" />;
    }
  };

  // ব্যাকগ্রাউন্ড কালার সিলেক্ট করার ফাংশন
  const getBgColor = (type) => {
    return type === 'Meetup' ? 'bg-yellow-50' : 'bg-white';
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-4xl font-black text-[#1E293B] mb-8">Timeline</h1>

      {/* Filter Dropdown */}
      <div className="mb-8 relative max-w-[200px]">
        <button className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm text-sm font-medium text-gray-400">
          Filter timeline
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Timeline Items */}
      <div className="flex flex-col gap-4">
        {/* যদি কোনো ডাটা না থাকে */}
        {timelineData.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic">No interactions logged yet. Go to a friend's profile to start!</p>
          </div>
        ) : (
          /* লুপ চালিয়ে ডাটা দেখানো হচ্ছে */
          timelineData.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-5 rounded-2xl border border-gray-50 shadow-sm transition-all hover:shadow-md cursor-pointer animate-in fade-in slide-in-from-top-2 duration-500 ${getBgColor(item.type)}`}
            >
              {/* Icon Circle */}
              <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full">
                {getIcon(item.type)}
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-500">
                  <span className="text-[#2B4E41] font-black">{item.type}</span> with {item.person}
                </p>
                <p className="text-xs font-bold text-gray-300 mt-0.5">
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