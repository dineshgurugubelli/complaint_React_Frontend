import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { CATEGORIES } from "../utils/constants";

const features = [
  {
    icon: "📝",
    title: "Easy Complaint Filing",
    text: "Report an issue in less than a minute with a simple form and optional photo.",
  },
  {
    icon: "🔍",
    title: "Search & Filter",
    text: "Find any complaint quickly by title, category, status or priority.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    text: "See whether a complaint is Pending, In Progress or Resolved at any time.",
  },
  {
    icon: "⭐",
    title: "Mark As Important",
    text: "Save urgent complaints to your Important list so you never lose track.",
  },
  {
    icon: "🔐",
    title: "Secure Access",
    text: "Sign up and log in to file and manage complaints safely.",
  },
  {
    icon: "📱",
    title: "Works On Any Device",
    text: "A responsive layout that looks good on desktop, tablet and mobile.",
  },
];

const steps = [
  {
    title: "Sign Up",
    text: "Create a free account or log in.",
  },
  {
    title: "File A Complaint",
    text: "Describe the problem, add its location and set a priority.",
  },
  {
    title: "Get It Assigned",
    text: "The complaint is reviewed and given to the right team.",
  },
  {
    title: "See It Resolved",
    text: "Follow the resolution notes until the issue is closed.",
  },
];

const categoryIcons = {
  Maintenance: "🛠️",
  Electrical: "💡",
  Plumbing: "🚰",
  Sanitation: "🧹",
  Security: "🔒",
  Noise: "🔊",
};

function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const response = await api.get("/complaints");
        const complaints = response.data;
        if (ignore) return;
        setStats({
          total: complaints.length,
          pending: complaints.filter((c) => c.status === "Pending").length,
          inProgress: complaints.filter((c) => c.status === "In Progress").length,
          resolved: complaints.filter((c) => c.status === "Resolved").length,
        });
      } catch (err) {
        // If the API is offline the statistics section is simply hidden.
        console.error(err);
      }
    }

    loadStats();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Complaint Management System</h1>
        <p>Raise, track and resolve complaints in one place.</p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/complaints">
            View Complaints
          </Link>
          <Link className="btn-secondary" to="/add-complaint">
            File Complaint
          </Link>
        </div>
      </div>

      {stats && (
        <section className="home-section">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Complaints</span>
            </div>
            <div className="stat-card stat-pending">
              <span className="stat-number">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card stat-progress">
              <span className="stat-number">{stats.inProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-card stat-resolved">
              <span className="stat-number">{stats.resolved}</span>
              <span className="stat-label">Resolved</span>
            </div>
          </div>
        </section>
      )}

      <section className="home-section">
        <h2 className="section-title">Why Use This System?</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">Complaint Categories</h2>
        <div className="category-grid">
          {CATEGORIES.map((category) => (
            <Link
              className="category-chip"
              key={category}
              to="/complaints"
            >
              <span>{categoryIcons[category] || "📌"}</span>
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <h2>Have a problem that needs attention?</h2>
        <p>File a complaint now and follow it until it is resolved.</p>
        <Link className="btn-primary" to="/add-complaint">
          File A Complaint
        </Link>
      </section>
    </>
  );
}

export default Home;