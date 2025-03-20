
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatTable from "@/components/ZakatTable";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZakatRecord } from "@/types/ZakatTypes";
import { getAllRecords, initializeWithSampleData } from "@/utils/zakatStorage";
import { PlusCircle, BarChart, Table } from "lucide-react";

const Index: React.FC = () => {
  const [records, setRecords] = useState<ZakatRecord[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Load records and initialize sample data if empty
  const loadRecords = () => {
    initializeWithSampleData(); // Initialize with sample data if empty
    const data = getAllRecords();
    setRecords(data);
  };
  
  useEffect(() => {
    loadRecords();
  }, []);
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Zakat Management System</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track zakat contributions efficiently
            </p>
          </div>
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 flex items-center h-10"
          >
            <Link to="/add">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Record
            </Link>
          </Button>
        </div>
        
        <Tabs 
          defaultValue="dashboard" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard data={records} />
          </TabsContent>
          
          <TabsContent value="records" className="space-y-4">
            <ZakatTable data={records} onDelete={loadRecords} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
