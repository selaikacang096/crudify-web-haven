
import React from "react";
import { CardHeader } from "@/components/ui/card";
import TableActions from "../zakat-table/TableActions";

interface ZakatCardHeaderProps {
  name: string;
  id: string;
  index: number;
  onDelete: (id: string) => void;
}

const ZakatCardHeader: React.FC<ZakatCardHeaderProps> = ({
  name,
  id,
  index,
  onDelete
}) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-0 space-y-0 bg-secondary/30">
      <div className="font-medium flex items-center text-lg">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-medium mr-3">
          {index}
        </span>
        {name.normalize("NFKC")}
      </div>
      <TableActions recordId={id} onDelete={onDelete} />
    </CardHeader>
  );
};

export default ZakatCardHeader;
