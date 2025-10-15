import { Invoice } from '../models/interface';
export declare function fetchInvoices(token: string): Promise<Invoice[]>;
export declare function createInvoice(token: string, invoice: Partial<Invoice>): Promise<Invoice>;
//# sourceMappingURL=invoiceController.d.ts.map