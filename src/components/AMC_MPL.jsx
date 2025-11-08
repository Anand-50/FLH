
// AmcMplPage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTools,
  FaLifeRing,
  FaClipboardList,
  FaBell,
  FaVideo,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const MAROON = "#b61d23";
const GOLD = "#f7c700";
const ORANGE = "#ff9b00";

export default function AmcMplPage() {
  const [activeTab, setActiveTab] = useState("AMC");
  const [activeView, setActiveView] = useState("overview");
  const [visitsModal, setVisitsModal] = useState({ open: false, item: null });
  const [actionModal, setActionModal] = useState({ open: false, item: null });
  const [videoModal, setVideoModal] = useState({ open: false, url: null });
  const [searchTerm, setSearchTerm] = useState("");

  // Summary data
  const amcSummary = { active: 12, expiring: 3, openTickets: 4 };
  const mplSummary = { active: 8, expiring: 1, openTickets: 2 };

  // AMC rows
  const amcRows = [
    {
      id: "AMC-1001",
      user: "Ravi Kumar",
      product: "Inverter AC 1.5T",
      pricePlan: "Gold",
      visitsCompleted: 2,
      visitsPending: 1,
      validity: "2025-11-30",
      status: "Active",
    },
    {
      id: "AMC-1002",
      user: "Suresh B",
      product: "Washing Machine",
      pricePlan: "Basic",
      visitsCompleted: 0,
      visitsPending: 2,
      validity: "2025-06-12",
      status: "Active",
    },
    {
      id: "AMC-1003",
      user: "Neha Sharma",
      product: "Refrigerator",
      pricePlan: "Premium",
      visitsCompleted: 3,
      visitsPending: 0,
      validity: "2024-12-05",
      status: "Expired",
    },
    {
      id: "AMC-1003",
      user: "Neha Sharma",
      product: "Laptop",
      pricePlan: "Gold",
      visitsCompleted: 2,
      visitsPending: 0,
      validity: "2024-12-05",
      status: "Expired",
    },
    {
      id: "AMC-1001",
      user: "Ravi Kumar",
      product: "Mobile",
      pricePlan: "Basic",
      visitsCompleted: 0,
      visitsPending: 1,
      validity: "2025-11-30",
      status: "Active",
    },
  ];

  // MPL rows (with pre-uploaded videos)
  const [mplRows] = useState([
    {
      id: "MPL-5001",
      user: "Ramesh K",
      product: "Mobile Screen",
      pricePlan: "Gold",
      visitsCompleted: 1,
      visitsPending: 0,
      validity: "2026-02-18",
      status: "Active",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "MPL-5002",
      user: "Priya P",
      product: "Earphones",
      pricePlan: "Basic",
      visitsCompleted: 0,
      visitsPending: 1,
      validity: "2025-09-30",
      status: "Active",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: "MPL-5001",
      user: "Ramesh K",
      product: "Television",
      pricePlan: "Premium",
      visitsCompleted: 1,
      visitsPending: 0,
      validity: "2026-02-18",
      status: "Active",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ]);

  // Tickets
  const serviceTicketsAMC = [
    {
      ticket: "TKT-9001",
      product: "Inverter AC 1.5T",
      issue: "No cooling",
      status: "Pending",
      updated: "2025-10-21",
    },
    {
      ticket: "TKT-9002",
      product: "Washing Machine",
      issue: "Drum noise",
      status: "In-Progress",
      updated: "2025-10-18",
    },
    {
      ticket: "TKT-9003",
      product: "Refrigerator",
      issue: "Not cooling",
      status: "Resolved",
      updated: "2025-09-30",
    },
    {
      ticket: "TKT-9010",
      product: "Laptop",
      issue: "Battery draining fast",
      status: "Pending",
      updated: "2025-11-05",
    },
    {
      ticket: "TKT-9011",
      product: "Laptop",
      issue: "Keyboard not working",
      status: "In-Progress",
      updated: "2025-11-06",
    },
    {
      ticket: "TKT-9020",
      product: "Mobile",
      issue: "Screen flickering",
      status: "Resolved",
      updated: "2025-11-03",
    },
    {
      ticket: "TKT-9021",
      product: "Mobile",
      issue: "Overheating",
      status: "Pending",
      updated: "2025-11-04",
    },
  ];

  const serviceTicketsMPL = [
    {
      ticket: "MPL-TKT-01",
      product: "Mobile Screen",
      issue: "Cracked",
      status: "Pending",
      updated: "2025-11-01",
    },
    {
      ticket: "MPL-TKT-02",
      product: "Earphones",
      issue: "No sound",
      status: "Resolved",
      updated: "2025-10-10",
    },
    {
      ticket: "MPL-TKT-05",
      product: "Television",
      issue: "Display flickering",
      status: "In-Progress",
      updated: "2025-11-04",
    },
    {
      ticket: "MPL-TKT-06",
      product: "Television",
      issue: "No power",
      status: "Pending",
      updated: "2025-11-05",
    },
  ];

  const currentSummary = activeTab === "AMC" ? amcSummary : mplSummary;
  const currentTickets =
    activeTab === "AMC" ? serviceTicketsAMC : serviceTicketsMPL;

  // Filter logic
  const filterData = (rows) => {
    if (!searchTerm.trim()) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter(
      (r) =>
        r.id.toLowerCase().includes(term) ||
        r.user.toLowerCase().includes(term)
    );
  };

  const filteredAmc = filterData(amcRows);
  const filteredMpl = filterData(mplRows);

  return (
    <div className="container my-4">
      {/* Title */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 style={{ color: MAROON, fontWeight: 700 }}>AMC / MPL</h2>
        <div className="d-flex align-items-center" style={{ gap: 12 }}>
          <button
            className={`btn ${activeTab === "AMC" ? "" : "btn-outline-secondary"}`}
            onClick={() => {
              setActiveTab("AMC");
              setActiveView("overview");
              setSearchTerm("");
            }}
            style={{
              background: activeTab === "AMC" ? GOLD : "white",
              color: activeTab === "AMC" ? "#222" : "#333",
              borderRadius: 8,
              padding: "10px 18px",
              border:
                activeTab === "AMC"
                  ? "1px solid #e6b800"
                  : "1px solid #ddd",
            }}
          >
            <FaTools className="me-2" /> AMC
          </button>
          <button
            className={`btn ${activeTab === "MPL" ? "" : "btn-outline-secondary"}`}
            onClick={() => {
              setActiveTab("MPL");
              setActiveView("overview");
              setSearchTerm("");
            }}
            style={{
              background: activeTab === "MPL" ? ORANGE : "white",
              color: activeTab === "MPL" ? "white" : "#333",
              borderRadius: 8,
              padding: "10px 18px",
              border:
                activeTab === "MPL"
                  ? "1px solid rgba(0,0,0,0.06)"
                  : "1px solid #ddd",
            }}
          >
            <FaLifeRing className="me-2" /> MPL
          </button>
        </div>
      </div>

      {/* Overview cards */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row mb-3">
            {["Active", "Expiring", "Open Tickets"].map((label, i) => (
              <div className="col-md-4 mb-2" key={label}>
                <div
                  className="p-3 rounded d-flex align-items-center"
                  style={{ background: "#fff", border: "1px solid #eee" }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: "#666" }}>
                      {label} {activeTab}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>
                      {label === "Active"
                        ? currentSummary.active
                        : label === "Expiring"
                        ? currentSummary.expiring
                        : currentSummary.openTickets}
                    </div>
                  </div>
                  <div style={{ width: 80, textAlign: "center" }}>
                    <span className="badge bg-danger text-light p-2 rounded-pill">
                      {label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button
              className={`btn ${
                activeView === "management" ? "" : "btn-outline-secondary"
              }`}
              onClick={() => setActiveView("management")}
              style={{
                background:
                  activeView === "management" ? MAROON : "white",
                color: activeView === "management" ? "white" : "#333",
                padding: "10px 18px",
                borderRadius: 8,
                border:
                  activeView === "management"
                    ? `1px solid ${MAROON}`
                    : "1px solid #ddd",
              }}
            >
              <FaClipboardList className="me-2" /> {activeTab} Management
            </button>
            <button
              className={`btn ${
                activeView === "tracking" ? "" : "btn-outline-secondary"
              }`}
              onClick={() => setActiveView("tracking")}
              style={{
                background:
                  activeView === "tracking" ? GOLD : "white",
                color: activeView === "tracking" ? "#222" : "#333",
                padding: "10px 18px",
                borderRadius: 8,
                border:
                  activeView === "tracking"
                    ? `1px solid #e6b800`
                    : "1px solid #ddd",
              }}
            >
              <FaBell className="me-2" /> Service Tracking
            </button>
          </div>
        </div>
      </div>

      {/* Management view */}
      {activeView === "management" && (
        <div className="card shadow-sm mb-4">
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ background: MAROON, color: "white", fontWeight: 700 }}
          >
            {activeTab} Management
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder={`Search by ${activeTab} ID or Username...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "250px",
                  borderRadius: "6px",
                  marginRight: "8px",
                }}
              />
              <FaSearch />
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped mb-0 align-middle">
                <thead style={{ background: "#9f1a22", color: "white" }}>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Price Plan</th>
                    <th>Visits</th>
                    <th>Validity</th>
                    <th>Status</th>
                    {activeTab === "MPL" && <th>Video</th>}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "AMC" ? filteredAmc : filteredMpl).map(
                    (r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.user}</td>
                        <td>{r.product}</td>
                        <td>{r.pricePlan}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              setVisitsModal({ open: true, item: r })
                            }
                          >
                            {r.visitsCompleted} / {r.visitsPending}
                          </button>
                        </td>
                        <td>{r.validity}</td>
                        <td>
                          <span
                            className={`badge ${
                              r.status === "Active"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>

                        {/* 🎥 Video View Only */}
                        {activeTab === "MPL" && (
                          <td>
                            {r.video ? (
                              <button
                                className="btn btn-sm btn-outline-info"
                                onClick={() =>
                                  setVideoModal({ open: true, url: r.video })
                                }
                              >
                                <FaEye /> View
                              </button>
                            ) : (
                              "Null"
                            )}
                          </td>
                        )}

                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() =>
                                setActionModal({ open: true, item: r })
                              }
                            >
                              Details
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tracking View */}
      {activeView === "tracking" && (
        <div className="card shadow-sm mb-4">
          <div
            className="card-header"
            style={{ background: MAROON, color: "white", fontWeight: 700 }}
          >
            {activeTab} Service Tracking
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Ticket</th>
                    <th>Product</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTickets.map((t) => (
                    <tr key={t.ticket}>
                      <td>
                        <strong>{t.ticket}</strong>
                      </td>
                      <td>{t.product}</td>
                      <td>{t.issue}</td>
                      <td>
                        <span className="badge bg-primary">{t.status}</span>
                      </td>
                      <td>{t.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Visits Modal */}
      {visitsModal.open && visitsModal.item && (
        <Modal
          title="Visit Details"
          onClose={() => setVisitsModal({ open: false, item: null })}
        >
          <p>
            <strong>{visitsModal.item.id}</strong> —{" "}
            {visitsModal.item.user}
          </p>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
              Completed Visits{" "}
              <span className="badge bg-success">
                {visitsModal.item.visitsCompleted}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              Pending Visits{" "}
              <span className="badge bg-warning">
                {visitsModal.item.visitsPending}
              </span>
            </li>
          </ul>
        </Modal>
      )}

      {/* Action Modal */}
      {actionModal.open && actionModal.item && (
        <Modal
          title="Details"
          onClose={() => setActionModal({ open: false, item: null })}
        >
          <p>
            <strong>{actionModal.item.user}</strong> —{" "}
            {actionModal.item.product}
          </p>
          <p>
            <strong>Plan:</strong> {actionModal.item.pricePlan}
          </p>
          <p>
            <strong>Validity:</strong> {actionModal.item.validity}
          </p>
        </Modal>
      )}

      {/* Video Modal */}
      {videoModal.open && (
        <Modal
          title="View Video"
          onClose={() => setVideoModal({ open: false, url: null })}
        >
          <video
            src={videoModal.url}
            controls
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Modal>
      )}
    </div>
  );
}

// 🔹 Reusable modal component
function Modal({ title, children, onClose }) {
  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.45)" }}
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger fw-bold">{title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}