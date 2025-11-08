
// // AgentPage.jsx
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaEye,
//   FaListAlt,
//   FaEdit,
//   FaCheck,
//   FaArrowLeft,
//   FaUsers,
//   FaStore,
//   FaTimes, // Added reject icon
// } from "react-icons/fa";

// /*
//  Single-file Agent management page:
//  ✅ Agents table (red header)
//  ✅ Search by ID/Name => shows Agent Profile card
//  ✅ Agent Profile has extra fields (ID, location, join date, validity)
//  ✅ View Users -> shows user list -> click eye to view user details
//  ✅ View Vendors -> shows vendor list -> click eye to view vendor details
//  ✅ Approve/Reject icon toggle based on agent status
//  ✅ Dummy/static data
// */

// export default function AgentPage() {
//   const [view, setView] = useState("agents");
//   const [showSubscriptions, setShowSubscriptions] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showActivate, setShowActivate] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [agentList, setAgentList] = useState([
//     {
//       id: "2",
//       name: "VenkataMurthy Gattamaneni",
//       phone: "9988776655",
//       email: "venkat@gmail.com",
//       status: "Approved",
//       type: "Full Time",
//       userCount: 4,
//       vendorCount: 2,
//       commission: "₹12,500",
//       schemesJoined: 5,
//       amcProducts: 3,
//       mplProducts: 2,
//       luckDrawTickets: 150,
//       ecbTickets: 20,
//       productsSold: 85,
//       location: "Andhra Pradesh, India",
//       joiningDate: "2023-01-15",
//       subscriptionValidity: "2025-12-31",
//     },
//     {
//       id: "3",
//       name: "Sravani Devineni",
//       phone: "9123456780",
//       email: "sravani@gmail.com",
//       status: "Pending",
//       type: "Part Time",
//       userCount: 3,
//       vendorCount: 1,
//       commission: "₹7,300",
//       schemesJoined: 2,
//       amcProducts: 1,
//       mplProducts: 1,
//       luckDrawTickets: 20,
//       ecbTickets: 2,
//       productsSold: 14,
//       location: "Hyderabad, Telangana",
//       joiningDate: "2024-05-10",
//       subscriptionValidity: "2026-05-09",
//     },
//   ]);

//   const agents = agentList;

//   const users = [
//     {
//       id: "U001",
//       name: "Rajesh Kumar",
//       email: "rajesh@example.com",
//       joinDate: "2024-08-15",
//       dob: "1990-05-14",
//       mobile: "7842188838",
//       gender: "Male",
//       address: "Hyderabad, India",
//       referral: "REF1234",
//       lastLogin: "2025-11-05 10:15 AM",
//       mpl: "yes,2products",
//       amc: "Yes",
//       totalOrders: 5,
//       schemesCount: 1,
//       schemeStatus: "Active",
//       productOrders: 12,
//       cashback: "₹1,250",
//     },
//     {
//       id: "U002",
//       name: "Priya Sharma",
//       email: "priya@example.com",
//       joinDate: "2024-09-02",
//       dob: "1993-07-21",
//       mobile: "9988776651",
//       gender: "Female",
//       address: "Bengaluru, India",
//       referral: "REF5678",
//       lastLogin: "2025-10-31 08:40 AM",
//       mpl: "no",
//       amc: "No",
//       totalOrders: 2,
//       schemesCount: 0,
//       schemeStatus: "Inactive",
//       productOrders: 3,
//       cashback: "₹120",
//     },
//   ];

//   const vendors = [
//     {
//       id: "V001",
//       name: "Vendor One Pvt Ltd",
//       contact: "vendor1@example.com",
//       phone: "9876543210",
//       joined: "2023-10-01",
//       orders: 24,
//       location: "Mumbai, Maharashtra",
//       status: "Active",
//       category: "Electronics",
//       rating: "4.5/5",
//     },
//     {
//       id: "V002",
//       name: "Vendor Two LLC",
//       contact: "vendor2@example.com",
//       phone: "9765432109",
//       joined: "2024-03-12",
//       orders: 9,
//       location: "Delhi, India",
//       status: "Active",
//       category: "Home Appliances",
//       rating: "4.2/5",
//     },
//     {
//       id: "V003",
//       name: "Vendor Three & Co",
//       contact: "vendor3@example.com",
//       phone: "9654321098",
//       joined: "2024-07-20",
//       orders: 15,
//       location: "Chennai, Tamil Nadu",
//       status: "Inactive",
//       category: "Fashion",
//       rating: "4.0/5",
//     },
//   ];

