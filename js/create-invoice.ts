import { createInvoice } from "../controller/invoiceController.js";
import { Invoice } from "../models/interface.js";

document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("Authentication required. Please log in.");
        window.location.href = "/login.html";
        return;
    }

    const form = document.getElementById('create-invoice-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // **FIX**: Create a data object that EXACTLY matches the API documentation
        const invoiceData = {
            invoice_number: (document.getElementById('invoice_number') as HTMLSelectElement).value ,
            client_id: parseInt((document.getElementById('client_id') as HTMLInputElement).value),
            quotation_number: (document.getElementById('quotation_number') as HTMLSelectElement).value,
            issue_date: (document.getElementById('issue_date') as HTMLInputElement).value,
            due_date: (document.getElementById('due_date') as HTMLInputElement).value,
            status: (document.getElementById('status') as HTMLSelectElement).value,
            subtotal: parseFloat((document.getElementById('subtotal') as HTMLInputElement).value),
            tax_amount: parseFloat((document.getElementById('tax_amount') as HTMLInputElement).value),
            total_amount: parseFloat((document.getElementById('total_amount') as HTMLInputElement).value),
            currency: (document.getElementById('currency') as HTMLInputElement).value,
            notes: (document.getElementById('notes') as HTMLTextAreaElement).value,
            created_by: parseInt((document.getElementById('created_by') as HTMLInputElement).value),
            // Add default values for other required fields the user doesn't input
            amount_paid: 0,
        };
        
        // Basic validation
        if (!invoiceData.client_id || !invoiceData.issue_date || !invoiceData.due_date) {
            alert("Please fill out all required fields (*).");
            return;
        }
        
        try {
            await createInvoice(authToken, invoiceData as Partial<Invoice>);
            alert('Invoice created successfully!');
            window.location.href = '/invoices.html'; 
        } catch (err: any) {
            alert(`Error creating invoice: ${err.message}`);
        }
    });
});
