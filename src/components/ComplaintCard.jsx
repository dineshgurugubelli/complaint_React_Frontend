import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addImportant, removeImportant } from "../features/importantSlice";
import Badge from "./Badge";
import ComplaintImage from "./ComplaintImage";

function ComplaintCard({ complaint, onDelete }) {
  const dispatch = useDispatch();
  const isImportant = useSelector((state) =>
    state.important.some((item) => item.id === complaint.id)
  );

  function handleImportant() {
    if (isImportant) {
      dispatch(removeImportant(complaint.id));
    } else {
      dispatch(addImportant(complaint));
    }
  }

  return (
    <div className="card">
      <ComplaintImage complaint={complaint} className="card-image" />

      <div className="card-body">
        <h3>{complaint.title}</h3>
        <p>{complaint.category}</p>
        <div className="badges">
          <Badge type="status" value={complaint.status} />
          <Badge type="priority" value={complaint.priority} />
        </div>
      </div>

      <div className="card-extra">
        <button
          className={`important-btn ${isImportant ? "active" : ""}`}
          onClick={handleImportant}
        >
          {isImportant ? "★ Remove From Important" : "☆ Mark As Important"}
        </button>
      </div>

      <div className="card-actions">
        <Link className="view-btn" to={`/complaints/${complaint.id}`}>
          View
        </Link>
        <Link className="edit-btn" to={`/edit-complaint/${complaint.id}`}>
          Edit
        </Link>
        <button className="delete-btn" onClick={() => onDelete(complaint.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ComplaintCard;
