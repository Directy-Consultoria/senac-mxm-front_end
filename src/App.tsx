import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CotacaoDetalhes from "./pages/CotacaoDetalhes";
import Analise from "./pages/Analise";
import SelecaoEnvio from "./pages/SelecaoEnvio";
import EmitirPlanilhaCotacao from "./pages/EmitirPlanilhaCotacao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cotacao/:id" element={<CotacaoDetalhes />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/selecao" element={<SelecaoEnvio />} />
          <Route path="/emitirPlanilhaCotacao" element={<EmitirPlanilhaCotacao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
