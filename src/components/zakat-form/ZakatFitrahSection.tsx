import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

interface ZakatFitrahSectionProps {
  zakatFitrah: {
    jiwaBeras: number;
    berasKg: number;
    jiwaUang: number;
    uang: number;
  };
  zakatFitrahRate: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRateChange: (rate: number) => void;
  onUangChange: (uang: number) => void;
}

const ZakatFitrahSection: React.FC<ZakatFitrahSectionProps> = ({
  zakatFitrah,
  zakatFitrahRate,
  onInputChange,
  onRateChange,
  onUangChange
}) => {
  const handleRateChange = (rate: string) => {
    onRateChange(parseInt(rate, 10));
  };

  const handleUangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uang = parseInt(e.target.value, 10) || 0;
    onUangChange(uang);
  };

  return (
    <Card className="apple-card">
      <CardHeader>
        <CardTitle>Zakat Fitrah</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Jiwa Beras */}
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

          {/* Beras */}
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

          {/* Jiwa Uang */}
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

          {/* Uang */}
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.uang">
              Uang (Auto-calculated: {formatCurrency(zakatFitrahRate)}/jiwa)
            </Label>

            {/* Select Rate */}
            <Select onValueChange={handleRateChange} value={zakatFitrahRate.toString()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rate per jiwa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="37500">37,500</SelectItem>
                <SelectItem value="40000">40,000</SelectItem>
                <SelectItem value="50000">50,000</SelectItem>
              </SelectContent>
            </Select>

            {/* Input Uang */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="zakatFitrah.uang"
                name="zakatFitrah.uang"
                type="number"
                min="0"
                value={zakatFitrah.uang}
                onChange={handleUangChange}
                placeholder="0"
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZakatFitrahSection;
