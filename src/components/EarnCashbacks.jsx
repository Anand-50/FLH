// EarnCashbacks.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cashback from "./Cashback";

function EarnCashbacks({ onTabChange }) {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showWinnersPage, setShowWinnersPage] = useState(false);
  const [showAddPrize, setShowAddPrize] = useState(false);
  const [showCashbackModal, setShowCashbackModal] = useState(false);
  const [selectedCashback, setSelectedCashback] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [cashbacksData, setCashbacksData] = useState([
    {
      id: 1,
      title: "Mega Shopping Cashbacks",
      category: "T1",
      ticketPrice: "₹200.00",
      totalTickets: 1000,
      sold: 1,
      available: 999,
      startDate: "19/10/2025",
      endDate: "10/01/2026",
      status: "Active",
      isDeactivated: false,
      winnersAnnounced: false,
    },
    {
      id: 2,
      title: "Shopping Bills",
      category: "T2",
      ticketPrice: "₹100.00",
      totalTickets: 800,
      sold: 5,
      available: 795,
      startDate: "01/11/2025",
      endDate: "08/11/2025",
      status: "Active",
      isDeactivated: false,
      winnersAnnounced: false,
    },
    {
      id: 3,
      title: "Festive Bonanza",
      category: "T3",
      ticketPrice: "₹100.00",
      totalTickets: 800,
      sold: 5,
      available: 795,
      startDate: "01/11/2025",
      endDate: "08/11/2025",
      status: "Active",
      isDeactivated: false,
      winnersAnnounced: false,
    },
    {
      id: 4,
      title: "Winter Cashback Deals",
      category: "T4",
      ticketPrice: "₹250.00",
      totalTickets: 900,
      sold: 10,
      available: 890,
      startDate: "10/11/2025",
      endDate: "25/11/2025",
      status: "Active",
      isDeactivated: false,
      winnersAnnounced: false,
    },
  ]);

  const [editData, setEditData] = useState({
    id: "",
    title: "",
    category: "",
    ticketPrice: "",
    totalTickets: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [editErrors, setEditErrors] = useState({
    title: "",
    category: "",
    ticketPrice: "",
    totalTickets: "",
    startDate: "",
    endDate: "",
  });

  const [prizeData, setPrizeData] = useState({
    position: "",
    value: ""
  });

  const [prizeErrors, setPrizeErrors] = useState({
    position: "",
    value: ""
  });

  const [prizes, setPrizes] = useState([
    { id: 4, position: 1, value: "50000", winnerId: "N/A", phone: "N/A", name: "N/A", ticket: "N/A", status: "Pending" },
    { id: 5, position: 2, value: "1000", winnerId: "N/A", phone: "N/A", name: "N/A", ticket: "N/A", status: "Pending" },
    { id: 6, position: 5, value: "1000", winnerId: "N/A", phone: "N/A", name: "N/A", ticket: "N/A", status: "Pending" },
  ]);

  // New state for editing & deleting prizes
  const [showEditPrize, setShowEditPrize] = useState(false);
  const [editPrizeData, setEditPrizeData] = useState({
    id: "",
    position: "",
    value: ""
  });
  const [editPrizeErrors, setEditPrizeErrors] = useState({ position: "", value: "" });

  const [showDeletePrize, setShowDeletePrize] = useState(false);
  const [prizeToDelete, setPrizeToDelete] = useState(null);

  // Handle navigation to Categories
  const handleCategoriesClick = () => {
    navigate("/categories");
  };

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Search functionality
  const filteredCashbacks = cashbacksData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm)
  );

  // Handle adding new cashback
  const handleAddCashback = (cashbackData) => {
    const newCashback = {
      id: cashbacksData.length + 1,
      title: cashbackData.title,
      category: cashbackData.category,
      ticketPrice: cashbackData.ticketPrice,
      totalTickets: cashbackData.totalTickets,
      sold: 0,
      available: cashbackData.totalTickets,
      startDate: formatDate(cashbackData.startDate),
      endDate: formatDate(cashbackData.endDate),
      status: "Active",
      isDeactivated: false,
      winnersAnnounced: false,
    };

    setCashbacksData(prevData => [...prevData, newCashback]);
    setShowCashbackModal(false);
    showToast("Cashback added successfully!", "success");
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Convert date from DD/MM/YYYY to YYYY-MM-DD for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  // Validation functions
  const validateEditForm = () => {
    const errors = {};
    let isValid = true;

    if (!editData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }
    if (!editData.category.trim()) {
      errors.category = "Category is required";
      isValid = false;
    }
    if (!editData.ticketPrice.trim()) {
      errors.ticketPrice = "Ticket price is required";
      isValid = false;
    }
    if (!editData.totalTickets.trim()) {
      errors.totalTickets = "Total tickets is required";
      isValid = false;
    }
    if (!editData.startDate.trim()) {
      errors.startDate = "Start date is required";
      isValid = false;
    }
    if (!editData.endDate.trim()) {
      errors.endDate = "End date is required";
      isValid = false;
    }

    setEditErrors(errors);
    return isValid;
  };

  const validatePrizeForm = () => {
    const errors = {};
    let isValid = true;

    if (!prizeData.position.toString().trim()) {
      errors.position = "Winning position is required";
      isValid = false;
    } else if (isNaN(prizeData.position) || parseInt(prizeData.position) <= 0) {
      errors.position = "Please enter a valid position number";
      isValid = false;
    }

    if (!prizeData.value.toString().trim()) {
      errors.value = "Prize value is required";
      isValid = false;
    } else if (isNaN(prizeData.value) || parseInt(prizeData.value) <= 0) {
      errors.value = "Please enter a valid prize value";
      isValid = false;
    }

    setPrizeErrors(errors);
    return isValid;
  };

  // Validation for editing prize (separate so we don't mix states)
  const validateEditPrizeForm = () => {
    const errors = {};
    let isValid = true;

    if (!editPrizeData.position.toString().trim()) {
      errors.position = "Winning position is required";
      isValid = false;
    } else if (isNaN(editPrizeData.position) || parseInt(editPrizeData.position) <= 0) {
      errors.position = "Please enter a valid position number";
      isValid = false;
    }

    if (!editPrizeData.value.toString().trim()) {
      errors.value = "Prize value is required";
      isValid = false;
    } else if (isNaN(editPrizeData.value) || parseInt(editPrizeData.value) <= 0) {
      errors.value = "Please enter a valid prize value";
      isValid = false;
    }

    setEditPrizeErrors(errors);
    return isValid;
  };

  const breadcrumb = { fontSize: "14px", marginBottom: "8px" };
  const titleStyle = { fontSize: "24px", fontWeight: "700", marginBottom: "20px" };
  const tabContainer = { display: "flex", gap: "20px", marginBottom: "20px" };
  const tabActive = {
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    background: "#B11226",
    color: "#fff",
    border: "1px solid #B11226",
  };
  const tabInactive = {
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    background: "#ECECEC",
    color: "#000",
    border: "1px solid #ccc",
  };
  const searchRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  };
  const searchInput = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "250px",
  };
  const searchBtn = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    background: "#ECECEC",
    border: "1px solid #ccc",
  };
  const addBtn = {
    background: "#B11226",
    color: "white",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
  };
  const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "20px" };
  const tableHead = { background: "#B11226", color: "#fff" };
  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    verticalAlign: "top",
  };
  const thStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
  };
  const statusActive = {
    background: "#007BFF",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "12px",
    display: "inline-block",
  };
  const statusInactive = {
    background: "#6c757d",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "12px",
    display: "inline-block",
  };
  const statusAnnounced = {
    background: "#28a745",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "12px",
    display: "inline-block",
  };
  const actionBtnYellow = {
    background: "#FFC107",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginRight: "5px",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const actionBtnOrange = {
    background: "#FF9800",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginRight: "5px",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const actionBtnGreen = {
    background: "#28a745",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginRight: "5px",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const actionBtnBlue = {
    background: "#007BFF",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginRight: "5px",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const actionBtnRed = {
    background: "#B11226",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const actionBtnGray = {
    background: "#28a745",
    padding: "6px",
    borderRadius: "4px",
    cursor: "not-allowed",
    border: "none",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.6",
  };

  // Error message style
  const errorStyle = {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
    display: "block",
  };

  // Input style with error state
  const getInputStyle = (hasError) => ({
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: hasError ? "1px solid #dc3545" : "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: hasError ? "#fff5f5" : "white"
  });

  const handleEditClick = (item) => {
    // Convert dates from DD/MM/YYYY to YYYY-MM-DD for the input fields
    const formattedItem = {
      ...item,
      startDate: formatDateForInput(item.startDate),
      endDate: formatDateForInput(item.endDate)
    };
    
    setEditData(formattedItem);
    setEditErrors({
      title: "",
      category: "",
      ticketPrice: "",
      totalTickets: "",
      startDate: "",
      endDate: "",
    });
    setShowEdit(true);
  };
  
  const handleCloseEdit = () => setShowEdit(false);
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
    
    // Clear error when user starts typing
    if (editErrors[name]) {
      setEditErrors({ ...editErrors, [name]: "" });
    }
  };
  
  const handleUpdate = () => {
    if (!validateEditForm()) {
      showToast("Please fill all required fields correctly!", "error");
      return;
    }
    
    console.log("Updated Data:", editData);
    // Update the cashback in the state - convert dates back to DD/MM/YYYY format
    const updatedData = {
      ...editData,
      startDate: formatDate(editData.startDate),
      endDate: formatDate(editData.endDate)
    };
    
    setCashbacksData(prevData => 
      prevData.map(item => 
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );
    setShowEdit(false);
    showToast("Cashback updated successfully!", "success");
  };
  
  const handleDeactivateClick = (item) => {
    setSelectedCashback(item);
    setShowDeactivate(true);
  };
  
  const handleConfirmDeactivate = () => {
    console.log("Deactivated:", selectedCashback.title);
    // Update the cashback status in state
    setCashbacksData(prevData => 
      prevData.map(item => 
        item.id === selectedCashback.id 
          ? { ...item, status: "Inactive", isDeactivated: true }
          : item
      )
    );
    setShowDeactivate(false);
    showToast("Cashback deactivated successfully!", "success");
    setSelectedCashback(null);
  };
  
  const handleCancelDeactivate = () => {
    setShowDeactivate(false);
    setSelectedCashback(null);
  };

  // Activation handlers
  const handleActivateClick = (item) => {
    setSelectedCashback(item);
    setShowActivate(true);
  };
  
  const handleConfirmActivate = () => {
    console.log("Activated:", selectedCashback.title);
    // Update the cashback status in state
    setCashbacksData(prevData => 
      prevData.map(item => 
        item.id === selectedCashback.id 
          ? { ...item, status: "Active", isDeactivated: false }
          : item
      )
    );
    setShowActivate(false);
    showToast("Cashback activated successfully!", "success");
    setSelectedCashback(null);
  };
  
  const handleCancelActivate = () => {
    setShowActivate(false);
    setSelectedCashback(null);
  };

  const handleAnnouncementClick = (item) => {
    setSelectedCashback(item);
    setShowAnnouncement(true);
  };
  
  const handleConfirmAnnouncement = () => {
    console.log("Announcement created for:", selectedCashback.title);
    // Update the cashback to show winners announced
    setCashbacksData(prevData => 
      prevData.map(item => 
        item.id === selectedCashback.id 
          ? { ...item, status: "Winners Announced", winnersAnnounced: true }
          : item
      )
    );
    showToast(`Winners announced for "${selectedCashback.title}"!`, "success");
    setShowAnnouncement(false);
    setSelectedCashback(null);
  };
  
  const handleCancelAnnouncement = () => {
    setShowAnnouncement(false);
    setSelectedCashback(null);
  };
  
  const handleWinnerClick = (item) => {
    setSelectedCashback(item);
    setShowWinnersPage(true);
  };
  
  const handleBackFromWinners = () => {
    setShowWinnersPage(false);
    setSelectedCashback(null);
  };

  // Add Prize handlers
  const handleAddPrizeClick = () => {
    setPrizeErrors({ position: "", value: "" });
    setShowAddPrize(true);
  };

  const handleCloseAddPrize = () => {
    setShowAddPrize(false);
    setPrizeData({
      position: "",
      value: ""
    });
    setPrizeErrors({ position: "", value: "" });
  };

  const handlePrizeChange = (e) => {
    const { name, value } = e.target;
    setPrizeData({ ...prizeData, [name]: value });
    
    // Clear error when user starts typing
    if (prizeErrors[name]) {
      setPrizeErrors({ ...prizeErrors, [name]: "" });
    }
  };

  const handleAddPrizeSubmit = () => {
    if (!validatePrizeForm()) {
      return;
    }

    const newPrize = {
      id: prizes.length + 1,
      position: parseInt(prizeData.position),
      value: prizeData.value, // Remove the % symbol here
      winnerId: "N/A",
      phone: "N/A",
      name: "N/A",
      ticket: "N/A",
      status: "Pending"
    };

    setPrizes(prevPrizes => [...prevPrizes, newPrize]);
    showToast(`Prize added: Position ${prizeData.position}, Value ${prizeData.value}`, "success");
    handleCloseAddPrize();
  };

  // Prize edit handlers (new)
  const handleEditPrizeClick = (p) => {
    setEditPrizeErrors({ position: "", value: "" });
    setEditPrizeData({
      id: p.id,
      position: p.position.toString(),
      value: p.value.toString()
    });
    setShowEditPrize(true);
  };

  const handleCloseEditPrize = () => {
    setShowEditPrize(false);
    setEditPrizeData({ id: "", position: "", value: "" });
    setEditPrizeErrors({ position: "", value: "" });
  };

  const handleEditPrizeChange = (e) => {
    const { name, value } = e.target;
    setEditPrizeData({ ...editPrizeData, [name]: value });
    if (editPrizeErrors[name]) {
      setEditPrizeErrors({ ...editPrizeErrors, [name]: "" });
    }
  };

  const handleUpdatePrize = () => {
    if (!validateEditPrizeForm()) {
      showToast("Please fill all required fields for prize correctly!", "error");
      return;
    }

    const updatedPrize = {
      id: editPrizeData.id,
      position: parseInt(editPrizeData.position),
      value: editPrizeData.value.toString()
    };

    setPrizes(prev => prev.map(pr => pr.id === updatedPrize.id ? { ...pr, position: updatedPrize.position, value: updatedPrize.value } : pr));
    showToast(`Prize updated: Position ${updatedPrize.position}, Value ${updatedPrize.value}`, "success");
    handleCloseEditPrize();
  };

  // Prize delete handlers (new)
  const handleDeletePrizeClick = (p) => {
    setPrizeToDelete(p);
    setShowDeletePrize(true);
  };

  const handleConfirmDeletePrize = () => {
    if (!prizeToDelete) return;
    setPrizes(prev => prev.filter(pr => pr.id !== prizeToDelete.id));
    showToast(`Prize deleted (ID ${prizeToDelete.id})`, "success");
    setPrizeToDelete(null);
    setShowDeletePrize(false);
  };

  const handleCancelDeletePrize = () => {
    setPrizeToDelete(null);
    setShowDeletePrize(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      // Search is already handled by the filteredCashbacks, this is just for the button click
      console.log("Searching for:", searchTerm);
    }
  };

  if (showWinnersPage && selectedCashback) {
    return (
      <div style={{ padding: "20px", width: "100%" }}>
        <p style={breadcrumb}>
          <b>Home</b> | <b>Cashback Management</b> | Prizes
        </p>
        <h2 style={{ color: "#B11226", fontWeight: "700" }}>
          Prizes for: {selectedCashback.title.toLowerCase()}
        </h2>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <button
            onClick={handleAddPrizeClick}
            style={{
              background: "#B11226",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Add Prize
          </button>
        </div>

        <div style={{ background: "#fff", borderRadius: "8px", padding: "15px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={tableHead}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Winning Position</th>
                <th style={thStyle}>Prize Value</th>
                <th style={thStyle}>Winner ID</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>Winner Name</th>
                <th style={thStyle}>Winner Ticket</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prizes.map((p) => (
                <tr key={p.id}>
                  <td style={tdStyle}>{p.id}</td>
                  <td style={tdStyle}>{p.position}</td>
                  <td style={tdStyle}>{p.value}</td>
                  <td style={tdStyle}>{p.winnerId}</td>
                  <td style={tdStyle}>{p.phone}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.ticket}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background: "#FFC107",
                        color: "#000",
                        padding: "4px 10px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {/* View winners already exists at the cashback list; here for prize actions */}
                    <button
                      title="Edit Prize"
                      onClick={() => handleEditPrizeClick(p)}
                      style={{
                        marginRight: "8px",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "none",
                        background: "#007BFF",
                        color: "#fff",
                        fontWeight: 600
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      title="Delete Prize"
                      onClick={() => handleDeletePrizeClick(p)}
                      style={{
                        padding: "6px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "none",
                        background: "#B11226",
                        color: "#fff",
                        fontWeight: 600
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleBackFromWinners}
            style={{
              background: "#6c757d",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>

        {/* Add Prize Modal */}
        {showAddPrize && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "500px",
                padding: "25px",
                position: "relative",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <h2 style={{ 
                fontSize: "20px", 
                color: "#000", 
                marginBottom: "20px",
                fontWeight: "700",
                textAlign: "center"
              }}>
                Add Prize
              </h2>

              {/* Cashback Name Section */}
              <div style={{ marginBottom: "25px" }}>
                <div style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333"
                }}>
                  Ear Cashback Name
                </div>
                <div style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  background: "#f9f9f9",
                  fontSize: "14px"
                }}>
                  {selectedCashback.title} (ID: {selectedCashback.id})
                </div>
              </div>

              {/* Winning Position */}
              <div style={{ marginBottom: "25px" }}>
                <div style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333"
                }}>
                  Winning Position
                </div>
                <input
                  type="number"
                  name="position"
                  value={prizeData.position}
                  onChange={handlePrizeChange}
                  placeholder="Enter winning position (1 for 1st prize, 2 for 2nd, etc.)"
                  style={getInputStyle(!!prizeErrors.position)}
                />
                {prizeErrors.position && <span style={errorStyle}>{prizeErrors.position}</span>}
              </div>

              {/* Prize Value */}
              <div style={{ marginBottom: "30px" }}>
                <div style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333"
                }}>
                  Prize Value
                </div>
                <input
                  type="number"
                  name="value"
                  value={prizeData.value}
                  onChange={handlePrizeChange}
                  placeholder="00"
                  style={getInputStyle(!!prizeErrors.value)}
                />
                {prizeErrors.value && <span style={errorStyle}>{prizeErrors.value}</span>}
              </div>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: "#eee",
                margin: "25px 0"
              }}></div>

              {/* Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px"
              }}>
                <button
                  onClick={handleCloseAddPrize}
                  style={{
                    flex: 1,
                    background: "#fff",
                    color: "#333",
                    border: "1px solid #ccc",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPrizeSubmit}
                  style={{
                    flex: 1,
                    background: "#B11226",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Add Prize
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Prize Modal */}
        {showEditPrize && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "500px",
                padding: "25px",
                position: "relative",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <button
                onClick={handleCloseEditPrize}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  fontSize: "22px",
                  cursor: "pointer"
                }}
              >
                ×
              </button>

              <h2 style={{
                fontSize: "20px",
                color: "#000",
                marginBottom: "20px",
                fontWeight: "700",
                textAlign: "center"
              }}>
                Edit Prize
              </h2>

              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333"
                }}>
                  Ear Cashback Name
                </div>
                <div style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  background: "#f9f9f9",
                  fontSize: "14px"
                }}>
                  {selectedCashback.title} (ID: {selectedCashback.id})
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label>Winning Position</label>
                <input
                  type="number"
                  name="position"
                  value={editPrizeData.position}
                  onChange={handleEditPrizeChange}
                  style={getInputStyle(!!editPrizeErrors.position)}
                />
                {editPrizeErrors.position && <span style={errorStyle}>{editPrizeErrors.position}</span>}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label>Prize Value</label>
                <input
                  type="number"
                  name="value"
                  value={editPrizeData.value}
                  onChange={handleEditPrizeChange}
                  style={getInputStyle(!!editPrizeErrors.value)}
                />
                {editPrizeErrors.value && <span style={errorStyle}>{editPrizeErrors.value}</span>}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
                <button
                  onClick={handleCloseEditPrize}
                  style={{
                    flex: 1,
                    background: "#fff",
                    color: "#333",
                    border: "1px solid #ccc",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePrize}
                  style={{
                    flex: 1,
                    background: "#B11226",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Update Prize
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Prize Confirmation Modal */}
        {showDeletePrize && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "25px",
                width: "420px",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#bf1f2f" }}>Delete Prize</h3>
              <p>Are you sure you want to delete prize "{prizeToDelete?.position} - {prizeToDelete?.value}"?</p>
              <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
                <button
                  onClick={handleCancelDeletePrize}
                  style={{
                    background: "#ccc",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDeletePrize}
                  style={{
                    background: "#bf1f2f",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      {/* Toast Notification */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: toast.type === "success" ? "#28a745" : "#dc3545",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "500",
            minWidth: "300px",
          }}
        >
          <span style={{ fontSize: "18px" }}>
            {toast.type === "success" ? "✓" : "⚠"}
          </span>
          {toast.message}
        </div>
      )}

      <p style={breadcrumb}>
        <b>Home</b> | Earn Cashback Management
      </p>
      <h2 style={titleStyle}>Earn Cashback Management</h2>

      <div style={tabContainer}>
        <button style={tabInactive} onClick={handleCategoriesClick}>
          Categories
        </button>
        <button style={tabActive}>Earn Cashbacks</button>
      </div>

      <h3 style={{ color: "#F4A30A", marginBottom: "20px" }}>Earn Cashback Offers</h3>

      <div style={searchRow}>
        <div style={{ display: "flex", gap: "8px" }}>
          <input 
            type="text" 
            placeholder="Search cashbacks..." 
            style={searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
          />
          <button style={searchBtn} onClick={handleSearch}>🔍</button>
        </div>
        <button style={addBtn} onClick={() => setShowCashbackModal(true)}>
          + Add Cashback
        </button>
      </div>

      <table style={tableStyle}>
        <thead style={tableHead}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Ticket Price</th>
            <th style={thStyle}>Total Tickets</th>
            <th style={thStyle}>Start Date</th>
            <th style={thStyle}>End Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCashbacks.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.id}</td>
              <td style={tdStyle}>{item.title}</td>
              <td style={tdStyle}>{item.category}</td>
              <td style={tdStyle}>{item.ticketPrice}</td>
              <td style={tdStyle}>
                <div>Total: {item.totalTickets}</div>
                <div>Sold: {item.sold}</div>
                <div>Available: {item.available}</div>
              </td>
              <td style={tdStyle}>{item.startDate}</td>
              <td style={tdStyle}>{item.endDate}</td>
              <td style={tdStyle}>
                <span style={
                  item.winnersAnnounced ? statusAnnounced : 
                  item.isDeactivated ? statusInactive : statusActive
                }>
                  {item.status}
                </span>
              </td>
              <td style={tdStyle}>
                <button style={actionBtnYellow} title="View Winners" onClick={() => handleWinnerClick(item)}>
                  🏆
                </button>
                <button 
                  style={item.winnersAnnounced ? actionBtnGray : actionBtnOrange} 
                  title={item.winnersAnnounced ? "Winners Already Announced" : "Announce Winners"} 
                  onClick={() => !item.winnersAnnounced && handleAnnouncementClick(item)}
                >
                  📢
                </button>
                <button style={actionBtnBlue} title="Edit" onClick={() => handleEditClick(item)}>
                  ✏️
                </button>
                <button 
                  style={item.isDeactivated ? actionBtnGreen : actionBtnRed} 
                  title={item.isDeactivated ? "Activate" : "Deactivate"} 
                  onClick={() => item.isDeactivated ? handleActivateClick(item) : handleDeactivateClick(item)}
                >
                  {item.isDeactivated ? "✓" : "❌"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cashback Modal */}
      {showCashbackModal && (
        <Cashback 
          onSave={handleAddCashback}
          onClose={() => setShowCashbackModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "600px",
              padding: "30px",
              position: "relative",
            }}
          >
            <button
              onClick={handleCloseEdit}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2 style={{ fontSize: "22px", color: "#bf1f2f", marginBottom: "20px" }}>Edit Cashback</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "15px",
              }}
            >
              <div>
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  style={getInputStyle(!!editErrors.title)}
                />
                {editErrors.title && <span style={errorStyle}>{editErrors.title}</span>}
              </div>
              <div>
                <label>Category *</label>
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  style={getInputStyle(!!editErrors.category)}
                />
                {editErrors.category && <span style={errorStyle}>{editErrors.category}</span>}
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Ticket Price *</label>
              <input
                type="text"
                name="ticketPrice"
                value={editData.ticketPrice}
                onChange={handleEditChange}
                style={getInputStyle(!!editErrors.ticketPrice)}
              />
              {editErrors.ticketPrice && <span style={errorStyle}>{editErrors.ticketPrice}</span>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Total Tickets *</label>
              <input
                type="text"
                name="totalTickets"
                value={editData.totalTickets}
                onChange={handleEditChange}
                style={getInputStyle(!!editErrors.totalTickets)}
              />
              {editErrors.totalTickets && <span style={errorStyle}>{editErrors.totalTickets}</span>}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={editData.startDate}
                  onChange={handleEditChange}
                  style={getInputStyle(!!editErrors.startDate)}
                />
                {editErrors.startDate && <span style={errorStyle}>{editErrors.startDate}</span>}
              </div>
              <div>
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={editData.endDate}
                  onChange={handleEditChange}
                  style={getInputStyle(!!editErrors.endDate)}
                />
                {editErrors.endDate && <span style={errorStyle}>{editErrors.endDate}</span>}
              </div>
            </div>

            <button
              onClick={handleUpdate}
              style={{
                background: "#bf1f2f",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Deactivate Modal */}
      {showDeactivate && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#bf1f2f" }}>Deactivate Cashback</h3>
            <p>Are you sure you want to deactivate "{selectedCashback?.title}"?</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                onClick={handleCancelDeactivate}
                style={{
                  background: "#ccc",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeactivate}
                style={{
                  background: "#bf1f2f",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activate Modal */}
      {showActivate && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#28a745" }}>Activate Cashback</h3>
            <p>Are you sure you want to activate "{selectedCashback?.title}"?</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                onClick={handleCancelActivate}
                style={{
                  background: "#ccc",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmActivate}
                style={{
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Yes, Activate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "25px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#bf1f2f" }}>Confirm Winner Announcement</h3>
            <p>Are you sure you want announce winners for "{selectedCashback?.title}"?</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                onClick={handleCancelAnnouncement}
                style={{
                  background: "#ccc",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAnnouncement}
                style={{
                  background: "#bf1f2f",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EarnCashbacks;
