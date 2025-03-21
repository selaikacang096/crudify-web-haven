
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ZAKAT_FITRAH_RATE_PER_JIWA } from "@/types/ZakatTypes";

interface ZakatFitrahSectionProps {
  zakatFitrah: {
    jiwaBeras: number;
    berasKg: number;
    jiwaUang: number;
    uang: number;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZakatFitrahSection: React.FC<ZakatFitrahSectionProps> = ({
  zakatFitrah,
  onInputChange
}) => {
  return (
    <Card className="apple-card">
      <CardHeader>
        <CardTitle>Zakat Fitrah</CardTitle>
        <CardDescription>Enter zakat fitrah details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.jiwaBeras">Jiwa Beras</Label>
            <Input
              id="zakatFitrah.jiwaBeras"
              name="zakatFitrah.jiwaBeras"
              type="number"
              min="0"
              value={zakatFitrah.jiwaBeras}
              onChange={onInputChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.berasKg">Beras (kg)</Label>
            <Input
              id="zakatFitrah.berasKg"
              name="zakatFitrah.berasKg"
              type="number"
              min="0"
              step="0.1"
              value={zakatFitrah.berasKg}
              onChange={onInputChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.jiwaUang">Jiwa Uang</Label>
            <Input
              id="zakatFitrah.jiwaUang"
              name="zakatFitrah.jiwaUang"
              type="number"
              min="0"
              value={zakatFitrah.jiwaUang}
              onChange={onInputChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.uang">Uang (Auto-calculated: Rp. {ZAKAT_FITRAH_RATE_PER_JIWA.toLocaleString('id-ID')}/jiwa)</Label>
            <Input
              id="zakatFitrah.uang"
              name="zakatFitrah.uang"
              type="number"
              min="0"
              value={zakatFitrah.uang}
              onChange={onInputChange}
              placeholder="0"
              className="bg-gray-100"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZakatFitrahSection;
