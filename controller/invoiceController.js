const API_URL = "http://203.159.93.114:3100";
; // It's good practice to define the base URL
export async function fetchInvoices(token) {
    const response = await fetch(`${API_URL}/invoice`, {
        headers: {
            'Authorization': `Bearer ${token}` // You must send the token for authorized routes
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch invoices");
    }
    return response.json();
}
export async function createInvoice(token, invoice) {
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
//# sourceMappingURL=invoiceController.js.map