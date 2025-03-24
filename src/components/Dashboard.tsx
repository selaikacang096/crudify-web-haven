
import React, { useMemo } from "react";
import { ZakatRecord } from "@/types/ZakatTypes";
import DashboardSummaryCards from "./dashboard/DashboardSummaryCards";
import ZakatReportTable from "./dashboard/ZakatReportTable";
import ZakatCharts from "./dashboard/ZakatCharts";
import {
  calculateTotals,
  formatCurrency,
  groupRecordsByDate,
  prepareReportData,
  calculateReportSummary,
  prepareChartData
} from "@/utils/zakatUtils";

interface DashboardProps {
  data: ZakatRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Calculate totals
  const totals = useMemo(() => calculateTotals(data), [data]);
  
  // Group records by date
  const recordsByDate = useMemo(() => groupRecordsByDate(data), [data]);

  // Prepare daily report data
  const reportData = useMemo(() => prepareReportData(recordsByDate), [recordsByDate]);

  // Calculate summary totals
  const reportSummary = useMemo(() => calculateReportSummary(reportData), [reportData]);
  
  // Prepare chart data
  const { berasChartData, uangChartData } = useMemo(() => 
    prepareChartData(totals), [totals]);
  
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <DashboardSummaryCards 
        totalRecords={totals.totalRecords} 
        totalBeras={totals.totalBeras} 
        totalUang={totals.totalUang}
        zakatFitrahBeras={totals.zakatFitrahBeras}
        zakatFitrahUang={totals.zakatFitrahUang}
        zakatMaal={totals.zakatMaal}
        infaqBeras={totals.infaqBeras}
        infaqUang={totals.infaqUang}
        fidyahBeras={totals.fidyahBeras}
        fidyahUang={totals.fidyahUang}
        formatCurrency={formatCurrency}
      />
      
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <ZakatReportTable 
          reportData={reportData}
          reportSummary={reportSummary}
          formatCurrency={formatCurrency}
        />
      </div>
      
      <ZakatCharts 
        berasChartData={berasChartData}
        uangChartData={uangChartData}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Dashboard;
