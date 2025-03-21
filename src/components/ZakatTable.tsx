
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ZakatRecord } from "@/types/ZakatTypes";
import { Edit, Trash2, Eye, FileDown } from "lucide-react";
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
  const location = useLocation();
  const tableEndRef = useRef<HTMLDivElement>(null);
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

  // Export to CSV function
  const exportToCSV = () => {
    try {
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add headers
      csvContent += "No,Penginput,Tanggal,Nama,Alamat,Jiwa Beras,Beras (kg),Jiwa Uang,Uang,Zakat Maal,Infaq Beras,Infaq Uang,Fidyah Beras,Fidyah Uang,Total Beras,Total Uang\n";
      
      // Add data
      data.forEach((record, index) => {
        csvContent += `${index + 1},${record.penginput},${formatDate(record.tanggal)},${record.nama},${record.alamat},${record.zakatFitrah.jiwaBeras},${record.zakatFitrah.berasKg},${record.zakatFitrah.jiwaUang},${record.zakatFitrah.uang},${record.zakatMaal},${record.infaq.beras},${record.infaq.uang},${record.fidyah.beras},${record.fidyah.uang},${record.totalBeras},${record.totalUang}\n`;
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `zakat_records_${format(new Date(), 'yyyyMMdd')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Records exported to CSV successfully");
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast.error("Failed to export records");
    }
  };
  
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Total Records: {data.length}</h2>
        </div>
        <Button
          variant="outline"
          onClick={exportToCSV}
          className="flex items-center"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      
      <div className="table-container rounded-lg border border-border/60 shadow-sm overflow-x-auto animate-fade-in">
        <table className="data-table w-max min-w-full">
          <thead>
            <tr className="bg-secondary/80">
              <th className="text-center align-middle sticky left-0 z-10 bg-secondary/80">No</th>
              <th className="text-center align-middle">Penginput</th>
              <th className="text-center align-middle">Tanggal</th>
              <th className="text-center align-middle">Nama</th>
              <th className="text-center align-middle">Alamat</th>
              <th colSpan={4} className="text-center">Zakat Fitrah</th>
              <th className="text-center align-middle">Zakat Maal</th>
              <th colSpan={2} className="text-center">Infaq</th>
              <th colSpan={2} className="text-center">Fidyah</th>
              <th className="text-center align-middle">Total Beras</th>
              <th className="text-center align-middle">Total Uang</th>
              <th className="text-center align-middle sticky right-0 z-10 bg-secondary/80">Actions</th>
            </tr>
            <tr className="bg-secondary/60">
              <th className="sticky left-0 z-10 bg-secondary/60"></th>
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
              <th className="sticky right-0 z-10 bg-secondary/60"></th>
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
                  <td className="text-center sticky left-0 z-10 bg-white">{index + 1}</td>
                  <td className="text-center">{record.penginput}</td>
                  <td className="text-center">{formatDate(record.tanggal)}</td>
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
                  <td className="sticky right-0 z-10 bg-white">
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
      <div ref={tableEndRef}></div>
      
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
