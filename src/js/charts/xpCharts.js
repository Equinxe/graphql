import { showTooltip, hideTooltip, formatXP } from "../utils.js";

// Create cumulative XP chart showing progress over time
export function createCumulativeXPChart(
  transactions,
  svgId = "cumulativeXpChart"
) {
  const svg = document.getElementById(svgId);
  if (!svg || transactions.length === 0) return;
  svg.innerHTML = "";

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  let cumulativeXP = 0;
  const dataPoints = sortedTransactions.map((t) => ({
    date: new Date(t.createdAt),
    xp: (cumulativeXP += t.amount),
    amount: t.amount,
    path: t.path,
  }));

  const container = svg.parentElement;
  const containerWidth = container?.offsetWidth || 800;
  const width = Math.max(containerWidth - 80, 300);
  const margin = { top: 30, right: 40, bottom: 60, left: 80 };
  const height = Math.max(300 - margin.top - margin.bottom, 200);

  svg.setAttribute("width", width + margin.left + margin.right);
  svg.setAttribute("height", height + margin.top + margin.bottom);
  svg.setAttribute(
    "viewBox",
    `0 0 ${width + margin.left + margin.right} ${
      height + margin.top + margin.bottom
    }`
  );

  const maxXP = Math.max(...dataPoints.map((d) => d.xp));
  const minDate = dataPoints[0].date;
  const maxDate = dataPoints[dataPoints.length - 1].date;

  const xScale = (date) => ((date - minDate) / (maxDate - minDate)) * width;
  const yScale = (xp) => height - (xp / maxXP) * height;

  const maxPoints = 50;
  const step = Math.ceil(dataPoints.length / maxPoints);
  const sampledPoints = dataPoints.filter(
    (_, i) => i % step === 0 || i === dataPoints.length - 1
  );

  renderXPChart(
    svg,
    sampledPoints,
    width,
    height,
    margin,
    xScale,
    yScale,
    maxXP,
    minDate,
    maxDate
  );
}

// Create separate XP chart for different paths
export function createSeparateXPChart(transactions, svgId = "separateXpChart") {
  const svg = document.getElementById(svgId);
  if (!svg || transactions.length === 0) return;
  svg.innerHTML = "";

  const pathCategories = {
    "Piscine Go": transactions.filter((t) => t.path.includes("piscine-go")),
    "Piscine JS": transactions.filter((t) => t.path.includes("piscine-js")),
    Cursus: transactions.filter(
      (t) => !t.path.includes("piscine-go") && !t.path.includes("piscine-js")
    ),
  };

  const colors = {
    "Piscine Go": "#3498db",
    "Piscine JS": "#f1c40f",
    Cursus: "#e74c3c",
  };

  const margin = { top: 20, right: 100, bottom: 40, left: 60 };
  const width = 450 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const allDates = transactions.map((t) => new Date(t.createdAt));
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));

  const pathData = {};
  let maxXP = 0;

  Object.keys(pathCategories).forEach((pathName) => {
    const pathTransactions = pathCategories[pathName].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    let cumulativeXP = 0;
    pathData[pathName] = pathTransactions.map((t) => ({
      date: new Date(t.createdAt),
      xp: (cumulativeXP += t.amount),
      amount: t.amount,
    }));

    maxXP = Math.max(maxXP, cumulativeXP);
  });

  renderSeparateXPChart(
    svg,
    pathData,
    colors,
    width,
    height,
    margin,
    minDate,
    maxDate,
    maxXP
  );
}

// Render cumulative XP chart with SVG
function renderXPChart(
  svg,
  points,
  width,
  height,
  margin,
  xScale,
  yScale,
  maxXP,
  minDate,
  maxDate
) {
  const pathData = points.reduce(
    (acc, point, i) =>
      acc +
      (i === 0 ? `M ` : `L `) +
      `${xScale(point.date)} ${yScale(point.xp)}`,
    ``
  );

  svg.setAttribute("width", width + margin.left + margin.right);
  svg.setAttribute("height", height + margin.top + margin.bottom);

  const dateTicks = Array.from(
    { length: 5 },
    (_, i) =>
      new Date(
        minDate.getTime() + (i / 4) * (maxDate.getTime() - minDate.getTime())
      )
  );

  svg.innerHTML = generateXPChartSVG(
    pathData,
    width,
    height,
    dateTicks,
    maxXP,
    xScale,
    yScale
  );

  const g = svg.querySelector("g");
  points.forEach((d) => {
    const circle = createInteractiveCircle(
      xScale(d.date),
      yScale(d.xp),
      d,
      "#667eea"
    );
    g.appendChild(circle);
  });
}

// Render separate paths XP chart
function renderSeparateXPChart(
  svg,
  pathData,
  colors,
  width,
  height,
  margin,
  minDate,
  maxDate,
  maxXP
) {
  const xScale = (date) => ((date - minDate) / (maxDate - minDate)) * width;
  const yScale = (xp) => height - (xp / maxXP) * height;

  let svgContent = generateSeparateXPChartBase(width, height, margin);

  Object.entries(pathData).forEach(([pathName, data]) => {
    if (data.length === 0) return;

    const color = colors[pathName];
    svgContent += generatePathContent(data, color, xScale, yScale);
  });

  svgContent += generateAxisLabels(
    width,
    height,
    maxXP,
    minDate,
    maxDate,
    "XP by Path"
  );
  svg.innerHTML = svgContent;

  const g = svg.querySelector("g");
  Object.entries(pathData).forEach(([pathName, data]) => {
    if (data.length === 0) return;
    data.forEach((d) => {
      const circle = createInteractiveCircle(
        xScale(d.date),
        yScale(d.xp),
        { ...d, pathName },
        colors[pathName]
      );
      g.appendChild(circle);
    });
  });
}

