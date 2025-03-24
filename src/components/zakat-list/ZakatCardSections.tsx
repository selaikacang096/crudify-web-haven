
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
    <div className="space-y-4">
      {/* Show Zakat Fitrah details if there are values */}
      {hasZakatFitrah && (
        <div className="flex items-start rounded-md p-2.5 bg-blue-50 text-sm">
          <Receipt className="mr-2.5 h-4 w-4 text-blue-600 mt-0.5" />
          <div>
            <span className="font-medium text-blue-700 block mb-1">Zakat Fitrah:</span>
            <div className="space-y-1 ml-0.5">
              {record.zakatFitrah.uang > 0 && (
                <div className="flex items-center">
                  <span className="font-medium text-slate-800">
                    {formatCurrency(record.zakatFitrah.uang)}
                  </span>
                  {record.zakatFitrah.jiwaUang > 0 && 
                    <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 rounded text-xs text-blue-800">
                      {record.zakatFitrah.jiwaUang} jiwa
                    </span>
                  }
                </div>
              )}
              {record.zakatFitrah.berasKg > 0 && (
                <div className="flex items-center">
                  <span className="font-medium text-slate-800">{record.zakatFitrah.berasKg} kg</span>
                  {record.zakatFitrah.jiwaBeras > 0 && 
                    <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 rounded text-xs text-blue-800">
                      {record.zakatFitrah.jiwaBeras} jiwa
                    </span>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show Zakat Maal if there is a value */}
      {hasZakatMaal && (
        <div className="flex items-center rounded-md p-2.5 bg-indigo-50 text-sm">
          <Banknote className="mr-2.5 h-4 w-4 text-indigo-600" />
          <div>
            <span className="font-medium text-indigo-700">Zakat Maal:</span>
            <span className="ml-1.5 font-medium text-slate-800">{formatCurrency(record.zakatMaal)}</span>
          </div>
        </div>
      )}

      {/* Show Infaq details if there are values */}
      {hasInfaq && (
        <div className="flex items-start rounded-md p-2.5 bg-cyan-50 text-sm">
          <HandCoins className="mr-2.5 h-4 w-4 text-cyan-600 mt-0.5" />
          <div>
            <span className="font-medium text-cyan-700 block mb-1">Infaq:</span>
            <div className="space-y-1 ml-0.5">
              {record.infaq.uang > 0 && (
                <span className="font-medium text-slate-800 block">
                  {formatCurrency(record.infaq.uang)}
                </span>
              )}
              {record.infaq.beras > 0 && (
                <span className="font-medium text-slate-800 block">{record.infaq.beras} kg</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show Fidyah details if there are values */}
      {hasFidyah && (
        <div className="flex items-start rounded-md p-2.5 bg-teal-50 text-sm">
          <HandPlatter className="mr-2.5 h-4 w-4 text-teal-600 mt-0.5" />
          <div>
            <span className="font-medium text-teal-700 block mb-1">Fidyah:</span>
            <div className="space-y-1 ml-0.5">
              {record.fidyah.uang > 0 && (
                <span className="font-medium text-slate-800 block">
                  {formatCurrency(record.fidyah.uang)}
                </span>
              )}
              {record.fidyah.beras > 0 && (
                <span className="font-medium text-slate-800 block">{record.fidyah.beras} kg</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZakatCardSections;
