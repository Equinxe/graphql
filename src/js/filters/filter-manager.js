/**
 * Filter Manager
 * Central hub for all tab filtering logic
 */

import {
  filterCursusTransactions,
  filterCursusProgresses,
  getCursusConfig,
} from "./cursus.js";

import {
  filterPiscineGoTransactions,
  filterPiscineGoProgresses,
  getPiscineGoConfig,
} from "./piscine-go.js";

import {
  filterPiscineJsTransactions,
  filterPiscineJsProgresses,
  getPiscineJsConfig,
} from "./piscine-js.js";

import {
  filterGlobalTransactions,
  filterGlobalProgresses,
  getGlobalConfig,
} from "./global.js";

// Get filtered data and config for a tab
export function getTabData(user, tab) {
  let transactions, progresses, config;

  switch (tab) {
    case "cursus":
      transactions = filterCursusTransactions(user.transactions);
      progresses = filterCursusProgresses(user.progresses);
      config = getCursusConfig();
      break;

    case "piscine-go":
      transactions = filterPiscineGoTransactions(user.transactions);
      progresses = filterPiscineGoProgresses(user.progresses);
      config = getPiscineGoConfig();
      break;

    case "piscine-js":
      transactions = filterPiscineJsTransactions(user.transactions);
      progresses = filterPiscineJsProgresses(user.progresses);
      config = getPiscineJsConfig();
      break;

    case "global":
    default:
      transactions = filterGlobalTransactions(user.transactions);
      progresses = filterGlobalProgresses(user.progresses);
      config = getGlobalConfig();
      break;
  }

  return { transactions, progresses, config };
}

// Get audit ratio for a tab
export function getAuditRatioForTab(user, tab) {
  switch (tab) {
    case "global":
      return user.auditRatio;
    case "cursus":
      return user.cursusAuditRatio;
    case "piscine-go":
    case "piscine-js":
      return null; // No audit ratio for piscines
    default:
      return null;
  }
}

// Get audit stats for a tab
export function getAuditStatsForTab(user, tab) {
  switch (tab) {
    case "global":
      return {
        auditUp: user.stats.totalUp,
        auditDown: user.stats.totalDown,
      };
    case "cursus":
      return {
        auditUp: user.stats.cursusUp,
        auditDown: user.stats.cursusDown,
      };
    case "piscine-go":
    case "piscine-js":
      return null; // No audit stats for piscines
    default:
      return null;
  }
}

// Remove duplicate transactions
export function deduplicateTransactions(transactions) {
  return transactions.filter(
    (t, index, arr) =>
      arr.findIndex(
        (other) =>
          other.objectId === t.objectId &&
          other.path === t.path &&
          other.amount === t.amount &&
          other.createdAt === t.createdAt
      ) === index
  );
}
