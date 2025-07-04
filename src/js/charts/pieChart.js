// Utility functions for pie charts
function createPieSlice(centerX, centerY, radius, startAngle, endAngle) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    centerX,
    centerY,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function createAuditRatioChart(user, svgId = "successChart") {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  svg.innerHTML = "";

  // Calculate green percentage (ratio * 50 for 50% max)
  const auditRatio = Math.min(Math.max(user.auditRatio || 0, 0), 1);
  const greenPercentage = auditRatio * 50;

  const centerX = 150;
  const centerY = 100;
  const radius = 60;

  // Convert percentages to angles for pie chart
  const greenAngle = (greenPercentage / 100) * 360;
  const redAngle = 360 - greenAngle;

  // Create paths for green and red portions
  const greenPath = createPieSlice(centerX, centerY, radius, 0, greenAngle);
  const redPath = createPieSlice(centerX, centerY, radius, greenAngle, 360);

  svg.innerHTML = `
    <path d="${greenPath}" fill="#4CAF50" stroke="white" stroke-width="2"/>
    <path d="${redPath}" fill="#FF5252" stroke="white" stroke-width="2"/>
    <circle cx="${centerX}" cy="${centerY}" r="35" fill="var(--gray-dark)" stroke="var(--gold-dark)" stroke-width="2"/>
    <text x="${centerX}" y="${
    centerY - 5
  }" text-anchor="middle" font-size="20" font-weight="bold" fill="var(--gold)">${auditRatio.toFixed(
    1
  )}</text>
    <text x="${centerX}" y="${
    centerY + 20
  }" text-anchor="middle" font-size="12" fill="var(--white)">Audit Ratio</text>
  `;
}

export function createPieChart(svgId, data) {
  const svg = document.getElementById(svgId);
  if (!svg || !data || data.length === 0) return;
  svg.innerHTML = "";

  const centerX = 150;
  const centerY = 150;
  const radius = 80;

  // Calculate total value for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Colors for different segments
  const colors = [
    "#4CAF50",
    "#FF5252",
    "#2196F3",
    "#FFC107",
    "#9C27B0",
    "#FF9800",
  ];

  let currentAngle = 0;
  const paths = [];
  const labels = [];

  data.forEach((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage * 360) / 100;

    // Create pie slice
    const path = createPieSlice(
      centerX,
      centerY,
      radius,
      currentAngle,
      currentAngle + angle
    );
    const color = colors[index % colors.length];

    paths.push(
      `<path d="${path}" fill="${color}" stroke="white" stroke-width="2" 
            onmouseover="showTooltip(event, '${
              item.label
            }: ${percentage.toFixed(1)}%')"
            onmouseout="hideTooltip()"/>`
    );

    // Calculate label position
    const labelAngle = currentAngle + angle / 2;
    const labelRadius = radius * 0.7;
    const labelPos = polarToCartesian(
      centerX,
      centerY,
      labelRadius,
      labelAngle
    );

    if (percentage > 5) {
      labels.push(
        `<text x="${labelPos.x}" y="${labelPos.y}" 
                text-anchor="middle" fill="white" font-size="12">
                ${percentage > 10 ? item.label : ""}
            </text>`
      );
    }

    currentAngle += angle;
  });

  svg.innerHTML = `
        ${paths.join("\n")}
        ${labels.join("\n")}
    `;
}

export { createPieSlice, polarToCartesian };
