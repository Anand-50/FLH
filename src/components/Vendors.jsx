import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEye,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
  FaTimes,
  FaPlus,
  FaSearch,
  FaArrowLeft,
  FaBox,
} from "react-icons/fa";

const initialVendors = [
  {
    id: 6,
    firstName: "Sai",
    lastName: "M",
    vendorName: "sai",
    phone: "2293781964",
    personalEmail: "ds@hdm.com",
    vendorEmail: "ds@hdm.com",
    gst: "xhhhnd",
    status: "Approved",
    approved: true,
    location: "Visakhapatnam, Andhra Pradesh",
    services: ["Grocery", "Electronics"],
    address: "na",
    orders: [],
  },
  {
    id: 5,
    firstName: "vendor",
    lastName: "verrappan",
    vendorName: "vendor11",
    phone: "9878975537",
    personalEmail: "admin.flh@gmail.com",
    vendorEmail: "admin.flh@gmail.com",
    gst: "Ap9868754989275",
    status: "Approved",
    approved: true,
    location: "Chennai, Tamil Nadu",
    services: ["Electronics", "Furniture", "Home Appliances"],
    address: "addr 5",
    orders: [
      { id: "ORD-1001", date: "2025-10-05", amount: 1200, status: "Delivered" },
      { id: "ORD-1002", date: "2025-10-09", amount: 560, status: "In Progress" },
    ],
  },
  {
    id: 4,
    firstName: "Madhu",
    lastName: "Vendor",
    vendorName: "Madhu-Vendor",
    phone: "9879879879",
    personalEmail: "madhu@yopmail.com",
    vendorEmail: "madhu@yopmail.com",
    gst: "M123456",
    status: "Approved",
    approved: true,
    location: "Hyderabad, Telangana",
    services: ["Grocery", "Home Appliances"],
    address: "addr 4",
    orders: [{ id: "ORD-1003", date: "2025-10-10", amount: 120, status: "Cancelled" }],
  },
  {
    id: 3,
    firstName: "Aditya",
    lastName: "Birla",
    vendorName: "Aditya-Birla",
    phone: "9898989696",
    personalEmail: "adityab@gmail.com",
    vendorEmail: "adityab@gmail.com",
    gst: "AB123456",
    status: "Approved",
    approved: true,
    location: "Bengaluru, Karnataka",
    services: ["Furniture", "Electronics", "Home Appliances", "Grocery"],
    address: "addr 3",
    orders: [
      { id: "ORD-1004", date: "2025-10-11", amount: 350, status: "Delivered" },
      { id: "ORD-1005", date: "2025-10-12", amount: 25, status: "In Progress" },
    ],
  },
  {
    id: 2,
    firstName: "Ramarao",
    lastName: "Nandamuri",
    vendorName: "TR Enterprise Products",
    phone: "8987654321",
    personalEmail: "ramarao@gmail.com",
    vendorEmail: "ramarao@gmail.com",
    gst: "GST-012356",
    status: "Approved",
    approved: true,
    location: "Vijayawada, Andhra Pradesh",
    services: ["Grocery", "Furniture"],
    address: "addr 2",
    orders: [{ id: "ORD-1006", date: "2025-10-13", amount: 90, status: "Delivered" }],
  },
  {
    id: 1,
    firstName: "Mukesh",
    lastName: "Ambani",
    vendorName: "Jio",
    phone: "9123456789",
    personalEmail: "ambani@gmail.com",
    vendorEmail: "ambani@gmail.com",
    gst: "GST-01234",
    status: "Pending Payment",
    approved: false,
    location: "Mumbai, Maharashtra",
    services: ["Electronics", "Home Appliances"],
    address: "addr 1",
    orders: [],
  },
];

