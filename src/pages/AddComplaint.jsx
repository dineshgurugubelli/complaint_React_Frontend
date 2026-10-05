import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ComplaintForm from "../components/ComplaintForm";

const emptyComplaint = {
  title: "",
  category: "",
  priority: "Medium",
  location: "",
  image: "",
  description: "",
};

function AddComplaint() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(values) {
    setSubmitting(true);
    setSubmitError("");
    try {
      await api.post("/complaints", {
        ...values,
        status: "Pending",
        dateFiled: new Date().toISOString().slice(0, 10),
        complainantName: user.name,
        complainantEmail: user.email,
        assignedTo: "Not assigned yet",
        resolutionNotes: [],
      });
      navigate("/complaints");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Could not file the complaint. Please make sure the JSON Server is running and try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <ComplaintForm
      title="File Complaint"
      initialValues={emptyComplaint}
      submitLabel="File Complaint"
      submitting={submitting}
      submitError={submitError}
      onSubmit={handleSubmit}
    />
  );
}

export default AddComplaint;
