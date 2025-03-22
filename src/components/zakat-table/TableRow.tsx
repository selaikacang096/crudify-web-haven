
import React from "react";
import { ZakatRecord } from "@/types/ZakatTypes";
import TableActions from "./TableActions";
import { format } from "date-fns";

interface ZakatTableRowProps {
  record: ZakatRecord;
  index: number;
  onDeleteClick: (id: string) => void;
}

const ZakatTableRow: React.FC<ZakatTableRowProps> = ({ 
  record, 
  index,
  onDeleteClick
}) => {
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
    <tr className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      <td className="text-center sticky left-0 z-10 bg-white">{index + 1}</td>
      <td className="text-center">{record.penginput}</td>
      <td className="text-center">{formatDate(record.tanggal)}</td>
      <td>{record.nama}</td>
      <td>{record.alamat}</td>
      <td className="text-center">{record.zakatFitrah.jiwaBeras}</td>
      <td className="text-center">{record.zakatFitrah.berasKg}</td>
      <td className="text-center">{record.zakatFitrah.jiwaUang}</td>
      <td className="text-right">{formatCurrency(record.zakatFitrah.uang)}</td>
      <td className="text-right">{formatCurrency(record.zakatMaal)}</td>
      <td className="text-center">{record.infaq.beras}</td>
      <td className="text-right">{formatCurrency(record.infaq.uang)}</td>
      <td className="text-center">{record.fidyah.beras}</td>
      <td className="text-right">{formatCurrency(record.fidyah.uang)}</td>
      <td className="text-center">{record.totalBeras}</td>
      <td className="text-right">{formatCurrency(record.totalUang)}</td>
      <td className="sticky right-0 z-10 bg-white">
        <TableActions recordId={record.id} onDelete={onDeleteClick} />
      </td>
    </tr>
  );
};

export default ZakatTableRow;
