import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Badge from "../components/Badge";
import ComplaintImage from "../components/ComplaintImage";

function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function getComplaint() {
      setComplaint(null);
      setError("");
      try {
        const response = await api.get(`/complaints/${id}`);
        if (!ignore) setComplaint(response.data);
      } catch (err) {
        console.error(err);
        if (ignore) return;
        if (err.response && err.response.status === 404) {
          setError("This complaint could not be found.");
        } else {
          setError(
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

  if (error) {
    return (
      <div className="state-box error-box">
        <h2>{error}</h2>
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

  const notes = complaint.resolutionNotes || [];

  return (
    <div className="details">
      <Link className="back-link" to="/complaints">
        ← Back To Complaints
      </Link>

      <ComplaintImage complaint={complaint} />

      <h1>{complaint.title}</h1>
      <div className="badges">
        <Badge type="status" value={complaint.status} />
        <Badge type="priority" value={complaint.priority} />
      </div>
      <p>{complaint.description}</p>

      <h3>Category</h3>
      <p>{complaint.category}</p>

      <h3>Status</h3>
      <p>{complaint.status}</p>

      <h3>Priority</h3>
      <p>{complaint.priority}</p>

      <h3>Location</h3>
      <p>{complaint.location}</p>

      <h3>Date Filed</h3>
      <p>{complaint.dateFiled || "Not available"}</p>

      <h3>Complainant</h3>
      <p>{complaint.complainantName || "Not available"}</p>
      <p>{complaint.complainantEmail}</p>

      <h3>Assigned To</h3>
      <p>{complaint.assignedTo || "Not assigned yet"}</p>

      <h3>Resolution Notes</h3>
      {notes.length === 0 ? (
        <p>No resolution notes yet.</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}

      <div className="details-actions">
        <Link className="edit-btn" to={`/edit-complaint/${complaint.id}`}>
          Edit Complaint
        </Link>
      </div>
    </div>
  );
}

export default ComplaintDetails;
