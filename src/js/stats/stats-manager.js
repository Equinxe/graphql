/**
 * Stats management for tab content
 */

import { formatXP, formatAuditRatio } from "../utils.js";
import { deduplicateTransactions } from "../filters/filter-manager.js";

// Generate stats HTML for a tab
export function generateStatsHTML(
  transactions,
  progresses,
  config,
  auditStats,
  auditRatioValue
) {
  const totalXP = transactions.reduce((sum, t) => sum + t.amount, 0);
  const uniqueTransactions = deduplicateTransactions(transactions);
  const transactionCount = uniqueTransactions.length;

  // Generate audit information
  let auditInfo = "";
  if (config.showAuditRatio && auditRatioValue !== null && auditStats) {
    auditInfo = `
      <div class="stat-card">
        <h3>Audit Ratio</h3>
        <div class="stat-value">${formatAuditRatio(auditRatioValue)}</div>
        <p>Given: ${formatXP(auditStats.auditUp)} | Received: ${formatXP(
      auditStats.auditDown
    )}</p>
      </div>
    `;
  } else if (config.showAuditRatio) {
    auditInfo = `
      <div class="stat-card">
        <h3>Audit Ratio</h3>
        <div class="stat-value">N/A</div>
      </div>
    `;
  }

  return `
    <div class="stat-card">
      <h3>${config.xpLabel}</h3>
      <div class="stat-value">${formatXP(totalXP, config.isPiscine)}</div>
    </div>
    <div class="stat-card">
      <h3>Projects Completed</h3>
      <div class="stat-value">${transactionCount}</div>
    </div>
    ${auditInfo}
  `;
}

// Update the stats grid with new content
export function updateStatsGrid(statsGrid, statsHTML) {
  statsGrid.innerHTML = statsHTML;
}
