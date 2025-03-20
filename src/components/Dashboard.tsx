
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
      "#6366F1",  // indigo
      "#3B82F6", // blue
      "#14B8A6"  // teal
    ];

    // Calculate sums for each category
    const zakatFitrahJiwaBeras = todayRecords.reduce((sum, record) => sum + record.zakatFitrah.jiwaBeras, 0);
    const zakatFitrahBerasKg = todayRecords.reduce((sum, record) => sum + record.zakatFitrah.berasKg, 0);
    const zakatFitrahJiwaUang = todayRecords.reduce((sum, record) => sum + record.zakatFitrah.jiwaUang, 0);
    const zakatFitrahUang = todayRecords.reduce((sum, record) => sum + record.zakatFitrah.uang, 0);
    const zakatMaal = todayRecords.reduce((sum, record) => sum + record.zakatMaal, 0);
    const infaqBeras = todayRecords.reduce((sum, record) => sum + record.infaq.beras, 0);
    const infaqUang = todayRecords.reduce((sum, record) => sum + record.infaq.uang, 0);
    const fidyahBeras = todayRecords.reduce((sum, record) => sum + record.fidyah.beras, 0);
    const fidyahUang = todayRecords.reduce((sum, record) => sum + record.fidyah.uang, 0);
    
    const items: DailyReportItem[] = [
      { label: "Zakat Fitrah (Jiwa Beras)", value: zakatFitrahJiwaBeras, color: colors[0], unit: "jiwa" },
      { label: "Zakat Fitrah (Beras)", value: zakatFitrahBerasKg, color: colors[1], unit: "kg" },
      { label: "Zakat Fitrah (Jiwa Uang)", value: zakatFitrahJiwaUang, color: colors[2], unit: "jiwa" },
      { label: "Zakat Fitrah (Uang)", value: zakatFitrahUang, color: colors[3], unit: "Rp" },
      { label: "Zakat Maal", value: zakatMaal, color: colors[4], unit: "Rp" },
      { label: "Infaq (Beras)", value: infaqBeras, color: colors[5], unit: "kg" },
      { label: "Infaq (Uang)", value: infaqUang, color: colors[6], unit: "Rp" },
      { label: "Fidyah (Beras)", value: fidyahBeras, color: colors[7], unit: "kg" },
      { label: "Fidyah (Uang)", value: fidyahUang, color: colors[8], unit: "Rp" }
    ].filter(item => item.value > 0); // Filter out items with zero value
    
    return {
      date: today,
      totalRecords: todayRecords.length,
      items: items.length ? items : [{ label: "No records today", value: 0, color: "#999" }]
    };
  }, [data]);

  // Convert dailyReportData to table format
  const dailyReportTableData: DailyReportTableRow[] = useMemo(() => {
    // Separate items by type for percentage calculation
    const berasItems = dailyReportData.items.filter(item => item.unit === "kg");
    const uangItems = dailyReportData.items.filter(item => item.unit === "Rp");
    const jiwaItems = dailyReportData.items.filter(item => item.unit === "jiwa");
    
    const totalBeras = berasItems.reduce((sum, item) => sum + item.value, 0);
    const totalUang = uangItems.reduce((sum, item) => sum + item.value, 0);
    const totalJiwa = jiwaItems.reduce((sum, item) => sum + item.value, 0);
    
    return dailyReportData.items.map((item, index) => {
      let percentage = 0;
      
      if (item.unit === "kg" && totalBeras > 0) {
        percentage = (item.value / totalBeras) * 100;
      } else if (item.unit === "Rp" && totalUang > 0) {
        percentage = (item.value / totalUang) * 100;
      } else if (item.unit === "jiwa" && totalJiwa > 0) {
        percentage = (item.value / totalJiwa) * 100;
      }
      
      return {
        id: index + 1,
        category: item.label,
        value: item.value,
        unit: item.unit,
        percentage: percentage
      };
    });
  }, [dailyReportData]);

  // Format value based on unit
  const formatValue = (value: number, unit?: string) => {
    if (unit === "Rp") {
      return formatCurrency(value);
    } else if (unit === "kg" || unit === "jiwa") {
      return `${value} ${unit}`;
    }
    return value;
  };

  // Convert dailyReportData to chart format for pie chart
  const dailyReportChartData = useMemo(() => {
    // Separate items by type
    const berasItems = dailyReportData.items.filter(item => item.unit === "kg");
    const uangItems = dailyReportData.items.filter(item => item.unit === "Rp");
    const jiwaItems = dailyReportData.items.filter(item => item.unit === "jiwa");
    
    // Return based on which has the most items
    if (uangItems.length >= berasItems.length && uangItems.length >= jiwaItems.length) {
      return uangItems.map(item => ({
        name: item.label,
        value: item.value
      }));
    } else if (berasItems.length >= uangItems.length && berasItems.length >= jiwaItems.length) {
      return berasItems.map(item => ({
        name: item.label,
        value: item.value
      }));
    } else {
      return jiwaItems.map(item => ({
        name: item.label,
        value: item.value
      }));
    }
  }, [dailyReportData]);

  // Function to export daily report to Excel
  const exportToExcel = () => {
    try {
      // Create a CSV string
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add headers
      csvContent += "No,Category,Value,Percentage (%)\n";
      
      // Group items by unit
      const berasItems = dailyReportTableData.filter(row => dailyReportData.items[row.id - 1].unit === "kg");
      const uangItems = dailyReportTableData.filter(row => dailyReportData.items[row.id - 1].unit === "Rp");
      const jiwaItems = dailyReportTableData.filter(row => dailyReportData.items[row.id - 1].unit === "jiwa");
      
      // Add Jiwa section if available
      if (jiwaItems.length > 0) {
        csvContent += "JIWA SECTION\n";
        jiwaItems.forEach(row => {
          csvContent += `${row.id},${row.category},${row.value} jiwa,${row.percentage.toFixed(2)}\n`;
        });
        const totalJiwa = jiwaItems.reduce((sum, row) => sum + row.value, 0);
        csvContent += `TOTAL JIWA,${totalJiwa} jiwa,100\n\n`;
      }
      
      // Add Beras section if available
      if (berasItems.length > 0) {
        csvContent += "BERAS SECTION\n";
        berasItems.forEach(row => {
          csvContent += `${row.id},${row.category},${row.value} kg,${row.percentage.toFixed(2)}\n`;
        });
        const totalBeras = berasItems.reduce((sum, row) => sum + row.value, 0);
        csvContent += `TOTAL BERAS,${totalBeras} kg,100\n\n`;
      }
      
      // Add Uang section if available
      if (uangItems.length > 0) {
        csvContent += "UANG SECTION\n";
        uangItems.forEach(row => {
          csvContent += `${row.id},${row.category},${formatCurrency(row.value)},${row.percentage.toFixed(2)}\n`;
        });
        const totalUang = uangItems.reduce((sum, row) => sum + row.value, 0);
        csvContent += `TOTAL UANG,${formatCurrency(totalUang)},100\n`;
      }
      
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
                      <TableHead className="text-right">Value</TableHead>
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
                        {/* Group by unit type */}
                        {dailyReportTableData.some(row => dailyReportData.items[row.id - 1].unit === "jiwa") && (
                          <>
                            <TableRow className="bg-muted/30">
                              <TableCell colSpan={4} className="font-medium">Jiwa</TableCell>
                            </TableRow>
                            {dailyReportTableData
                              .filter(row => dailyReportData.items[row.id - 1].unit === "jiwa")
                              .map((row) => (
                                <TableRow key={`jiwa-${row.id}`}>
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
                                  <TableCell className="text-right">{row.value} jiwa</TableCell>
                                  <TableCell className="text-right">{row.percentage.toFixed(2)}%</TableCell>
                                </TableRow>
                              ))
                            }
                            <TableRow className="font-medium bg-muted/20">
                              <TableCell colSpan={2}>Total Jiwa</TableCell>
                              <TableCell className="text-right">
                                {dailyReportTableData
                                  .filter(row => dailyReportData.items[row.id - 1].unit === "jiwa")
                                  .reduce((sum, row) => sum + row.value, 0)} jiwa
                              </TableCell>
                              <TableCell className="text-right">100%</TableCell>
                            </TableRow>
                          </>
                        )}
                        
                        {dailyReportTableData.some(row => dailyReportData.items[row.id - 1].unit === "kg") && (
                          <>
                            <TableRow className="bg-muted/30">
                              <TableCell colSpan={4} className="font-medium">Beras</TableCell>
                            </TableRow>
                            {dailyReportTableData
                              .filter(row => dailyReportData.items[row.id - 1].unit === "kg")
                              .map((row) => (
                                <TableRow key={`beras-${row.id}`}>
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
                                  <TableCell className="text-right">{row.value} kg</TableCell>
                                  <TableCell className="text-right">{row.percentage.toFixed(2)}%</TableCell>
                                </TableRow>
                              ))
                            }
                            <TableRow className="font-medium bg-muted/20">
                              <TableCell colSpan={2}>Total Beras</TableCell>
                              <TableCell className="text-right">
                                {dailyReportTableData
                                  .filter(row => dailyReportData.items[row.id - 1].unit === "kg")
                                  .reduce((sum, row) => sum + row.value, 0)} kg
                              </TableCell>
                              <TableCell className="text-right">100%</TableCell>
                            </TableRow>
                          </>
                        )}
                        
                        {dailyReportTableData.some(row => dailyReportData.items[row.id - 1].unit === "Rp") && (
                          <>
                            <TableRow className="bg-muted/30">
                              <TableCell colSpan={4} className="font-medium">Uang</TableCell>
                            </TableRow>
                            {dailyReportTableData
                              .filter(row => dailyReportData.items[row.id - 1].unit === "Rp")
                              .map((row) => (
                                <TableRow key={`uang-${row.id}`}>
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
                                  <TableCell className="text-right">{formatCurrency(row.value)}</TableCell>
                                  <TableCell className="text-right">{row.percentage.toFixed(2)}%</TableCell>
                                </TableRow>
                              ))
                            }
                            <TableRow className="font-medium bg-muted/20">
                              <TableCell colSpan={2}>Total Uang</TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(
                                  dailyReportTableData
                                    .filter(row => dailyReportData.items[row.id - 1].unit === "Rp")
                                    .reduce((sum, row) => sum + row.value, 0)
                                )}
                              </TableCell>
                              <TableCell className="text-right">100%</TableCell>
                            </TableRow>
                          </>
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="h-64">
              {dailyReportChartData.length > 0 && dailyReportChartData[0].value > 0 && (
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
                      {dailyReportChartData.map((entry, index) => {
                        // Find the corresponding item in dailyReportData.items
                        const item = dailyReportData.items.find(item => item.label === entry.name);
                        return (
                          <Cell key={`cell-${index}`} fill={item?.color || "#999"} />
                        );
                      })}
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
