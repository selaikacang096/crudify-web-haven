
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZakatFormData, ZakatRecord } from "@/types/ZakatTypes";
import { createRecord, updateRecord } from "@/services/zakatApiService";
import { toast } from "sonner";

export const useFormSubmission = (
  formData: ZakatFormData,
  initialData?: ZakatRecord,
  isEdit: boolean = false
) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEdit && initialData) {
        const updated = await updateRecord(initialData.id, formData);
        if (updated) {
          toast.success("Record updated successfully");
          navigate("/list");
        } else {
          toast.error("Failed to update record");
        }
      } else {
        await createRecord(formData);
        toast.success("Record created successfully");
        // Redirect to list page instead of dashboard
        navigate("/list");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred while saving the record");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};
