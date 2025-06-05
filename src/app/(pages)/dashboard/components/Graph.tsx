"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type graphProps = {
  data: {
    date: string
    amount: number
  }[]
}

export function Graph({ data }: graphProps) {
  return (
    <ChartContainer
      className="min-h-[300px]"
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--primary))"
        }
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            dataKey="amount"
            stroke="var(--primary)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
