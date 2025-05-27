import { OdooConfig } from '../types';

export const odooConfig: OdooConfig = {
  url: process.env.ODOO_URL || '',
  db: process.env.ODOO_DB || '',
};
