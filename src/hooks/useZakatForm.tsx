
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZakatFormData, ZakatRecord, ZAKAT_FITRAH_RATE_PER_JIWA } from "@/types/ZakatTypes";
import { createRecord, updateRecord } from "@/utils/zakatStorage";
import { format } from "date-fns";
import { toast } from "sonner";

interface UseZakatFormProps {
  initialData?: ZakatRecord;
  isEdit?: boolean;
}

export const useZakatForm = ({ initialData, isEdit = false }: UseZakatFormProps) => {
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
        zakatFitrah: { 
          jiwaBeras: initialData.zakatFitrah.jiwaBeras,
          berasKg: initialData.zakatFitrah.berasKg,
          jiwaUang: initialData.zakatFitrah.jiwaUang,
          uang: initialData.zakatFitrah.uang
        },
        zakatMaal: initialData.zakatMaal,
        infaq: { 
          beras: initialData.infaq.beras,
          uang: initialData.infaq.uang
        },
        fidyah: { 
          beras: initialData.fidyah.beras,
          uang: initialData.fidyah.uang
        }
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
        zakatFitrah: { 
          jiwaBeras: initialData.zakatFitrah.jiwaBeras,
          berasKg: initialData.zakatFitrah.berasKg,
          jiwaUang: initialData.zakatFitrah.jiwaUang,
          uang: initialData.zakatFitrah.uang
        },
        zakatMaal: initialData.zakatMaal,
        infaq: { 
          beras: initialData.infaq.beras,
          uang: initialData.infaq.uang
        },
        fidyah: { 
          beras: initialData.fidyah.beras,
          uang: initialData.fidyah.uang
        }
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

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleReset
  };
};
