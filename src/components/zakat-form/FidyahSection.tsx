import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FidyahSectionProps {
  fidyah: {
    beras: number;
    uang: string; // Ubah ke string untuk menampung format rupiah
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatRupiah = (value: string) => {
  // Hapus karakter non-digit
  const numericValue = value.replace(/\D/g, "");
  // Format ke rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(numericValue));
};

const FidyahSection: React.FC<FidyahSectionProps> = ({ fidyah, onInputChange }) => {
  const handleRupiahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRupiah(e.target.value);
    e.target.value = formattedValue; // Perbarui tampilan input
    onInputChange(e); // Kirim event ke parent
  };

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
            type="text" // Ubah ke text agar format rupiah bisa diterapkan
            value={fidyah.uang}
            onChange={handleRupiahChange}
            placeholder="Rp 0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FidyahSection;
