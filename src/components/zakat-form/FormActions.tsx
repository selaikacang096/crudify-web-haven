
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";

interface FormActionsProps {
  isEdit: boolean;
  isSubmitting: boolean;
  onReset: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEdit, isSubmitting, onReset }) => {
  return (
    <div className="flex justify-end space-x-4 form-actions">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
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
  );
};

export default FormActions;
