// src/routes/index.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import paths from "./paths";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "@/auth/AuthContext";

// lazy loading (code-splitting)
const Index = lazy(() => import("@/pages/Index"));
const CotacaoDetalhes = lazy(() => import("@/pages/CotacaoDetalhes"));
const Analise = lazy(() => import("@/pages/Analise"));
const SelecaoEnvio = lazy(() => import("@/pages/SelecaoEnvio"));
const EmitirPlanilhaCotacao = lazy(() => import("@/pages/EmitirPlanilhaCotacao"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

// fallback simples (pode trocar por Skeleton/Spinner da sua UI)
function Fallback() {
  return null; // ou <div className="p-6 text-sm text-muted-foreground">Carregando…</div>
}

export default function RoutesProvider() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            {/* públicas */}
            <Route
              path={paths.login}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* privadas */}
            <Route
              path={paths.home}
              element={
                <PrivateRoute fallback={<Fallback />}>
                  <Index />
                </PrivateRoute>
              }
            />
            <Route
              path={paths.cotacaoDetalhes}
              element={
                <PrivateRoute fallback={<Fallback />}>
                  <CotacaoDetalhes />
                </PrivateRoute>
              }
            />
            <Route
              path={paths.analise}
              element={
                <PrivateRoute fallback={<Fallback />}>
                  <Analise />
                </PrivateRoute>
              }
            />
            <Route
              path={paths.selecao}
              element={
                <PrivateRoute fallback={<Fallback />}>
                  <SelecaoEnvio />
                </PrivateRoute>
              }
            />
            <Route
              path={paths.emitirPlanilha}
              element={
                <PrivateRoute fallback={<Fallback />}>
                  <EmitirPlanilhaCotacao />
                </PrivateRoute>
              }
            />

            {/* catch-all */}
            <Route path={paths.notFound} element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