// Create interactive circle for tooltips
function createInteractiveCircle(cx, cy, data, color) {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", 3);
  circle.setAttribute("fill", color);

  const tooltipContent = data.pathName
    ? `${data.pathName}<br>${data.date.toLocaleDateString()}: +${
        data.amount
      } XP<br>Total: ${data.xp} XP`
    : `${data.date.toLocaleDateString()}: +${
        data.amount
      } XP<br>Total: ${formatXP(data.xp)} XP<br>Path: ${data.path
        .split("/")
        .pop()}`;

  circle.addEventListener("mouseover", (e) => showTooltip(e, tooltipContent));
  circle.addEventListener("mouseout", hideTooltip);

  return circle;
}

// Generate SVG for cumulative XP chart
function generateXPChartSVG(
  pathData,
  width,
  height,
  dateTicks,
  maxXP,
  xScale,
  yScale
) {
  return `
        <g transform="translate(60, 20)">
            <defs>
                <pattern id="cumulative-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e0e0e0" stroke-width="1"/>
                </pattern>
                <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#667eea;stop-opacity:0.2" />
                </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#cumulative-grid)" />
            <path d="${pathData} L ${width} ${height} L 0 ${height} Z" fill="url(#xp-gradient)" opacity="0.6"/>
            <path d="${pathData}" fill="none" stroke="#667eea" stroke-width="3" stroke-linecap="round"/>
            ${generateAxisLabels(
              width,
              height,
              maxXP,
              dateTicks,
              xScale,
              yScale,
              "Cumulative XP"
            )}
        </g>
    `;
}

function generateSeparateXPChartBase(width, height, margin) {
  return `
        <g transform="translate(${margin.left}, ${margin.top})">
            <defs>
                <pattern id="separate-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e0e0e0" stroke-width="1"/>
                </pattern>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#separate-grid)" />
            <line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="#333" stroke-width="2"/>
            <line x1="0" y1="0" x2="0" y2="${height}" stroke="#333" stroke-width="2"/>
    `;
}

function generatePathContent(data, color, xScale, yScale) {
  let pathString = `M ${xScale(data[0].date)} ${yScale(data[0].xp)}`;
  for (let i = 1; i < data.length; i++) {
    pathString += ` L ${xScale(data[i].date)} ${yScale(data[i].xp)}`;
  }

  return `
        <path d="${pathString}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    `;
}

function generateAxisLabels(
  width,
  height,
  maxXP,
  dateTicksOrMinDate,
  xScaleOrMaxDate,
  yScaleOrUndefined,
  yAxisLabel = "Cumulative XP"
) {
  // Handle two different call patterns:
  // 1. With dateTicks, xScale, yScale (from cumulative chart)
  // 2. With minDate, maxDate only (from separate chart)

  if (Array.isArray(dateTicksOrMinDate)) {
    // Pattern 1: Cumulative chart with dateTicks, xScale, yScale
    const dateTicks = dateTicksOrMinDate;
    const xScale = xScaleOrMaxDate;
    const yScale = yScaleOrUndefined;

    return `
        <text x="-40" y="${yScale(
          maxXP
        )}" text-anchor="middle" font-size="12" fill="#666">${formatXP(
      maxXP
    )}</text>
        <text x="-40" y="${yScale(
          maxXP / 2
        )}" text-anchor="middle" font-size="12" fill="#666">${formatXP(
      maxXP / 2
    )}</text>
        <text x="-40" y="${yScale(
          0
        )}" text-anchor="middle" font-size="12" fill="#666">0</text>
        ${dateTicks
          .map(
            (d) =>
              `<text x="${xScale(d)}" y="${
                height + 25
              }" text-anchor="middle" font-size="10" fill="#666">${d.toLocaleDateString()}</text>`
          )
          .join("")}
        <text x="${width / 2}" y="${
      height + 35
    }" text-anchor="middle" font-size="12" fill="#666">Time</text>
        <text x="-50" y="${
          height / 2
        }" text-anchor="middle" font-size="12" fill="#666" transform="rotate(-90, -50, ${
      height / 2
    })">${yAxisLabel}</text>
    `;
  } else {
    // Pattern 2: Separate chart with minDate, maxDate
    const minDate = dateTicksOrMinDate;
    const maxDate = xScaleOrMaxDate;

    return `
        <text x="-40" y="0" text-anchor="middle" font-size="12" fill="#666">${maxXP}</text>
        <text x="-40" y="${
          height / 2
        }" text-anchor="middle" font-size="12" fill="#666">${Math.round(
      maxXP / 2
    )}</text>
        <text x="-40" y="${height}" text-anchor="middle" font-size="12" fill="#666">0</text>
        <text x="0" y="${
          height + 25
        }" text-anchor="middle" font-size="10" fill="#666">${minDate.toLocaleDateString()}</text>
        <text x="${width}" y="${
      height + 25
    }" text-anchor="middle" font-size="10" fill="#666">${maxDate.toLocaleDateString()}</text>
        <text x="${width / 2}" y="${
      height + 35
    }" text-anchor="middle" font-size="12" fill="#666">Time</text>
        <text x="-50" y="${
          height / 2
        }" text-anchor="middle" font-size="12" fill="#666" transform="rotate(-90, -50, ${
      height / 2
    })">${yAxisLabel}</text>
    `;
  }
}
