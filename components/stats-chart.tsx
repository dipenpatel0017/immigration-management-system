"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", applications: 65, approved: 45, rejected: 12, pending: 8 },
  { month: "Feb", applications: 78, approved: 52, rejected: 15, pending: 11 },
  { month: "Mar", applications: 90, approved: 68, rejected: 10, pending: 12 },
  { month: "Apr", applications: 85, approved: 61, rejected: 14, pending: 10 },
  { month: "May", applications: 95, approved: 72, rejected: 11, pending: 12 },
  { month: "Jun", applications: 110, approved: 85, rejected: 13, pending: 12 },
]

export function StatsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="approved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="rejected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
          <YAxis axisLine={false} tickLine={false} className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="applications"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#applications)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="approved"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#approved)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="rejected"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#rejected)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
