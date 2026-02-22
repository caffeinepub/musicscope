import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useMockListeningHistory } from '../hooks/useQueries';

type TimePeriod = 'day' | 'week' | 'month' | 'year';

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const { data: historyData } = useMockListeningHistory(timePeriod);

  const COLORS = [
    'oklch(var(--chart-1))',
    'oklch(var(--chart-2))',
    'oklch(var(--chart-3))',
    'oklch(var(--chart-4))',
    'oklch(var(--chart-5))',
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground">Visualize your listening habits and trends</p>
      </div>

      <Tabs value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
              Songs Played Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={historyData?.timeData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                <XAxis dataKey="label" stroke="oklch(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="oklch(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(var(--card))',
                    border: '1px solid oklch(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="oklch(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
              Listening Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData?.timeData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                <XAxis dataKey="label" stroke="oklch(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="oklch(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(var(--card))',
                    border: '1px solid oklch(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="oklch(var(--chart-2))"
                  strokeWidth={3}
                  dot={{ fill: 'oklch(var(--chart-2))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-3 animate-pulse" />
              Top Genres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={historyData?.genreData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="oklch(var(--chart-3))"
                  dataKey="value"
                >
                  {historyData?.genreData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(var(--card))',
                    border: '1px solid oklch(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-4 animate-pulse" />
              Mood Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={historyData?.moodData || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                <XAxis type="number" stroke="oklch(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="oklch(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(var(--card))',
                    border: '1px solid oklch(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="oklch(var(--chart-4))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 bg-gradient-to-br from-chart-1/10 to-chart-1/5">
          <CardHeader>
            <CardTitle className="text-lg">Total Plays</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-chart-1">{historyData?.totalPlays || 0}</p>
            <p className="text-sm text-muted-foreground mt-2">Songs played this {timePeriod}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-2/10 to-chart-2/5">
          <CardHeader>
            <CardTitle className="text-lg">Unique Songs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-chart-2">{historyData?.uniqueSongs || 0}</p>
            <p className="text-sm text-muted-foreground mt-2">Different tracks played</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5">
          <CardHeader>
            <CardTitle className="text-lg">Listening Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-chart-3">{historyData?.totalMinutes || 0}m</p>
            <p className="text-sm text-muted-foreground mt-2">Minutes of music</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
