import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ComplaintForm from "../components/ComplaintForm";

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function getComplaint() {
      setComplaint(null);
      setLoadError("");
      try {
        const response = await api.get(`/complaints/${id}`);
        if (!ignore) setComplaint(response.data);
      } catch (err) {
        console.error(err);
        if (ignore) return;
        if (err.response && err.response.status === 404) {
          setLoadError("This complaint could not be found.");
        } else {
          setLoadError(
            "Could not load the complaint. Please make sure the JSON Server is running."
          );
        }
      }
    }

    getComplaint();
    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleSubmit(values) {
    setSubmitting(true);
    setSubmitError("");
    try {
      // PUT replaces the whole record, so keep every existing field.
      await api.put(`/complaints/${id}`, { ...complaint, ...values });
      navigate("/complaints");
    } catch (err) {
      console.error(err);
      setSubmitError("Could not update the complaint. Please try again.");
      setSubmitting(false);
    }
  }

  if (loadError) {
    return (
      <div className="state-box error-box">
        <h2>{loadError}</h2>
        <Link className="btn-primary" to="/complaints">
          Back To Complaints
        </Link>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="state-box">
        <h2>Loading...</h2>
      </div>
    );
  }

  const initialValues = {
    title: complaint.title || "",
    category: complaint.category || "",
    priority: complaint.priority || "Medium",
    status: complaint.status || "Pending",
    location: complaint.location || "",
    image: complaint.image || "",
    description: complaint.description || "",
  };

  return (
    <ComplaintForm
      title="Edit Complaint"
      initialValues={initialValues}
      submitLabel="Update Complaint"
      showStatus
      submitting={submitting}
      submitError={submitError}
      onSubmit={handleSubmit}
    />
  );
}

export default EditComplaint;
