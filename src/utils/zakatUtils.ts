
import { ZakatRecord, ReportData, ReportSummary } from "@/types/ZakatTypes";
import { formatCurrency as formatCurrencyFn } from "./formatters";

// Calculate totals for all records
export const calculateTotals = (data: ZakatRecord[] | Partial<ZakatRecord>) => {
  const records = Array.isArray(data) ? data : [data];
  
  return {
    totalRecords: records.length,
    totalBeras: records.reduce((sum, record) => sum + (record.totalBeras || 0), 0),
    totalUang: records.reduce((sum, record) => sum + (record.totalUang || 0), 0),
    zakatFitrahBeras: records.reduce((sum, record) => sum + (record.zakatFitrah?.berasKg || 0), 0),
    zakatFitrahUang: records.reduce((sum, record) => sum + (record.zakatFitrah?.uang || 0), 0),
    zakatMaal: records.reduce((sum, record) => sum + (record.zakatMaal || 0), 0),
    infaqBeras: records.reduce((sum, record) => sum + (record.infaq?.beras || 0), 0),
    infaqUang: records.reduce((sum, record) => sum + (record.infaq?.uang || 0), 0),
    fidyahBeras: records.reduce((sum, record) => sum + (record.fidyah?.beras || 0), 0),
    fidyahUang: records.reduce((sum, record) => sum + (record.fidyah?.uang || 0), 0)
  };
};

// Group records by date
export const groupRecordsByDate = (data: ZakatRecord[]) => {
  const groups: Record<string, ZakatRecord[]> = {};
  
  for (const record of data) {
    const date = record.tanggal;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
  }
  
  return groups;
};

// Prepare data for daily reports
export const prepareReportData = (recordsByDate: Record<string, ZakatRecord[]>): ReportData[] => {
  const reportData: ReportData[] = [];
  
  for (const [date, records] of Object.entries(recordsByDate)) {
    const dataTotals = calculateTotals(records);
    
    reportData.push({
      date,
      zakatFitrahJiwaBeras: records.reduce((sum, r) => sum + r.zakatFitrah.jiwaBeras, 0),
      zakatFitrahBerasKg: dataTotals.zakatFitrahBeras,
      zakatFitrahJiwaUang: records.reduce((sum, r) => sum + r.zakatFitrah.jiwaUang, 0),
      zakatFitrahUang: dataTotals.zakatFitrahUang,
      zakatMaal: dataTotals.zakatMaal,
      infaqBeras: dataTotals.infaqBeras,
      infaqUang: dataTotals.infaqUang,
      fidyahBeras: dataTotals.fidyahBeras,
      fidyahUang: dataTotals.fidyahUang,
      totalBeras: dataTotals.totalBeras,
      totalUang: dataTotals.totalUang
    });
  }
  
  return reportData.sort((a, b) => a.date.localeCompare(b.date));
};

// Calculate summary totals for reports
export const calculateReportSummary = (reportData: ReportData[]): ReportSummary => {
  return {
    totalJiwaBeras: reportData.reduce((sum, r) => sum + r.zakatFitrahJiwaBeras, 0),
    totalBerasKg: reportData.reduce((sum, r) => sum + r.zakatFitrahBerasKg, 0),
    totalJiwaUang: reportData.reduce((sum, r) => sum + r.zakatFitrahJiwaUang, 0),
    totalZakatFitrahUang: reportData.reduce((sum, r) => sum + r.zakatFitrahUang, 0),
    totalZakatMaal: reportData.reduce((sum, r) => sum + r.zakatMaal, 0),
    totalInfaqBeras: reportData.reduce((sum, r) => sum + r.infaqBeras, 0),
    totalInfaqUang: reportData.reduce((sum, r) => sum + r.infaqUang, 0),
    totalFidyahBeras: reportData.reduce((sum, r) => sum + r.fidyahBeras, 0),
    totalFidyahUang: reportData.reduce((sum, r) => sum + r.fidyahUang, 0),
    totalAllBeras: reportData.reduce((sum, r) => sum + r.totalBeras, 0),
    totalAllUang: reportData.reduce((sum, r) => sum + r.totalUang, 0)
  };
};

// Prepare data for charts
export const prepareChartData = (totals: ReturnType<typeof calculateTotals>) => {
  const berasChartData = [
    { name: 'Zakat Fitrah', value: totals.zakatFitrahBeras, color: '#3b82f6' },
    { name: 'Infaq', value: totals.infaqBeras, color: '#06b6d4' },
    { name: 'Fidyah', value: totals.fidyahBeras, color: '#14b8a6' }
  ].filter(item => item.value > 0);
  
  const uangChartData = [
    { name: 'Zakat Fitrah', value: totals.zakatFitrahUang, color: '#3b82f6' },
    { name: 'Zakat Maal', value: totals.zakatMaal, color: '#0ea5e9' },
    { name: 'Infaq', value: totals.infaqUang, color: '#06b6d4' },
    { name: 'Fidyah', value: totals.fidyahUang, color: '#14b8a6' }
  ].filter(item => item.value > 0);
  
  return { berasChartData, uangChartData };
};

// Re-export formatCurrency for convenience
export { formatCurrencyFn as formatCurrency };
