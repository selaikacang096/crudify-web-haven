
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface TableActionsProps {
  recordId: string;
  onDelete: (id: string) => void;
}

const TableActions: React.FC<TableActionsProps> = ({ recordId, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(`/edit/${recordId}`)}
        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(recordId)}
        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default TableActions;