export default function VendorPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [query, setQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showOrdersFor, setShowOrdersFor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const [approveFlowFor, setApproveFlowFor] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Filtering logic for search bar
  const filteredVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vendors;
    return vendors.filter((v) => {
      const fields = [
        `${v.firstName} ${v.lastName}`,
        v.vendorName,
        v.personalEmail,
        v.vendorEmail,
        v.phone,
        v.location,
        v.gst,
        (v.services || []).join(" "),
      ];
      return fields.some((f) => f && f.toLowerCase().includes(q));
    });
  }, [vendors, query]);

  // Search functionality like Customer page
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResult(null);
      setNotFound(false);
      return;
    }
    const q = query.trim().toLowerCase();
    const found = vendors.find((v) => {
      const fields = [
        `${v.firstName} ${v.lastName}`,
        v.vendorName,
        v.personalEmail,
        v.vendorEmail,
        v.phone,
        v.location,
        v.gst,
      ];
      return fields.some((f) => f && f.toLowerCase().includes(q));
    });
    if (found) {
      setSearchResult(found);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResult(null);
    setNotFound(false);
  };

  // Toggle activate/deactivate vendor
  function toggleActive(vendorId) {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? {
              ...v,
              status: v.status === "Deactivated" ? "Approved" : "Deactivated",
            }
          : v
      )
    );
  }

  // Confirm status change
  const handleConfirmStatus = (vendor, type) => {
    setSelectedVendor(vendor);
    setConfirmType(type);
    setShowConfirm(true);
  };

  const handleStatusChange = () => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === selectedVendor.id
          ? {
              ...v,
              status: confirmType === "activate" ? "Approved" : "Deactivated",
              approved: confirmType === "activate"
            }
          : v
      )
    );
    setShowConfirm(false);
  };

  // Approve / Disapprove handlers
  function openApproveFlow(vendorId) {
    setApproveFlowFor(vendorId);
  }
  function doApprove(vendorId) {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, approved: true, status: "Approved" } : v))
    );
    setApproveFlowFor(null);
  }
  function doDisapprove(vendorId) {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, approved: false, status: "Disapproved" } : v))
    );
    setApproveFlowFor(null);
  }

  // Edit vendor flow
  function openEdit(vendor) {
    setEditingVendor({ ...vendor });
    setShowEditModal(true);
  }
  function updateEditingField(field, value) {
    setEditingVendor((prev) => ({ ...prev, [field]: value }));
  }
  function saveEdit() {
    setVendors((prev) => prev.map((v) => (v.id === editingVendor.id ? editingVendor : v)));
    setShowEditModal(false);
    setEditingVendor(null);
  }

  // Add vendor flow
  function openAdd() {
    setEditingVendor({
      id: Math.max(...vendors.map((v) => v.id)) + 1,
      firstName: "",
      lastName: "",
      vendorName: "",
      phone: "",
      personalEmail: "",
      vendorEmail: "",
      gst: "",
      status: "Pending",
      approved: false,
      location: "",
      services: [],
      address: "",
      orders: [],
    });
    setShowAddModal(true);
  }
  function saveAdd() {
    setVendors((prev) => [editingVendor, ...prev]);
    setShowAddModal(false);
    setEditingVendor(null);
  }

  // Orders view
  function viewOrders(vendor) {
    setShowOrdersFor(vendor);
  }

  function backToList() {
    setShowOrdersFor(null);
  }

  // Category badge colors
  const getCategoryColor = (category) => {
    const colors = {
      "Grocery": "success",
      "Electronics": "primary",
      "Furniture": "warning",
      "Home Appliances": "info"
    };
    return colors[category] || "secondary";
  };

  return (
    <div className="container mt-4">
      {/* Back Button for Orders Page */}
      {showOrdersFor && (
        <div className="d-flex align-items-center mb-3">
          <button className="btn btn-outline-secondary me-2" onClick={backToList}>
            ← Back
          </button>
        </div>
      )}

      {/* Header - Only show when not in orders view */}
      {!showOrdersFor && (
        <>
          <div className="d-flex align-items-center justify-content-between mb-4">
            {/* Title */}
            <h3 className="mb-0 text-danger fw-bold">Vendors</h3>

            {/* Search Bar - Matching Customer Page */}
            <form
              className="d-flex align-items-center"
              onSubmit={handleSearch}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                height: "42px",
                width: "320px",
              }}
            >
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search vendors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  boxShadow: "none",
                  padding: "8px 12px",
                  fontSize: "15px",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#ffc107",
                  border: "none",
                  width: "45px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaSearch color="white" size={16} />
              </button>
            </form>

            {/* Add Vendor Button */}
            <button
              className="btn text-white ms-2"
              style={{ backgroundColor: "#b61d23", borderRadius: "6px" }}
              onClick={openAdd}
            >
              <FaPlus style={{ marginRight: "8px" }} />
              Add Vendor
            </button>
          </div>

          {/* 🔹 If vendor not found */}
          {notFound && (
            <div className="card shadow-sm p-4 text-center border-danger">
              <h5 className="text-danger fw-bold">No vendor found</h5>
              <p className="text-muted">Try searching again with a valid name, email, or phone number.</p>
              <button className="btn btn-secondary" onClick={handleClearSearch}>
                Back to List
              </button>
            </div>
          )}

          {/* 🔹 Search Result View */}
          {searchResult && !notFound ? (
            <div className="card shadow-lg p-4">
              <h4 className="text-danger fw-bold mb-3">Vendor Details</h4>
              <div className="card-body">
                {/* Basic Info */}
                <h5 className="fw-bold text-secondary mb-3">Basic Info</h5>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <strong>Vendor ID:</strong> {searchResult.id}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Name:</strong> {searchResult.firstName} {searchResult.lastName}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Vendor Name:</strong> {searchResult.vendorName}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Phone:</strong> {searchResult.phone}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Personal Email:</strong> {searchResult.personalEmail}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Vendor Email:</strong> {searchResult.vendorEmail}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Location:</strong> {searchResult.location}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>GST Number:</strong> {searchResult.gst}
                  </div>
                </div>

                <hr />

                {/* Activity Info */}
                <h5 className="fw-bold text-secondary mb-3">Activity Info</h5>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        searchResult.status === "Approved" ? "bg-success" :
                        searchResult.status === "Pending Payment" ? "bg-warning" : "bg-danger"
                      }`}
                    >
                      {searchResult.status}
                    </span>
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Product Categories:</strong>
                    <div className="mt-1">
                      {searchResult.services.map((service, index) => (
                        <span key={index} className={`badge bg-${getCategoryColor(service)} me-1 mb-1`}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Total Orders:</strong> {searchResult.orders.length}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Approval Status:</strong>{" "}
                    <span className={`badge ${searchResult.approved ? "bg-success" : "bg-warning"}`}>
                      {searchResult.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4">
                  <button
                    className="btn btn-warning me-2 text-white"
                    onClick={() => openEdit(searchResult)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => viewOrders(searchResult)}
                  >
                    <FaEye /> View Orders
                  </button>
                  {searchResult.status === "Approved" ? (
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleConfirmStatus(searchResult, "deactivate")}
                    >
                      <FaTimes /> Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleConfirmStatus(searchResult, "activate")}
                    >
                      <FaCheck /> Activate
                    </button>
                  )}
                  <button
                    className="btn btn-secondary"
                    onClick={handleClearSearch}
                  >
                    <FaArrowLeft /> Back to List
                  </button>
                </div>
              </div>
            </div>
          ) : (
            !notFound && (
              /* 🔹 Default Table View */
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body p-0">
                  <table className="table table-striped mb-0 align-middle custom-table">
                    <thead className="custom-thead">
                      <tr>
                        <th>Vendor ID</th>
                        <th>Name</th>
                        <th>Vendor Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Product Categories</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.map((v) => (
                        <tr key={v.id}>
                          <td>{v.id}</td>
                          <td>{v.firstName} {v.lastName}</td>
                          <td>{v.vendorName}</td>
                          <td>{v.phone}</td>
                          <td>{v.vendorEmail}</td>
                          <td>{v.location}</td>
                          <td>
                            <div>
                              {v.services.map((service, index) => (
                                <span key={index} className={`badge bg-${getCategoryColor(service)} me-1 mb-1`}>
                                  {service}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                v.status === "Approved" ? "bg-success" :
                                v.status === "Pending Payment" ? "bg-warning" : "bg-danger"
                              }`}
                            >
                              {v.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {/* View Orders */}
                              <button
                                className="btn btn-primary btn-sm"
                                title="View Orders"
                                onClick={() => viewOrders(v)}
                              >
                                <FaEye />
                              </button>

                              {/* Edit */}
                              <button
                                className="btn btn-warning btn-sm text-white"
                                title="Edit Vendor"
                                onClick={() => openEdit(v)}
                              >
                                <FaEdit />
                              </button>

                              {/* Activate / Deactivate */}
                              {v.status === "Approved" ? (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleConfirmStatus(v, "deactivate")}
                                >
                                  <FaTimes />
                                </button>
                              ) : (
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleConfirmStatus(v, "activate")}
                                >
                                  <FaCheck />
                                </button>
                              )}

                              {/* Approve / Disapprove flow */}
                              <div style={{ position: "relative" }}>
                                <button
                                  className="btn btn-secondary btn-sm"
                                  title="Approve / Disapprove"
                                  onClick={() => openApproveFlow(v.id)}
                                >
                                  <FaCheck />
                                </button>

                                {approveFlowFor === v.id && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      right: 0,
                                      top: "40px",
                                      zIndex: 50,
                                      background: "#fff",
                                      border: "1px solid #eee",
                                      padding: 8,
                                      borderRadius: 6,
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                      width: 200,
                                    }}
                                  >
                                    <div style={{ marginBottom: 8, fontWeight: 700 }}>Choose action</div>
                                    <div className="d-flex justify-content-between">
                                      <button className="btn btn-success btn-sm" onClick={() => doApprove(v.id)}>
                                        Approve
                                      </button>
                                      <button className="btn btn-danger btn-sm" onClick={() => doDisapprove(v.id)}>
                                        Disapprove
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredVendors.length === 0 && (
                        <tr>
                          <td colSpan={9} className="text-center p-5" style={{ color: "#777" }}>
                            No vendors found for "<strong>{query}</strong>"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </>
      )}

      {/* Orders Page */}
      {showOrdersFor && (
        <div>
          <h3 className="text-danger fw-bold mb-4">Vendor Orders - {showOrdersFor.vendorName}</h3>

          {/* Stats card */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <div className="row text-center">
                {(() => {
                  const total = showOrdersFor.orders.length;
                  const delivered = showOrdersFor.orders.filter((o) => o.status === "Delivered").length;
                  const inprogress = showOrdersFor.orders.filter((o) => o.status === "In Progress").length;
                  const cancelled = showOrdersFor.orders.filter((o) => o.status === "Cancelled" || o.status === "Rejected").length;
                 
                  return (
                    <>
                      <div className="col-3">
                        <div className="h4 fw-bold">{total}</div>
                        <div className="text-muted">Total Orders</div>
                      </div>
                      <div className="col-3">
                        <div className="h4 fw-bold text-success">{delivered}</div>
                        <div className="text-muted">Delivered</div>
                      </div>
                      <div className="col-3">
                        <div className="h4 fw-bold text-warning">{inprogress}</div>
                        <div className="text-muted">In Progress</div>
                      </div>
                      <div className="col-3">
                        <div className="h4 fw-bold text-danger">{cancelled}</div>
                        <div className="text-muted">Cancelled/Rejected</div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-0">
              <table className="table table-striped mb-0 align-middle custom-table">
                <thead className="custom-thead">
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {showOrdersFor.orders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center p-5">
                        <div className="text-muted">
                          <h5>No Orders Found</h5>
                          <p>This vendor doesn't have any orders yet.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    showOrdersFor.orders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.date}</td>
                        <td>₹ {o.amount}</td>
                        <td>
                          <span className={`badge ${
                            o.status === "Delivered" ? "bg-success" :
                            o.status === "In Progress" ? "bg-warning" : "bg-danger"
                          }`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingVendor && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger fw-bold">Edit Vendor</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input className="form-control" value={editingVendor.firstName} onChange={(e) => updateEditingField("firstName", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input className="form-control" value={editingVendor.lastName} onChange={(e) => updateEditingField("lastName", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input className="form-control" value={editingVendor.phone} onChange={(e) => updateEditingField("phone", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Personal Email *</label>
                    <input className="form-control" value={editingVendor.personalEmail} onChange={(e) => updateEditingField("personalEmail", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vendor Name *</label>
                    <input className="form-control" value={editingVendor.vendorName} onChange={(e) => updateEditingField("vendorName", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vendor Email *</label>
                    <input className="form-control" value={editingVendor.vendorEmail} onChange={(e) => updateEditingField("vendorEmail", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">GST Number *</label>
                    <input className="form-control" value={editingVendor.gst} onChange={(e) => updateEditingField("gst", e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Product Categories *</label>
                    <div>
                      {["Grocery", "Electronics", "Furniture", "Home Appliances"].map((category) => (
                        <div key={category} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={editingVendor.services?.includes(category) || false}
                            onChange={(e) => {
                              const updatedServices = e.target.checked
                                ? [...(editingVendor.services || []), category]
                                : (editingVendor.services || []).filter(s => s !== category);
                              updateEditingField("services", updatedServices);
                            }}
                          />
                          <label className="form-check-label">{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address *</label>
                    <textarea className="form-control" rows={3} value={editingVendor.address} onChange={(e) => updateEditingField("address", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State *</label>
                    <select className="form-select" value={editingVendor.state || ""} onChange={(e) => updateEditingField("state", e.target.value)}>
                      <option>Andhra Pradesh</option>
                      <option>Telangana</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City *</label>
                    <select className="form-select" value={editingVendor.city || ""} onChange={(e) => updateEditingField("city", e.target.value)}>
                      <option>Visakhapatnam</option>
                      <option>Hyderabad</option>
                      <option>Mumbai</option>
                      <option>Bengaluru</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-warning text-white" onClick={saveEdit}>
                  Update Vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && editingVendor && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger fw-bold">Add Vendor</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input className="form-control" value={editingVendor.firstName} onChange={(e) => updateEditingField("firstName", e.target.value)} placeholder="Enter first name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input className="form-control" value={editingVendor.lastName} onChange={(e) => updateEditingField("lastName", e.target.value)} placeholder="Enter last name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input className="form-control" value={editingVendor.phone} onChange={(e) => updateEditingField("phone", e.target.value)} placeholder="Enter 10 digit phone number" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Personal Email *</label>
                    <input className="form-control" value={editingVendor.personalEmail} onChange={(e) => updateEditingField("personalEmail", e.target.value)} placeholder="Enter personal email" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vendor Name *</label>
                    <input className="form-control" value={editingVendor.vendorName} onChange={(e) => updateEditingField("vendorName", e.target.value)} placeholder="Enter vendor name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vendor Email *</label>
                    <input className="form-control" value={editingVendor.vendorEmail} onChange={(e) => updateEditingField("vendorEmail", e.target.value)} placeholder="Enter vendor email" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password *</label>
                    <input className="form-control" value={editingVendor.password || ""} onChange={(e) => updateEditingField("password", e.target.value)} type="password" placeholder="Enter password" />
                    <small className="text-muted">Password must be at least 6 characters</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">GST Number *</label>
                    <input className="form-control" value={editingVendor.gst} onChange={(e) => updateEditingField("gst", e.target.value)} placeholder="Enter GST number" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Product Categories *</label>
                    <div>
                      {["Grocery", "Electronics", "Furniture", "Home Appliances"].map((category) => (
                        <div key={category} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={editingVendor.services?.includes(category) || false}
                            onChange={(e) => {
                              const updatedServices = e.target.checked
                                ? [...(editingVendor.services || []), category]
                                : (editingVendor.services || []).filter(s => s !== category);
                              updateEditingField("services", updatedServices);
                            }}
                          />
                          <label className="form-check-label">{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address *</label>
                    <textarea className="form-control" rows={3} value={editingVendor.address} onChange={(e) => updateEditingField("address", e.target.value)} placeholder="Enter full address" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State *</label>
                    <select className="form-select" value={editingVendor.state || ""} onChange={(e) => updateEditingField("state", e.target.value)}>
                      <option value="">Select State</option>
                      <option>Andhra Pradesh</option>
                      <option>Telangana</option>
                      <option>Maharashtra</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City *</label>
                    <select className="form-select" value={editingVendor.city || ""} onChange={(e) => updateEditingField("city", e.target.value)}>
                      <option value="">Select City</option>
                      <option>Visakhapatnam</option>
                      <option>Hyderabad</option>
                      <option>Mumbai</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-warning text-white" onClick={saveAdd}>
                  Add Vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Status Modal */}
      {showConfirm && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger fw-bold">
                  {confirmType === "activate" ? "Activate Vendor" : "Deactivate Vendor"}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                {selectedVendor && (
                  <p>
                    Are you sure you want to{" "}
                    <strong>
                      {confirmType === "activate" ? "activate" : "deactivate"}{" "}
                      {selectedVendor.vendorName}?
                    </strong>
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
                <button
                  className={confirmType === "activate" ? "btn btn-success" : "btn btn-danger"}
                  onClick={handleStatusChange}
                >
                  Yes, {confirmType === "activate" ? "Activate" : "Deactivate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles - Matching Customer Page */}
      <style jsx>{`
        /* Custom table header with maroon background */
        .custom-thead {
          background-color: #b61d23 !important;
          color: white !important;
        }
       
        .custom-thead th {
          background-color: #b61d23 !important;
          color: white !important;
          border: none !important;
          padding: 12px 15px !important;
          font-weight: 600;
          font-size: 15px;
        }

        /* Enhanced striped table design */
        .table-striped tbody tr:nth-of-type(odd) {
          background-color: rgba(0, 0, 0, 0.02) !important;
        }

        .table-striped tbody tr:nth-of-type(even) {
          background-color: rgba(0, 0, 0, 0.05) !important;
        }

        .table tbody tr:hover {
          background-color: #e8f4f8 !important;
          transition: background-color 0.2s ease-in-out;
        }

        .table th,
        .table td {
          border: none !important;
          vertical-align: middle !important;
          padding: 12px 15px !important;
        }

        .table thead th {
          border: none !important;
          text-align: left;
        }

        /* Ensure table header styles override Bootstrap */
        .custom-table thead tr {
          background-color: #b61d23 !important;
        }
       
        .custom-table thead th {
          background-color: #b61d23 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}