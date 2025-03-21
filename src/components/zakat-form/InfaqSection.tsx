
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InfaqSectionProps {
  infaq: {
    beras: number;
    uang: number;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfaqSection: React.FC<InfaqSectionProps> = ({
  infaq,
  onInputChange
}) => {
  return (
    <Card className="apple-card">
      <CardHeader>
        <CardTitle>Infaq</CardTitle>
        <CardDescription>Enter infaq details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="infaq.beras">Beras (kg)</Label>
          <Input
            id="infaq.beras"
            name="infaq.beras"
            type="number"
            min="0"
            step="0.1"
            value={infaq.beras}
            onChange={onInputChange}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="infaq.uang">Uang</Label>
          <Input
            id="infaq.uang"
            name="infaq.uang"
            type="number"
            min="0"
            value={infaq.uang}
            onChange={onInputChange}
            placeholder="0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InfaqSection;
