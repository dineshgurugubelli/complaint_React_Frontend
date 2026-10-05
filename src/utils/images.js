const CATEGORY_COLORS = {
  Maintenance: "#f97316",
  Electrical: "#eab308",
  Plumbing: "#0ea5e9",
  Sanitation: "#16a34a",
  Security: "#6366f1",
  Noise: "#a855f7",
};

function escapeXml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// Builds a local SVG image so a card never shows a broken picture.
export function getPlaceholderImage(category) {
  const color = CATEGORY_COLORS[category] || "#64748b";
  const label = escapeXml(category || "Complaint");
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${color}'/><stop offset='1' stop-color='#7f1d1d'/>` +
    `</linearGradient></defs>` +
    `<rect width='800' height='450' fill='url(#g)'/>` +
    `<text x='400' y='235' font-family='Arial' font-size='44' font-weight='bold' ` +
    `fill='white' text-anchor='middle'>${label}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
