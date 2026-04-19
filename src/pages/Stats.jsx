import { useInteractions } from "../InteractionContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Stats() {

  // ✅ timeline data
  const { timelineData } = useInteractions();

  const COLORS = ["#234E42", "#7E2FFF", "#3CAE6F"];

  // ✅ count types (Timeline অনুযায়ী)
  const typeCounts = timelineData.reduce(
    (acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    },
    { Call: 0, Text: 0, Video: 0 }
  );

  const totalLogs = timelineData.length;

  // ✅ dynamic data (UI same থাকবে)
  const data = [
    {
      name: "Call",
      value: totalLogs ? Math.round((typeCounts.Call / totalLogs) * 100) : 0,
    },
    {
      name: "Text",
      value: totalLogs ? Math.round((typeCounts.Text / totalLogs) * 100) : 0,
    },
    {
      name: "Video",
      value: totalLogs ? Math.round((typeCounts.Video / totalLogs) * 100) : 0,
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6">

      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm w-full max-w-4xl mx-auto">
        
        <h2 className="text-2xl font-black text-[#1E293B] mb-6">
          Friendship Analytics
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* LEFT */}
          <div className="flex-1">
            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-4">
              By Interaction Type
            </p>

            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }} 
                  />
                  <p className="text-sm font-bold text-gray-600">
                    {item.name}: {item.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 CHART (UNCHANGED DESIGN) */}
          <div className="w-[300px] h-[300px] relative">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={75}
                  outerRadius={100}
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

            {/* CENTER TOTAL */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black text-[#1E293B]">
                {total}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Total
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 Bottom Cards (UNCHANGED) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">{item.name}</p>
                <p className="text-xl font-bold">{item.value}%</p>
              </div>

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
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