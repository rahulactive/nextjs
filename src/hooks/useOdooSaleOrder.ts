import { useState } from 'react';
import { useOdooAuth } from './useOdooAuth';

export function useOdooSaleOrder() {
  const { odooAPI } = useOdooAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const createSaleOrder = async (orderData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const orderId = await odooAPI.createSaleOrder(orderData);
      return orderId;
    } catch (err: any) {
      setError(err.message || 'Failed to create sale order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSaleOrders = async (domain: any[] = [], fields: string[] = []) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const orders = await odooAPI.getSaleOrders(domain, fields);
      return orders;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sale orders');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSaleOrderById = async (orderId: number, fields: string[] = []) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const order = await odooAPI.getSaleOrderById(orderId, fields);
      return order;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sale order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateSaleOrder = async (orderId: number, values: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await odooAPI.updateSaleOrder(orderId, values);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update sale order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const confirmSaleOrder = async (orderId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await odooAPI.confirmSaleOrder(orderId);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to confirm sale order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const cancelSaleOrder = async (orderId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await odooAPI.cancelSaleOrder(orderId);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel sale order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    createSaleOrder,
    getSaleOrders,
    getSaleOrderById,
    updateSaleOrder,
    confirmSaleOrder,
    cancelSaleOrder,
    isLoading,
    error
  };
}