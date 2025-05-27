import { useState } from 'react';
import { createOdooAPI } from '../lib/odoo';

export function useOdooAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const odooAPI = createOdooAPI();
  
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      odooAPI.setCredentials({ username, password });
      await odooAPI.authenticate();
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    try {
      await odooAPI.logout();
      setIsAuthenticated(false);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
    odooAPI
  };
}