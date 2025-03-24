
import React from "react";
import { User, Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/utils/formatters";

interface ZakatCardDetailsProps {
  penginput: string;
  tanggal: string;
  alamat: string;
}

const ZakatCardDetails: React.FC<ZakatCardDetailsProps> = ({
  penginput,
  tanggal,
  alamat
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center text-sm">
        <User className="mr-2 h-4 w-4 text-primary" />
        <span className="text-muted-foreground">Diinput oleh:</span>
        <span className="ml-1.5 font-medium">{penginput}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Calendar className="mr-2 h-4 w-4 text-primary" />
        <span className="text-muted-foreground">Tanggal:</span>
        <span className="ml-1.5 font-medium">{formatDate(tanggal)}</span>
      </div>
      
      <div className="flex items-start text-sm">
        <MapPin className="mr-2 h-4 w-4 shrink-0 mt-0.5 text-primary" />
        <div>
          <span className="text-muted-foreground">Alamat:</span>
          <span className="ml-1.5 font-medium">{alamat.normalize("NFKC")}</span>
        </div>
      </div>
    </div>
  );
};

export default ZakatCardDetails;
