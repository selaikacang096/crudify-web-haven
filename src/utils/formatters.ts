
import { format, parse, isValid } from "date-fns";

// Format currency for display
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date for display
export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

// Sort dates
export const sortByDate = (dateA: string, dateB: string) => {
  const parsedDateA = parse(dateA, 'yyyy-MM-dd', new Date());
  const parsedDateB = parse(dateB, 'yyyy-MM-dd', new Date());
  
  if (isValid(parsedDateA) && isValid(parsedDateB)) {
    return parsedDateA.getTime() - parsedDateB.getTime();
  }
  return 0;
};
