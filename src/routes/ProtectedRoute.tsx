import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ReactNode } from 'react';
import styled from 'styled-components';

interface ProtectedRouteProps {
  children: ReactNode;
}

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0d0d15 100%);
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
`;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingContainer>
        Carregando...
      </LoadingContainer>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
