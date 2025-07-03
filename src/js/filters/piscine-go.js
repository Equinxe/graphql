/**
 * Piscine Go filter logic
 * Handles filtering for Go piscine data
 */

// Filter transactions related to Go piscine
export function filterPiscineGoTransactions(transactions) {
  return transactions.filter((item) => item.path.includes("piscine-go"));
}

// Filter progresses related to Go piscine
export function filterPiscineGoProgresses(progresses) {
  return progresses.filter((item) => item.path.includes("piscine-go"));
}

// Get configuration for Go piscine tab
export function getPiscineGoConfig() {
  return {
    xpLabel: "GO Piscine XP",
    showAuditRatio: false,
    isPiscine: true,
  };
}
