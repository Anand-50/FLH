
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { FaEdit, FaTimes, FaCheck, FaSearch, FaArrowLeft } from "react-icons/fa";

const Customers = () => {
  const navigate = useNavigate();

  // 🔹 Dummy customer data
  const [customers, setCustomers] = useState([
    {
      id: 13,
      name: "Santosh Kumar",
      phone: "7842188838",
      email: "santosh@yopmail.com",
      status: "Active",
      scheme: "Daily Scheme",
      amc: "Yes",
      gender: "Male",
      dob: "1990-05-14",
      address: "Hyderabad, India",
      registeredOn: "2024-02-10",
      referralCode: "REF1234",
      lastLogin: "2025-11-05 10:15 AM",
      totalOrders: 5,
      mpl: "yes,2products",
      totalEarnCashBack:250,
      schemeCount: 1,
    },
    {
      id: 12,
      name: "Naidu Velaga",
      phone: "9573344275",
      email: "naidu@yopmail.com",
      status: "Active",
      scheme: "Weekly",
      amc: "No",
      gender: "Male",
      dob: "1992-08-22",
      address: "Vijayawada, India",
      registeredOn: "2023-11-12",
      referralCode: "",
      lastLogin: "2025-11-01 08:10 AM",
      totalOrders: 3,
           mpl: "yes,2products",
      totalEarnCashBack:2570,
      schemeCount: 1,
    },
    {
      id: 11,
      name: "Balla Abhishek",
      phone: "9492198279",
      email: "abhishekballa73@gmail.com",
      status: "Active",
      scheme: "Monthly,Weekly,Daily",
      amc: "Yes",
      gender: "Male",
      dob: "1998-01-05",
      address: "Vizag, India",
      registeredOn: "2024-05-03",
      referralCode: "REF8945",
      lastLogin: "2025-10-30 11:00 AM",
      totalOrders: 9,
      mpl: "yes,2products",
      totalEarnCashBack:250,
      schemeCount: 3,
    },
    {
      id: 10,
      name: "Swaroop Customer",
      phone: "9879879871",
      email: "swaroopcustomer@yopmail.com",
      status: "Active",
      scheme: "Weekly",
      amc: "No",
      gender: "Male",
      dob: "1988-02-12",
      address: "Guntur, India",
      registeredOn: "2024-04-10",
      referralCode: "",
      lastLogin: "2025-11-02 06:15 PM",
      totalOrders: 2,
      mpl: "yes,2products",
    totalEarnCashBack:980,

      schemeCount: 1,
    },
    {
      id: 6,
      name: "Madhu Madhu",
      phone: "9988776653",
      email: "madhu12@yopmial.com",
      status: "Inactive",
      scheme: "Daily",
      amc: "No",
      gender: "Female",
      dob: "1995-03-09",
      address: "Ongole, India",
      registeredOn: "2023-12-14",
      referralCode: "",
      lastLogin: "2025-09-10 03:45 PM",
      totalOrders: 1,
      mpl: "yes,2products",
     totalEarnCashBack:750,

      schemeCount: 1,
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // 🔹 Edit
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEdit(true);
  };

  // 🔹 Activate / Deactivate Confirmation
  const handleConfirm = (customer, type) => {
    setSelectedCustomer(customer);
    setConfirmType(type);
    setShowConfirm(true);
  };

  const handleStatusChange = () => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === selectedCustomer.id
          ? { ...cust, status: confirmType === "activate" ? "Active" : "Inactive" }
          : cust
      )
    );
    setShowConfirm(false);
  };

  // 🔹 Search
  const handleSearch = (e) => {
    e.preventDefault();
    const found = customers.find(
      (cust) =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.phone.includes(searchTerm)
    );
    if (found) {
      setSearchResult(found);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResult(null);
    setNotFound(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-4">  
    {/* Title + Search Bar in One Line */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        {/* Title */}
        <h3 className="mb-0 text-danger fw-bold">Customers</h3>

        {/* Search Bar */}
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
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>

      {/* 🔹 If customer not found */}
      {notFound && (
        <Card className="shadow-sm p-4 text-center border-danger">
          <h5 className="text-danger fw-bold">No customer found</h5>
          <p className="text-muted">Try searching again with a valid name or phone number.</p>
          <Button variant="secondary" onClick={handleClearSearch}>
            Back to List
          </Button>
        </Card>
      )}

      {/* 🔹 Search Result View */}
      {searchResult && !notFound ? (
        <Card className="shadow-lg p-4">
          <Card.Title className="text-danger fw-bold mb-3">
            Customer Details
          </Card.Title>
          <Card.Body>
            {/* Basic Info */}
            <h5 className="fw-bold text-secondary mb-3">Basic Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Name:</strong> {searchResult.name}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Mobile:</strong> {searchResult.phone}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Email:</strong> {searchResult.email}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Gender:</strong>{" "}
                {searchResult.gender || "Not Provided"}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Date of Birth:</strong>{" "}
                {searchResult.dob || "Not Provided"}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Address:</strong>{" "}
                {searchResult.address || "Not Provided"}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Registration Date:</strong>{" "}
                {searchResult.registeredOn || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Referral Code:</strong>{" "}
                {searchResult.referralCode || "N/A"}
              </div>
            </div>

            <hr />

            {/* Activity Info */}
            <h5 className="fw-bold text-secondary mb-3">Activity Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Last Login Time:</strong>{" "}
                {searchResult.lastLogin || "Not Available"}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Total Orders / Transactions:</strong>{" "}
                {searchResult.totalOrders || 0}
              </div>
              <div className="col-md-6 mb-2">
                <strong>MPL:</strong> {searchResult.mpl || "0 MPL"}
              </div>
              <div className="col-md-6 mb-2">
                <strong>AMC:</strong> {searchResult.amc}
              </div>
              <div className="col-md-6 mb-2">
                <strong>No. of Schemes:</strong>{" "}
                {searchResult.schemeCount || 1}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Scheme Status:</strong>{" "}
                <span
                  className={`badge ${
                    searchResult.status === "Active"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {searchResult.status}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4">
              <Button
                variant="warning"
                className="me-2 text-white"
                onClick={() => handleEdit(searchResult)}
              >
                <FaEdit /> Edit
              </Button>
              {searchResult.status === "Active" ? (
                <Button
                  variant="danger"
                  onClick={() => handleConfirm(searchResult, "deactivate")}
                >
                  <FaTimes /> Deactivate
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={() => handleConfirm(searchResult, "activate")}
                >
                  <FaCheck /> Activate
                </Button>
              )}
              <Button
                variant="secondary"
                className="ms-2"
                onClick={handleClearSearch}
              >
                <FaArrowLeft /> Back to List
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        !notFound && (
          // 🔹 Default Table View - FIXED with proper maroon header
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-0">
              <div className="table-container">
                <table className="table table-striped mb-0 align-middle custom-table">
                  <thead className="custom-thead">
                    <tr>
                      <th>Customer ID</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Scheme</th>
                      <th>AMC</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              customer.status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td>{customer.scheme}</td>
                        <td>{customer.amc}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2 text-white"
                            onClick={() => handleEdit(customer)}
                          >
                            <FaEdit />
                          </Button>
                          {customer.status === "Active" ? (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleConfirm(customer, "deactivate")}
                            >
                              <FaTimes />
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleConfirm(customer, "activate")}
                            >
                              <FaCheck />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      )}

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold">
            Edit Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <Form>
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      defaultValue={selectedCustomer.name.split(" ")[0]}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      defaultValue={selectedCustomer.name.split(" ")[1] || ""}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      defaultValue={selectedCustomer.phone}
                      disabled
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control defaultValue={selectedCustomer.email} />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Date of Birth *</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>City *</Form.Label>
                    <Form.Select>
                      <option>Select City</option>
                    </Form.Select>
                    <div className="text-danger small">
                      No cities found for the selected state
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="warning" className="text-white">
            Update Customer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Activate / Deactivate Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold">
            {confirmType === "deactivate"
              ? "Deactivate Customer"
              : "Activate Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <p>
              Are you sure you want to{" "}
              <strong>
                {confirmType === "deactivate" ? "deactivate" : "activate"}{" "}
                {selectedCustomer.name}?
              </strong>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant={
              confirmType === "deactivate" ? "danger" : "success"
            }
            onClick={handleStatusChange}
          >
            Yes,{" "}
            {confirmType === "deactivate" ? "Deactivate" : "Activate"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CSS Styles - FIXED to ensure maroon header works */}
      {/* 🔹 Updated CSS Styles */}
<style jsx>{`
  /* Card Titles & Headings */
  .card-title,
  h5,
  strong {
    color: #b61d23 !important; /* Maroon */
  }

  /* Card text */
  .card-body,
  .card-body p,
  .card-body div,
  .card-body span {
    color: #000 !important; /* Black text */
  }

  /* Badge colors */
  .badge.bg-success {
    background-color: #28a745 !important;
    color: white !important;
  }
  .badge.bg-danger {
    background-color: #dc3545 !important;
    color: white !important;
  }
  .badge.bg-warning {
    background-color: #ffc107 !important;
    color: black !important;
  }

  /* Table text */
  table.table tbody td {
    color: #000 !important;
  }

  /* Table header */
  .custom-thead th {
    background-color: #b61d23 !important;
    color: white !important;
  }

  /* Hover row */
  .table tbody tr:hover {
    background-color: #fff5f5 !important;
    transition: background-color 0.2s ease-in-out;
  }

  /* Buttons */
  .btn-warning {
    background-color: #ffc107 !important;
    color: black !important;
    border: none;
  }
  .btn-warning:hover {
    background-color: #e0a800 !important;
    color: black !important;
  }
  .btn-danger {
    background-color: #dc3545 !important;
    color: white !important;
  }
  .btn-success {
    background-color: #28a745 !important;
    color: white !important;
  }
`}</style>

    </div>
  );
};

export default Customers;