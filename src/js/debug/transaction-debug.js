// Debug utilities for tab data validation
import { formatXP } from "../utils.js";
import { deduplicateTransactions } from "../filters/filter-manager.js";

// Debug function to log transaction data for validation
export function debugTransactions(transactions, tab, user) {
  // Simple debug for verification
  console.log(`=== ${tab.toUpperCase()} ===`);
  console.log(
    `XP: ${formatXP(transactions.reduce((sum, t) => sum + t.amount, 0))}`
  );

  const uniqueTransactions = deduplicateTransactions(transactions);
  console.log(`Transactions: ${uniqueTransactions.length}`);
  console.log("=================");
}

// Detailed debug function with transaction breakdown
export function debugTransactionsDetailed(transactions, tab, detailed = false) {
  const uniqueTransactions = deduplicateTransactions(transactions);
  const totalXP = transactions.reduce((sum, t) => sum + t.amount, 0);

  console.log(`\n=== DETAILED DEBUG: ${tab.toUpperCase()} ===`);
  console.log(`Total XP: ${formatXP(totalXP)}`);
  console.log(`Unique Transactions: ${uniqueTransactions.length}`);
  console.log(`Raw Transactions: ${transactions.length}`);

  if (detailed) {
    console.log("\nTransaction breakdown:");
    uniqueTransactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10) // Show first 10
      .forEach((t) => {
        console.log(
          `  ${t.path}: ${formatXP(t.amount)} (${new Date(
            t.createdAt
          ).toLocaleDateString()})`
        );
      });

    if (uniqueTransactions.length > 10) {
      console.log(`  ... and ${uniqueTransactions.length - 10} more`);
    }
  }

  console.log("=====================================\n");
}
