import { getPlaceholderImage } from "../utils/images";

// Shows the complaint image and falls back to a local picture if it fails to load.
function ComplaintImage({ complaint, className }) {
  const fallback = getPlaceholderImage(complaint.category);

  function handleError(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback;
  }

  return (
    <img
      className={className}
      src={complaint.image || fallback}
      alt={complaint.title}
      loading="lazy"
      onError={handleError}
    />
  );
}

export default ComplaintImage;
