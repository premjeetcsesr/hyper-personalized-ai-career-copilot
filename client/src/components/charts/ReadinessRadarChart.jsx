import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import './Charts.css';

export default function ReadinessRadarChart({ dimensions = {} }) {
  const data = [
    { subject: 'Technical', score: dimensions.technicalReadiness || 45, fullMark: 100 },
    { subject: 'Project', score: dimensions.projectReadiness || 50, fullMark: 100 },
    { subject: 'Market Fit', score: dimensions.marketAlignment || 40, fullMark: 100 },
    { subject: 'Interview', score: dimensions.interviewReadiness || 45, fullMark: 100 },
    { subject: 'Communication', score: dimensions.communicationReadiness || 70, fullMark: 100 },
    { subject: 'Resume/Profile', score: dimensions.resumeReadiness || 60, fullMark: 100 },
  ];

  return (
    <div className="chart-container-radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#334E68', fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#94A3B8', fontSize: 9 }}
          />
          <Radar
            name="Readiness Score"
            dataKey="score"
            stroke="#2454E8"
            fill="#3B82F6"
            fillOpacity={0.35}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="chart-tooltip">
                    <p className="chart-tooltip__title">{item.subject}</p>
                    <p style={{ color: '#E2E8F0' }}>Score: <strong style={{ color: '#FFFFFF' }}>{item.score}%</strong></p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
