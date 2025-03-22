
import React from "react";
import { ZakatRecord } from "@/types/ZakatTypes";
import ZakatCard from "./ZakatCard";

interface ZakatCardListProps {
  records: ZakatRecord[];
}

const ZakatCardList: React.FC<ZakatCardListProps> = ({ records }) => {
  if (records.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No records found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <ZakatCard key={record.id} record={record} />
      ))}
    </div>
  );
};

export default ZakatCardList;
