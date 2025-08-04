import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "em_andamento" | "encerrada" | "suspensa" | "cancelada" | "aguardando";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  em_andamento: {
    label: "Em Andamento",
    variant: "default" as const,
    className: "bg-info text-info-foreground hover:bg-info/80"
  },
  encerrada: {
    label: "Encerrada",
    variant: "secondary" as const,
    className: "bg-muted text-muted-foreground"
  },
  suspensa: {
    label: "Suspensa",
    variant: "destructive" as const,
    className: "bg-warning text-warning-foreground hover:bg-warning/80"
  },
  cancelada: {
    label: "Cancelada",
    variant: "destructive" as const,
    className: "bg-destructive text-destructive-foreground hover:bg-destructive/80"
  },
  aguardando: {
    label: "Aguardando",
    variant: "outline" as const,
    className: "bg-accent text-accent-foreground hover:bg-accent/80"
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;