
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
    <div className="space-y-2 md:space-y-4">
      {/* Show Zakat Fitrah details if there are values */}
      {hasZakatFitrah && (
        <div className="flex items-start rounded-md p-2 md:p-2.5 bg-blue-50 text-xs sm:text-sm">
          <Receipt className="mr-1.5 sm:mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 mt-0.5 shrink-0" />
          <div className="w-full">
            <span className="font-medium text-blue-700 block mb-0.5 sm:mb-1">Zakat Fitrah:</span>
            <div className="space-y-1 ml-0.5">
              {record.zakatFitrah.uang > 0 && (
                <div className="flex items-center flex-wrap">
                  <span className="font-medium text-slate-800 mr-1.5">
                    {formatCurrency(record.zakatFitrah.uang)}
                  </span>
                  {record.zakatFitrah.jiwaUang > 0 && 
                    <span className="mt-0.5 px-1 sm:px-1.5 py-0.5 bg-blue-100 rounded text-xs text-blue-800">
                      {record.zakatFitrah.jiwaUang} jiwa
                    </span>
                  }
                </div>
              )}
              {record.zakatFitrah.berasKg > 0 && (
                <div className="flex items-center flex-wrap">
                  <span className="font-medium text-slate-800 mr-1.5">{record.zakatFitrah.berasKg} kg</span>
                  {record.zakatFitrah.jiwaBeras > 0 && 
                    <span className="mt-0.5 px-1 sm:px-1.5 py-0.5 bg-blue-100 rounded text-xs text-blue-800">
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
        <div className="flex items-center rounded-md p-2 md:p-2.5 bg-indigo-50 text-xs sm:text-sm">
          <Banknote className="mr-1.5 sm:mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600 shrink-0" />
          <div>
            <span className="font-medium text-indigo-700">Zakat Maal:</span>
            <span className="ml-1 sm:ml-1.5 font-medium text-slate-800 break-all">{formatCurrency(record.zakatMaal)}</span>
          </div>
        </div>
      )}

      {/* Show Infaq details if there are values */}
      {hasInfaq && (
        <div className="flex items-start rounded-md p-2 md:p-2.5 bg-cyan-50 text-xs sm:text-sm">
          <HandCoins className="mr-1.5 sm:mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-medium text-cyan-700 block mb-0.5 sm:mb-1">Infaq:</span>
            <div className="space-y-1 ml-0.5">
              {record.infaq.uang > 0 && (
                <span className="font-medium text-slate-800 block break-all">
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
        <div className="flex items-start rounded-md p-2 md:p-2.5 bg-teal-50 text-xs sm:text-sm">
          <HandPlatter className="mr-1.5 sm:mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-medium text-teal-700 block mb-0.5 sm:mb-1">Fidyah:</span>
            <div className="space-y-1 ml-0.5">
              {record.fidyah.uang > 0 && (
                <span className="font-medium text-slate-800 block break-all">
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
