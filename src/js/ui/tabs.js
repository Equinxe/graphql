/**
 * Modular tabs management using the new filter and stats system
 */

import {
  getTabData,
  getAuditRatioForTab,
  getAuditStatsForTab,
} from "../filters/filter-manager.js";
import { generateStatsHTML, updateStatsGrid } from "../stats/stats-manager.js";
import { updateCharts } from "../stats/charts-manager.js";
import { debugTransactions } from "../debug/transaction-debug.js";

const statsGrid = document.querySelector(".stats-grid");
const chartsContainer = document.querySelector(".charts-container");
let cachedUser = null;

export function initializeTabListeners(user) {
  const navCursus = document.getElementById("navCursus");
  const navPiscineGo = document.getElementById("navPiscineGo");
  const navPiscineJs = document.getElementById("navPiscineJs");
  const navTotal = document.getElementById("navTotal");

  navCursus.addEventListener("click", (e) => {
    e.preventDefault();
    updateTabContent(user, "cursus");
  });
  navPiscineGo.addEventListener("click", (e) => {
    e.preventDefault();
    updateTabContent(user, "piscine-go");
  });
  navPiscineJs.addEventListener("click", (e) => {
    e.preventDefault();
    updateTabContent(user, "piscine-js");
  });
  navTotal.addEventListener("click", (e) => {
    e.preventDefault();
    updateTabContent(user, "global");
  });

  // Initialize tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateTabContent(cachedUser, btn.dataset.tab);
    });
  });
}

/**
 * Update tab content using the new modular system
 * @param {Object} user - User data object
 * @param {string} tab - Tab identifier
 */
function updateTabContent(user, tab) {
  // Get filtered data and configuration for the tab
  const { transactions, progresses, config } = getTabData(user, tab);

  // Get audit data for the tab
  const auditRatioValue = getAuditRatioForTab(user, tab);
  const auditStats = getAuditStatsForTab(user, tab);

  // Debug the transactions
  debugTransactions(transactions, tab, user);

  // Generate and update stats
  const statsHTML = generateStatsHTML(
    transactions,
    progresses,
    config,
    auditStats,
    auditRatioValue
  );
  updateStatsGrid(statsGrid, statsHTML);

  // Update charts
  updateCharts(
    chartsContainer,
    transactions,
    user,
    tab,
    config,
    auditRatioValue
  );
}

export function renderTabContent(user) {
  cachedUser = user;
  updateTabContent(user, "global");
}
