
import { ZakatRecord } from "@/types/ZakatTypes";
import { useFormState } from "./zakat-form/useFormState";
import { useFormSubmission } from "./zakat-form/useFormSubmission";

export const useZakatForm = ({ 
  initialData, 
  isEdit = false 
}: { 
  initialData?: ZakatRecord; 
  isEdit?: boolean;
}) => {
  const {
    formData,
    zakatFitrahRate,
    handleInputChange,
    handleSelectChange,
    handleRateChange,
    handleReset
  } = useFormState(initialData, isEdit);
  
  const {
    isSubmitting,
    handleSubmit
  } = useFormSubmission(formData, initialData, isEdit);

  return {
    formData,
    zakatFitrahRate,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleRateChange,
    handleSubmit,
    handleReset
  };
};
