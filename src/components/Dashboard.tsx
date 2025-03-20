
import React, { useMemo } from "react";
import { ZakatRecord } from "@/types/ZakatTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface DashboardProps {
  data: ZakatRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Calculate totals
  const totals = useMemo(() => {
    if (!data.length) return {
      totalBeras: 0,
      totalUang: 0,
      totalRecords: 0,
      zakatFitrahBeras: 0,
      zakatFitrahUang: 0,
      zakatMaal: 0,
      infaqBeras: 0,
      infaqUang: 0,
      fidyahBeras: 0,
      fidyahUang: 0,
    };
    
    return data.reduce((acc, record) => {
      return {
        totalBeras: acc.totalBeras + record.totalBeras,
        totalUang: acc.totalUang + record.totalUang,
        totalRecords: acc.totalRecords + 1,
        zakatFitrahBeras: acc.zakatFitrahBeras + record.zakatFitrah.berasKg,
        zakatFitrahUang: acc.zakatFitrahUang + record.zakatFitrah.uang,
        zakatMaal: acc.zakatMaal + record.zakatMaal,
        infaqBeras: acc.infaqBeras + record.infaq.beras,
        infaqUang: acc.infaqUang + record.infaq.uang,
        fidyahBeras: acc.fidyahBeras + record.fidyah.beras,
        fidyahUang: acc.fidyahUang + record.fidyah.uang,
      };
    }, {
      totalBeras: 0,
      totalUang: 0,
      totalRecords: 0,
      zakatFitrahBeras: 0,
      zakatFitrahUang: 0,
      zakatMaal: 0,
      infaqBeras: 0,
      infaqUang: 0,
      fidyahBeras: 0,
      fidyahUang: 0,
    });
  }, [data]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Prepare chart data
  const berasChartData = [
    { name: 'Zakat Fitrah', value: totals.zakatFitrahBeras },
    { name: 'Infaq', value: totals.infaqBeras },
    { name: 'Fidyah', value: totals.fidyahBeras },
  ];
  
  const uangChartData = [
    { name: 'Zakat Fitrah', value: totals.zakatFitrahUang },
    { name: 'Zakat Maal', value: totals.zakatMaal },
    { name: 'Infaq', value: totals.infaqUang },
    { name: 'Fidyah', value: totals.fidyahUang },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="apple-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totals.totalRecords}</div>
          </CardContent>
        </Card>
        <Card className="apple-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Total Beras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totals.totalBeras} kg</div>
          </CardContent>
        </Card>
        <Card className="apple-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Total Uang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatCurrency(totals.totalUang)}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Beras Chart */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle>Distribution of Beras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={berasChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit=" kg" />
                  <Tooltip formatter={(value) => [`${value} kg`, 'Amount']} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Uang Chart */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle>Distribution of Uang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={uangChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Amount']} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
