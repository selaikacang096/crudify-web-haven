
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZakatFormData, ZakatRecord, ZAKAT_FITRAH_RATE_PER_JIWA, PENGINPUT_OPTIONS } from "@/types/ZakatTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createRecord, updateRecord } from "@/utils/zakatStorage";
import { toast } from "sonner";
import { format } from "date-fns";
import { Save, RotateCcw, ArrowLeft } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ZakatFormProps {
  initialData?: ZakatRecord;
  isEdit?: boolean;
}

const ZakatForm: React.FC<ZakatFormProps> = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ZakatFormData>({
    penginput: "",
    tanggal: format(new Date(), "yyyy-MM-dd"),
    nama: "",
    alamat: "",
    zakatFitrah: {
      jiwaBeras: 0,
      berasKg: 0,
      jiwaUang: 0,
      uang: 0
    },
    zakatMaal: 0,
    infaq: {
      beras: 0,
      uang: 0
    },
    fidyah: {
      beras: 0,
      uang: 0
    }
  });
  
  // Load initial data if editing
  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        penginput: initialData.penginput,
        tanggal: format(new Date(initialData.tanggal), "yyyy-MM-dd"),
        nama: initialData.nama,
        alamat: initialData.alamat,
        zakatFitrah: { ...initialData.zakatFitrah },
        zakatMaal: initialData.zakatMaal,
        infaq: { ...initialData.infaq },
        fidyah: { ...initialData.fidyah }
      });
    }
  }, [initialData, isEdit]);

  // Effect to calculate zakat fitrah uang based on jiwa count
  useEffect(() => {
    if (formData.zakatFitrah.jiwaUang > 0) {
      const calculatedUang = formData.zakatFitrah.jiwaUang * ZAKAT_FITRAH_RATE_PER_JIWA;
      setFormData(prev => ({
        ...prev,
        zakatFitrah: {
          ...prev.zakatFitrah,
          uang: calculatedUang
        }
      }));
    }
  }, [formData.zakatFitrah.jiwaUang]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ZakatFormData],
          [child]: value === "" ? 0 : Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === "nama" || name === "alamat" || name === "penginput" || name === "tanggal" 
          ? value 
          : (value === "" ? 0 : Number(value))
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEdit && initialData) {
        const updated = updateRecord(initialData.id, formData);
        if (updated) {
          toast.success("Record updated successfully");
          navigate("/");
        } else {
          toast.error("Failed to update record");
        }
      } else {
        createRecord(formData);
        toast.success("Record created successfully");
        navigate("/?tab=records&scrollToBottom=true");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred while saving the record");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset the form
  const handleReset = () => {
    if (isEdit && initialData) {
      setFormData({
        penginput: initialData.penginput,
        tanggal: format(new Date(initialData.tanggal), "yyyy-MM-dd"),
        nama: initialData.nama,
        alamat: initialData.alamat,
        zakatFitrah: { ...initialData.zakatFitrah },
        zakatMaal: initialData.zakatMaal,
        infaq: { ...initialData.infaq },
        fidyah: { ...initialData.fidyah }
      });
    } else {
      setFormData({
        penginput: "",
        tanggal: format(new Date(), "yyyy-MM-dd"),
        nama: "",
        alamat: "",
        zakatFitrah: {
          jiwaBeras: 0,
          berasKg: 0,
          jiwaUang: 0,
          uang: 0
        },
        zakatMaal: 0,
        infaq: {
          beras: 0,
          uang: 0
        },
        fidyah: {
          beras: 0,
          uang: 0
        }
      });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-scale-in">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl font-semibold">{isEdit ? "Edit Record" : "Add New Record"}</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information Card */}
          <Card className="apple-card">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the contributor's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="penginput">Penginput</Label>
                  <Select
                    value={formData.penginput}
                    onValueChange={(value) => handleSelectChange(value, "penginput")}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select penginput" />
                    </SelectTrigger>
                    <SelectContent>
                      {PENGINPUT_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal</Label>
                  <Input
                    id="tanggal"
                    name="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Nama lengkap"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  placeholder="Alamat lengkap"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Zakat Fitrah Card */}
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
                    value={formData.zakatFitrah.jiwaBeras}
                    onChange={handleInputChange}
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
                    value={formData.zakatFitrah.berasKg}
                    onChange={handleInputChange}
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
                    value={formData.zakatFitrah.jiwaUang}
                    onChange={handleInputChange}
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
                    value={formData.zakatFitrah.uang}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Zakat Maal, Infaq & Fidyah Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Zakat Maal */}
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
                    value={formData.zakatMaal}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Infaq */}
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
                    value={formData.infaq.beras}
                    onChange={handleInputChange}
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
                    value={formData.infaq.uang}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Fidyah */}
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
                    value={formData.fidyah.beras}
                    onChange={handleInputChange}
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
                    value={formData.fidyah.uang}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex items-center"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : (isEdit ? "Update" : "Save")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ZakatForm;
