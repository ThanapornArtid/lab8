import { createInvoice } from "../controller/invoiceController.js";
document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("Authentication required. Please log in.");
        window.location.href = "/login.html";
        return;
    }
    const form = document.getElementById('create-invoice-form');
    if (!form)
        return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // **FIX**: Create a data object that EXACTLY matches the API documentation
        const invoiceData = {
            invoice_number: document.getElementById('invoice_number').value,
            client_id: parseInt(document.getElementById('client_id').value),
            quotation_number: document.getElementById('quotation_number').value,
            issue_date: document.getElementById('issue_date').value,
            due_date: document.getElementById('due_date').value,
            status: document.getElementById('status').value,
            subtotal: parseFloat(document.getElementById('subtotal').value),
            tax_amount: parseFloat(document.getElementById('tax_amount').value),
            total_amount: parseFloat(document.getElementById('total_amount').value),
            currency: document.getElementById('currency').value,
            notes: document.getElementById('notes').value,
            created_by: parseInt(document.getElementById('created_by').value),
            // Add default values for other required fields the user doesn't input
            amount_paid: 0,
        };
        // Basic validation
        if (!invoiceData.client_id || !invoiceData.issue_date || !invoiceData.due_date) {
            alert("Please fill out all required fields (*).");
            return;
        }
        try {
            await createInvoice(authToken, invoiceData);
            alert('Invoice created successfully!');
            window.location.href = '/invoices.html';
        }
        catch (err) {
            alert(`Error creating invoice: ${err.message}`);
        }
    });
});
//# sourceMappingURL=create-invoice.js.map