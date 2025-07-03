// This file contains utility functions used across the application.

function showTooltip(event, text) {
  const tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = text; // Use innerHTML to support <br> tags
  tooltip.style.left = event.pageX + 10 + "px";
  tooltip.style.top = event.pageY - 10 + "px";
  tooltip.style.opacity = "1";
}

function hideTooltip() {
  document.getElementById("tooltip").style.opacity = "0";
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";
}

function formatXP(xp, isPiscine = false) {
  if (xp >= 1000000) {
    return (xp / 1000000).toFixed(2) + "MB";
  }
  if (xp >= 1000) {
    if (isPiscine) {
      // Pour les piscines, pas de virgule (arrondir à l'entier le plus proche)
      return Math.round(xp / 1000) + "KB";
    }
    return (xp / 1000).toFixed(1) + "KB";
  }
  return xp.toString();
}

function formatAuditRatio(ratio) {
  if (ratio === null || ratio === undefined) {
    return "N/A";
  }
  return ratio.toFixed(1);
}

export {
  showTooltip,
  hideTooltip,
  showError,
  hideError,
  formatXP,
  formatAuditRatio,
};
