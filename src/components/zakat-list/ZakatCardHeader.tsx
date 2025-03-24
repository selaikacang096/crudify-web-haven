
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
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <div className="font-semibold flex items-center">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
          {index}
        </span>
        {name.normalize("NFKC")}
      </div>
      <TableActions recordId={id} onDelete={onDelete} />
    </CardHeader>
  );
};

export default ZakatCardHeader;
