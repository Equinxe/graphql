// Cursus filter logic - handles filtering for main cursus data (excludes piscines)

// Filter transactions for cursus (excludes piscines but includes main JS project)
export function filterCursusTransactions(transactions) {
  return transactions.filter((item) => {
    const isMainJsProject = item.path === "/rouen/div-01/piscine-js";
    const isPiscineOrRaid =
      item.path.includes("piscine-go") ||
      item.path.includes("piscine-js") ||
      item.path.includes("/raid-") ||
      item.path.includes("-raid-");

    return !isPiscineOrRaid || isMainJsProject;
  });
}

// Filter progresses for cursus (excludes piscines but includes main JS project)
export function filterCursusProgresses(progresses) {
  return progresses.filter((item) => {
    const isMainJsProject = item.path === "/rouen/div-01/piscine-js";
    const isPiscineOrRaid =
      item.path.includes("piscine-go") ||
      item.path.includes("piscine-js") ||
      item.path.includes("/raid-") ||
      item.path.includes("-raid-");

    return !isPiscineOrRaid || isMainJsProject;
  });
}

// Get configuration for cursus tab
export function getCursusConfig() {
  return {
    xpLabel: "Cursus XP",
    showAuditRatio: true,
    isPiscine: false,
  };
}
