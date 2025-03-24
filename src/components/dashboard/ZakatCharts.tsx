
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";

interface ChartDataItem {
  name: string;
  value: number;
}

interface ZakatChartsProps {
  berasChartData: ChartDataItem[];
  uangChartData: ChartDataItem[];
  formatCurrency: (amount: number) => string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ZakatCharts: React.FC<ZakatChartsProps> = ({ 
  berasChartData, 
  uangChartData, 
  formatCurrency 
}) => {
  // Calculate total for percentages
  const totalUang = useMemo(() => 
    uangChartData.reduce((sum, item) => sum + item.value, 0), 
    [uangChartData]
  );
  
  const totalBeras = useMemo(() => 
    berasChartData.reduce((sum, item) => sum + item.value, 0), 
    [berasChartData]
  );
  
  // Custom tooltip for percentage
  const CustomTooltip = ({ active, payload, label, total, isCurrency }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            {isCurrency ? formatCurrency(data.value) : `${data.value} kg`}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage}% dari total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Uang Chart */}
      <Card className="apple-card">
        <CardHeader>
          <CardTitle>Distribusi Uang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={uangChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {uangChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip total={totalUang} isCurrency={true} />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Beras Chart */}
      <Card className="apple-card">
        <CardHeader>
          <CardTitle>Distribusi Beras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={berasChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {berasChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip total={totalBeras} isCurrency={false} />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatCharts;
