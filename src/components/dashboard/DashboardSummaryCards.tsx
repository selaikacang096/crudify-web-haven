import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Coins, Wheat, DollarSign, HandCoins, Heart, BadgeDollarSign } from "lucide-react";
interface DashboardSummaryCardsProps {
  totalRecords: number;
  totalBeras: number;
  totalUang: number;
  zakatFitrahBeras: number;
  zakatFitrahUang: number;
  zakatMaal: number;
  infaqBeras: number;
  infaqUang: number;
  fidyahBeras: number;
  fidyahUang: number;
  formatCurrency: (amount: number) => string;
}
const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({
  totalRecords,
  totalBeras,
  totalUang,
  zakatFitrahBeras,
  zakatFitrahUang,
  zakatMaal,
  infaqBeras,
  infaqUang,
  fidyahBeras,
  fidyahUang,
  formatCurrency
}) => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="apple-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">Total Muzakki</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{totalRecords} Orang</div>
        </CardContent>
      </Card>
      <Card className="apple-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">Total Beras</CardTitle>
          <Wheat className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{totalBeras} kg</div>
          <div className="pt-2 grid grid-cols-1 gap-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Zakat Fitrah:</span>
              <span>{zakatFitrahBeras} kg</span>
            </div>
            {infaqBeras > 0 && <div className="flex justify-between">
                <span>Infaq:</span>
                <span>{infaqBeras} kg</span>
              </div>}
            {fidyahBeras > 0 && <div className="flex justify-between">
                <span>Fidyah:</span>
                <span>{fidyahBeras} kg</span>
              </div>}
          </div>
        </CardContent>
      </Card>
      <Card className="apple-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">Total Uang</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{formatCurrency(totalUang)}</div>
          <div className="pt-2 grid grid-cols-1 gap-1 text-xs text-muted-foreground">
            {zakatFitrahUang > 0 && <div className="flex justify-between">
                <span className="text-sm">Zakat Fitrah:</span>
                <span className="text-sm">{formatCurrency(zakatFitrahUang)}</span>
              </div>}
            {zakatMaal > 0 && <div className="flex justify-between">
                <span className="text-sm">Zakat Maal:</span>
                <span className="text-sm">{formatCurrency(zakatMaal)}</span>
              </div>}
            {infaqUang > 0 && <div className="flex justify-between">
                <span className="text-sm">Infaq:</span>
                <span className="text-sm">{formatCurrency(infaqUang)}</span>
              </div>}
            {fidyahUang > 0 && <div className="flex justify-between">
                <span className="text-sm">Fidyah:</span>
                <span className="text-sm">{formatCurrency(fidyahUang)}</span>
              </div>}
          </div>
        </CardContent>
      </Card>
      
      {/* Category breakdown cards */}
      
      
      
      
      
    </div>;
};
export default DashboardSummaryCards;