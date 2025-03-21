
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
        <CardDescription>Enter zakat maal amount</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="zakatMaal">Jumlah</Label>
          <Input
            id="zakatMaal"
            name="zakatMaal"
            type="number"
            min="0"
            value={zakatMaal}
            onChange={onInputChange}
            placeholder="0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ZakatMaalSection;
