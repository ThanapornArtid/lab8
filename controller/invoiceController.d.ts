import { Invoice } from '../models/interface';
export declare function fetchInvoices(token: string): Promise<Invoice[]>;
/**
 * Searches for invoices based on a query.
 * @param token The user's authentication token.
 * @param query The search term (e.g., a company name or invoice number).
 * @returns A promise that resolves to an array of matching invoices.
 */
export declare function searchInvoices(token: string, query: string): Promise<Invoice[]>;
export declare function createInvoice(token: string, invoiceData: Partial<Invoice>): Promise<Invoice>;
//# sourceMappingURL=invoiceController.d.ts.map