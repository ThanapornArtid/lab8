// FIX: Import the new `fetchClientById` function and `Client` interface
import { fetchInvoices, fetchClientById } from "../controller/invoiceController.js";
let authToken = null;
let allInvoices = []; // Cache for all invoices
document.addEventListener("DOMContentLoaded", async () => {
    authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("You are not logged in!");
        window.location.href = "/login.html";
        return;
    }
    await loadInvoices();
    // Event listener for the new search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // --- THIS IS THE CORRECTED SECTION ---
            // It correctly gets the full value from each input field.
            const query = document.getElementById('search-query').value;
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            // It builds the 'criteria' object with the values.
            const criteria = {
                query: query.toLowerCase().trim(),
                startDate: normalizeToDateOnly(startDate),
                endDate: normalizeToDateOnly(endDate),
            };
            // --- END OF CORRECTION ---
            const filteredInvoices = await filterInvoices(criteria);
            renderInvoices(filteredInvoices);
        });
    }
});
async function loadInvoices() {
    if (!authToken)
        return;
    try {
        allInvoices = await fetchInvoices(authToken);
        renderInvoices(allInvoices);
    }
    catch (err) {
        console.error("Failed to load invoices:", err);
        const container = document.getElementById("invoice-list-container");
        if (container) {
            container.innerHTML = `<div style="color: red; padding: 1rem;">Failed to load invoices. Please try again.</div>`;
        }
    }
}
/**
 * Normalizes a date string to a Date object at midnight.
 */
function normalizeToDateOnly(dateString) {
    if (!dateString)
        return null;
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match)
        return null;
    const [_, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
}
/**
 * Filters invoices based on multiple criteria (client-side).
 */
async function filterInvoices(criteria) {
    if (!authToken)
        return [];
    const clientCache = {};
    const results = [];
    // To make the end date inclusive, we set it to the start of the next day.
    const inclusiveEndDate = criteria.endDate ? new Date(criteria.endDate.getTime() + 24 * 60 * 60 * 1000) : null;
    for (const invoice of allInvoices) {
        // 1. Date Filtering
        const issueDate = new Date(invoice.issue_date);
        if (criteria.startDate && issueDate < criteria.startDate) {
            continue; // Skip if before start date
        }
        if (inclusiveEndDate && issueDate >= inclusiveEndDate) {
            continue; // Skip if on or after the day following the end date
        }
        // 2. Text Query Filtering (Invoice #, Company, Email)
        if (criteria.query) {
            const clientId = invoice.client_id;
            if (clientCache[clientId] === undefined) {
                clientCache[clientId] = await fetchClientById(authToken, clientId);
            }
            const client = clientCache[clientId];
            const matchesQuery = invoice.invoice_number.toLowerCase().includes(criteria.query) ||
                client?.company_name.toLowerCase().includes(criteria.query) ||
                client?.email.toLowerCase().includes(criteria.query);
            if (!matchesQuery) {
                continue; // Skip if no text match
            }
        }
        // If all checks pass, add to results
        results.push(invoice);
    }
    return results;
}
// FIX: The container parameter is now optional. The function will find it.
function renderInvoices(invoices) {
    const container = document.getElementById("invoice-list-container");
    if (!container) {
        console.error("Invoice container not found!");
        return;
    }
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