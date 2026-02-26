import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CommitTimeline({ data }) {
  if (!data || data.length === 0) {
    return <div className="empty-state">No timeline data</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data} 
        margin={{ bottom: 60, left: 10, right: 10, top: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="date" 
          // Rotates labels diagonally for better readability
          angle={-45} 
          textAnchor="end" 
          height={80} 
          interval={0}
          // dy moves text down from the axis; dx helps align the start of the diagonal
          tick={{ fontSize: 11, fill: '#64748b', dy: 10, dx: -5 }} 
          tickFormatter={(tick) => {
            try {
              const date = new Date(tick);
              return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: '2-digit',
                year: '2-digit' 
              });
            } catch (e) {
              return tick;
            }
          }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#64748b' }} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}