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
import './Charts.css';

export default function SkillComparisonChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
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
        <div className="chart-tooltip">
          <p className="chart-tooltip__title">{item.fullName}</p>
          <p style={{ color: '#93C5FD' }}>Target Benchmark: {item.Target}%</p>
          <p style={{ color: '#6EE7B7' }}>Demonstrated Level: {item.Current}%</p>
          <p style={{ color: '#CBD5E1' }}>Evidence State: <strong style={{ color: '#FCD34D' }}>{item.state}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container-bar">
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
            tick={{ fill: '#94A3B8', fontSize: 10 }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
          />
          <Bar
            dataKey="Current"
            name="Current Level"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="Target"
            name="Target Role"
            fill="#2454E8"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
