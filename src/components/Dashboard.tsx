
import React, { useMemo } from "react";
import { ZakatRecord, DailyReportData, DailyReportItem, DailyReportTableRow } from "@/types/ZakatTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { format } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

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

  // Daily report data
  const dailyReportData: DailyReportData = useMemo(() => {
    // Get today's date
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Filter records for today
    const todayRecords = data.filter(record => 
      record.tanggal === today || record.createdAt.startsWith(today)
    );
    
    // Define colors for items
    const colors = [
      "#8B5CF6", // purple
      "#D946EF", // pink
      "#EC4899", // rose
      "#F97316", // orange
      "#EAB308", // yellow
      "#10B981", // emerald
      "#0EA5E9", // sky
      "#6366F1"  // indigo
    ];

    // Count different types of contributions
    const zakatFitrahBerasCount = todayRecords.filter(record => record.zakatFitrah.berasKg > 0).length;
    const zakatFitrahUangCount = todayRecords.filter(record => record.zakatFitrah.uang > 0).length;
    const zakatMaalCount = todayRecords.filter(record => record.zakatMaal > 0).length;
    const infaqBerasCount = todayRecords.filter(record => record.infaq.beras > 0).length;
    const infaqUangCount = todayRecords.filter(record => record.infaq.uang > 0).length;
    const fidyahBerasCount = todayRecords.filter(record => record.fidyah.beras > 0).length;
    const fidyahUangCount = todayRecords.filter(record => record.fidyah.uang > 0).length;
    
    const items: DailyReportItem[] = [
      { label: "Zakat Fitrah (Beras)", count: zakatFitrahBerasCount, color: colors[0] },
      { label: "Zakat Fitrah (Uang)", count: zakatFitrahUangCount, color: colors[1] },
      { label: "Zakat Maal", count: zakatMaalCount, color: colors[2] },
      { label: "Infaq (Beras)", count: infaqBerasCount, color: colors[3] },
      { label: "Infaq (Uang)", count: infaqUangCount, color: colors[4] },
      { label: "Fidyah (Beras)", count: fidyahBerasCount, color: colors[5] },
      { label: "Fidyah (Uang)", count: fidyahUangCount, color: colors[6] }
    ].filter(item => item.count > 0); // Filter out items with zero count
    
    return {
      date: today,
      totalRecords: todayRecords.length,
      items: items.length ? items : [{ label: "No records today", count: 0, color: "#999" }]
    };
  }, [data]);

  // Convert dailyReportData to table format
  const dailyReportTableData: DailyReportTableRow[] = useMemo(() => {
    const totalCount = dailyReportData.items.reduce((sum, item) => sum + item.count, 0);
    
    return dailyReportData.items.map((item, index) => ({
      id: index + 1,
      category: item.label,
      count: item.count,
      percentage: totalCount > 0 ? (item.count / totalCount) * 100 : 0
    }));
  }, [dailyReportData]);

  // Convert dailyReportData to chart format
  const dailyReportChartData = dailyReportData.items.map(item => ({
    name: item.label,
    value: item.count
  }));

  // Function to export daily report to Excel
  const exportToExcel = () => {
    try {
      // Create a CSV string
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add headers
      csvContent += "No,Category,Count,Percentage (%)\n";
      
      // Add data rows
      dailyReportTableData.forEach(row => {
        csvContent += `${row.id},${row.category},${row.count},${row.percentage.toFixed(2)}\n`;
      });
      
      // Add total row
      const totalCount = dailyReportTableData.reduce((sum, row) => sum + row.count, 0);
      csvContent += `${dailyReportTableData.length + 1},Total,${totalCount},100\n`;
      
      // Create a download link and trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Daily_Report_${dailyReportData.date}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Daily report exported successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export daily report");
    }
  };
  
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
      
      {/* Daily Report Section */}
      <Card className="apple-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daily Report ({dailyReportData.date})</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={exportToExcel}
          >
            <Download size={16} />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Today's Contributions: {dailyReportData.totalRecords}</h3>
              
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">No</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyReportTableData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                          No records found for today
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {dailyReportTableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: dailyReportData.items[row.id - 1]?.color || "#999" }}
                                />
                                <span>{row.category}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{row.count}</TableCell>
                            <TableCell className="text-right">{row.percentage.toFixed(2)}%</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-medium bg-muted/50">
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell className="text-right">
                            {dailyReportTableData.reduce((sum, row) => sum + row.count, 0)}
                          </TableCell>
                          <TableCell className="text-right">100%</TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="h-64">
              {dailyReportData.items[0].count > 0 && (
                <ChartContainer config={{}} className="h-full">
                  <PieChart>
                    <Pie
                      data={dailyReportChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dailyReportChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={dailyReportData.items[index].color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
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
