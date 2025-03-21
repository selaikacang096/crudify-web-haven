
import React, { useMemo, useRef } from "react";
import { ZakatRecord, ReportData, ReportSummary } from "@/types/ZakatTypes";
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
import { format, parse, isValid } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileDown, FilePdf } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DashboardProps {
  data: ZakatRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const reportTableRef = useRef<HTMLDivElement>(null);
  
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

  // Group records by date
  const recordsByDate = useMemo(() => {
    const groupedRecords: Record<string, ZakatRecord[]> = {};
    
    data.forEach(record => {
      const date = record.tanggal;
      if (!groupedRecords[date]) {
        groupedRecords[date] = [];
      }
      groupedRecords[date].push(record);
    });
    
    return groupedRecords;
  }, [data]);

  // Prepare daily report data
  const reportData: ReportData[] = useMemo(() => {
    const reports: ReportData[] = [];
    
    // Process each date group
    Object.entries(recordsByDate).forEach(([date, records]) => {
      const zakatFitrahJiwaBeras = records.reduce((sum, record) => sum + record.zakatFitrah.jiwaBeras, 0);
      const zakatFitrahBerasKg = records.reduce((sum, record) => sum + record.zakatFitrah.berasKg, 0);
      const zakatFitrahJiwaUang = records.reduce((sum, record) => sum + record.zakatFitrah.jiwaUang, 0);
      const zakatFitrahUang = records.reduce((sum, record) => sum + record.zakatFitrah.uang, 0);
      const zakatMaal = records.reduce((sum, record) => sum + record.zakatMaal, 0);
      const infaqBeras = records.reduce((sum, record) => sum + record.infaq.beras, 0);
      const infaqUang = records.reduce((sum, record) => sum + record.infaq.uang, 0);
      const fidyahBeras = records.reduce((sum, record) => sum + record.fidyah.beras, 0);
      const fidyahUang = records.reduce((sum, record) => sum + record.fidyah.uang, 0);
      const totalBeras = zakatFitrahBerasKg + infaqBeras + fidyahBeras;
      const totalUang = zakatFitrahUang + zakatMaal + infaqUang + fidyahUang;
      
      reports.push({
        date,
        zakatFitrahJiwaBeras,
        zakatFitrahBerasKg,
        zakatFitrahJiwaUang,
        zakatFitrahUang,
        zakatMaal,
        infaqBeras,
        infaqUang,
        fidyahBeras,
        fidyahUang,
        totalBeras,
        totalUang
      });
    });
    
    // Sort by date
    reports.sort((a, b) => {
      const dateA = parse(a.date, 'yyyy-MM-dd', new Date());
      const dateB = parse(b.date, 'yyyy-MM-dd', new Date());
      
      if (isValid(dateA) && isValid(dateB)) {
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });
    
    return reports;
  }, [recordsByDate]);

  // Calculate summary totals
  const reportSummary: ReportSummary = useMemo(() => {
    return reportData.reduce((acc, report) => {
      return {
        totalJiwaBeras: acc.totalJiwaBeras + report.zakatFitrahJiwaBeras,
        totalBerasKg: acc.totalBerasKg + report.zakatFitrahBerasKg,
        totalJiwaUang: acc.totalJiwaUang + report.zakatFitrahJiwaUang,
        totalZakatFitrahUang: acc.totalZakatFitrahUang + report.zakatFitrahUang,
        totalZakatMaal: acc.totalZakatMaal + report.zakatMaal,
        totalInfaqBeras: acc.totalInfaqBeras + report.infaqBeras,
        totalInfaqUang: acc.totalInfaqUang + report.infaqUang,
        totalFidyahBeras: acc.totalFidyahBeras + report.fidyahBeras,
        totalFidyahUang: acc.totalFidyahUang + report.fidyahUang,
        totalAllBeras: acc.totalAllBeras + report.totalBeras,
        totalAllUang: acc.totalAllUang + report.totalUang
      };
    }, {
      totalJiwaBeras: 0,
      totalBerasKg: 0,
      totalJiwaUang: 0,
      totalZakatFitrahUang: 0,
      totalZakatMaal: 0,
      totalInfaqBeras: 0,
      totalInfaqUang: 0,
      totalFidyahBeras: 0,
      totalFidyahUang: 0,
      totalAllBeras: 0,
      totalAllUang: 0
    });
  }, [reportData]);

  // Format date for display
  const formatDisplayDate = (dateStr: string) => {
    try {
      const date = parse(dateStr, 'yyyy-MM-dd', new Date());
      if (isValid(date)) {
        return format(date, 'dd MMMM yyyy');
      }
      return dateStr;
    } catch (error) {
      return dateStr;
    }
  };

  // Function to export daily report to PDF
  const exportToPDF = async () => {
    if (!reportTableRef.current) {
      toast.error("Could not generate PDF");
      return;
    }

    try {
      toast.info("Generating PDF...", { duration: 2000 });
      
      const element = reportTableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions based on the table
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(14);
      pdf.text('LAPORAN PENERIMAAN ZISF', imgWidth / 2, 10, { align: 'center' });
      pdf.text('UPZ DKM', imgWidth / 2, 18, { align: 'center' });
      
      let position = 25;
      
      // Determine if we need multiple pages
      let heightLeft = imgHeight;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - position);
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = 0;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position - (pageHeight - 25), imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save PDF
      pdf.save(`LAPORAN_PENERIMAAN_ZISF_${format(new Date(), 'yyyyMMdd')}.pdf`);
      
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  // Function to export daily report to Excel
  const exportToExcel = () => {
    try {
      // Create a CSV string
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add title
      // csvContent += "LAPORAN PENERIMAAN ZISF\n";
      // csvContent += "UPZ DKM\n\n";
      
      // Add table headers
      csvContent += "NO,TANGGAL,ZAKAT FITRAH - JIWA,ZAKAT FITRAH - BERAS,ZAKAT FITRAH - JIWA,ZAKAT FITRAH - UANG,ZAKAT MAAL,INFAQ/SHODAQOH - BERAS,INFAQ/SHODAQOH - UANG,FIDYAH - BERAS,FIDYAH - UANG,TOTAL BERAS (Kg),TOTAL UANG\n";
      
      // Add table data
      reportData.forEach((report, index) => {
        csvContent += `${index + 1},${formatDisplayDate(report.date)},${report.zakatFitrahJiwaBeras},${report.zakatFitrahBerasKg} Kg,${report.zakatFitrahJiwaUang},${formatCurrency(report.zakatFitrahUang)},${formatCurrency(report.zakatMaal)},${report.infaqBeras} Kg,${formatCurrency(report.infaqUang)},${report.fidyahBeras} Kg,${formatCurrency(report.fidyahUang)},${report.totalBeras} Kg,${formatCurrency(report.totalUang)}\n`;
      });
      
      // Add summary row
      csvContent += `TOTAL,,${reportSummary.totalJiwaBeras},${reportSummary.totalBerasKg} Kg,${reportSummary.totalJiwaUang},${formatCurrency(reportSummary.totalZakatFitrahUang)},${formatCurrency(reportSummary.totalZakatMaal)},${reportSummary.totalInfaqBeras} Kg,${formatCurrency(reportSummary.totalInfaqUang)},${reportSummary.totalFidyahBeras} Kg,${formatCurrency(reportSummary.totalFidyahUang)},${reportSummary.totalAllBeras} Kg,${formatCurrency(reportSummary.totalAllUang)}\n`;
      
      // Create a download link and trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `LAPORAN_PENERIMAAN_ZISF.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Report exported successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export report");
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="apple-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Total Donatur</CardTitle>
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
          <CardTitle>LAPORAN PENERIMAAN ZISF</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={exportToExcel}
            >
              <FileDown size={16} />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={exportToPDF}
            >
              <FilePdf size={16} />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" ref={reportTableRef}>
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead rowSpan={2} className="text-center align-middle border">NO</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">TANGGAL</TableHead>
                    <TableHead colSpan={4} className="text-center border">ZAKAT FITRAH</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">ZAKAT MAAL</TableHead>
                    <TableHead colSpan={2} className="text-center border">INFAQ/SHODAQOH</TableHead>
                    <TableHead colSpan={2} className="text-center border">FIDYAH</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">TOTAL BERAS (Kg)</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">TOTAL UANG</TableHead>
                  </TableRow>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-center border">JIWA</TableHead>
                    <TableHead className="text-center border">BERAS</TableHead>
                    <TableHead className="text-center border">JIWA</TableHead>
                    <TableHead className="text-center border">UANG</TableHead>
                    <TableHead className="text-center border">BERAS</TableHead>
                    <TableHead className="text-center border">UANG</TableHead>
                    <TableHead className="text-center border">BERAS</TableHead>
                    <TableHead className="text-center border">UANG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={13} className="text-center text-muted-foreground py-6">
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    reportData.map((report, index) => (
                      <TableRow key={`report-${index}`}>
                        <TableCell className="text-center border">{index + 1}</TableCell>
                        <TableCell className="text-center border">{formatDisplayDate(report.date)}</TableCell>
                        <TableCell className="text-center border">{report.zakatFitrahJiwaBeras}</TableCell>
                        <TableCell className="text-center border">{report.zakatFitrahBerasKg} Kg</TableCell>
                        <TableCell className="text-center border">{report.zakatFitrahJiwaUang}</TableCell>
                        <TableCell className="text-center border">{formatCurrency(report.zakatFitrahUang)}</TableCell>
                        <TableCell className="text-center border">{formatCurrency(report.zakatMaal)}</TableCell>
                        <TableCell className="text-center border">{report.infaqBeras} Kg</TableCell>
                        <TableCell className="text-center border">{formatCurrency(report.infaqUang)}</TableCell>
                        <TableCell className="text-center border">{report.fidyahBeras} Kg</TableCell>
                        <TableCell className="text-center border">{formatCurrency(report.fidyahUang)}</TableCell>
                        <TableCell className="text-center border">{report.totalBeras} Kg</TableCell>
                        <TableCell className="text-center border">{formatCurrency(report.totalUang)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell colSpan={2} className="text-center border">TOTAL</TableCell>
                    <TableCell className="text-center border">{reportSummary.totalJiwaBeras}</TableCell>
                    <TableCell className="text-center border">{reportSummary.totalBerasKg} Kg</TableCell>
                    <TableCell className="text-center border">{reportSummary.totalJiwaUang}</TableCell>
                    <TableCell className="text-center border">{formatCurrency(reportSummary.totalZakatFitrahUang)}</TableCell>
                    <TableCell className="text-center border">{formatCurrency(reportSummary.totalZakatMaal)}</TableCell>
                    <TableCell className="text-center border">{reportSummary.totalInfaqBeras} Kg</TableCell>
                    <TableCell className="text-center border">{formatCurrency(reportSummary.totalInfaqUang)}</TableCell>
                    <TableCell className="text-center border">{reportSummary.totalFidyahBeras} Kg</TableCell>
                    <TableCell className="text-center border">{formatCurrency(reportSummary.totalFidyahUang)}</TableCell>
                    <TableCell className="text-center border">{reportSummary.totalAllBeras} Kg</TableCell>
                    <TableCell className="text-center border">{formatCurrency(reportSummary.totalAllUang)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Beras Chart */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle>Distribusi Beras</CardTitle>
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
            <CardTitle>Distribusi Uang</CardTitle>
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
