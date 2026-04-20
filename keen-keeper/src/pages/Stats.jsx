import { useInteractions } from "../InteractionContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Stats() {
  const { timelineData } = useInteractions();
  const COLORS = ["#234E42", "#7E2FFF", "#3CAE6F"];

  const typeCounts = timelineData.reduce(
    (acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    },
    { Call: 0, Text: 0, Video: 0 }
  );

  const totalLogs = timelineData.length;

  const data = [
    { name: "Call", value: totalLogs ? Math.round((typeCounts.Call / totalLogs) * 100) : 0 },
    { name: "Text", value: totalLogs ? Math.round((typeCounts.Text / totalLogs) * 100) : 0 },
    { name: "Video", value: totalLogs ? Math.round((typeCounts.Video / totalLogs) * 100) : 0 },
  ];

  const totalPercentage = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12">
      <div className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-gray-100 shadow-sm w-full max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black text-[#1E293B]">
            Friendship Analytics
          </h2>
          <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2">
            Activity Distribution
          </p>
        </div>

        {/* Main Section: Chart & Legend */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Side: Details (Order 2 on mobile, 1 on desktop) */}
          <div className="w-full md:flex-1 order-2 md:order-1">
            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-6 text-center md:text-left">
              By Interaction Type
            </p>
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between md:justify-start gap-4 bg-gray-50 p-4 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: COLORS[index] }} 
                    />
                    <span className="text-sm font-black text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-[#1E293B] bg-white px-3 py-1 rounded-lg shadow-sm">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Chart (Order 1 on mobile, 2 on desktop) */}
          <div className="w-full max-w-[280px] md:max-w-[320px] aspect-square relative order-1 md:order-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="70%"
                  outerRadius="95%"
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Central Total Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl md:text-5xl font-black text-[#1E293B]">
                {totalLogs}
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Total Logs
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between bg-white hover:shadow-md transition-shadow"
            >
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">
                  {item.name}
                </p>
                <p className="text-xl font-black text-[#1E293B]">{item.value}%</p>
              </div>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-inner"
                style={{ backgroundColor: COLORS[index] }}
              >
                {item.name[0]}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}