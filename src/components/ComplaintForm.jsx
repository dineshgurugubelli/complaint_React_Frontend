import { useState } from "react";
import { CATEGORIES, PRIORITIES, STATUSES } from "../utils/constants";

// Shared form used by the File Complaint and Edit Complaint pages.
function ComplaintForm({
  title,
  initialValues,
  submitLabel,
  showStatus = false,
  submitting = false,
  submitError = "",
  onSubmit,
}) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Keep a custom category selectable when editing older data.
  const categoryOptions = [
    ...new Set([...CATEGORIES, formData.category].filter(Boolean)),
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.category) newErrors.category = "Please choose a category.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Please describe the issue in at least 10 characters.";
    }
    if (formData.image.trim() && !/^https?:\/\//i.test(formData.image.trim())) {
      newErrors.image = "Image URL must start with http:// or https://";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
    });
  }

  return (
    <div className="form-container">
      <h1>{title}</h1>

      {submitError && <div className="form-error">{submitError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Complaint Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Complaint Title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "invalid" : ""}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? "invalid" : ""}
          >
            <option value="">Select category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {showStatus && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? "invalid" : ""}
          />
          {errors.location && (
            <span className="field-error">{errors.location}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL (optional)</label>
          <input
            id="image"
            type="text"
            name="image"
            placeholder="https://..."
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? "invalid" : ""}
          />
          {errors.image && <span className="field-error">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "invalid" : ""}
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        <button className="submit-btn" disabled={submitting}>
          {submitting ? "Please wait..." : submitLabel}
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;
