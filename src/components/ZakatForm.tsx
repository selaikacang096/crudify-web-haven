
import React from "react";
import { useNavigate } from "react-router-dom";
import { ZakatRecord } from "@/types/ZakatTypes";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useZakatForm } from "@/hooks/useZakatForm";

// Import form section components
import BasicInfoSection from "./zakat-form/BasicInfoSection";
import ZakatFitrahSection from "./zakat-form/ZakatFitrahSection";
import ZakatMaalSection from "./zakat-form/ZakatMaalSection";
import InfaqSection from "./zakat-form/InfaqSection";
import FidyahSection from "./zakat-form/FidyahSection";
import FormActions from "./zakat-form/FormActions";

interface ZakatFormProps {
  initialData?: ZakatRecord;
  isEdit?: boolean;
}

const ZakatForm: React.FC<ZakatFormProps> = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleReset
  } = useZakatForm({ initialData, isEdit });
  
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
          {/* Basic Information Section */}
          <BasicInfoSection
            penginput={formData.penginput}
            tanggal={formData.tanggal}
            nama={formData.nama}
            alamat={formData.alamat}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          
          {/* Zakat Fitrah Section */}
          <ZakatFitrahSection
            zakatFitrah={formData.zakatFitrah}
            onInputChange={handleInputChange}
          />
          
          {/* Zakat Maal, Infaq & Fidyah Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Infaq */}
            <InfaqSection
              infaq={formData.infaq}
              onInputChange={handleInputChange}
            />

            {/* Zakat Maal */}
            <ZakatMaalSection
              zakatMaal={formData.zakatMaal}
              onInputChange={handleInputChange}
            />
            
            {/* Fidyah */}
            <FidyahSection
              fidyah={formData.fidyah}
              onInputChange={handleInputChange}
            />
          </div>
          
          {/* Form Actions */}
          <FormActions
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            onReset={handleReset}
          />
        </div>
      </form>
    </div>
  );
};

export default ZakatForm;
