import { Navigate, useLocation } from "react-router-dom";
import paths from "./paths";
import { useAuth } from "@/auth/AuthContext";

type Props = {
  children: JSX.Element;
  /** opcional: restringe o acesso a determinados perfis */
  roles?: string[];
  /** opcional: mostrar algo enquanto valida auth */
  fallback?: JSX.Element | null;
};

export default function PrivateRoute({ children, roles, fallback = null }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ainda carregando info do usuário (ex.: /auth/me)
  if (loading) return fallback;

  // não autenticado → manda para login e guarda a rota de origem
  if (!user) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }

  // checagem de role (se foi definida)
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    // você pode redirecionar para 403/unauthorized se tiver uma página
    return <Navigate to={paths.home} replace />;
  }

  return children;
}
