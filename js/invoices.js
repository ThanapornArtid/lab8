// **FIX**: Import the new searchInvoices function
import { fetchInvoices, searchInvoices } from "../controller/invoiceController.js";
let authToken = null;
document.addEventListener("DOMContentLoaded", async () => {
    authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("You are not logged in!");
        window.location.href = "/login.html";
        return;
    }
    await loadInvoices(); // Load all invoices initially
    // **FIX**: Add the event listener for the search form
    const searchForm = document.querySelector('.search form');
    const searchInput = document.querySelector('.search input');
    const invoiceListElement = document.getElementById("invoice-list-container");
    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const query = searchInput.value;
            if (!authToken)
                return;
            try {
                const invoices = await searchInvoices(authToken, query);
                if (invoiceListElement) {
                    renderInvoices(invoices, invoiceListElement);
                }
            }
            catch (err) {
                alert(`Search failed: ${err.message}`);
            }
        });
    }
});
async function loadInvoices() {
    const invoiceListElement = document.getElementById("invoice-list-container");
    if (!invoiceListElement || !authToken)
        return;
    try {
        const invoices = await fetchInvoices(authToken);
        renderInvoices(invoices, invoiceListElement);
    }
    catch (err) {
        invoiceListElement.innerHTML = `<div style="color: red; padding: 1rem;">Failed to load invoices. Please try again.</div>`;
    }
}
function renderInvoices(invoices, container) {
    if (invoices.length === 0) {
        container.innerHTML = "<p style='padding: 1rem;'>No invoices found.</p>";
        return;
    }
    container.innerHTML = '';
    invoices.forEach(invoice => {
        const invoiceElement = document.createElement('article');
        invoiceElement.className = 'invoice';
        const status = invoice.status || 'pending';
        invoiceElement.innerHTML = `
            <div class="invoice__info">
                <div class="invoice__date">${new Date(invoice.issue_date).toLocaleDateString()}</div>
                <div class="invoice__company">Client ID: ${invoice.client_id}</div>
                <div class="invoice__id">${invoice.invoice_number}</div>
            </div>
            <div class="invoice__amount">
                <div class="invoice__value">฿${invoice.total_amount.toLocaleString()}</div>
                <div class="invoice__status invoice__status--${status.toLowerCase()}">${status}</div>
            </div>`;
        container.appendChild(invoiceElement);
    });
}
//# sourceMappingURL=invoices.js.map