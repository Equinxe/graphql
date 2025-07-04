// Utility functions
function showTooltip(event, text) {
  const tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = text;
  tooltip.style.left = event.pageX + 10 + "px";
  tooltip.style.top = event.pageY - 10 + "px";
  tooltip.style.opacity = "1";
}

function hideTooltip() {
  document.getElementById("tooltip").style.opacity = "0";
}

function formatXP(xp, isPiscine = false) {
  if (xp >= 1000000) {
    return (xp / 1000000).toFixed(2) + "MB";
  }
  if (xp >= 1000) {
    if (isPiscine) {
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

export { showTooltip, hideTooltip, formatXP, formatAuditRatio };
