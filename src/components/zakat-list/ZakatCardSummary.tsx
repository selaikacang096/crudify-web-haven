
import React from "react";
import { Package, Coins } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface ZakatCardSummaryProps {
  totalBeras: number;
  totalUang: number;
}

const ZakatCardSummary: React.FC<ZakatCardSummaryProps> = ({ totalBeras, totalUang }) => {
  return (
    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
      <div className="flex items-center text-sm">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{totalBeras} kg</span>
      </div>
      <div className="flex items-center text-sm">
        <Coins className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{formatCurrency(totalUang)}</span>
      </div>
    </div>
  );
};

export default ZakatCardSummary;
