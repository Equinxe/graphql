/**
 * Piscine JS filter logic
 * Handles filtering for JavaScript piscine data
 */

// Filter transactions related to JS piscine (excluding cursus project)
export function filterPiscineJsTransactions(transactions) {
  return transactions.filter(
    (item) =>
      item.path.includes("piscine-js") &&
      item.path !== "/rouen/div-01/piscine-js"
  );
}

// Filter progresses related to JS piscine (excluding cursus project)
export function filterPiscineJsProgresses(progresses) {
  return progresses.filter(
    (item) =>
      item.path.includes("piscine-js") &&
      item.path !== "/rouen/div-01/piscine-js"
  );
}

// Get configuration for JS piscine tab
export function getPiscineJsConfig() {
  return {
    xpLabel: "JS Piscine XP",
    showAuditRatio: false,
    isPiscine: true,
  };
}
