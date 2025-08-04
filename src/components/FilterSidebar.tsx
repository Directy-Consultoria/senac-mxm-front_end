import { CalendarDays, Filter, Building2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FilterSidebar = () => {
  return (
    <Card className="h-fit sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Status</Label>
          <div className="space-y-2">
            {[
              { id: "em_andamento", label: "Em Andamento" },
              { id: "aguardando", label: "Aguardando" },
              { id: "encerrada", label: "Encerrada" },
              { id: "suspensa", label: "Suspensa" },
            ].map((status) => (
              <div key={status.id} className="flex items-center space-x-2">
                <Checkbox id={status.id} />
                <Label htmlFor={status.id} className="text-sm">
                  {status.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Modalidade */}
        <div>
          <Label className="text-sm font-semibold mb-3 block flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Modalidade
          </Label>
          <div className="space-y-2">
            {[
              "Cotação Eletrônica",
              "Pregão Eletrônico",
              "Concorrência",
              "Tomada de Preços",
            ].map((modalidade) => (
              <div key={modalidade} className="flex items-center space-x-2">
                <Checkbox id={modalidade} />
                <Label htmlFor={modalidade} className="text-sm">
                  {modalidade}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Unidade */}
        <div>
          <Label className="text-sm font-semibold mb-3 block flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Unidade
          </Label>
          <div className="space-y-2">
            {[
              "SENAC Vitória",
              "SENAC Vila Velha",
              "SENAC Cachoeiro",
              "SENAC Linhares",
              "SENAC Colatina",
            ].map((unidade) => (
              <div key={unidade} className="flex items-center space-x-2">
                <Checkbox id={unidade} />
                <Label htmlFor={unidade} className="text-sm">
                  {unidade}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Período */}
        <div>
          <Label className="text-sm font-semibold mb-3 block flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Período
          </Label>
          <div className="space-y-2">
            <div>
              <Label htmlFor="data_inicio" className="text-xs text-muted-foreground">
                Data Início
              </Label>
              <Input type="date" id="data_inicio" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="data_fim" className="text-xs text-muted-foreground">
                Data Fim
              </Label>
              <Input type="date" id="data_fim" className="mt-1" />
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Button className="w-full bg-gradient-primary">
            Aplicar Filtros
          </Button>
          <Button variant="outline" className="w-full">
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;