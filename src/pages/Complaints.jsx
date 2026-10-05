import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import ComplaintCard from "../components/ComplaintCard";
import { removeImportant } from "../features/importantSlice";
import {
  CATEGORIES,
  PRIORITY_RANK,
  STATUSES,
} from "../utils/constants";

function Complaints() {
  const dispatch = useDispatch();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("");

  const getComplaints = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (err) {
      console.error(err);
      setError(
        "Could not load complaints. Please make sure the JSON Server is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  async function deleteComplaint(id) {
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }
    setActionError("");
    try {
      await api.delete(`/complaints/${id}`);
      setComplaints((previous) =>
        previous.filter((complaint) => complaint.id !== id)
      );
      dispatch(removeImportant(id));
    } catch (err) {
      console.error(err);
      setActionError("Could not delete the complaint. Please try again.");
    }
  }

  const finalComplaints = useMemo(() => {
    const filtered = complaints.filter((complaint) => {
      const searchMatch = complaint.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatch = category === "All" || complaint.category === category;
      const statusMatch = status === "All" || complaint.status === status;
      return searchMatch && categoryMatch && statusMatch;
    });

    const sorted = [...filtered];
    if (sort === "high") {
      sorted.sort(
        (a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]
      );
    }
    if (sort === "low") {
      sorted.sort(
        (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
      );
    }
    return sorted;
  }, [complaints, search, category, status, sort]);

  function renderContent() {
    if (loading) {
      return (
        <div className="state-box">
          <h2>Loading complaints...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div className="state-box error-box">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={getComplaints}>
            Try Again
          </button>
        </div>
      );
    }

    if (complaints.length === 0) {
      return (
        <div className="state-box">
          <h2>No complaints yet</h2>
          <p>Be the first to file a complaint.</p>
        </div>
      );
    }

    if (finalComplaints.length === 0) {
      return (
        <div className="state-box">
          <h2>No matching complaints</h2>
          <p>Try changing your search or filters.</p>
        </div>
      );
    }

    return (
      <div className="complaints">
        {finalComplaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            onDelete={deleteComplaint}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>All Complaints</h1>
        <Link className="btn-primary" to="/add-complaint">
          File Complaint
        </Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Complaint"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          {CATEGORIES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          {STATUSES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          aria-label="Sort by priority"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort Priority</option>
          <option value="high">High To Low</option>
          <option value="low">Low To High</option>
        </select>
      </div>

      {actionError && <div className="form-error">{actionError}</div>}

      {renderContent()}
    </>
  );
}

export default Complaints;
