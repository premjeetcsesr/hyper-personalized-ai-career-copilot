import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function SkillComparisonChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
        No skill gap comparisons available.
      </div>
    );
  }

  // Format data for chart
  const formattedData = data.slice(0, 8).map(item => ({
    name: item.skillName.length > 18 ? item.skillName.slice(0, 16) + '...' : item.skillName,
    fullName: item.skillName,
    Current: item.currentLevel || 0,
    Target: item.targetLevel || 75,
    state: item.state || 'Claimed'
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg text-xs space-y-1 border border-slate-700">
          <p className="font-semibold text-slate-200">{item.fullName}</p>
          <p className="text-blue-400">Target Benchmark: {item.Target}%</p>
          <p className="text-emerald-400">Demonstrated Level: {item.Current}%</p>
          <p className="text-slate-400">Evidence State: <span className="font-medium text-amber-300">{item.state}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 20, left: -10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#64748B', fontSize: 11 }}
            angle={-25}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 11 }}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />
          <Bar
            dataKey="Current"
            name="Demonstrated Level"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="Target"
            name="Curated Role Target"
            fill="#CBD5E1"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
