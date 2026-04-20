import React, { useState, useMemo } from "react";
import { useInteractions } from "../InteractionContext"; // আপনার কন্টেক্সট ইম্পোর্ট
import { Phone, MessageSquare, Video, MapPin, Clock, Calendar, Filter } from "lucide-react";

// টাইপ কনফিগ
const TYPE_CONFIG = {
  Call: { icon: <Phone size={14} />, color: "bg-[#234E42]", text: "text-[#234E42]", border: "border-[#234E42]/20" },
  Video: { icon: <Video size={14} />, color: "bg-[#7E2FFF]", text: "text-[#7E2FFF]", border: "border-[#7E2FFF]/20" },
  Text: { icon: <MessageSquare size={14} />, color: "bg-[#3CAE6F]", text: "text-[#3CAE6F]", border: "border-[#3CAE6F]/20" },
  Meetup: { icon: <MapPin size={14} />, color: "bg-orange-500", text: "text-orange-500", border: "border-orange-500/20" },
  Default: { icon: <Clock size={14} />, color: "bg-gray-500", text: "text-gray-500", border: "border-gray-500/20" }
};

export default function Timeline() {
  // ১. কন্টেক্সট থেকে রিয়েল ডাটা আনা
  const { timelineData, loading } = useInteractions(); 
  const [filter, setFilter] = useState("All");

  // ২. ডাটা ফিল্টারিং এবং সোর্টিং (নতুন থেকে পুরাতন)
  const filteredEvents = useMemo(() => {
    if (!timelineData) return [];
    
    let data = [...timelineData];
    
    // ফিল্টার লজিক
    if (filter !== "All") {
      data = data.filter((e) => e.type === filter);
    }

    // তারিখ অনুযায়ী সর্টিং (ধরে নিচ্ছি আপনার ডাটাতে 'timestamp' বা 'date' আছে)
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filter, timelineData]);

  const filters = ["All", "Call", "Video", "Text", "Meetup"];

  // ৩. লোডিং স্টেট হ্যান্ডলিং
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      
      {/* স্টিকি হেডার ও ফিল্টার */}
      <div className="sticky top-0 z-20 bg-[#F9FAFB]/80 backdrop-blur-md pb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-[#1E293B] tracking-tight">Timeline</h2>
            <p className="text-gray-500 text-sm font-medium">Keep track of your friendship journey</p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
            <Filter size={14} className="ml-2 text-gray-400 hidden sm:block" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 ${
                  filter === f 
                  ? "bg-[#1E293B] text-white shadow-lg" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* টাইমলাইন লিস্ট */}
      <div className="relative mt-8">
        {/* মেইন ভার্টিকাল লাইন */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-gray-200 via-gray-100 to-transparent"></div>

        <div className="space-y-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((item, index) => {
              const style = TYPE_CONFIG[item.type] || TYPE_CONFIG.Default;
              return (
                <div key={item.id || index} className="relative pl-12 group transition-all">
                  
                  {/* আইকন ডট এনিমেশন সহ */}
                  <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white z-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl ${style.color}`}>
                    {style.icon}
                  </div>

                  {/* কার্ড ডিজাইন */}
                  <div className={`bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm transition-all duration-300 group-hover:border-gray-200 group-hover:shadow-md relative overflow-hidden`}>
                    {/* কার্ডের পাশে হালকা কালার বর্ডার */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.color} opacity-20`}></div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${style.color} text-white`}>
                          {item.type}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                          <Calendar size={12} /> {item.date} 
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                        <Clock size={12} /> {item.time}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#1E293B] mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc || "No specific details logged for this interaction."}
                    </p>

                    {/* মডার্ন ট্যাগ (যদি থাকে) */}
                    {item.tags && (
                      <div className="flex gap-2 mt-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-bold">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* এম্পটি স্টেট */
            <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100 shadow-inner">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="text-gray-300" size={32} />
              </div>
              <h3 className="text-gray-800 font-bold text-xl">No activities found</h3>
              <p className="text-gray-400 text-sm mt-1">Try changing the filter or add new interactions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}