// Charts management for tab content
import { createCumulativeXPChart } from "../charts/xpCharts.js";
import { createAuditRatioChart } from "../charts/pieChart.js";

// Generate charts HTML for a tab
export function generateChartsHTML(config) {
  return `
    <div class="chart-card">
      <h3>Cumulative XP Progress</h3>
      <svg id="dynamicCumulativeXpChart" width="450" height="300"></svg>
    </div>
    ${
      config.showAuditRatio
        ? `
    <div class="chart-card chart-card-small">
      <h3>Audit Ratio</h3>
      <svg id="dynamicSuccessChart" width="300" height="200"></svg>
    </div>
    `
        : ""
    }
  `;
}

// Update charts with new data
export function updateCharts(
  chartsContainer,
  transactions,
  user,
  tab,
  config,
  auditRatioValue
) {
  // Update HTML first
  chartsContainer.innerHTML = generateChartsHTML(config);

  // Create cumulative XP chart
  createCumulativeXPChart(transactions, "dynamicCumulativeXpChart");

  // Create audit ratio chart if applicable
  if (config.showAuditRatio && auditRatioValue !== null) {
    const userDataForChart = { ...user, auditRatio: auditRatioValue };
    createAuditRatioChart(userDataForChart, "dynamicSuccessChart");
  }
}
