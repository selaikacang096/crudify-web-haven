import React from "react";
import { format } from "date-fns";
import { ZakatRecord } from "@/types/ZakatTypes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Calendar, MapPin, Coins, Package, Receipt, Banknote, HandCoins, HandPlatter } from "lucide-react";
import TableActions from "../zakat-table/TableActions";
interface ZakatCardProps {
  record: ZakatRecord;
  onDelete: (id: string) => void;
  index: number; // Add index prop to display sequence number
}
const ZakatCard: React.FC<ZakatCardProps> = ({
  record,
  onDelete,
  index
}) => {
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  // Check if section should be displayed
  const hasZakatFitrah = record.zakatFitrah.berasKg > 0 || record.zakatFitrah.uang > 0;
  const hasZakatMaal = record.zakatMaal > 0;
  const hasInfaq = record.infaq.beras > 0 || record.infaq.uang > 0;
  const hasFidyah = record.fidyah.beras > 0 || record.fidyah.uang > 0;
  return <Card className="apple-card h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="font-semibold flex items-center">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
            {index}
          </span>
          {record.nama.normalize("NFKC")}
        </div>
        <TableActions recordId={record.id} onDelete={onDelete} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm">
          <User className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Diinput oleh:</span>
          <span className="ml-1 font-medium">{record.penginput}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Tanggal:</span>
          <span className="ml-1 font-medium">{formatDate(record.tanggal)}</span>
        </div>
        
        <div className="flex items-start text-sm">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Alamat:</span>
          <span className="ml-1 font-medium">{record.alamat.normalize("NFKC")}</span>
        </div>

        {/* Show Zakat Fitrah details if there are values */}
        {hasZakatFitrah && <div className="flex items-start text-sm border-t pt-2">
            <Receipt className="mr-2 h-4 w-4 text-blue-500" />
            <div>
              <span className="font-medium text-blue-600">Zakat Fitrah:</span>
              {record.zakatFitrah.uang > 0 && <span className="text-sm font-normal text-slate-900">
                <span className="font-medium ml-1 text-sm text-slate-900">{formatCurrency(record.zakatFitrah.uang)}</span>
                {record.zakatFitrah.jiwaUang > 0 && ` (${record.zakatFitrah.jiwaUang} jiwa)`}
              </span>}
              {/* <div className="flex flex-col gap-1 mt-1"> */}
                {record.zakatFitrah.berasKg > 0 && <span className="text-sm text-slate-900">
                    <span className="font-medium ml-1">{record.zakatFitrah.berasKg} kg</span>
                    {record.zakatFitrah.jiwaBeras > 0 && ` (${record.zakatFitrah.jiwaBeras} jiwa)`}
                  </span>}
              {/* </div> */}
            </div>
          </div>}

        {/* Show Zakat Maal if there is a value */}
        {hasZakatMaal && <div className="flex items-center text-sm border-t pt-2">
            <Banknote className="mr-2 h-4 w-4 text-sky-500" />
            <span className="font-medium text-sky-600">Zakat Maal:</span>
            <span className="ml-1 font-medium">{formatCurrency(record.zakatMaal)}</span>
          </div>}

        {/* Show Infaq details if there are values */}
        {hasInfaq && <div className="flex items-start text-sm border-t pt-2">
            <HandCoins className="mr-2 h-4 w-4 text-cyan-500" />
            <div>
              <span className="font-medium text-cyan-600">Infaq:</span>
              {record.infaq.uang > 0 && <span className="text-xs text-muted-foreground">
                  <span className="font-medium ml-1 text-sm text-slate-900">{formatCurrency(record.infaq.uang)}</span>
                </span>}
              <div className="flex flex-col gap-1 mt-1">
                {record.infaq.beras > 0 && <span className="text-xs text-muted-foreground">
                    <span className="font-medium">{record.infaq.beras} kg</span>
                </span>}
              </div>
            </div>
          </div>}

        {/* Show Fidyah details if there are values */}
        {hasFidyah && <div className="flex items-start text-sm border-t pt-2">
            <HandPlatter className="mr-2 h-4 w-4 text-teal-500" />
            <div>
              <span className="font-medium text-teal-600">Fidyah:</span>
              {record.fidyah.uang > 0 && <span className="text-xs text-muted-foreground">
                  <span className="font-medium ml-1 text-sm text-slate-900">{formatCurrency(record.fidyah.uang)}</span>
              </span>}
              <div className="flex flex-col gap-1 mt-1">
                {record.fidyah.beras > 0 && <span className="text-xs text-muted-foreground">
                    <span className="font-medium">{record.fidyah.beras} kg</span>
                  </span>}
              </div>
            </div>
          </div>}

        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
          <div className="flex items-center text-sm">
            <Package className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{record.totalBeras} kg</span>
          </div>
          <div className="flex items-center text-sm">
            <Coins className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{formatCurrency(record.totalUang)}</span>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default ZakatCard;
