
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZakatRecord } from "@/types/ZakatTypes";
import { Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteRecord } from "@/utils/zakatStorage";
import { toast } from "sonner";

interface ZakatTableProps {
  data: ZakatRecord[];
  onDelete?: () => void;
}

const ZakatTable: React.FC<ZakatTableProps> = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };
  
  // Handle record deletion
  const handleDelete = () => {
    if (recordToDelete) {
      const deleted = deleteRecord(recordToDelete);
      if (deleted) {
        toast.success("Record deleted successfully");
        if (onDelete) onDelete();
      } else {
        toast.error("Failed to delete record");
      }
      setRecordToDelete(null);
      setOpenDeleteDialog(false);
    }
  };
  
  // Confirm deletion
  const confirmDelete = (id: string) => {
    setRecordToDelete(id);
    setOpenDeleteDialog(true);
  };
  
  return (
    <>
      <div className="table-container rounded-lg border border-border/60 shadow-sm overflow-hidden animate-fade-in">
        <table className="data-table">
          <thead>
            <tr className="bg-secondary/80">
              <th className="text-center">No</th>
              <th>Penginput</th>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th colSpan={4} className="text-center">Zakat Fitrah</th>
              <th>Zakat Maal</th>
              <th colSpan={2} className="text-center">Infaq</th>
              <th colSpan={2} className="text-center">Fidyah</th>
              <th>Total Beras</th>
              <th>Total Uang</th>
              <th className="text-center">Actions</th>
            </tr>
            <tr className="bg-secondary/60">
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th className="text-center">Jiwa Beras</th>
              <th className="text-center">Beras (kg)</th>
              <th className="text-center">Jiwa Uang</th>
              <th className="text-center">Uang</th>
              <th></th>
              <th className="text-center">Beras</th>
              <th className="text-center">Uang</th>
              <th className="text-center">Beras</th>
              <th className="text-center">Uang</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={17} className="text-center py-8 text-muted-foreground">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr key={record.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="text-center">{index + 1}</td>
                  <td>{record.penginput}</td>
                  <td>{formatDate(record.tanggal)}</td>
                  <td>{record.nama}</td>
                  <td>{record.alamat}</td>
                  <td className="text-center">{record.zakatFitrah.jiwaBeras}</td>
                  <td className="text-center">{record.zakatFitrah.berasKg}</td>
                  <td className="text-center">{record.zakatFitrah.jiwaUang}</td>
                  <td className="text-right">{formatCurrency(record.zakatFitrah.uang)}</td>
                  <td className="text-right">{formatCurrency(record.zakatMaal)}</td>
                  <td className="text-center">{record.infaq.beras}</td>
                  <td className="text-right">{formatCurrency(record.infaq.uang)}</td>
                  <td className="text-center">{record.fidyah.beras}</td>
                  <td className="text-right">{formatCurrency(record.fidyah.uang)}</td>
                  <td className="text-center">{record.totalBeras}</td>
                  <td className="text-right">{formatCurrency(record.totalUang)}</td>
                  <td>
                    <div className="flex justify-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => navigate(`/view/${record.id}`)}
                        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => navigate(`/edit/${record.id}`)}
                        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => confirmDelete(record.id)}
                        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="glass-container">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ZakatTable;
