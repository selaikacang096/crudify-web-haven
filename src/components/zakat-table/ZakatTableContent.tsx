
import React from "react";
import { ZakatRecord } from "@/types/ZakatTypes";
import ZakatTableRow from "./TableRow";

interface ZakatTableContentProps {
  data: ZakatRecord[];
  onDeleteClick: (id: string) => void;
}

const ZakatTableContent: React.FC<ZakatTableContentProps> = ({ 
  data, 
  onDeleteClick 
}) => {
  return (
    <div className="table-container rounded-lg border border-border/60 shadow-sm overflow-x-auto animate-fade-in">
      <table className="data-table w-max min-w-full">
        <thead>
          <tr className="bg-secondary/80">
            <th className="text-center align-middle sticky left-0 z-10 bg-secondary/80">No</th>
            <th className="text-center align-middle">Penginput</th>
            <th className="text-center align-middle">Tanggal</th>
            <th className="text-center align-middle">Nama</th>
            <th className="text-center align-middle">Alamat</th>
            <th colSpan={4} className="text-center">Zakat Fitrah</th>
            <th className="text-center align-middle">Zakat Maal</th>
            <th colSpan={2} className="text-center">Infaq</th>
            <th colSpan={2} className="text-center">Fidyah</th>
            <th className="text-center align-middle">Total Beras</th>
            <th className="text-center align-middle">Total Uang</th>
            <th className="text-center align-middle sticky right-0 z-10 bg-secondary/80">Actions</th>
          </tr>
          <tr className="bg-secondary/60">
            <th className="sticky left-0 z-10 bg-secondary/60"></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th className="text-center">Jiwa Beras</th>
            <th className="text-center">Beras (kg)</th>
            <th className="text-center">Jiwa Uang</th>
            <th className="text-center">Uang</th>
            <th></th>
            <th className="text-center">Beras</th>
            <th className="text-center">Uang</th>
            <th className="text-center">Beras</th>
            <th className="text-center">Uang</th>
            <th></th>
            <th></th>
            <th className="sticky right-0 z-10 bg-secondary/60"></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={17} className="text-center py-8 text-muted-foreground">
                No records found
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <ZakatTableRow 
                key={record.id} 
                record={record} 
                index={index} 
                onDeleteClick={onDeleteClick} 
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ZakatTableContent;
