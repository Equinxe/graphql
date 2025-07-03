/**
 * Global filter logic
 * Returns all data for total/global view
 */

// Return all transactions for global view
export function filterGlobalTransactions(transactions) {
  return transactions;
}

// Return all progresses for global view
export function filterGlobalProgresses(progresses) {
  return progresses;
}

// Get configuration for global/total tab
export function getGlobalConfig() {
  return {
    xpLabel: "Total XP",
    showAuditRatio: true,
    isPiscine: false,
  };
}
