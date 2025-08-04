import { Calendar, Clock, MapPin, FileText, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";

interface CotacaoCardProps {
  id: string;
  titulo: string;
  numero: string;
  status:
    | "em_andamento"
    | "encerrada"
    | "suspensa"
    | "cancelada"
    | "aguardando";
  dataAbertura: string;
  dataEncerramento: string;
  valor?: string;
  modalidade: string;
  unidade: string;
  objeto: string;
}

const CotacaoCard = ({
  id,
  titulo,
  numero,
  status,
  dataAbertura,
  dataEncerramento,
  valor,
  modalidade,
  unidade,
  objeto,
}: CotacaoCardProps) => {
  return (
    <Card className="hover:shadow-card transition-all duration-200 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-1">
              {titulo}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-mono">
              Nº {numero}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-sm text-foreground line-clamp-2">
          <span className="font-medium">Objeto:</span> {objeto}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Abertura: {dataAbertura}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Encerramento: {dataEncerramento}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{modalidade}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{unidade}</span>
          </div>
        </div>

        {valor && (
          <div className="bg-accent/10 rounded-lg p-3">
            <p className="text-sm font-medium text-foreground">
              Valor Estimado:{" "}
              <span className="text-lg font-bold text-primary">{valor}</span>
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
          {status === "em_andamento" && (
            <Button size="sm" variant="primaryHoverAccent" className="flex-1">
              Participar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CotacaoCard;
