import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const OrderDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {}; // Get order passed via state

  if (!order) {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-danger">Order not found!</h3>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(order.date), "MM/dd/yyyy, hh:mm:ss a");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", padding: "40px", maxWidth: "1600px", margin: "0 auto", boxShadow: "0 0 20px rgba(0,0,0,0.15)", borderRadius: "12px", fontSize: "18px" }}>

      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: "#e0e0e0", color: "#333", border: "none", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          ← Go Back
        </button>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button style={{ backgroundColor: "#e3f2fd", color: "#1976d2", border: "none", padding: "14px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "18px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: "28px" }}>👤</span> Assign Vendor
          </button>

          <button style={{ backgroundColor: "#fff3e0", color: "#f57c00", border: "none", padding: "14px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "18px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: "28px" }}>📦</span> Mark Delivered
          </button>

          <button style={{ backgroundColor: "#ffebee", color: "#c62828", border: "none", padding: "14px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "18px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: "28px" }}>✕</span> Cancel Items
          </button>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", paddingBottom: "15px", borderBottom: "2px solid #ddd" }}>
        <h2 style={{ margin: 0, color: "#d32f2f", fontSize: "32px", fontWeight: "bold" }}>
          Order Details
          <span style={{ display: "block", fontSize: "18px", color: "#555", marginTop: "5px" }}>Order No: {order.orderNo}</span>
        </h2>
      </div>

      {/* Left & Right Sections */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Left Section - Order Items */}
        <div style={{ flex: "1 1 800px", minWidth: "400px" }}>
          <div style={{ backgroundColor: "#991925", color: "white", padding: "20px 25px", borderRadius: "8px 8px 0 0", fontWeight: "bold", fontSize: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Order Items</span>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "normal", fontSize: "18px" }}>
              <input type="checkbox" style={{ width: "24px", height: "24px" }} /> Select All
            </label>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", fontSize: "18px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th></th>
                <th>Product Name</th>
                <th>Vendor</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "2px solid #eee" }}>
                <td style={{ padding: "25px" }}>
                  <input type="checkbox" style={{ width: "24px", height: "24px" }} />
                </td>
                <td style={{ padding: "25px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>Sample Product</div>
                  <div style={{ fontSize: "16px", color: "#888" }}>Product ID: 1</div>
                </td>
                <td style={{ padding: "25px" }}>
                  <div style={{ fontSize: "20px" }}>Sample Vendor</div>
                  <div style={{ fontSize: "16px", color: "#888" }}>Vendor ID: 1</div>
                </td>
                <td style={{ padding: "25px", fontSize: "22px", fontWeight: "bold" }}>1</td>
                <td style={{ padding: "25px", fontSize: "22px" }}>{order.amount}</td>
                <td style={{ padding: "25px", fontSize: "24px", fontWeight: "bold", color: "#d32f2f" }}>{order.amount}</td>
                <td style={{ padding: "25px" }}>
                  <span style={{ backgroundColor: "#e0f7fa", color: "#006064", padding: "10px 20px", borderRadius: "20px", fontSize: "16px", fontWeight: "bold" }}>{order.status}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Section - Order Info */}
        <div style={{ flex: "1 1 500px", minWidth: "400px" }}>
          <div style={{ backgroundColor: "#991925", color: "white", padding: "20px 25px", borderRadius: "8px 8px 0 0", fontWeight: "bold", fontSize: "24px" }}>Order Information</div>
          <div style={{ backgroundColor: "white", padding: "30px", border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 8px 8px", lineHeight: "2" }}>
            <div style={{ marginBottom: "25px" }}>
              <strong>Order Status:</strong>{" "}
              <span style={{ backgroundColor: "#e0f7fa", color: "#006064", padding: "10px 24px", borderRadius: "20px", fontWeight: "bold" }}>
                {order.status}
              </span>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <strong>Total Amount:</strong>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#d32f2f" }}>{order.amount}</div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <strong>Customer Details:</strong>
              <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
                <div><strong>Name:</strong> {order.customerName}</div>
                <div><strong>Phone:</strong> {order.phone}</div>
                <div><strong>Address:</strong> {order.address}</div>
              </div>
            </div>

            <div>
              <strong>Ordered At:</strong>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>{formattedDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Section */}
      <div style={{ marginTop: "50px" }}>
        <div style={{ backgroundColor: "#ef6c00", color: "white", padding: "20px 25px", borderRadius: "8px 8px 0 0", fontWeight: "bold", fontSize: "24px" }}>
          Transaction Information
        </div>

        <div style={{ backgroundColor: "white", padding: "40px", border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 8px 8px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px" }}>
          <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
            <strong>User Wallet Transaction ID:</strong>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1976d2" }}>35</div>
          </div>

          <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
            <strong>Cashback Wallet Transaction ID:</strong>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#999" }}>N/A</div>
          </div>

          <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
            <strong>Scheme Wallet Transaction ID:</strong>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#999" }}>N/A</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
