
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
      <td className="text-center align-middle sticky left-0 z-10 bg-white border border-border">{index + 1}</td>
      <td className="text-center align-middle border border-border">{record.penginput}</td>
      <td className="text-center align-middle border border-border">{formatDate(record.tanggal)}</td>
      <td className="align-middle border border-border">{record.nama}</td>
      <td className="align-middle border border-border">{record.alamat}</td>
      <td className="text-center align-middle border border-border">{record.zakatFitrah.jiwaBeras}</td>
      <td className="text-center align-middle border border-border">{record.zakatFitrah.berasKg}</td>
      <td className="text-center align-middle border border-border">{record.zakatFitrah.jiwaUang}</td>
      <td className="text-right align-middle border border-border">{formatCurrency(record.zakatFitrah.uang)}</td>
      <td className="text-right align-middle border border-border">{formatCurrency(record.zakatMaal)}</td>
      <td className="text-center align-middle border border-border">{record.infaq.beras}</td>
      <td className="text-right align-middle border border-border">{formatCurrency(record.infaq.uang)}</td>
      <td className="text-center align-middle border border-border">{record.fidyah.beras}</td>
      <td className="text-right align-middle border border-border">{formatCurrency(record.fidyah.uang)}</td>
      <td className="text-center align-middle border border-border">{record.totalBeras}</td>
      <td className="text-right align-middle border border-border">{formatCurrency(record.totalUang)}</td>
      <td className="text-center align-middle bg-white border border-border">
        <TableActions recordId={record.id} onDelete={onDeleteClick} />
      </td>
    </tr>
  );
};

export default ZakatTableRow;
