import React from 'react';
import { Phone, MessageSquare, Video, Users, ChevronDown, Calendar, Clock } from 'lucide-react';
import { useInteractions } from '../InteractionContext'; 

const Timeline = () => {
  const { timelineData } = useInteractions(); 

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return { icon: <Phone size={18} />, color: "text-green-600", bg: "bg-green-50" };
      case 'Text': return { icon: <MessageSquare size={18} />, color: "text-blue-500", bg: "bg-blue-50" };
      case 'Video': return { icon: <Video size={18} />, color: "text-purple-500", bg: "bg-purple-50" };
      case 'Meetup': return { icon: <Users size={18} />, color: "text-yellow-600", bg: "bg-yellow-50" };
      default: return { icon: <Users size={18} />, color: "text-gray-400", bg: "bg-gray-50" };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] tracking-tight">
          Timeline
        </h1>

        {/* Filter Button - মোবাইলে ফুল উইডথ হবে */}
        <div className="relative w-full sm:w-auto">
          <button className="w-full sm:w-48 flex justify-between items-center px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-sm font-bold text-gray-500 hover:border-gray-200 transition-colors">
            <span className="flex items-center gap-2">Filter timeline</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Interactions List */}
      <div className="flex flex-col gap-4">
        {timelineData.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-gray-200 px-4">
            <div className="mb-4 text-4xl opacity-20">📅</div>
            <p className="text-gray-400 font-bold italic">No interactions logged yet.</p>
          </div>
        ) : (
          timelineData.map((item, index) => {
            const config = getIcon(item.type);
            return (
              <div 
                key={index} 
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 md:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200"
              >
                {/* Icon Circle */}
                <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-full ${config.bg} ${config.color} transition-transform group-hover:scale-110`}>
                  {config.icon}
                </div>

                {/* Content Side */}
                <div className="flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="text-sm md:text-base font-bold text-gray-600">
                      <span className="text-[#2B4E41] font-black">{item.type}</span> 
                      <span className="mx-1">with</span> 
                      <span className="text-gray-900">{item.person}</span>
                    </p>
                    
                    {/* Date/Time - মোবাইলে ছোট হয়ে নিচে আসবে */}
                    <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {item.date}
                      </span>
                      {item.time && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {item.time}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Description (যদি থাকে) */}
                  {item.desc && (
                    <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Timeline;