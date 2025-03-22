
import { toast } from "sonner";
import { MAX_JIWA } from "./constants";

// Validation functions for the zakat form

export const validateJiwaInput = (fieldName: string, value: number): boolean => {
  if (value > MAX_JIWA) {
    toast.warning(`Maximum value for ${fieldName} is ${MAX_JIWA}`);
    return false;
  }
  return true;
};
