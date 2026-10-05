// Small coloured label used for complaint status and priority.
function Badge({ type, value }) {
  if (!value) return null;

  const slug = value.toLowerCase().replace(/\s+/g, "-");
  const text = type === "priority" ? `⚠ ${value}` : value;

  return <span className={`badge ${type}-${slug}`}>{text}</span>;
}

export default Badge;
