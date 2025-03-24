
import React from "react";
import { Package, Coins } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface ZakatCardSummaryProps {
  totalBeras: number;
  totalUang: number;
}

const ZakatCardSummary: React.FC<ZakatCardSummaryProps> = ({ totalBeras, totalUang }) => {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
      <div className="flex items-center text-sm bg-secondary/50 p-2 rounded">
        <Package className="mr-2 h-4 w-4 text-primary/80" />
        <span className="font-medium">{totalBeras} kg</span>
      </div>
      <div className="flex items-center text-sm bg-secondary/50 p-2 rounded">
        <Coins className="mr-2 h-4 w-4 text-primary/80" />
        <span className="font-medium">{formatCurrency(totalUang)}</span>
      </div>
    </div>
  );
};

export default ZakatCardSummary;
