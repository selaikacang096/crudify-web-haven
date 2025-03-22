
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ZakatRecord } from "@/types/ZakatTypes";
import { deleteRecord } from "@/services/zakatService";
import { toast } from "sonner";
import TableHeader from "./zakat-table/TableHeader";
import ZakatTableContent from "./zakat-table/ZakatTableContent";
import DeleteConfirmDialog from "./zakat-table/DeleteConfirmDialog";

interface ZakatTableProps {
  data: ZakatRecord[];
  onDelete?: () => void;
}

const ZakatTable: React.FC<ZakatTableProps> = ({ data, onDelete }) => {
  const location = useLocation();
  const tableEndRef = useRef<HTMLDivElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Handle record deletion
  const handleDelete = async () => {
    if (recordToDelete) {
      setIsDeleting(true);
      try {
        const deleted = await deleteRecord(recordToDelete);
        if (deleted) {
          toast.success("Record deleted successfully");
          if (onDelete) onDelete();
        } else {
          toast.error("Failed to delete record");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        toast.error("An error occurred while deleting the record");
      } finally {
        setIsDeleting(false);
        setRecordToDelete(null);
        setOpenDeleteDialog(false);
      }
    }
  };
  
  // Confirm deletion
  const confirmDelete = (id: string) => {
    setRecordToDelete(id);
    setOpenDeleteDialog(true);
  };

  // Scroll to bottom if requested
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('scrollToBottom') === 'true' && tableEndRef.current) {
      tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
      // Clean up the URL
      const newParams = new URLSearchParams(location.search);
      newParams.delete('scrollToBottom');
      
      const newSearch = newParams.toString();
      const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
      
      // Update URL without reloading
      window.history.replaceState({}, '', newUrl);
    }
  }, [location]);
  
  return (
    <>
      <TableHeader data={data} />
      
      <ZakatTableContent data={data} onDeleteClick={confirmDelete} />
      
      <div ref={tableEndRef}></div>
      
      <DeleteConfirmDialog 
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ZakatTable;
