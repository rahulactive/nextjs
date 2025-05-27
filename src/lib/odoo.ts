import { Product } from '@/types';
import axios from 'axios';

interface OdooConfig {
  url: string;
  db: string;
}

interface OdooCredentials {
  username: string;
  password: string;
}

export class OdooAPI {
  private config: OdooConfig;
  private credentials: OdooCredentials | null = null;
  private uid: number | null = null;
  private sessionId: string | null = null;

  constructor(config: OdooConfig) {
    this.config = config;
  }

  public setCredentials(credentials: OdooCredentials) {
    this.credentials = credentials;
    // Reset authentication when credentials change
    this.uid = null;
    this.sessionId = null;
    return this;
  }

  public async authenticate() {
    if (!this.credentials) {
      throw new Error('Missing credentials. Call setCredentials() before authentication.');
    }

    try {
      const response = await axios.post(
        `${this.config.url}/web/session/authenticate`, 
        {
          jsonrpc: '2.0',
          params: {
            db: this.config.db,
            login: this.credentials.username,
            password: this.credentials.password,
          },
        },
        {
          withCredentials: true // Important for maintaining session cookies
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error.data.message || 'Authentication failed');
      }

      this.uid = response.data.result.uid;
      this.sessionId = response.data.result.session_id;
      
      // Configure axios defaults for subsequent requests
      axios.defaults.headers.common['X-Openerp-Session-Id'] = this.sessionId;
      
      return this.uid;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  public async isAuthenticated() {
    return this.uid !== null;
  }

  public async logout() {
    this.uid = null;
    this.sessionId = null;
    this.credentials = null;
    delete axios.defaults.headers.common['X-Openerp-Session-Id'];
    
    try {
      await axios.post(`${this.config.url}/web/session/destroy`, {
        jsonrpc: '2.0',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async call(model: string, method: string, args: any[] = [], kwargs: any = {}) {
    if (!this.uid) {
      await this.authenticate();
    }

    try {
      const response = await axios.post(`${this.config.url}/web/dataset/call_kw`, {
        jsonrpc: '2.0',
        params: {
          model,
          method,
          args,
          kwargs,
          context: kwargs.context || {},
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error.data.message || `API call failed: ${model}.${method}`);
      }

      return response.data.result;
    } catch (error) {
      console.error(`API call failed: ${model}.${method}`, error);
      throw error;
    }
  }

  // Product methods
  async getProducts(domain: any[] = [], fields: string[] = []): Promise<Product[]> {
    return this.call('product.template', 'search_read', [domain, fields]);
  }

  async getProductCategories(domain: any[] = [], fields: string[] = []) {
    return this.call('product.category', 'search_read', [domain, fields]);
  }
  
  async getPublicProductCategories(domain: any[] = [], fields: string[] = []) {
    return this.call('product.public.category', 'search_read', [domain, fields]);
  }

  // Sale order methods
  async createSaleOrder(values: any) {
    return this.call('sale.order', 'create', [values]);
  }

  async getSaleOrders(domain: any[] = [], fields: string[] = []) {
    return this.call('sale.order', 'search_read', [domain, fields]);
  }

  async getSaleOrderById(orderId: number, fields: string[] = []) {
    return this.call('sale.order', 'read', [[orderId], fields]);
  }

  async updateSaleOrder(orderId: number, values: any) {
    return this.call('sale.order', 'write', [[orderId], values]);
  }

  async confirmSaleOrder(orderId: number) {
    return this.call('sale.order', 'action_confirm', [[orderId]]);
  }

  async cancelSaleOrder(orderId: number) {
    return this.call('sale.order', 'action_cancel', [[orderId]]);
  }

  // Partner methods
  async getPartner(partnerId: number, fields: string[] = []) {
    return this.call('res.partner', 'read', [[partnerId], fields]);
  }

  async searchPartners(domain: any[] = [], fields: string[] = []) {
    return this.call('res.partner', 'search_read', [domain, fields]);
  }

  async createPartner(values: any) {
    return this.call('res.partner', 'create', [values]);
  }
}

// Create a singleton instance with configurable credentials
let instance: OdooAPI | null = null;

export const createOdooAPI = () => {
  if (!instance) {
    instance = new OdooAPI({
      url:'https://kifionline.com',
      db: 'KIFI_LIVE',
      // url: process.env.ODOO_URL || 'http://sedeeradmin.ddns.me:8066',
      // db: process.env.ODOO_DB  || 'SDR_LIVE',
    });
  }
  return instance;
};

export default createOdooAPI;

// import { Product } from '@/types';
// import axios from 'axios';

// interface OdooConfig {
//   url: string;
//   db: string;
//   username: string;
//   password: string;
// }

// export class OdooAPI {
//   private config: OdooConfig;
//   private uid: number | null = null;
//   private credentials: { username: string; password: string } | null = null;
//   constructor(config: OdooConfig) {
//     this.config = config;
//   }

//    public async authenticate() {
//     console.log(this.credentials,'creeeeeed')
//     // if (!this.credentials) throw new Error('Missing credentials');
//     try {
//       // ${this.config.url}
//       const response = await axios.post(`http://sedeeradmin.ddns.me:8069//web/session/authenticate`, {
//         jsonrpc: '2.0',
//         params: {
//           // db: this.config.db,
//           db: "SDR_LIVE",
//           login: this.credentials?.username,
//           password: this.credentials?.password,
//         },
//       });
// console.log('Authentication response:', response.data);
//       this.uid = response.data.result.uid;
//       // this.credentials =  { username: this.config.username, password: this.config.password };
//       return this.uid;
//     } catch (error) {
//       console.error('Authentication failed:', error);
//       throw error;
//     }
//   }

//   async call(model: string, method: string, args: any[] = [], kwargs: any = {} ) {
//     if (!this.uid && this.credentials) {
//       await this.authenticate();
//     }

//     try {
//       const response = await axios.post(`${this.config.url}/web/dataset/call_kw`, {
//         jsonrpc: '2.0',
//         params: {
//           model,
//           method,
//           args,
//           kwargs,
//         },
//       });

//       return response.data.result;
//     } catch (error) {
//       console.error(`API call failed: ${model}.${method}`, error);
//       throw error;
//     }
//   }

//   // Product methods
//   async getProducts(domain: any[] = [], fields: string[] = []):Promise<Product[]> {
//     return this.call('product.template', 'search_read', [domain, fields]);
//   }

//   async getProductCategories(domain: any[] = [], fields: string[] = []) {
//     return this.call('product.category', 'search_read', [domain, fields]);
//   }
//   async getPublicProductCategories(domain: any[] = [], fields: string[] = []) {
//     return this.call('product.public.category', 'search_read', [domain, fields]);
//   }

//   // Sale order methods
//   async createSaleOrder(values: any) {
//     return this.call('sale.order', 'create', [values]);
//   }

//   async updateSaleOrder(orderId: number, values: any) {
//     return this.call('sale.order', 'write', [[orderId], values]);
//   }

//   // Partner methods
//   async getPartner(partnerId: number, fields: string[] = []) {
//     return this.call('res.partner', 'read', [[partnerId], fields]);
//   }

//   async searchPartners(domain: any[] = [], fields: string[] = []) {
//     return this.call('res.partner', 'search_read', [domain, fields]);
//   }
// }


// let instance: (OdooAPI | null) = null;

// export function odooAPI({ username, password }:{username:string,password:string}) {
//   if (!instance) {
//     instance = new OdooAPI({
//       url: process.env.ODOO_URL || '',
//       db: process.env.ODOO_DB || '',
//       username,
//       password,
//     });
//   }
//   return instance;
// }

// export default odooAPI; 