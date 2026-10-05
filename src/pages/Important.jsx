import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeImportant } from "../features/importantSlice";
import Badge from "../components/Badge";
import ComplaintImage from "../components/ComplaintImage";

function Important() {
  const dispatch = useDispatch();
  const important = useSelector((state) => state.important);

  return (
    <div className="important-container">
      <h1 className="page-title">Important Complaints</h1>

      {important.length === 0 ? (
        <div className="empty-important">
          <h2>No Important Complaints</h2>
          <p>Mark complaints from the Complaints page.</p>
          <Link className="btn-primary" to="/complaints">
            Browse Complaints
          </Link>
        </div>
      ) : (
        <div className="important-grid">
          {important.map((complaint) => (
            <div key={complaint.id} className="important-card">
              <ComplaintImage complaint={complaint} />

              <div className="important-content">
                <h2>{complaint.title}</h2>
                <p>{complaint.category}</p>
                <div className="badges">
                  <Badge type="priority" value={complaint.priority} />
                  <Badge type="status" value={complaint.status} />
                </div>
                <button onClick={() => dispatch(removeImportant(complaint.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Important;
