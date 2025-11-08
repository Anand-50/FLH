// LuckyDraw.js
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
  FaSave,
  FaUndo,
  FaGift,
} from "react-icons/fa";
import LuckyDrawPrizes from "./Ldp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LuckyDraw = () => {
  const [luckyDraws, setLuckyDraws] = useState([
    {
      id: 1,
      title: "Vinayaka Chavithi - Lucky Draw",
      ticketPrice: 50.0,
      totalTickets: 1000,
      soldTickets: 1,
      ticketsRemaining: 999,
      startDate: "11/1/2025",
      endDate: "11/15/2025",
      status: "announced",
      prizes: [
        { type: "product", value: 50000, winner: 13, ticket: "FLD-4-13-000009", status: "awarded" },
        { type: "cash", value: 20000, winner: 13, ticket: "FLD-4-13-000009", status: "claimed" },
        { type: "product", value: 49500, winner: "N/A", ticket: "N/A", status: "pending" },
        { type: "cash", value: 15000, winner: "N/A", ticket: "N/A", status: "pending" },
        { type: "cash", value: 15000, winner: "N/A", ticket: "N/A", status: "pending" },
      ],
      numberOfWinners: 6,
    },
  ]);
  
  const [submitted, setSubmitted] = useState(false);
  const [showPrizes, setShowPrizes] = useState(false);
  const [selectedDrawForPrizes, setSelectedDrawForPrizes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [viewDraw, setViewDraw] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  // const [showWinnerPage, setShowWinnerPage] = useState(false);
  // const [winnerDrawId, setWinnerDrawId] = useState(null);
  const [newDraw, setNewDraw] = useState({
    title: "",
    drawType: "Weekly",
    ticketPrice: "",
    totalTickets: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

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

  const handleAddLuckyDraw = (e) => {
    e.preventDefault();
    if (
      !newDraw.title.trim() ||
      !newDraw.ticketPrice ||
      newDraw.ticketPrice <= 0 ||
      !newDraw.totalTickets ||
      newDraw.totalTickets <= 0 ||
      !newDraw.startDate ||
      !newDraw.endDate
    ) {
      toast.error("Please fill all fields with valid details!");
      return;
    }

    const newEntry = {
      id: luckyDraws.length + 1,
      title: newDraw.title,
      ticketPrice: parseFloat(newDraw.ticketPrice),
      totalTickets: parseInt(newDraw.totalTickets),
      soldTickets: 0,
      ticketsRemaining: parseInt(newDraw.totalTickets),
      startDate: newDraw.startDate,
      endDate: newDraw.endDate,
      status: "Active",
      prizes: [],
      numberOfWinners: 0,
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
      status: "Active",
    });
    toast.success("Lucky Draw Added Successfully!");
  };

  const handleDelete = (id) => {
    setLuckyDraws(luckyDraws.filter((draw) => draw.id !== id));
    toast.info("Lucky Draw Deleted!");
  };

  const handleEdit = (id) => {
    const drawToEdit = luckyDraws.find(draw => draw.id === id);
    setEditData(drawToEdit);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setLuckyDraws(luckyDraws.map(draw => 
      draw.id === editData.id ? editData : draw
    ));
    setIsEditing(false);
    setEditData(null);
    toast.success("Lucky Draw Updated Successfully!");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleView = (draw) => {
    setViewDraw(draw);
  };

  const handlePrizes = (draw) => {
    setSelectedDrawForPrizes(draw);
    setShowPrizes(true);
  };

  // const handleWinner = (id) => {
  //   setWinnerDrawId(id);
  //   setShowWinnerPage(true);
  // };

  const handleAnnounce = (id) => {
    toast.info(`Announcement sent for ID: ${id}`);
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

      {/* LUCKY DRAW PRIZES PAGE */}
      {showPrizes && (
        <LuckyDrawPrizes 
          draw={selectedDrawForPrizes}
          onClose={() => setShowPrizes(false)}
        />
      )}

      {/* EDIT MODAL */}
      {isEditing && editData && (
        <div className="modalOverlay" onClick={handleCancelEdit}>
          <div className="modalBox edit-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-header">
              <h3>Edit Lucky Draw</h3>
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSaveEdit}>
                  <FaSave /> Save
                </button>
                <button className="btn-cancel" onClick={handleCancelEdit}>
                  <FaUndo /> Cancel
                </button>
              </div>
            </div>

            <div className="edit-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Ticket Price:</label>
                  <input
                    type="number"
                    value={editData.ticketPrice}
                    onChange={(e) => setEditData({...editData, ticketPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Total Tickets:</label>
                  <input
                    type="number"
                    value={editData.totalTickets}
                    onChange={(e) => setEditData({...editData, totalTickets: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Sold Tickets:</label>
                  <input
                    type="number"
                    value={editData.soldTickets}
                    onChange={(e) => setEditData({...editData, soldTickets: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    type="text"
                    value={editData.startDate}
                    onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    type="text"
                    value={editData.endDate}
                    onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="announced">Winners Announced</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <th>Ticket Price</th>
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
                <td>₹{draw.ticketPrice.toFixed(2)}</td>
                <td>
                  Total: {draw.totalTickets.toLocaleString()}
                  <br />
                  Sold: {draw.soldTickets}
                  <br />
                  Available: {draw.ticketsRemaining?.toLocaleString() || (draw.totalTickets - draw.soldTickets).toLocaleString()}
                </td>
                <td>{draw.startDate}</td>
                <td>{draw.endDate}</td>
                <td>
                  <span
                    className={`status-badge ${
                      draw.status === "Active" ? "status-active" : "status-winner"
                    }`}
                  >
                    {draw.status === "announced" ? "Winners Announced" : draw.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn view" onClick={() => handleView(draw)}>
                      <FaEye />
                    </button>
                    {/* <button className="icon-btn trophy" onClick={() => handleWinner(draw.id)}>
                      <FaTrophy />
                    </button> */}
                    <button className="icon-btn trophy" onClick={() => handlePrizes(draw)}>
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

      {/* ==================== EXACT UI MODAL FROM IMAGE ==================== */}
      {viewDraw && (
        <div className="modalOverlay" onClick={() => setViewDraw(null)}>
          <div className="modalBox" onClick={e => e.stopPropagation()}>

            {/* ---------- RED HEADER ROW ---------- */}
            <div className="hdr">
              <div className="hdrLabel">Title</div>
              <div className="hdrLabel">Ticket Price</div>
              <div className="hdrLabel">Start Date</div>
              <div className="hdrLabel">End Date</div>
              <div className="hdrLabel">Status</div>

              <div className="hdrValue">{viewDraw.title}</div>
              <div className="hdrValue">₹{viewDraw.ticketPrice.toFixed(2)}</div>
              <div className="hdrValue">{viewDraw.startDate}</div>
              <div className="hdrValue">{viewDraw.endDate}</div>
              <div className="hdrValue"><span className="statusBadge">announced</span></div>
            </div>

            {/* ---------- 4 COLOURED STAT CARDS ---------- */}
            <div className="stats">
              <div className="card total">
                <div className="num">{viewDraw.totalTickets}</div>
                <div className="txt">Total Tickets</div>
              </div>
              <div className="card sold">
                <div className="num">{viewDraw.soldTickets}</div>
                <div className="txt">Tickets Sold</div>
              </div>
              <div className="card remain">
                <div className="num">
                  {viewDraw.ticketsRemaining ?? viewDraw.totalTickets - viewDraw.soldTickets}
                </div>
                <div className="txt">Tickets Remaining</div>
              </div>
              <div className="card winners">
                <div className="num">{viewDraw.numberOfWinners}</div>
                <div className="txt">Number of Winners</div>
              </div>
            </div>

            {/* ---------- PRIZE TABLE ---------- */}
            <div className="prize">
              <h3>Prize Details</h3>
              <table className="prizeTbl">
                <thead>
                  <tr>
                    <th>Prize Type</th>
                    <th>Prize Value (₹)</th>
                    <th>Winner</th>
                    <th>Winner Ticket</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {viewDraw.prizes.map((p, i) => (
                    <tr key={i}>
                      <td>{p.type}</td>
                      <td>{p.value.toLocaleString()}</td>
                      <td>{p.winner}</td>
                      <td>{p.ticket}</td>
                      <td><span className={`st ${p.status}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------- SEARCH USERS ---------- */}
            <div className="search">
              <label>Search Users</label>
              <div className="inp">
                <input type="text" placeholder="Enter mobile number" />
                <button><FaSearch /></button>
              </div>
            </div>

            {/* ---------- CLOSE X ---------- */}
            <button className="closeX" onClick={() => setViewDraw(null)}>×</button>
          </div>
        </div>
      )}

      {/* Add Form Modal */}
      {showForm && (
        <div className="form-overlay">
          <div
            className="form-modal animate-modal"
            style={{
              width: "70%",
              maxWidth: "850px",
              marginTop: "80px",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "20px",
            }}
          >
            <h2 className="mb-3 text-center fw-bold" style={{ color: "#b71c1c", fontSize: "1.6rem" }}>
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