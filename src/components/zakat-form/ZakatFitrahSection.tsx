import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ZakatFitrahSectionProps {
  zakatFitrah: {
    jiwaBeras: number;
    berasKg: number;
    jiwaUang: number;
    uang: number;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const ZakatFitrahSection: React.FC<ZakatFitrahSectionProps> = ({
  zakatFitrah,
  onInputChange,
}) => {
  const [zakatRate, setZakatRate] = useState(37500); // Default rate
  const [manualUang, setManualUang] = useState(zakatFitrah.jiwaUang * zakatRate);

  const handleRateChange = (value: string) => {
    const rate = parseInt(value, 10);
    setZakatRate(rate);
    setManualUang(zakatFitrah.jiwaUang * rate); // Update uang sesuai tarif baru
  };

  const handleJiwaUangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e);
    const newJiwa = parseInt(e.target.value, 10) || 0;
    setManualUang(newJiwa * zakatRate); // Update uang sesuai jumlah jiwa baru
  };

  const handleUangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualUang(parseInt(e.target.value, 10) || 0); // Memungkinkan input manual
  };

  return (
    <Card className="apple-card">
      <CardHeader>
        <CardTitle>Zakat Fitrah</CardTitle>
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
              onChange={handleJiwaUangChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatRate">Pilih Tarif Zakat (IDR / jiwa)</Label>
            <Select onValueChange={handleRateChange} defaultValue="37500">
              <SelectTrigger>
                <SelectValue placeholder="Pilih tarif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="37500">Rp 37,500</SelectItem>
                <SelectItem value="40000">Rp 40,000</SelectItem>
                <SelectItem value="50000">Rp 50,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zakatFitrah.uang">
              Uang (Auto-calculated: {formatCurrency(zakatRate)} x {zakatFitrah.jiwaUang}, tapi bisa diedit)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
              <Input
                id="zakatFitrah.uang"
                name="zakatFitrah.uang"
                type="number"
                min="0"
                value={manualUang}
                onChange={handleUangChange} // Bisa diedit manual
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
