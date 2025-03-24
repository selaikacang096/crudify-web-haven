
import { ZakatRecord, ReportData } from "@/types/ZakatTypes";
import { calculateReportSummary } from "./calculators";
import { sortByDate } from "./formatters";

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
  reports.sort((a, b) => sortByDate(a.date, b.date));
  
  return reports;
};

// Prepare chart data
export const prepareChartData = (totals: any) => {
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
