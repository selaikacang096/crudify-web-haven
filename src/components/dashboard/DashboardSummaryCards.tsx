
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardSummaryCardsProps {
  totalRecords: number;
  totalBeras: number;
  totalUang: number;
  formatCurrency: (amount: number) => string;
}

const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({
  totalRecords,
  totalBeras,
  totalUang,
  formatCurrency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="apple-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-normal">Total Donatur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{totalRecords}</div>
        </CardContent>
      </Card>
      <Card className="apple-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-normal">Total Beras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{totalBeras} kg</div>
        </CardContent>
      </Card>
      <Card className="apple-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-normal">Total Uang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{formatCurrency(totalUang)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummaryCards;
