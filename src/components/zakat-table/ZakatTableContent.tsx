
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
    <div className="table-container rounded-lg border border-border shadow-sm overflow-x-auto animate-fade-in">
      <table className="data-table w-max min-w-full border-collapse">
        <thead>
          <tr className="bg-secondary/80">
            <th className="text-center align-middle sticky left-0 z-10 bg-secondary/80 border border-border">No</th>
            <th className="text-center align-middle border border-border">Penginput</th>
            <th className="text-center align-middle border border-border">Tanggal</th>
            <th className="text-center align-middle border border-border">Nama</th>
            <th className="text-center align-middle border border-border">Alamat</th>
            <th colSpan={4} className="text-center border border-border">Zakat Fitrah</th>
            <th className="text-center align-middle border border-border">Zakat Maal</th>
            <th colSpan={2} className="text-center border border-border">Infaq</th>
            <th colSpan={2} className="text-center border border-border">Fidyah</th>
            <th className="text-center align-middle border border-border">Total Beras</th>
            <th className="text-center align-middle border border-border">Total Uang</th>
            <th className="text-center align-middle bg-secondary/80 border border-border">Actions</th>
          </tr>
          <tr className="bg-secondary/60">
            <th className="sticky left-0 z-10 bg-secondary/60 border border-border"></th>
            <th className="border border-border"></th>
            <th className="border border-border"></th>
            <th className="border border-border"></th>
            <th className="border border-border"></th>
            <th className="text-center border border-border">Jiwa Beras</th>
            <th className="text-center border border-border">Beras (kg)</th>
            <th className="text-center border border-border">Jiwa Uang</th>
            <th className="text-center border border-border">Uang</th>
            <th className="border border-border"></th>
            <th className="text-center border border-border">Beras</th>
            <th className="text-center border border-border">Uang</th>
            <th className="text-center border border-border">Beras</th>
            <th className="text-center border border-border">Uang</th>
            <th className="border border-border"></th>
            <th className="border border-border"></th>
            <th className="bg-secondary/60 border border-border"></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={17} className="text-center py-8 text-muted-foreground border border-border">
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
