
import React from "react";
import { format } from "date-fns";
import { ZakatRecord } from "@/types/ZakatTypes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Calendar, MapPin, Coins, Package } from "lucide-react";
import TableActions from "../zakat-table/TableActions";

interface ZakatCardProps {
  record: ZakatRecord;
  onDelete: (id: string) => void;
}

const ZakatCard: React.FC<ZakatCardProps> = ({ record, onDelete }) => {
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  return (
    <Card className="apple-card h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="font-semibold">{record.nama}</div>
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
          <span className="ml-1 font-medium">{record.alamat}</span>
        </div>
        
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
    </Card>
  );
};

export default ZakatCard;