//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//       setSelectedAgent(null);
//       setView("agents");
//       return;
//     }
//     const q = searchTerm.trim().toLowerCase();
//     const found = agents.find(
//       (a) => a.id.toLowerCase() === q || a.name.toLowerCase().includes(q)
//     );
//     if (found) {
//       setSelectedAgent(found);
//       setView("profile");
//     } else {
//       setSelectedAgent(null);
//       setView("agents");
//     }
//   };

//   const handleBackToList = () => {
//     setSelectedAgent(null);
//     setSelectedUser(null);
//     setSelectedVendor(null);
//     setView("agents");
//     setSearchTerm("");
//   };

//   const openUserList = () => {
//     setView("userList");
//   };

//   const openVendorList = () => {
//     setView("vendorList");
//   };

//   const openUserDetails = (user) => {
//     setSelectedUser(user);
//     setView("customerDetails");
//   };

//   const openVendorDetails = (vendor) => {
//     setSelectedVendor(vendor);
//     setView("vendorDetails");
//   };

//   // ✅ Toggle Approve/Reject status
//   const handleToggleStatus = (agentId) => {
//     const updated = agentList.map((agent) =>
//       agent.id === agentId
//         ? {
//             ...agent,
//             status: agent.status === "Approved" ? "Rejected" : "Approved",
//           }
//         : agent
//     );
//     setAgentList(updated);
//   };

//   return (
//     <div className="container py-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         {view === "agents" ? (
//           <h2 className="fw-bold text-danger">Agents</h2>
//         ) : (
//           <div>
//             <button
//               className="btn btn-outline-secondary me-2"
//               onClick={() => {
//                 if (
//                   ["profile", "userList", "customerDetails", "vendorList", "vendorDetails"].includes(
//                     view
//                   )
//                 ) {
//                   if (
//                     view === "userList" ||
//                     view === "customerDetails"
//                   ) {
//                     setView("profile");
//                   } else if (
//                     view === "vendorList" ||
//                     view === "vendorDetails"
//                   ) {
//                     setView("profile");
//                   } else handleBackToList();
//                 } else handleBackToList();
//               }}
//             >
//               <FaArrowLeft className="me-2" /> Back
//             </button>
//             <span className="h5 mb-0 text-danger fw-bold">
//               {view === "profile" && "Agent Profile"}
//               {view === "userList" && "Users List"}
//               {view === "customerDetails" && "User Details"}
//               {view === "vendorList" && "Vendors List"}
//               {view === "vendorDetails" && "Vendor Details"}
//             </span>
//           </div>
//         )}

