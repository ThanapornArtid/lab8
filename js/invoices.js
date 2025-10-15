import { fetchInvoices } from "../controller/invoiceController.js";
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('authToken');
    const invoiceListElement = document.getElementById("invoice-list-container"); // Add a container in your HTML
    if (!token) {
        alert("You are not logged in!");
        window.location.href = "/login.html";
        return;
    }
    if (!invoiceListElement)
        return;
    try {
        const invoices = await fetchInvoices(token);
        renderInvoices(invoices, invoiceListElement);
    }
    catch (err) {
        invoiceListElement.innerHTML = `<div class="text-red-500">Failed to load invoices. Please try again.</div>`;
    }
});
function renderInvoices(invoices, container) {
    if (invoices.length === 0) {
        container.innerHTML = "<p>No invoices found.</p>";
        return;
    }
    // Clear existing content (like the static examples)
    container.innerHTML = '';
    // Create and append the header (optional, but good practice)
    // ... add header logic if you want ...
    invoices.forEach(invoice => {
        const invoiceElement = document.createElement('article');
        invoiceElement.className = 'invoice';
        invoiceElement.innerHTML = `
            <div class="invoice__info">
                <div class="invoice__date">${new Date(invoice.issue_date).toLocaleDateString()}</div>
                <div class="invoice__company">Client ID: ${invoice.client_id}</div>
                <div class="invoice__id">${invoice.invoice_number}</div>
            </div>
            <div class="invoice__amount">
                <div class="invoice__value">฿${invoice.total_amount.toLocaleString()}</div>
                <div class="invoice__status invoice__status--${invoice.status.toLowerCase()}">${invoice.status}</div>
            </div>`;
        container.appendChild(invoiceElement);
    });
}
//# sourceMappingURL=invoices.js.map