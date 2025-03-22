
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

// Format currency for display
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

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
            <Label htmlFor="zakatFitrah.jiwaBeras">Jiwa Beras (max 100)</Label>
            <Input
              id="zakatFitrah.jiwaBeras"
              name="zakatFitrah.jiwaBeras"
              type="number"
              min="0"
              max="100"
              value={zakatFitrah.jiwaBeras}
              onChange={onInputChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.berasKg">Beras (kg) - Auto-calculated: 2.5kg/jiwa</Label>
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
            <Label htmlFor="zakatFitrah.jiwaUang">Jiwa Uang (max 100)</Label>
            <Input
              id="zakatFitrah.jiwaUang"
              name="zakatFitrah.jiwaUang"
              type="number"
              min="0"
              max="100"
              value={zakatFitrah.jiwaUang}
              onChange={onInputChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.uang">
              Uang (Auto-calculated: {formatCurrency(ZAKAT_FITRAH_RATE_PER_JIWA)}/jiwa)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="zakatFitrah.uang"
                name="zakatFitrah.uang"
                type="number"
                min="0"
                value={zakatFitrah.uang}
                onChange={onInputChange}
                placeholder="0"
                className="pl-9 bg-gray-100"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZakatFitrahSection;
