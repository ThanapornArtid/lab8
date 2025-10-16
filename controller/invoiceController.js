const API_URL = "http://203.159.93.114:3100";
export async function fetchInvoices(token) {
    const response = await fetch(`${API_URL}/invoice`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch invoices");
    }
    return response.json();
}
// ============== ADD THIS NEW FUNCTION ==============
/**
 * Searches for invoices based on a query.
 * @param token The user's authentication token.
 * @param query The search term (e.g., a company name or invoice number).
 * @returns A promise that resolves to an array of matching invoices.
 */
export async function searchInvoices(token, query) {
    const response = await fetch(`${API_URL}/invoice/search?q=${encodeURIComponent(query)}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to search for invoices");
    }
    return response.json();
}
// =======================================================
export async function createInvoice(token, invoiceData) {
    const response = await fetch(`${API_URL}/invoice`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
    });
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "Failed to create invoice");
    }
    return response.json();
}
//# sourceMappingURL=invoiceController.js.map