
import { ZakatRecord, ReportData, ReportSummary } from "@/types/ZakatTypes";
import { format, parse, isValid } from "date-fns";

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Calculate totals from zakat records
export const calculateTotals = (data: ZakatRecord[]) => {
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
};

// Group records by date
export const groupRecordsByDate = (data: ZakatRecord[]) => {
  const groupedRecords: Record<string, ZakatRecord[]> = {};
  
  data.forEach(record => {
    const date = record.tanggal;
    if (!groupedRecords[date]) {
      groupedRecords[date] = [];
    }
    groupedRecords[date].push(record);
  });
  
  return groupedRecords;
};

// Prepare daily report data
export const prepareReportData = (recordsByDate: Record<string, ZakatRecord[]>): ReportData[] => {
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
};

// Calculate summary totals
export const calculateReportSummary = (reportData: ReportData[]): ReportSummary => {
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
};

// Prepare chart data
export const prepareChartData = (totals: ReturnType<typeof calculateTotals>) => {
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

  return { berasChartData, uangChartData };
};
