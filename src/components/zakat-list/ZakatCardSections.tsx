
import React from "react";
import { Receipt, Banknote, HandCoins, HandPlatter } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { ZakatRecord } from "@/types/ZakatTypes";

interface ZakatCardSectionsProps {
  record: ZakatRecord;
}

const ZakatCardSections: React.FC<ZakatCardSectionsProps> = ({ record }) => {
  // Check if section should be displayed
  const hasZakatFitrah = record.zakatFitrah.berasKg > 0 || record.zakatFitrah.uang > 0;
  const hasZakatMaal = record.zakatMaal > 0;
  const hasInfaq = record.infaq.beras > 0 || record.infaq.uang > 0;
  const hasFidyah = record.fidyah.beras > 0 || record.fidyah.uang > 0;

  return (
    <div className="space-y-3">
      {/* Show Zakat Fitrah details if there are values */}
      {hasZakatFitrah && (
        <div className="flex items-start text-sm border-t pt-2">
          <Receipt className="mr-2 h-4 w-4 text-blue-500" />
          <div>
            <span className="font-medium text-blue-600">Zakat Fitrah:</span>
            {record.zakatFitrah.uang > 0 && (
              <span className="text-sm font-normal text-slate-900">
                <span className="font-medium ml-1 text-sm text-slate-900">
                  {formatCurrency(record.zakatFitrah.uang)}
                </span>
                {record.zakatFitrah.jiwaUang > 0 && ` (${record.zakatFitrah.jiwaUang} jiwa)`}
              </span>
            )}
            {record.zakatFitrah.berasKg > 0 && (
              <span className="text-sm text-slate-900">
                <span className="font-medium ml-1">{record.zakatFitrah.berasKg} kg</span>
                {record.zakatFitrah.jiwaBeras > 0 && ` (${record.zakatFitrah.jiwaBeras} jiwa)`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Show Zakat Maal if there is a value */}
      {hasZakatMaal && (
        <div className="flex items-center text-sm border-t pt-2">
          <Banknote className="mr-2 h-4 w-4 text-sky-500" />
          <span className="font-medium text-sky-600">Zakat Maal:</span>
          <span className="ml-1 font-medium">{formatCurrency(record.zakatMaal)}</span>
        </div>
      )}

      {/* Show Infaq details if there are values */}
      {hasInfaq && (
        <div className="flex items-start text-sm border-t pt-2">
          <HandCoins className="mr-2 h-4 w-4 text-cyan-500" />
          <div>
            <span className="font-medium text-cyan-600">Infaq:</span>
            {record.infaq.uang > 0 && (
              <span className="text-xs text-muted-foreground">
                <span className="font-medium ml-1 text-sm text-slate-900">
                  {formatCurrency(record.infaq.uang)}
                </span>
              </span>
            )}
            {record.infaq.beras > 0 && (
              <span className="text-xs text-muted-foreground">
                <span className="font-medium ml-1 text-sm text-slate-900">{record.infaq.beras} kg</span>
                {record.infaq.jiwaBeras > 0 && ` (${record.infaq.jiwaBeras} jiwa)`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Show Fidyah details if there are values */}
      {hasFidyah && (
        <div className="flex items-start text-sm border-t pt-2">
          <HandPlatter className="mr-2 h-4 w-4 text-teal-500" />
          <div>
            <span className="font-medium text-teal-600">Fidyah:</span>
            {record.fidyah.uang > 0 && (
              <span className="text-xs text-muted-foreground">
                <span className="font-medium ml-1 text-sm text-slate-900">
                  {formatCurrency(record.fidyah.uang)}
                </span>
              </span>
            )}
            {record.fidyah.beras > 0 && (
              <span className="text-xs text-muted-foreground">
                <span className="font-medium ml-1 text-sm text-slate-900">{record.fidyah.beras} kg</span>
                {record.fidyah.jiwaBeras > 0 && ` (${record.fidyah.jiwaBeras} jiwa)`}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZakatCardSections;
