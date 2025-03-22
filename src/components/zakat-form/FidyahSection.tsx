import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FidyahSectionProps {
  fidyah: {
    beras: number;
    uang: number;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FidyahSection: React.FC<FidyahSectionProps> = ({
  fidyah,
  onInputChange
}) => {
  return (
    <Card className="apple-card">
      <CardHeader>
        <CardTitle>Fidyah</CardTitle>
        <CardDescription>Enter fidyah details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fidyah.beras">Beras (kg)</Label>
          <Input
            id="fidyah.beras"
            name="fidyah.beras"
            type="number"
            min="0"
            step="0.1"
            value={fidyah.beras}
            onChange={onInputChange}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fidyah.uang">Uang</Label>
          <Input
            id="fidyah.uang"
            name="fidyah.uang"
            type="number"
            min="0"
            value={fidyah.uang}
            onChange={onInputChange}
            placeholder="0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FidyahSection;
