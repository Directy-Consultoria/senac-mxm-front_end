import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from "recharts";
import { TrendingDown, TrendingUp, Target, Calendar, Award, FileText } from "lucide-react";

const economiaData = [
  { mes: "Jan", economia: 45000, meta: 50000 },
  { mes: "Fev", economia: 52000, meta: 50000 },
  { mes: "Mar", economia: 38000, meta: 50000 },
  { mes: "Abr", economia: 67000, meta: 50000 },
  { mes: "Mai", economia: 58000, meta: 50000 },
  { mes: "Jun", economia: 72000, meta: 50000 },
];

const itensData = [
  { categoria: "Equipamentos", valor: 45, cor: "hsl(var(--primary))" },
  { categoria: "Serviços", valor: 30, cor: "hsl(var(--accent))" },
  { categoria: "Materiais", valor: 25, cor: "hsl(var(--secondary))" },
];

const tendenciaData = [
  { mes: "Jan", cotacoes: 15, fornecedores: 45 },
  { mes: "Fev", cotacoes: 18, fornecedores: 52 },
  { mes: "Mar", cotacoes: 12, fornecedores: 38 },
  { mes: "Abr", cotacoes: 22, fornecedores: 65 },
  { mes: "Mai", cotacoes: 19, fornecedores: 58 },
  { mes: "Jun", cotacoes: 25, fornecedores: 72 },
];

const Analise = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header da Página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Análise de Compras</h1>
            <p className="text-muted-foreground">Monitore atividades e performance das cotações</p>
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="2024">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ 332.000</div>
              <p className="text-xs text-success">+12% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cotações Ativas</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">25</div>
              <p className="text-xs text-muted-foreground">8 encerrando em 7 dias</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meta Mensal</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">144%</div>
              <p className="text-xs text-success">R$ 22.000 acima da meta</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fornecedores</CardTitle>
              <Award className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">72</div>
              <p className="text-xs text-muted-foreground">15 novos este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Economia */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Economia por Mês</CardTitle>
              <CardDescription>Economia realizada vs Meta estabelecida</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={economiaData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="mes" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString()}`, value > 50000 ? 'Economia' : 'Economia']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                  <Legend />
                  <Bar dataKey="economia" fill="hsl(var(--primary))" name="Economia Realizada" />
                  <Bar dataKey="meta" fill="hsl(var(--muted))" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza - Itens Cotados */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
              <CardDescription>Itens cotados por tipo no último trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={itensData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="valor"
                  >
                    {itensData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Percentual']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Linha - Tendências */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Tendências de Atividade</CardTitle>
            <CardDescription>Evolução mensal de cotações e fornecedores participantes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={tendenciaData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="mes" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="cotacoes" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Cotações Realizadas"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="fornecedores" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  name="Fornecedores Participantes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analise;