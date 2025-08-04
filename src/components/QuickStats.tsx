import { TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QuickStats = () => {
  const stats = [
    {
      title: "Em Andamento",
      value: "24",
      icon: Clock,
      change: "+3 esta semana",
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      title: "Encerradas",
      value: "156",
      icon: CheckCircle,
      change: "+12 este mês",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Valor Total",
      value: "R$ 2,4M",
      icon: TrendingUp,
      change: "+5.2% vs mês anterior",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Aguardando",
      value: "8",
      icon: AlertCircle,
      change: "2 vencendo hoje",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className={`text-xs ${stat.color} mt-1`}>
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;