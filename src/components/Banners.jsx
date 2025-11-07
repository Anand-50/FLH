import React, { useState } from "react";
import { FaSearch, FaPlus, FaEye, FaEdit, FaTimes, FaCheck } from "react-icons/fa";

const Banner = () => {
  const [search, setSearch] = useState("");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [editBanner, setEditBanner] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [createBanner, setCreateBanner] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [deactivateBanner, setDeactivateBanner] = useState(null);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [banners, setBanners] = useState([
    {
      id: 1,
      name: "Diwali Banner",
      type: "Internal",
      url: "https://google.com",
      image: "https://media.istockphoto.com/id/857667222/photo/happy-diwali-greeting-card-design-using-beautiful-clay-diya-lamps-lit-on-diwali-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=6LKPuh3_vO7jhsTBHFzOjTWQUOvr60yOUc18J1ETdg0=",
      startDate: "2025-10-22",
      endDate: "2026-04-02",
      createdBy: "admin.flh@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Christmas Banner",
      type: "External",
      url: "https://example.com",
      image: "https://images.unsplash.com/photo-1703014133137-9ba90e47bbd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaW1hZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      createdBy: "admin.flh@gmail.com",
      status: "Inactive",
    },
  ]);

  // -------- SEARCH FUNCTION --------
  const filteredBanners = banners.filter(banner =>
    banner.name.toLowerCase().includes(search.toLowerCase()) ||
    banner.type.toLowerCase().includes(search.toLowerCase()) ||
    banner.createdBy.toLowerCase().includes(search.toLowerCase())
  );

  // -------- TOAST MESSAGE --------
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // -------- VIEW --------
  const handleView = (item) => {
    setSelectedBanner(item);
    setOpenModal(true);
  };

  // -------- EDIT --------
  const handleEdit = (item) => {
    setEditBanner({ ...item });
    setOpenEditModal(true);
  };

  // -------- CREATE --------
  const handleCreate = () => {
    setCreateBanner({
      id: banners.length + 1,
      name: "",
      type: "Internal",
      url: "",
      image: "",
      startDate: "",
      endDate: "",
      createdBy: "admin.flh@gmail.com",
      status: "Active",
    });
    setOpenCreateModal(true);
  };

  // -------- UPDATE BANNER --------
  const handleUpdate = () => {
    if (editBanner) {
      setBanners(prev => prev.map(banner => 
        banner.id === editBanner.id ? editBanner : banner
      ));
      setOpenEditModal(false);
      showToast("Banner updated successfully!", "success");
    }
  };

  // -------- HANDLE IMAGE UPLOAD --------
  const handleImageUpload = (event, isCreate = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        if (isCreate) {
          setCreateBanner(prev => ({ ...prev, image: imageDataUrl }));
        } else {
          setEditBanner(prev => ({ ...prev, image: imageDataUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // -------- CREATE NEW BANNER --------
  const handleCreateBanner = () => {
    if (createBanner && createBanner.name && createBanner.url && createBanner.image && createBanner.startDate && createBanner.endDate) {
      setBanners(prev => [...prev, createBanner]);
      setOpenCreateModal(false);
      setCreateBanner(null);
      showToast("Banner created successfully!", "success");
    } else {
      showToast("Please fill all required fields and upload an image!", "error");
    }
  };

  // -------- DEACTIVATE/ACTIVATE HANDLERS --------
  const handleDeactivateClick = (item) => {
    setDeactivateBanner(item);
    setOpenDeactivateModal(true);
  };

  const handleStatusChange = () => {
    if (deactivateBanner) {
      const newStatus = deactivateBanner.status === "Active" ? "Inactive" : "Active";
      const action = newStatus === "Active" ? "activated" : "deactivated";
      
      setBanners(prev => prev.map(banner => 
        banner.id === deactivateBanner.id ? { ...banner, status: newStatus } : banner
      ));
      
      setOpenDeactivateModal(false);
      setDeactivateBanner(null);
      showToast(`Banner ${action} successfully!`, "success");
    }
  };

  // -------- ACTION BUTTON HANDLER --------
  const handleActionButton = (item) => {
    if (item.status === "Active") {
      handleDeactivateClick(item);
    } else {
      handleDeactivateClick(item); // This will show activate confirmation for inactive banners
    }
  };

  // -------- HOME CLICK HANDLER --------
  const handleHomeClick = () => {
    // You can add navigation logic here
    console.log("Home clicked");
    // For example: window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Toast Message */}
      {toast.show && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: toast.type === "success" ? "#4caf50" : "#f44336",
          color: "white",
          padding: "15px 20px",
          borderRadius: "5px",
          zIndex: 10000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          animation: "slideIn 0.3s ease-out"
        }}>
          {toast.message}
        </div>
      )}

      {/* Breadcrumb with Gray Background */}
      <div style={{
        marginBottom: "15px",
        fontSize: "14px",
        background: "#f5f5f5",
        padding: "10px 15px",
        borderRadius: "5px",
        border: "1px solid #e0e0e0"
      }}>
        <span 
          style={{ 
            color: "#c62828", 
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: "bold"
          }}
          onClick={handleHomeClick}
        >
          Home
        </span> | <b>Banners</b>
      </div>

      <h2 style={{ color: "#c62828", marginBottom: "20px" }}>
        Banner Management
      </h2>

      {/* Search + Create - Search on left, Create on right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search banners..."
            style={{
              padding: "10px",
              width: "250px",
              border: "1px solid #ddd",
              borderRadius: "5px 0 0 5px",
            }}
          />
          <button
            style={{
              background: "#ffc107",
              border: "none",
              padding: "10px 15px",
              borderRadius: "0 5px 5px 0",
              cursor: "pointer",
            }}
          >
            <FaSearch />
          </button>
        </div>

        <button
          style={{
            background: "#c62828",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onClick={handleCreate}
        >
          <FaPlus /> Create Banner
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#c62828", color: "#fff" }}>
              <th style={thStyle}>Banner ID</th>
              <th style={thStyle}>Banner Name</th>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Start Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Created By</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBanners.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>
                  <img
                    src={item.image}
                    alt="banner"
                    style={{
                      width: "60px",
                      height: "45px",
                      borderRadius: "5px",
                      objectFit: "cover"
                    }}
                  />
                </td>
                <td style={tdStyle}>{item.startDate}</td>
                <td style={tdStyle}>{item.endDate}</td>
                <td style={tdStyle}>{item.createdBy}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      background: item.status === "Active" ? "#4caf50" : "#6c757d",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button
                    style={actionBtn("#0d6efd")}
                    onClick={() => handleView(item)}
                  >
                    <FaEye />
                  </button>
                  <button
                    style={actionBtn("#ffc107")}
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    style={actionBtn(item.status === "Active" ? "#dc3545" : "#4caf50")}
                    onClick={() => handleActionButton(item)}
                  >
                    {item.status === "Active" ? <FaTimes /> : <FaCheck />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== VIEW MODAL ===================== */}
      {openModal && selectedBanner && (
        <div style={overlayStyle}>
          <div style={{
            ...modalStyle,
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            {/* Header with Close Button */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px"
            }}>
              <h3 style={{ margin: 0, color: "#c62828" }}>Banner Preview</h3>
              <FaTimes 
                style={{ 
                  cursor: "pointer", 
                  color: "#666", 
                  fontSize: "20px" 
                }}
                onClick={() => setOpenModal(false)}
              />
            </div>

            {/* HR Line */}
            <hr style={{ marginBottom: "20px", border: "1px solid #eee" }} />

            <img
              src={selectedBanner.image}
              alt="Banner"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "20px",
                maxHeight: "400px",
                objectFit: "contain"
              }}
            />

            <div style={{ textAlign: "center", padding: "0 10px" }}>
              <p>
                <b>Banner Name:</b> {selectedBanner.name}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span style={{
                  background: selectedBanner.status === "Active" ? "#4caf50" : "#6c757d",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  marginLeft: "8px"
                }}>
                  {selectedBanner.status}
                </span>
              </p>
              <p>
                <b>Start Date:</b> {selectedBanner.startDate}
              </p>
              <p>
                <b>End Date:</b> {selectedBanner.endDate}
              </p>
              
            </div>

            {/* HR Line before Close Button */}
            <hr style={{ margin: "20px 0", border: "1px solid #eee" }} />

            <button
              onClick={() => setOpenModal(false)}
              style={closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===================== CREATE MODAL ===================== */}
      {openCreateModal && createBanner && (
        <div style={overlayStyle}>
          <div
            style={{
              width: "55%",
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: "15px 20px",
                color: "#C62828",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              Create Banner
              <FaTimes
                style={{ cursor: "pointer", color: "#666" }}
                onClick={() => setOpenCreateModal(false)}
              />
            </div>

            {/* BODY */}
            <div style={{ padding: "20px", textAlign: "left" }}>
              {/* Banner Name and Type side by side */}
              <div style={{ display: "flex", gap: "15px", marginBottom: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Banner Name *</label>
                  <input
                    type="text"
                    value={createBanner.name}
                    onChange={(e) =>
                      setCreateBanner({ ...createBanner, name: e.target.value })
                    }
                    style={inputBox}
                    placeholder="Enter banner name"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Type *</label>
                  <select
                    value={createBanner.type}
                    onChange={(e) =>
                      setCreateBanner({ ...createBanner, type: e.target.value })
                    }
                    style={inputBox}
                  >
                    <option>Select Type</option>
                    <option>Internal</option>
                    <option>External</option>
                    <option>Fixed</option>
                  </select>
                </div>
              </div>

              {/* Navigation URL */}
              <label style={labelStyle}>Navigation URL *</label>
              <input
                type="text"
                value={createBanner.url}
                onChange={(e) =>
                  setCreateBanner({ ...createBanner, url: e.target.value })
                }
                style={inputBox}
                placeholder="Enter navigation URL"
              />

              {/* Banner Image */}
              <label style={labelStyle}>Banner Image *</label>
              <input 
                type="file" 
                style={inputBox}
                onChange={(e) => handleImageUpload(e, true)}
                accept="image/*"
              />
              {createBanner.image && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Preview:</p>
                  <img
                    src={createBanner.image}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "100px",
                      borderRadius: "5px",
                      objectFit: "cover",
                      border: "1px solid #ddd"
                    }}
                  />
                </div>
              )}
              <p style={{ fontSize: "12px", color: "#777", marginTop: "5px" }}>
                Please upload a banner image.
              </p>

              {/* Dates */}
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Start Date *</label>
                  <input
                    type="date"
                    value={createBanner.startDate}
                    onChange={(e) =>
                      setCreateBanner({
                        ...createBanner,
                        startDate: e.target.value,
                      })
                    }
                    style={inputBox}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>End Date *</label>
                  <input
                    type="date"
                    value={createBanner.endDate}
                    onChange={(e) =>
                      setCreateBanner({
                        ...createBanner,
                        endDate: e.target.value,
                      })
                    }
                    style={inputBox}
                  />
                </div>
              </div>

              {/* Active */}
              <label style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <input
                  type="checkbox"
                  checked={createBanner.status === "Active"}
                  onChange={(e) =>
                    setCreateBanner({
                      ...createBanner,
                      status: e.target.checked ? "Active" : "Inactive",
                    })
                  }
                />
                Active
              </label>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "25px",
                }}
              >
                <button
                  onClick={() => setOpenCreateModal(false)}
                  style={cancelBtn}
                >
                  Cancel
                </button>

                <button
                  style={createButton}
                  onClick={handleCreateBanner}
                >
                  Create Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== EDIT MODAL ===================== */}
      {openEditModal && editBanner && (
        <div style={overlayStyle}>
          <div
            style={{
              width: "55%",
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: "15px 20px",
                color: "#C62828",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              Edit Banner
              <FaTimes
                style={{ cursor: "pointer", color: "#666" }}
                onClick={() => setOpenEditModal(false)}
              />
            </div>

            {/* BODY */}
            <div style={{ padding: "20px", textAlign: "left" }}>
              {/* Banner Name and Type side by side */}
              <div style={{ display: "flex", gap: "15px", marginBottom: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Banner Name *</label>
                  <input
                    type="text"
                    value={editBanner.name}
                    onChange={(e) =>
                      setEditBanner({ ...editBanner, name: e.target.value })
                    }
                    style={inputBox}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Type *</label>
                  <select
                    value={editBanner.type}
                    onChange={(e) =>
                      setEditBanner({ ...editBanner, type: e.target.value })
                    }
                    style={inputBox}
                  >
                    <option>Select Type</option>
                    <option>Internal</option>
                    <option>External</option>
                    <option>Fixed</option>
                  </select>
                </div>
              </div>

              {/* Navigation URL */}
              <label style={labelStyle}>Navigation URL *</label>
              <input
                type="text"
                value={editBanner.url}
                onChange={(e) =>
                  setEditBanner({ ...editBanner, url: e.target.value })
                }
                style={inputBox}
              />

              {/* Banner Image */}
              <label style={labelStyle}>Banner Image</label>
              <input 
                type="file" 
                style={inputBox}
                onChange={(e) => handleImageUpload(e, false)}
                accept="image/*"
              />
              {editBanner.image && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>Current Image:</p>
                  <img
                    src={editBanner.image}
                    alt="Current"
                    style={{
                      width: "200px",
                      height: "100px",
                      borderRadius: "5px",
                      objectFit: "cover",
                      border: "1px solid #ddd"
                    }}
                  />
                </div>
              )}
              <p style={{ fontSize: "12px", color: "#777", marginTop: "5px" }}>
                Leave empty to keep existing image.
              </p>

              {/* Dates */}
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Start Date *</label>
                  <input
                    type="date"
                    value={editBanner.startDate}
                    onChange={(e) =>
                      setEditBanner({
                        ...editBanner,
                        startDate: e.target.value,
                      })
                    }
                    style={inputBox}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>End Date *</label>
                  <input
                    type="date"
                    value={editBanner.endDate}
                    onChange={(e) =>
                      setEditBanner({
                        ...editBanner,
                        endDate: e.target.value,
                      })
                    }
                    style={inputBox}
                  />
                </div>
              </div>

              {/* Active */}
              <label style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <input
                  type="checkbox"
                  checked={editBanner.status === "Active"}
                  onChange={(e) =>
                    setEditBanner({
                      ...editBanner,
                      status: e.target.checked ? "Active" : "Inactive",
                    })
                  }
                />
                Active
              </label>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "25px",
                }}
              >
                <button
                  onClick={() => setOpenEditModal(false)}
                  style={cancelBtn}
                >
                  Cancel
                </button>

                <button
                  style={updateBtn}
                  onClick={handleUpdate}
                >
                  Update Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DEACTIVATE/ACTIVATE CONFIRMATION MODAL ===================== */}
      {openDeactivateModal && deactivateBanner && (
        <div style={overlayStyle}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}>
            <h3 style={{ color: "#C62828", marginBottom: "15px" }}>
              {deactivateBanner.status === "Active" ? "Deactivate Banner" : "Activate Banner"}
            </h3>
            
            <p style={{ marginBottom: "25px", fontSize: "16px", lineHeight: "1.5" }}>
              Are you sure you want to {deactivateBanner.status === "Active" ? "deactivate" : "activate"} <b>"{deactivateBanner.name}"</b>?
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                onClick={() => setOpenDeactivateModal(false)}
                style={{
                  background: "#6c757d",
                  color: "#fff",
                  padding: "10px 25px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                style={{
                  background: deactivateBanner.status === "Active" ? "#dc3545" : "#4caf50",
                  color: "#fff",
                  padding: "10px 25px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {deactivateBanner.status === "Active" ? "Yes, Deactivate" : "Yes, Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- styles ---------- */

const thStyle = { padding: "12px", textAlign: "left" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee" };

const actionBtn = (bg) => ({
  background: bg,
  border: "none",
  margin: "0 4px",
  padding: "6px 10px",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "4px",
});

const inputBox = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const labelStyle = {
  fontWeight: 600,
  display: "block",
  marginBottom: "5px",
  fontSize: "14px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  width: "60%",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const closeBtn = {
  background: "#6c757d",
  color: "#fff",
  marginTop: "15px",
  padding: "8px 18px",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
};

const cancelBtn = {
  background: "#6c757d",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  border: "none",
};

const updateBtn = {
  background: "#ffc107",
  color: "#000",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  border: "none",
  fontWeight: "bold",
};

const createButton = {
  background: "#ffc107",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  border: "none",
  fontWeight: "bold",
};

// Add CSS animation for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

export default Banner;