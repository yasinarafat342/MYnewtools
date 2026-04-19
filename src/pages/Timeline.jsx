import { useState } from "react";
import { Phone, MessageSquare, Video, MapPin, Clock, Calendar } from "lucide-react";

export default function Timeline({ allEvents }) {
  // ১. ফিল্টার স্টেট
  const [filter, setFilter] = useState("All");

  // ২. ফিল্টার লজিক (এটি আপনার রিয়েল লাইফ প্রোজেক্টের ডাটা ফিল্টার করবে)
  const filteredEvents = filter === "All" 
    ? allEvents 
    : allEvents.filter((e) => e.type === filter);

  const filters = ["All", "Call", "Video", "Text", "Meetup"];

  // ৩. টাইপ অনুযায়ী স্টাইল ম্যাপিং
  const getTypeStyles = (type) => {
    switch (type) {
      case "Call": return { icon: <Phone size={14} />, color: "bg-[#234E42]", text: "text-[#234E42]" };
      case "Video": return { icon: <Video size={14} />, color: "bg-[#7E2FFF]", text: "text-[#7E2FFF]" };
      case "Text": return { icon: <MessageSquare size={14} />, color: "bg-[#3CAE6F]", text: "text-[#3CAE6F]" };
      case "Meetup": return { icon: <MapPin size={14} />, color: "bg-orange-500", text: "text-orange-500" };
      default: return { icon: <Clock size={14} />, color: "bg-gray-500", text: "text-gray-500" };
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10">
      
      {/* হেডার ও ফিল্টার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-2xl font-black text-[#1E293B] flex items-center gap-2">
            <Calendar className="text-gray-400" /> Recent Activities
          </h3>
          <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-wider">
            Showing {filter} interactions
          </p>
        </div>
        
        {/* মডার্ন ফিল্টার বাটন */}
        <div className="flex gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all duration-300 whitespace-nowrap ${
                filter === f 
                ? "bg-white text-black shadow-md scale-105" 
                : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* টাইমলাইন মেইন লিস্ট */}
      <div className="relative border-l-2 border-dashed border-gray-100 ml-4 space-y-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item) => {
            const style = getTypeStyles(item.type);
            return (
              <div key={item.id} className="relative pl-10 group">
                
                {/* টাইমলাইন আইকন ডট */}
                <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white z-10 transition-transform group-hover:scale-110 ${style.color}`}>
                  {style.icon}
                </div>

                {/* কন্টেন্ট কার্ড - রিয়েল লাইফ ইউআই */}
                <div className="bg-[#F8FAFC] p-5 rounded-[24px] group-hover:bg-white group-hover:shadow-xl group-hover:shadow-gray-100 transition-all duration-300 border border-transparent group-hover:border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${style.text}`}>
                      {item.type}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                      <Clock size={12} /> {item.time}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-[#1E293B] group-hover:text-black">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">
                    {item.desc || "No additional details provided for this interaction."}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">No {filter} activities found.</p>
          </div>
        )}
      </div>
    </div>
  );
}