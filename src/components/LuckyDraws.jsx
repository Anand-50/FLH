import React, { useState } from "react";
import "./LuckyDraw.css";
import {
  FaEye,
  FaTrophy,
  FaBullhorn,
  FaEdit,
  FaTimes,
  FaPlus,
  FaSearch,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LuckyDraw = () => {
  const [luckyDraws, setLuckyDraws] = useState([
    {
      id: 1,
      title: "Sankranthi Special Luckydraw",
      drawType: "Monthly",
      ticketPrice: 200.0,
      totalTickets: 1500,
      soldTickets: 8,
      startDate: "2025-10-19",
      endDate: "2026-01-10",
      status: "Winners Announced",
    },
  ]);
const [submitted, setSubmitted] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newDraw, setNewDraw] = useState({
    title: "",
    drawType: "Weekly",
    ticketPrice: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  // Sorting
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...luckyDraws].sort((a, b) => {
      if (field === "ticketPrice" || field === "id") {
        return order === "asc" ? a[field] - b[field] : b[field] - a[field];
      } else {
        return order === "asc"
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field]);
      }
    });
    setLuckyDraws(sorted);
  };

  // Add Lucky Draw
// Add Lucky Draw
const handleAddLuckyDraw = (e) => {
  e.preventDefault();

  // Validation check
  if (
    !newDraw.title.trim() ||
    !newDraw.description?.trim() ||
    !newDraw.ticketPrice ||
    newDraw.ticketPrice <= 0 ||
    !newDraw.totalTickets ||
    newDraw.totalTickets <= 0 ||
    !newDraw.startDate ||
    !newDraw.endDate ||
    !newDraw.announcementDate
  ) {
    toast.error("⚠️ Please fill all fields with valid details before saving!");
    return;
  }

  const newEntry = {
    id: luckyDraws.length + 1,
    title: newDraw.title,
    drawType: newDraw.drawType,
    ticketPrice: parseFloat(newDraw.ticketPrice),
    totalTickets: parseInt(newDraw.totalTickets), // ✅ user-entered value
    soldTickets: 0,
    startDate: newDraw.startDate,
    endDate: newDraw.endDate,
    status: newDraw.status,
  };

  setLuckyDraws([...luckyDraws, newEntry]);
  setShowForm(false);
  setNewDraw({
    title: "",
    drawType: "Weekly",
    ticketPrice: "",
    totalTickets: "",
    startDate: "",
    endDate: "",
    announcementDate: "",
    status: "Active",
    description: "",
  });
  toast.success("🎉 Lucky Draw Added Successfully!");
};


  // Delete
  const handleDelete = (id) => {
    setLuckyDraws(luckyDraws.filter((draw) => draw.id !== id));
    toast.info("🗑️ Lucky Draw Deleted!");
  };

  // Edit
  const handleEdit = (id) => {
    toast.info("✏️ Edit feature coming soon!");
  };

  // View
  const handleView = (draw) => {
    toast(`🎟️ ${draw.title} (${draw.drawType}) - ₹${draw.ticketPrice}`);
  };

  // Announce Winner
  const handleWinner = (id) => {
    toast.success(`🏆 Winner Announced for Lucky Draw ID: ${id}`);
  };

  // Send Announcement
  const handleAnnounce = (id) => {
    toast.info(`📢 Announcement sent for Lucky Draw ID: ${id}`);
  };

  const filteredDraws = luckyDraws.filter((draw) =>
    draw.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortIcon = (field) =>
    sortField === field ? (
      sortOrder === "asc" ? (
        <FaChevronUp />
      ) : (
        <FaChevronDown />
      )
    ) : (
      <>
        <FaChevronUp className="inactive" />
        <FaChevronDown className="inactive" />
      </>
    );

  return (
    <div className="lucky-draw-container">
      <div className="breadcrumb-container">
        <span className="home-link">Home</span> |{" "}
        <span className="current-page">Lucky Draw Management</span>
      </div>

      <h1 className="page-title">Lucky Draw Management</h1>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search lucky draws..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Lucky Draw
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="lucky-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID <span className="sort-icons">{sortIcon("id")}</span>
              </th>
              <th>Title</th>
              <th>Draw Type</th>
              <th onClick={() => handleSort("ticketPrice")}>
                Ticket Price <span className="sort-icons">{sortIcon("ticketPrice")}</span>
              </th>
              <th>Tickets</th>
              <th onClick={() => handleSort("startDate")}>
                Start Date <span className="sort-icons">{sortIcon("startDate")}</span>
              </th>
              <th onClick={() => handleSort("endDate")}>
                End Date <span className="sort-icons">{sortIcon("endDate")}</span>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDraws.map((draw) => (
              <tr key={draw.id}>
                <td>{draw.id}</td>
                <td>{draw.title}</td>
                <td>{draw.drawType}</td>
                <td>₹{draw.ticketPrice.toFixed(2)}</td>
                <td>
                  Total: {draw.totalTickets.toLocaleString()}
                  <br />
                  Sold: {draw.soldTickets}
                  <br />
                  Available: {(draw.totalTickets - draw.soldTickets).toLocaleString()}
                </td>
                <td>{draw.startDate}</td>
                <td>{draw.endDate}</td>
                <td>
                  <span
                    className={`status-badge ${
                      draw.status === "Active" ? "status-active" : "status-winner"
                    }`}
                  >
                    {draw.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn view" onClick={() => handleView(draw)}>
                      <FaEye />
                    </button>
                    <button className="icon-btn trophy" onClick={() => handleWinner(draw.id)}>
                      <FaTrophy />
                    </button>
                    <button className="icon-btn announce" onClick={() => handleAnnounce(draw.id)}>
                      <FaBullhorn />
                    </button>
                    <button className="icon-btn edit" onClick={() => handleEdit(draw.id)}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(draw.id)}>
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      {showForm && (
  <div className="form-overlay">
    <div className="form-modal animate-modal p-4">
      <h2 className="mb-4 text-center fw-bold" style={{ color: "#b71c1c" }}>
        Add Lucky Draw
      </h2>

      <form
  onSubmit={(e) => {
    setSubmitted(true);
    handleAddLuckyDraw(e);
  }}
  noValidate
>
        <div className="row g-3">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                required
                value={newDraw.title}
                onChange={(e) => setNewDraw({ ...newDraw, title: e.target.value })}
              />
              {!newDraw.title && (
                <small className="text-danger">Title is required.</small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                rows="4"
                required
                value={newDraw.description}
                onChange={(e) =>
                  setNewDraw({ ...newDraw, description: e.target.value })
                }
              ></textarea>
              {!newDraw.description && (
                <small className="text-danger">Description is required.</small>
              )}
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Ticket Price:</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  min="1"
                  value={newDraw.ticketPrice}
                  onChange={(e) =>
                    setNewDraw({ ...newDraw, ticketPrice: e.target.value })
                  }
                />
                {(!newDraw.ticketPrice || newDraw.ticketPrice <= 0) && (
                  <small className="text-danger">Enter a valid price.</small>
                )}
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Total Tickets:</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  min="1"
                  value={newDraw.totalTickets}
                  onChange={(e) =>
                    setNewDraw({ ...newDraw, totalTickets: e.target.value })
                  }
                />
                {(!newDraw.totalTickets || newDraw.totalTickets <= 0) && (
                  <small className="text-danger">Enter total tickets.</small>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Draw Type:</label>
              <select
                className="form-select"
                value={newDraw.drawType}
                onChange={(e) =>
                  setNewDraw({ ...newDraw, drawType: e.target.value })
                }
              >
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Daily</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="col-12 mb-3">
              <label className="form-label">Start Date:</label>
              <input
                type="date"
                className="form-control"
                required
                value={newDraw.startDate}
                onChange={(e) =>
                  setNewDraw({ ...newDraw, startDate: e.target.value })
                }
              />
              {!newDraw.startDate && (
                <small className="text-danger">Start date is required.</small>
              )}
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">End Date:</label>
              <input
                type="date"
                className="form-control"
                required
                value={newDraw.endDate}
                onChange={(e) =>
                  setNewDraw({ ...newDraw, endDate: e.target.value })
                }
              />
              {!newDraw.endDate && (
                <small className="text-danger">End date is required.</small>
              )}
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Announcement Date:</label>
              <input
                type="date"
                className="form-control"
                required
                value={newDraw.announcementDate}
                onChange={(e) =>
                  setNewDraw({ ...newDraw, announcementDate: e.target.value })
                }
              />
              {!newDraw.announcementDate && (
                <small className="text-danger">Announcement date is required.</small>
              )}
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Status:</label>
              <select
                className="form-select"
                value={newDraw.status}
                onChange={(e) =>
                  setNewDraw({ ...newDraw, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Winners Announced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#b71c1c",
              color: "white",
              border: "none",
              padding: "8px 24px",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default LuckyDraw;
