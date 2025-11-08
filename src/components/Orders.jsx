import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaSearch, FaPhone, FaMapMarkerAlt, FaCalendar, FaRupeeSign } from "react-icons/fa";

const Orders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    { id: 9, orderNo: "ORD-6-000009", customerName: "Mathu Mathu", phone: "9988776653", address: "Hyderabad, Telangana", amount: "₹1599.00", status: "Order Placed", date: "10/29/2025" },
    { id: 8, orderNo: "ORD-6-000008", customerName: "Suresh Kumar", phone: "9876543210", address: "Chennai, Tamil Nadu", amount: "₹1299.00", status: "Dispatched", date: "10/29/2025" },
    { id: 7, orderNo: "ORD-6-000007", customerName: "Ravi Teja", phone: "8899776655", address: "Hyderabad, Telangana", amount: "₹999.00", status: "Cancelled", date: "10/29/2025" },
    { id: 6, orderNo: "ORD-3-000006", customerName: "Ramanarao Konidela", phone: "9977553311", address: "Vijayawada, Andhra Pradesh", amount: "₹1599.00", status: "Delivered", date: "10/28/2025" },
    { id: 5, orderNo: "ORD-3-000005", customerName: "Mahesh Babu", phone: "9966332211", address: "Guntur, Andhra Pradesh", amount: "₹1999.00", status: "Rejected", date: "10/28/2025" },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered": return "badge bg-success";
      case "Dispatched": return "badge bg-info text-dark";
      case "Order Placed": return "badge bg-secondary";
      case "Rejected": return "badge bg-dark";
      case "Cancelled": return "badge bg-danger";
      default: return "badge bg-warning text-dark";
    }
  };

  return (
    <div className="container-fluid mt-3">
      {/* Header and Search */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h1 className="fw-bold mb-0" style={{ color: "#a61625", letterSpacing: "0.5px", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
          📦 Orders
        </h1>

        <div className="d-flex align-items-center w-100 w-md-auto" style={{
          backgroundColor: "white",
          border: "2px solid transparent",
          borderRadius: "50px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          padding: "6px 16px",
          transition: "all 0.3s ease",
          maxWidth: "400px",
        }}>
          <FaSearch className="text-muted me-2" style={{ color: "#888", fontSize: "clamp(14px, 3vw, 16px)" }} />
          <input
            type="text"
            placeholder="Search orders..."
            className="form-control border-0 bg-transparent"
            style={{ 
              fontSize: "clamp(14px, 3vw, 16px)", 
              width: "100%", 
              outline: "none", 
              boxShadow: "none", 
              color: "#333" 
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table - Hidden on mobile */}
      <div className="d-none d-lg-block table-responsive shadow-sm bg-white p-3 rounded">
        <table className="table table-bordered align-middle" style={{ borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#a61625", color: "white", fontWeight: "700", fontSize: "14px", textAlign: "center" }}>
              <th>Order ID</th>
              <th>Order No</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td className="fw-semibold">{order.orderNo}</td>
                  <td>{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td className="text-success fw-semibold">{order.amount}</td>
                  <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                  <td>{order.date}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => navigate(`/order-details/${order.id}`, { state: { order } })}
                      title="View Order Details"
                    >
                      <FaEye size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted py-3">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tablet View - Hidden on mobile and desktop */}
      <div className="d-none d-md-block d-lg-none table-responsive shadow-sm bg-white p-3 rounded">
        <table className="table table-bordered align-middle" style={{ borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#a61625", color: "white", fontWeight: "700", fontSize: "14px", textAlign: "center" }}>
              <th>Order No</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-semibold">{order.orderNo}</td>
                  <td>{order.customerName}</td>
                  <td className="text-success fw-semibold">{order.amount}</td>
                  <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                  <td>{order.date}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => navigate(`/order-details/${order.id}`, { state: { order } })}
                      title="View Order Details"
                    >
                      <FaEye size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Hidden on tablet and desktop */}
      <div className="d-block d-md-none">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="card shadow-sm mb-3 border-0" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#a61625" }}>{order.orderNo}</h6>
                    <p className="mb-1 fw-semibold">{order.customerName}</p>
                  </div>
                  <span className={getStatusClass(order.status)} style={{ fontSize: "12px" }}>
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <div className="mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <FaRupeeSign className="text-success me-2" size={12} />
                    <small className="text-success fw-semibold">{order.amount}</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <FaCalendar className="text-muted me-2" size={12} />
                    <small className="text-muted">{order.date}</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <FaPhone className="text-muted me-2" size={12} />
                    <small className="text-muted">{order.phone}</small>
                  </div>
                  <div className="d-flex align-items-start">
                    <FaMapMarkerAlt className="text-muted me-2 mt-1" size={12} />
                    <small className="text-muted" style={{ lineHeight: "1.3" }}>{order.address}</small>
                  </div>
                </div>

                {/* Action Button */}
                <div className="d-flex justify-content-end pt-2 border-top">
                  <button 
                    className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                    onClick={() => navigate(`/order-details/${order.id}`, { state: { order } })}
                    style={{ fontSize: "14px", padding: "6px 12px" }}
                  >
                    <FaEye size={12} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-5">
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;