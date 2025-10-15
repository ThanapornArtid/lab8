// controller/invoiceController.ts
import { Invoice } from '../models/interface'; // Assuming your interface is in this path

const API_URL = "http://localhost:3000"; // It's good practice to define the base URL

export async function fetchInvoices(token: string): Promise<Invoice[]> {
    const response = await fetch(`${API_URL}/invoice`, { // The teacher's example might have /search, but /invoice is common for getting all
        headers: {
            'Authorization': `Bearer ${token}` // You must send the token for authorized routes
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch invoices");
    }
    return response.json();
}

export async function createInvoice(token: string, invoice: Partial<Invoice>): Promise<Invoice> {
    const response = await fetch(`${API_URL}/invoice`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoice)
    });
    if (!response.ok) {
        throw new Error("Failed to create invoice");
    }
    return response.json();
}