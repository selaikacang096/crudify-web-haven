
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { getAllRecords } from "@/services/zakatService";
import ZakatCardList from "@/components/zakat-list/ZakatCardList";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const List: React.FC = () => {
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
  // const sortedRecords = [...records].sort((a, b) => 
  //   new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  // );
  const sortedRecords = [...records].reverse(); // Membalik urutan dari hasil query
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Zakat Records</h1>
            <p className="text-muted-foreground mt-1">
              View all zakat contributions in card format
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
        
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center p-6 text-destructive">
            <p>Error loading data. Please try again.</p>
          </div>
        ) : (
          <ZakatCardList records={sortedRecords} />
        )}
      </div>
    </Layout>
  );
};

export default List;
