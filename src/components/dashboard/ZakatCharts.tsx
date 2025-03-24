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
  LabelList
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
              <BarChart data={uangChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Jumlah']} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="value" position="top" 
                    formatter={(value) => `${((value / totalUang) * 100).toFixed(1)}%`} />
                </Bar>
              </BarChart>
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
              <BarChart data={berasChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" kg" />
                <Tooltip formatter={(value) => [`${value} kg`, 'Jumlah']} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="value" position="top" 
                    formatter={(value) => `${((value / totalBeras) * 100).toFixed(1)}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatCharts;