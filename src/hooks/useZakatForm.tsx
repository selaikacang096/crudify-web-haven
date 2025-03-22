
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
    handleInputChange,
    handleSelectChange,
    handleReset
  } = useFormState(initialData, isEdit);
  
  const {
    isSubmitting,
    handleSubmit
  } = useFormSubmission(formData, initialData, isEdit);

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleReset
  };
};
