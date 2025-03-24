
import { ZakatFormData, ZakatRecord, ReportData } from "@/types/ZakatTypes";

// Calculate totals for a form data
export const calculateTotals = (formData: ZakatFormData) => {
  const totalBeras = 
    formData.zakatFitrah.berasKg + 
    formData.infaq.beras + 
    formData.fidyah.beras;
  
  const totalUang = 
    formData.zakatFitrah.uang + 
    formData.zakatMaal + 
    formData.infaq.uang + 
    formData.fidyah.uang;
  
  return { totalBeras, totalUang };
};

// Calculate totals from zakat records
export const calculateRecordsTotals = (data: ZakatRecord[]) => {
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

// Calculate summary totals
export const calculateReportSummary = (reportData: ReportData[]) => {
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

// Calculate beras based on jiwa
export const calculateBerasFromJiwa = (jiwaBeras: number, berasPerJiwa: number) => {
  return jiwaBeras * berasPerJiwa;
};

// Calculate uang based on jiwa
export const calculateUangFromJiwa = (jiwaUang: number, amountPerJiwa: number) => {
  return jiwaUang * amountPerJiwa;
};
