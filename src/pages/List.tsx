
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { getAllRecords, deleteRecord } from "@/services/zakatService";
import ZakatCardList from "@/components/zakat-list/ZakatCardList";
import { Button } from "@/components/ui/button";
import { RotateCcw, BarChart, Table, LayoutList } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteConfirmDialog from "@/components/zakat-table/DeleteConfirmDialog";
import ZakatTable from "@/components/ZakatTable";

const List: React.FC = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");
  
  // Load records using React Query, sorted by newest first
  const { data: records = [], refetch, isLoading, error } = useQuery({
    queryKey: ['zakatRecords'],
    queryFn: getAllRecords,
    meta: {
      onError: () => {
        toast.error("Failed to load records. Please try again later.");
      }
    }
  });

  // Sort records to show newest on top
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );
  
  // Handle record deletion
  const handleDelete = async () => {
    if (recordToDelete) {
      setIsDeleting(true);
      try {
        const deleted = await deleteRecord(recordToDelete);
        if (deleted) {
          toast.success("Record deleted successfully");
          refetch();
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
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Zakat Records</h1>
            <p className="text-muted-foreground mt-1">
              View all zakat contributions in different formats
            </p>
          </div>
          {error && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={() => refetch()}
            >
              <RotateCcw className="h-4 w-4" />
              Reload Data
            </Button>
          )}
        </div>
        
        <Tabs 
          defaultValue="cards"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3 sm:grid-cols-3">
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <LayoutList className="h-4 w-4" />
              <span>Cards</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center p-6 text-destructive">
              <p>Error loading data. Please try again.</p>
            </div>
          ) : (
            <>
              <TabsContent value="cards" className="space-y-4">
                <ZakatCardList records={sortedRecords} onDelete={confirmDelete} />
              </TabsContent>
              
              <TabsContent value="dashboard" className="space-y-4">
                {/* Dashboard content would go here in future */}
                <div className="text-center p-8 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">Dashboard view coming soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="records" className="space-y-4">
                <ZakatTable data={sortedRecords} onDelete={() => refetch()} />
              </TabsContent>
            </>
          )}
        </Tabs>
        
        <DeleteConfirmDialog 
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      </div>
    </Layout>
  );
};

export default List;
