
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { getAllRecords, deleteRecord } from "@/services/zakatService";
import ZakatCardList from "@/components/zakat-list/ZakatCardList";
import { Button } from "@/components/ui/button";
import { RotateCcw, Table, LayoutList } from "lucide-react";
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
  const sortedRecords = [...records].reverse(); // Membalik urutan dari hasil query

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
    <Layout forceActivePath="/list">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border/60">
          <div>
            <h1 className="protocol-heading text-3xl">Zakat Records</h1>
            <p className="protocol-subheading">
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
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-2">
            <TabsTrigger value="cards" className="flex items-center gap-2 py-2.5">
              <LayoutList className="h-4 w-4" />
              <span>Cards</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2 py-2.5">
              <Table className="h-4 w-4" />
              <span>Table</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="pt-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-60 w-full bg-card/50 rounded-lg border border-border/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground">Loading data...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-60 w-full bg-destructive/5 rounded-lg border border-destructive/30 p-6">
                <p className="text-destructive font-medium mb-4">Error loading data. Please try again.</p>
                <Button 
                  variant="outline" 
                  className="mt-2" 
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <ZakatCardList records={sortedRecords} onDelete={confirmDelete} />
            )}
          </TabsContent>
          
          <TabsContent value="table" className="pt-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-60 w-full bg-card/50 rounded-lg border border-border/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground">Loading data...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-60 w-full bg-destructive/5 rounded-lg border border-destructive/30 p-6">
                <p className="text-destructive font-medium mb-4">Error loading data. Please try again.</p>
                <Button 
                  variant="outline" 
                  className="mt-2" 
                  onClick={() => refetch()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <div className="protocol-card p-1">
                <ZakatTable 
                  data={sortedRecords} 
                  onDelete={() => refetch()} 
                  locationPath="/list"
                />
              </div>
            )}
          </TabsContent>
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