//         {/* Search Input */}
//         {/* Search Bar — Styled like Customer Page */}
// <form
//   className="d-flex align-items-center"
//   onSubmit={(e) => {
//     e.preventDefault();
//     handleSearch();
//   }}
//   style={{
//     backgroundColor: "white",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     overflow: "hidden",
//     height: "42px",
//     width: "320px",
//   }}
// >
//   <input
//     type="text"
//     className="form-control border-0 shadow-none"
//     placeholder="Search agents..."
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     style={{
//       flex: 1,
//       border: "none",
//       boxShadow: "none",
//       padding: "8px 12px",
//       fontSize: "15px",
//     }}
//   />
//   <button
//     type="submit"
//     style={{
//       backgroundColor: "#ffc107",
//       border: "none",
//       width: "45px",
//       height: "42px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//     }}
//   >
//     <FaCheck color="white" size={16} />
//   </button>
// </form>

//       </div>

//       {/* AGENT PROFILE */}
//       {view === "profile" && selectedAgent && (
//         <div className="card shadow-sm border-0 mb-4">
//           <div className="card-body">
//             <h4 className="text-danger fw-bold mb-3">Agent Profile</h4>
//             <div className="row">
//               <div className="col-md-6">
//                 <p>
//                   <strong>Agent ID:</strong> {selectedAgent.id}
//                 </p>
//                 <p>
//                   <strong>Name:</strong> {selectedAgent.name}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {selectedAgent.phone}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {selectedAgent.email}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {selectedAgent.location}
//                 </p>
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   <strong>Joining Date:</strong> {selectedAgent.joiningDate}
//                 </p>
//                 <p>
//                   <strong>Subscription Validity:</strong>{" "}
//                   {selectedAgent.subscriptionValidity}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`badge ${
//                       selectedAgent.status === "Approved"
//                         ? "bg-success"
//                         : "bg-danger"
//                     }`}
//                   >
//                     {selectedAgent.status}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Agent Type:</strong> {selectedAgent.type}
//                 </p>
//                 <p>
//                   <strong>Commission Credited:</strong>{" "}
//                   {selectedAgent.commission}
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <div className="row">
//               <div className="col-md-4">
//                 <p>
//                   <strong>Schemes Joined:</strong>{" "}
//                   {selectedAgent.schemesJoined}
//                 </p>
//                 <p>
//                   <strong>AMC Products Added:</strong>{" "}
//                   {selectedAgent.amcProducts}
//                 </p>
//               </div>
//               <div className="col-md-4">
//                 <p>
//                   <strong>MPL Products Added:</strong>{" "}
//                   {selectedAgent.mplProducts}
//                 </p>
//                 <p>
//                   <strong>Luck Draw Tickets Sold:</strong>{" "}
//                   {selectedAgent.luckDrawTickets}
//                 </p>
//               </div>
//               <div className="col-md-4">
//                 <p>
//                   <strong>ECB Tickets Sold:</strong>{" "}
//                   {selectedAgent.ecbTickets}
//                 </p>
//                 <p>
//                   <strong>Products Sold:</strong>{" "}
//                   {selectedAgent.productsSold}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-3 d-flex gap-3">
//               <button className="btn btn-primary" onClick={openUserList}>
//                 <FaUsers className="me-2" /> View Users
//               </button>
//               <button
//                 className="btn btn-info text-white"
//                 onClick={openVendorList}
//               >
//                 <FaStore className="me-2" /> View Vendors
//               </button>
//               <button
//                 className="btn btn-warning text-white"
//                 onClick={() => setShowEdit(true)}
//               >
//                 <FaEdit className="me-2" /> Edit Details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* USERS LIST VIEW */}
//       {view === "userList" && (
//         <div className="card shadow-sm border-0 mb-4">
//           <div className="card-body">
//             <h4 className="text-danger fw-bold mb-3">
//               Users Assigned to {selectedAgent?.name}
//             </h4>
//             <table className="table table-striped">
//               <thead className="table-danger">
//                 <tr>
//                   <th>User ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Join Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u.id}>
//                     <td>{u.id}</td>
//                     <td>{u.name}</td>
//                     <td>{u.email}</td>
//                     <td>{u.joinDate}</td>
//                     <td>
//                       <button
//                         className="btn btn-outline-primary btn-sm"
//                         onClick={() => openUserDetails(u)}
//                       >
//                         <FaEye />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* VENDORS LIST VIEW */}
//       {view === "vendorList" && (
//         <div className="card shadow-sm border-0 mb-4">
//           <div className="card-body">
//             <h4 className="text-danger fw-bold mb-3">
//               Vendors Assigned to {selectedAgent?.name}
//             </h4>
//             <table className="table table-striped">
//               <thead className="table-danger">
//                 <tr>
//                   <th>Vendor ID</th>
//                   <th>Vendor Name</th>
//                   <th>Contact Email</th>
//                   <th>Join Date</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vendors.map((v) => (
//                   <tr key={v.id}>
//                     <td>{v.id}</td>
//                     <td>{v.name}</td>
//                     <td>{v.contact}</td>
//                     <td>{v.joined}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           v.status === "Active" ? "bg-success" : "bg-secondary"
//                         }`}
//                       >
//                         {v.status}
//                       </span>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-outline-primary btn-sm"
//                         onClick={() => openVendorDetails(v)}
//                       >
//                         <FaEye />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* USER DETAILS CARD */}
//       {view === "customerDetails" && selectedUser && (
//         <div className="card shadow-sm mb-4 border-0">
//           <div className="card-body">
//             <h3 className="text-danger fw-bold mb-4">Customer Details</h3>
//             <h5 className="text-secondary mb-3">Basic Info</h5>
//             <div className="row">
//               <div className="col-md-6">
//                 <p>
//                   <strong>Name:</strong> {selectedUser.name}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {selectedUser.email}
//                 </p>
//                 <p>
//                   <strong>Date of Birth:</strong> {selectedUser.dob}
//                 </p>
//                 <p>
//                   <strong>Registration Date:</strong> {selectedUser.joinDate}
//                 </p>
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   <strong>Mobile:</strong> {selectedUser.mobile}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {selectedUser.gender}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {selectedUser.address}
//                 </p>
//                 <p>
//                   <strong>Referral Code:</strong> {selectedUser.referral}
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <h5 className="text-secondary mb-3">Activity Info</h5>
//             <div className="row">
//               <div className="col-md-6">
//                 <p>
//                   <strong>Last Login Time:</strong> {selectedUser.lastLogin}
//                 </p>
//                 <p>
//                   <strong>MPL:</strong> {selectedUser.mpl}
//                 </p>
//                 <p>
//                   <strong>No. of Schemes:</strong> {selectedUser.schemesCount}
//                 </p>
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   <strong>Total Orders / Transactions:</strong>{" "}
//                   {selectedUser.totalOrders}
//                 </p>
//                 <p>
//                   <strong>AMC:</strong> {selectedUser.amc}
//                 </p>
//                 <p>
//                   <strong>Scheme Status:</strong>{" "}
//                   <span className="badge bg-success">
//                     {selectedUser.schemeStatus}
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <div className="d-flex gap-3 mt-3">
//               <button className="btn btn-warning text-white">
//                 <FaEdit className="me-2" /> Edit
//               </button>
//               <button className="btn btn-danger">✖ Deactivate</button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setView("userList")}
//               >
//                 <FaArrowLeft className="me-2" /> Back to Users
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VENDOR DETAILS */}
//       {view === "vendorDetails" && selectedVendor && (
//         <div className="card shadow-sm mb-4 border-0">
//           <div className="card-body">
//             <h3 className="text-danger fw-bold mb-4">Vendor Details</h3>
//             <div className="row">
//               <div className="col-md-6">
//                 <p>
//                   <strong>Vendor ID:</strong> {selectedVendor.id}
//                 </p>
//                 <p>
//                   <strong>Vendor Name:</strong> {selectedVendor.name}
//                 </p>
//                 <p>
//                   <strong>Contact Email:</strong> {selectedVendor.contact}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {selectedVendor.phone}
//                 </p>
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   <strong>Join Date:</strong> {selectedVendor.joined}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {selectedVendor.location}
//                 </p>
//                 <p>
//                   <strong>Category:</strong> {selectedVendor.category}
//                 </p>
//                 <p>
//                   <strong>Rating:</strong> {selectedVendor.rating}
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <div className="row">
//               <div className="col-md-6">
//                 <p>
//                   <strong>Total Orders:</strong> {selectedVendor.orders}
//                 </p>
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`badge ${
//                       selectedVendor.status === "Active"
//                         ? "bg-success"
//                         : "bg-secondary"
//                     }`}
//                   >
//                     {selectedVendor.status}
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <hr />
//             <div className="d-flex gap-3 mt-3">
//               <button className="btn btn-warning text-white">
//                 <FaEdit className="me-2" /> Edit
//               </button>
//               <button className="btn btn-danger">✖ Deactivate</button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setView("vendorList")}
//               >
//                 <FaArrowLeft className="me-2" /> Back to Vendors
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* AGENTS TABLE */}
//       {view === "agents" && (
//         <div className="card shadow-sm border-0 mb-4">
//           <div className="card-body p-0">
//             <table className="table table-bordered m-0">
//               <thead style={{ backgroundColor: "#b71c1c", color: "white" }}>
//                 <tr>
//                   <th>Agent ID</th>
//                   <th>Name</th>
//                   <th>Phone Number</th>
//                   <th>Email</th>
//                   <th>Location</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {agents.map((a) => (
//                   <tr key={a.id}>
//                     <td>{a.id}</td>
//                     <td>{a.name}</td>
//                     <td>{a.phone}</td>
//                     <td>{a.email}</td>
//                     <td>{a.location}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           a.status === "Approved"
//                             ? "bg-success"
//                             : "bg-danger"
//                         }`}
//                       >
//                         {a.status}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => {
//                             setSelectedAgent(a);
//                             setView("profile");
//                           }}
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           className="btn btn-info btn-sm text-white"
//                           onClick={() => {
//                             setSelectedAgent(a);
//                             setShowSubscriptions(true);
//                           }}
//                         >
//                           <FaListAlt />
//                         </button>
//                         <button
//                           className="btn btn-warning btn-sm text-white"
//                           onClick={() => {
//                             setSelectedAgent(a);
//                             setShowEdit(true);
//                           }}
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           className={`btn btn-sm ${
//                             a.status === "Approved"
//                               ? "btn-danger"
//                               : "btn-success"
//                           }`}
//                           onClick={() => handleToggleStatus(a.id)}
//                         >
//                           {a.status === "Approved" ? <FaTimes /> : <FaCheck />}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* SUBSCRIPTION MODAL */}
//       {showSubscriptions && (
//         <Modal
//           title={`Subscriptions - ${selectedAgent?.name}`}
//           onClose={() => setShowSubscriptions(false)}
//         >
//           <div className="text-center py-5">
//             <h5 className="text-danger fw-bold mb-3">No Subscriptions Found</h5>
//             <p className="text-muted">
//               No subscription records found for this agent.
//             </p>
//             <button
//               className="btn btn-danger mt-4"
//               onClick={() => setShowSubscriptions(false)}
//             >
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* EDIT MODAL */}
//       {showEdit && (
//         <Modal title="Edit Agent" onClose={() => setShowEdit(false)}>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label">First Name *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 defaultValue={selectedAgent?.name?.split(" ")[0] || ""}
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Last Name *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 defaultValue={selectedAgent?.name?.split(" ")[1] || ""}
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Phone Number *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 defaultValue={selectedAgent?.phone || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Email *</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 defaultValue={selectedAgent?.email || ""}
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Date of Birth *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 defaultValue="19-05-1997"
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">State *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 defaultValue="Andhra Pradesh"
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">City *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 defaultValue="Visakhapatnam"
//               />
//             </div>
//           </div>
//           <div className="d-flex justify-content-end gap-3 mt-4">
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowEdit(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-warning text-white"
//               onClick={() => setShowEdit(false)}
//             >
//               Update
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// /* ---------------- Modal component ---------------- */
// function Modal({ title, children, onClose }) {
//   return (
//     <div
//       className="modal fade show"
//       style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title text-danger fw-bold">{title}</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onClose}
//             ></button>
//           </div>
//           <div className="modal-body">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }








// AgentPage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEye,
  FaListAlt,
  FaEdit,
  FaCheck,
  FaArrowLeft,
  FaUsers,
  FaStore,
  FaTimes,
  FaSearch, // Added search icon
} from "react-icons/fa";

export default function AgentPage() {
  const [view, setView] = useState("agents");
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [agentList, setAgentList] = useState([
    {
      id: "2",
      name: "VenkataMurthy Gattamaneni",
      phone: "9988776655",
      email: "venkat@gmail.com",
      status: "Approved",
      type: "Full Time",
      userCount: 4,
      vendorCount: 2,
      commission: "₹12,500",
      schemesJoined: 5,
      amcProducts: 3,
      mplProducts: 2,
      luckDrawTickets: 150,
      ecbTickets: 20,
      productsSold: 85,
      location: "Andhra Pradesh, India",
      joiningDate: "2023-01-15",
      subscriptionValidity: "2025-12-31",
    },
    {
      id: "3",
      name: "Sravani Devineni",
      phone: "9123456780",
      email: "sravani@gmail.com",
      status: "Pending",
      type: "Part Time",
      userCount: 3,
      vendorCount: 1,
      commission: "₹7,300",
      schemesJoined: 2,
      amcProducts: 1,
      mplProducts: 1,
      luckDrawTickets: 20,
      ecbTickets: 2,
      productsSold: 14,
      location: "Hyderabad, Telangana",
      joiningDate: "2024-05-10",
      subscriptionValidity: "2026-05-09",
    },
  ]);

  const agents = agentList;

  const users = [
    {
      id: "U001",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      joinDate: "2024-08-15",
      dob: "1990-05-14",
      mobile: "7842188838",
      gender: "Male",
      address: "Hyderabad, India",
      referral: "REF1234",
      lastLogin: "2025-11-05 10:15 AM",
      mpl: "yes,2products",
      amc: "Yes",
      totalOrders: 5,
      schemesCount: 1,
      schemeStatus: "Active",
      productOrders: 12,
      cashback: "₹1,250",
    },
    {
      id: "U002",
      name: "Priya Sharma",
      email: "priya@example.com",
      joinDate: "2024-09-02",
      dob: "1993-07-21",
      mobile: "9988776651",
      gender: "Female",
      address: "Bengaluru, India",
      referral: "REF5678",
      lastLogin: "2025-10-31 08:40 AM",
      mpl: "no",
      amc: "No",
      totalOrders: 2,
      schemesCount: 0,
      schemeStatus: "Inactive",
      productOrders: 3,
      cashback: "₹120",
    },
  ];

  const vendors = [
    {
      id: "V001",
      name: "Vendor One Pvt Ltd",
      contact: "vendor1@example.com",
      phone: "9876543210",
      joined: "2023-10-01",
      orders: 24,
      location: "Mumbai, Maharashtra",
      status: "Active",
      category: "Electronics",
      rating: "4.5/5",
    },
    {
      id: "V002",
      name: "Vendor Two LLC",
      contact: "vendor2@example.com",
      phone: "9765432109",
      joined: "2024-03-12",
      orders: 9,
      location: "Delhi, India",
      status: "Active",
      category: "Home Appliances",
      rating: "4.2/5",
    },
    {
      id: "V003",
      name: "Vendor Three & Co",
      contact: "vendor3@example.com",
      phone: "9654321098",
      joined: "2024-07-20",
      orders: 15,
      location: "Chennai, Tamil Nadu",
      status: "Inactive",
      category: "Fashion",
      rating: "4.0/5",
    },
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) {
      setSelectedAgent(null);
      setView("agents");
      return;
    }
    const q = searchTerm.trim().toLowerCase();
    const found = agents.find(
      (a) => a.id.toLowerCase() === q || a.name.toLowerCase().includes(q)
    );
    if (found) {
      setSelectedAgent(found);
      setView("profile");
    } else {
      setSelectedAgent(null);
      setView("agents");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedAgent(null);
    setView("agents");
  };

  const handleBackToList = () => {
    setSelectedAgent(null);
    setSelectedUser(null);
    setSelectedVendor(null);
    setView("agents");
    setSearchTerm("");
  };

  const openUserList = () => {
    setView("userList");
  };

  const openVendorList = () => {
    setView("vendorList");
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setView("customerDetails");
  };

  const openVendorDetails = (vendor) => {
    setSelectedVendor(vendor);
    setView("vendorDetails");
  };

  // ✅ Toggle Approve/Reject status
  const handleToggleStatus = (agentId) => {
    const updated = agentList.map((agent) =>
      agent.id === agentId
        ? {
            ...agent,
            status: agent.status === "Approved" ? "Rejected" : "Approved",
          }
        : agent
    );
    setAgentList(updated);
  };

  // Handle confirm status change
  const handleConfirmStatus = (agent, type) => {
    setSelectedAgent(agent);
    setConfirmType(type);
    setShowConfirm(true);
  };

  const handleStatusChange = () => {
    setAgentList((prev) =>
      prev.map((agent) =>
        agent.id === selectedAgent.id
          ? { ...agent, status: confirmType === "approve" ? "Approved" : "Rejected" }
          : agent
      )
    );
    setShowConfirm(false);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
     

      {/* Title + Search Bar in One Line - Matching Customer Page */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        {/* Title */}
        <h3 className="mb-0 text-danger fw-bold">Agents</h3>

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
            placeholder="Search agents..."
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

      {/* AGENT PROFILE - Matching Customer Page Card Style */}
      {view === "profile" && selectedAgent && (
        <div className="card shadow-lg p-4">
          <Card.Title className="text-danger fw-bold mb-3">
            Agent Details
          </Card.Title>
          <div className="card-body">
            {/* Basic Info */}
            <h5 className="fw-bold text-secondary mb-3">Basic Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Agent ID:</strong> {selectedAgent.id}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Name:</strong> {selectedAgent.name}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Phone:</strong> {selectedAgent.phone}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Email:</strong> {selectedAgent.email}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Location:</strong> {selectedAgent.location}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Agent Type:</strong> {selectedAgent.type}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Joining Date:</strong> {selectedAgent.joiningDate}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Subscription Validity:</strong> {selectedAgent.subscriptionValidity}
              </div>
            </div>

            <hr />

            {/* Activity Info */}
            <h5 className="fw-bold text-secondary mb-3">Activity Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Commission Credited:</strong> {selectedAgent.commission}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Schemes Joined:</strong> {selectedAgent.schemesJoined}
              </div>
              <div className="col-md-6 mb-2">
                <strong>AMC Products Added:</strong> {selectedAgent.amcProducts}
              </div>
              <div className="col-md-6 mb-2">
                <strong>MPL Products Added:</strong> {selectedAgent.mplProducts}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Luck Draw Tickets Sold:</strong> {selectedAgent.luckDrawTickets}
              </div>
              <div className="col-md-6 mb-2">
                <strong>ECB Tickets Sold:</strong> {selectedAgent.ecbTickets}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Products Sold:</strong> {selectedAgent.productsSold}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    selectedAgent.status === "Approved" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {selectedAgent.status}
                </span>
              </div>
            </div>

            {/* Buttons - Matching Customer Page Style */}
            <div className="mt-4">
              <button
                className="btn btn-warning me-2 text-white"
                onClick={() => setShowEdit(true)}
              >
                <FaEdit /> Edit
              </button>
              <button className="btn btn-primary me-2" onClick={openUserList}>
                <FaUsers /> View Users
              </button>
              <button className="btn btn-info me-2 text-white" onClick={openVendorList}>
                <FaStore /> View Vendors
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClearSearch}
              >
                <FaArrowLeft /> Back to List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USERS LIST VIEW - Matching Customer Page Table Style */}
      {view === "userList" && (
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <table className="table table-striped mb-0 align-middle custom-table">
              <thead className="custom-thead">
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.joinDate}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openUserDetails(u)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VENDORS LIST VIEW - Matching Customer Page Table Style */}
      {view === "vendorList" && (
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <table className="table table-striped mb-0 align-middle custom-table">
              <thead className="custom-thead">
                <tr>
                  <th>Vendor ID</th>
                  <th>Vendor Name</th>
                  <th>Contact Email</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.contact}</td>
                    <td>{v.joined}</td>
                    <td>
                      <span
                        className={`badge ${
                          v.status === "Active" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openVendorDetails(v)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USER DETAILS CARD - Matching Customer Page Style */}
      {view === "customerDetails" && selectedUser && (
        <div className="card shadow-lg p-4">
          <Card.Title className="text-danger fw-bold mb-3">
            Customer Details
          </Card.Title>
          <div className="card-body">
            <h5 className="fw-bold text-secondary mb-3">Basic Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Name:</strong> {selectedUser.name}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Mobile:</strong> {selectedUser.mobile}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Gender:</strong> {selectedUser.gender}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Date of Birth:</strong> {selectedUser.dob}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Address:</strong> {selectedUser.address}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Registration Date:</strong> {selectedUser.joinDate}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Referral Code:</strong> {selectedUser.referral}
              </div>
            </div>

            <hr />

            <h5 className="fw-bold text-secondary mb-3">Activity Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Last Login Time:</strong> {selectedUser.lastLogin}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Total Orders / Transactions:</strong> {selectedUser.totalOrders}
              </div>
              <div className="col-md-6 mb-2">
                <strong>MPL:</strong> {selectedUser.mpl}
              </div>
              <div className="col-md-6 mb-2">
                <strong>AMC:</strong> {selectedUser.amc}
              </div>
              <div className="col-md-6 mb-2">
                <strong>No. of Schemes:</strong> {selectedUser.schemesCount}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Scheme Status:</strong>{" "}
                <span className="badge bg-success">{selectedUser.schemeStatus}</span>
              </div>
            </div>

            <div className="mt-4">
              <button className="btn btn-warning me-2 text-white">
                <FaEdit /> Edit
              </button>
              <button className="btn btn-danger me-2">
                <FaTimes /> Deactivate
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setView("userList")}
              >
                <FaArrowLeft /> Back to Users
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VENDOR DETAILS - Matching Customer Page Style */}
      {view === "vendorDetails" && selectedVendor && (
        <div className="card shadow-lg p-4">
          <Card.Title className="text-danger fw-bold mb-3">
            Vendor Details
          </Card.Title>
          <div className="card-body">
            <h5 className="fw-bold text-secondary mb-3">Basic Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Vendor ID:</strong> {selectedVendor.id}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Vendor Name:</strong> {selectedVendor.name}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Contact Email:</strong> {selectedVendor.contact}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Phone:</strong> {selectedVendor.phone}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Join Date:</strong> {selectedVendor.joined}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Location:</strong> {selectedVendor.location}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Category:</strong> {selectedVendor.category}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Rating:</strong> {selectedVendor.rating}
              </div>
            </div>

            <hr />

            <h5 className="fw-bold text-secondary mb-3">Activity Info</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Total Orders:</strong> {selectedVendor.orders}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    selectedVendor.status === "Active" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {selectedVendor.status}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <button className="btn btn-warning me-2 text-white">
                <FaEdit /> Edit
              </button>
              <button className="btn btn-danger me-2">
                <FaTimes /> Deactivate
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setView("vendorList")}
              >
                <FaArrowLeft /> Back to Vendors
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AGENTS TABLE - Matching Customer Page Table Style */}
      {view === "agents" && (
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <table className="table table-striped mb-0 align-middle custom-table">
              <thead className="custom-thead">
                <tr>
                  <th>Agent ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.phone}</td>
                    <td>{a.email}</td>
                    <td>{a.location}</td>
                    <td>
                      <span
                        className={`badge ${
                          a.status === "Approved" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2 text-white"
                        onClick={() => {
                          setSelectedAgent(a);
                          setShowEdit(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      {a.status === "Approved" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleConfirmStatus(a, "reject")}
                        >
                          <FaTimes />
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleConfirmStatus(a, "approve")}
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        className="btn btn-primary btn-sm ms-2"
                        onClick={() => {
                          setSelectedAgent(a);
                          setView("profile");
                        }}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-info btn-sm ms-2 text-white"
                        onClick={() => {
                          setSelectedAgent(a);
                          setShowSubscriptions(true);
                        }}
                      >
                        <FaListAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBSCRIPTION MODAL */}
      {showSubscriptions && (
        <Modal
          title={`Subscriptions - ${selectedAgent?.name}`}
          onClose={() => setShowSubscriptions(false)}
        >
          <div className="text-center py-5">
            <h5 className="text-danger fw-bold mb-3">No Subscriptions Found</h5>
            <p className="text-muted">
              No subscription records found for this agent.
            </p>
            <button
              className="btn btn-danger mt-4"
              onClick={() => setShowSubscriptions(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <Modal title="Edit Agent" onClose={() => setShowEdit(false)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedAgent?.name?.split(" ")[0] || ""}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedAgent?.name?.split(" ")[1] || ""}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedAgent?.phone || ""}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                defaultValue={selectedAgent?.email || ""}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Birth *</label>
              <input
                type="text"
                className="form-control"
                defaultValue="19-05-1997"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">State *</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Andhra Pradesh"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">City *</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Visakhapatnam"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-warning text-white"
              onClick={() => setShowEdit(false)}
            >
              Update
            </button>
          </div>
        </Modal>
      )}

      {/* CONFIRM STATUS MODAL - Matching Customer Page */}
      {showConfirm && (
        <Modal
          title={`${confirmType === "approve" ? "Approve" : "Reject"} Agent`}
          onClose={() => setShowConfirm(false)}
        >
          <div className="text-center py-3">
            <p>
              Are you sure you want to{" "}
              <strong>
                {confirmType === "approve" ? "approve" : "reject"}{" "}
                {selectedAgent?.name}?
              </strong>
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className={`btn ${confirmType === "approve" ? "btn-success" : "btn-danger"}`}
                onClick={handleStatusChange}
              >
                Yes, {confirmType === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </Modal>
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

/* ---------------- Modal component ---------------- */
function Modal({ title, children, onClose }) {
  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger fw-bold">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Card.Title component ---------------- */
function Card({ children, className }) {
  return <div className={className}>{children}</div>;
}

Card.Title = function CardTitle({ children, className }) {
  return <h4 className={`card-title ${className}`}>{children}</h4>;
};