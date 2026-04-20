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

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-gray-100 shadow-sm w-full max-w-4xl mx-auto">
        
        <h2 className="text-xl md:text-2xl font-black text-[#1E293B] mb-6 text-center md:text-left">
          Friendship 
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          
          {/* LEFT: Legend */}
          <div className="w-full md:flex-1 order-2 md:order-1">
            <p className="text-gray-400 text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-4 text-center md:text-left">
              By Interaction Type
            </p>

            <div className="grid grid-cols-1 gap-3 max-w-[200px] mx-auto md:mx-0">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full shrink-0" 
                    style={{ backgroundColor: COLORS[index] }} 
                  />
                  <p className="text-sm font-bold text-gray-600">
                    {item.name}: {item.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: CHART - CORRECTED PIE SYNTAX */}
          <div className="w-full max-w-[280px] aspect-square relative order-1 md:order-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="70%"
                  outerRadius="95%"
                  paddingAngle={5}
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

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl md:text-5xl font-black text-[#1E293B]">
                {total}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Total
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between bg-gray-50/50"
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">{item.name}</p>
                <p className="text-lg font-black text-[#1E293B]">{item.value}%</p>
              </div>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
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