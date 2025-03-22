
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ZakatMaalSectionProps {
  zakatMaal: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZakatMaalSection: React.FC<ZakatMaalSectionProps> = ({
  zakatMaal,
  onInputChange
}) => {
  return (
    <Card className="apple-card">
      <CardHeader>
        <CardTitle>Zakat Maal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="zakatMaal">Jumlah</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
            <Input
              id="zakatMaal"
              name="zakatMaal"
              type="number"
              min="0"
              value={zakatMaal}
              onChange={onInputChange}
              placeholder="0"
              className="pl-9"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZakatMaalSection;
