// import React, { useMemo, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaSearch,
//   FaPlus,
//   FaEdit,
//   FaTimes,
//   FaArrowLeft,
// } from "react-icons/fa";

// // Single-file Subscriptions management (Agent + Vendor) matching the screenshots
// // - Single component with two tabs (Agent Subscriptions, Vendor Subscriptions)
// // - Agent rows contain a "Type" column (Full Time / Part Time)
// // - Vendor rows DO NOT contain Type column
// // - Add / Edit / Deactivate modals styled like screenshots

// const MAROON = "#b61d23";
// const GOLD = "#f7c700";
// const ORANGE = "#ff9b00";

// export default function SubscriptionsPage() {
//   const [activeTab, setActiveTab] = useState("agent"); // 'agent' or 'vendor'
//   const [search, setSearch] = useState("");

//   const initialAgentSubs = [
//     {
//       id: 3,
//       name: "venkata murthi gattamaneni",
//       description: "agent subscription",
//       price: 15000,
//       durationMonths: 3,
//       type: "Part Time",
//       active: true,
//     },
//     {
//       id: 2,
//       name: "Premier Agent Subscription",
//       description: "Additional benefits and commissions for agents",
//       price: 1000,
//       durationMonths: 24,
//       type: "Full Time",
//       active: true,
//     },
//   ];

//   const initialVendorSubs = [
//     {
//       id: 5,
//       name: "verrappan",
//       description: "subscription of vender",
//       price: 30000,
//       durationMonths: 3,
//       active: true,
//     },
//     {
//       id: 4,
//       name: "verrappan",
//       description: "subscription of vender",
//       price: 30000,
//       durationMonths: 3,
//       active: true,
//     },
//     {
//       id: 1,
//       name: "Premier Vendor Subscription",
//       description: "allow premium products for the vendor",
//       price: 1000,
//       durationMonths: 24,
//       active: true,
//     },
//   ];

//   const [agentSubs, setAgentSubs] = useState(initialAgentSubs);
//   const [vendorSubs, setVendorSubs] = useState(initialVendorSubs);

//   // Modal state
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeactivateModal, setShowDeactivateModal] = useState(false);

//   const [editingItem, setEditingItem] = useState(null);
//   const [toDeactivate, setToDeactivate] = useState(null);

//   const filteredRows = useMemo(() => {
//     const list = activeTab === "agent" ? agentSubs : vendorSubs;
//     if (!search) return list;
//     const q = search.trim().toLowerCase();
//     return list.filter((r) => {
//       return (
//         String(r.id).includes(q) ||
//         r.name.toLowerCase().includes(q) ||
//         (r.description && r.description.toLowerCase().includes(q)) ||
//         (r.price && String(r.price).includes(q))
//       );
//     });
//   }, [search, activeTab, agentSubs, vendorSubs]);

//   // Add / Edit form state
//   const emptyForm = {
//     name: "",
//     description: "",
//     price: 0,
//     durationMonths: "",
//     type: "Full Time",
//     active: true,
//   };

//   const [form, setForm] = useState(emptyForm);

//   function openAddModal() {
//     setForm(emptyForm);
//     setShowAddModal(true);
//   }

//   function openEditModal(item) {
//     setEditingItem(item);
//     setForm({
//       name: item.name || "",
//       description: item.description || "",
//       price: item.price || 0,
//       durationMonths: item.durationMonths || "",
//       type: item.type || "Full Time",
//       active: item.active !== false,
//     });
//     setShowEditModal(true);
//   }

//   function openDeactivateModal(item) {
//     setToDeactivate(item);
//     setShowDeactivateModal(true);
//   }

//   function saveNew() {
//     const list = activeTab === "agent" ? agentSubs : vendorSubs;
//     const setter = activeTab === "agent" ? setAgentSubs : setVendorSubs;
//     const newId = Math.max(...list.map((l) => l.id), 0) + 1;
//     const payload = {
//       id: newId,
//       name: form.name,
//       description: form.description,
//       price: Number(form.price) || 0,
//       durationMonths: Number(form.durationMonths) || 0,
//       active: form.active !== false,
//     };
//     if (activeTab === "agent") payload.type = form.type;

//     setter([...list, payload]);
//     setShowAddModal(false);
//   }

//   function updateItem() {
//     if (!editingItem) return;
//     if (activeTab === "agent") {
//       setAgentSubs((prev) =>
//         prev.map((p) =>
//           p.id === editingItem.id
//             ? {
//                 ...p,
//                 name: form.name,
//                 description: form.description,
//                 price: Number(form.price) || 0,
//                 durationMonths: Number(form.durationMonths) || 0,
//                 type: form.type,
//                 active: form.active !== false,
//               }
//             : p
//         )
//       );
//     } else {
//       setVendorSubs((prev) =>
//         prev.map((p) =>
//           p.id === editingItem.id
//             ? {
//                 ...p,
//                 name: form.name,
//                 description: form.description,
//                 price: Number(form.price) || 0,
//                 durationMonths: Number(form.durationMonths) || 0,
//                 active: form.active !== false,
//               }
//             : p
//         )
//       );
//     }
//     setShowEditModal(false);
//   }

//   function deactivateConfirmed() {
//     const item = toDeactivate;
//     if (!item) return;
//     if (activeTab === "agent") {
//       setAgentSubs((prev) => prev.filter((p) => p.id !== item.id));
//     } else {
//       setVendorSubs((prev) => prev.filter((p) => p.id !== item.id));
//     }

//     setShowDeactivateModal(false);
//   }

//   function formatPrice(n) {
//     return `₹${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//   }

//   return (
//     <div style={{ padding: 24, fontFamily: "Arial, Helvetica, sans-serif" }}>
//       {/* Breadcrumb / Back button */}
//       <div style={{ marginBottom: 14 }}>
//         <button
//           className="btn btn-link"
//           style={{ color: MAROON, padding: 0, fontWeight: 600 }}
//           onClick={() => window.history.back()}
//         >
//           <FaArrowLeft /> Back
//         </button>
//       </div>

//       <h1 style={{ color: MAROON, fontWeight: 700, marginBottom: 18 }}>Subscription Management</h1>

//       <div className="card" style={{ borderRadius: 8, padding: 18 }}>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
//           <ul className="nav nav-tabs" style={{ width: "70%" }}>
//             <li className="nav-item">
//               <a
//                 className={`nav-link ${activeTab === "agent" ? "active" : ""}`}
//                 href="#!"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab("agent");
//                 }}
//                 style={{ background: activeTab === "agent" ? ORANGE : "#f1f1f1", color: activeTab === "agent" ? "#fff" : "#333" }}
//               >
//                 Agent Subscriptions
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className={`nav-link ${activeTab === "vendor" ? "active" : ""}`}
//                 href="#!"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab("vendor");
//                 }}
//                 style={{ background: activeTab === "vendor" ? ORANGE : "#f1f1f1", color: activeTab === "vendor" ? "#fff" : "#333" }}
//               >
//                 Vendor Subscriptions
//               </a>
//             </li>
//           </ul>

//           <div style={{ flex: 1 }} />

//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div className="input-group" style={{ width: 420 }}>
//               <input
//                 className="form-control"
//                 placeholder={activeTab === "agent" ? "Search agent subscriptions..." : "Search vendor subscriptions..."}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn" style={{ background: GOLD, border: "none" }}>
//                   <FaSearch />
//                 </button>
//               </div>
//             </div>

//             <button
//               className="btn"
//               style={{ background: MAROON, color: "#fff", borderRadius: 6, padding: "10px 14px", border: `2px solid ${ORANGE}` }}
//               onClick={openAddModal}
//             >
//               <FaPlus style={{ marginRight: 8 }} /> {activeTab === "agent" ? "Add Agent Subscription" : "Add Vendor Subscription"}
//             </button>
//           </div>
//         </div>

//         <div style={{ borderTop: `4px solid ${MAROON}`, marginTop: 6 }} />

//         {/* Table */}
//         <div style={{ marginTop: 12 }}>
//           <table className="table">
            
//             <thead
//   style={{
//     backgroundColor: "#b61d23", // Maroon background for the entire thead
//     color: "white",
//     fontWeight: "600",
//     fontSize: "15px",
//     borderBottom: "2px solid #a31a1f",
//   }}
// >
//   <tr>
//     <th style={{ width: 60, padding: "12px 15px" }}>ID</th>
//     <th style={{ padding: "12px 15px" }}>Name</th>
//     <th style={{ padding: "12px 15px" }}>Description</th>
//     <th style={{ width: 140, padding: "12px 15px" }}>Price</th>
//     <th style={{ width: 110, padding: "12px 15px" }}>Duration</th>
//     {activeTab === "agent" && (
//       <th style={{ width: 120, padding: "12px 15px" }}>Type</th>
//     )}
//     <th style={{ width: 130, padding: "12px 15px" }}>Actions</th>
//   </tr>
// </thead>


//             <tbody>
//               {filteredRows.map((r) => (
//                 <tr key={r.id} style={{ background: "#fafafa" }}>
//                   <td style={{ verticalAlign: "middle" }}>{r.id}</td>
//                   <td style={{ verticalAlign: "middle" }}>{r.name}</td>
//                   <td style={{ verticalAlign: "middle" }}>{r.description}</td>
//                   <td style={{ verticalAlign: "middle" }}>{formatPrice(r.price)}</td>
//                   <td style={{ verticalAlign: "middle" }}>{r.durationMonths} months</td>
//                   {activeTab === "agent" && (
//                     <td style={{ verticalAlign: "middle" }}>
//                       <span className="badge badge-pill" style={{ background: "#1e90ff", color: "#fff" }}>
//                         {r.type}
//                       </span>
//                     </td>
//                   )}
//                   <td>
//                     <div style={{ display: "flex", gap: 8 }}>
//                       <button
//                         className="btn btn-outline-primary"
//                         onClick={() => openEditModal(r)}
//                         title="Edit"
//                         style={{ borderRadius: 6 }}
//                       >
//                         <FaEdit />
//                       </button>

//                       <button className="btn btn-outline-danger" onClick={() => openDeactivateModal(r)} title="Deactivate" style={{ borderRadius: 6 }}>
//                         <FaTimes />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {filteredRows.length === 0 && (
//                 <tr>
//                   <td colSpan={activeTab === "agent" ? 7 : 6} style={{ textAlign: "center", padding: 30, color: "#777" }}>
//                     No subscriptions found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ADD Modal */}
//       {showAddModal && (
//         <div className="modal-backdrop show" style={{ zIndex: 1040 }} />
//       )}
//       <div className={`modal ${showAddModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog" aria-modal="true">
//         <div className="modal-dialog modal-lg" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" style={{ color: MAROON }}>{`Add ${activeTab === "agent" ? "Agent" : "Vendor"} Subscription`}</h5>
//               <button type="button" className="close" onClick={() => setShowAddModal(false)}>
//                 <span aria-hidden>×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>Name *</label>
//                 <input className="form-control" placeholder={`Enter subscription name`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//               </div>

//               <div className="form-group">
//                 <label>Description *</label>
//                 <textarea className="form-control" rows={3} placeholder={`Enter subscription description`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//               </div>

//               <div className="form-row">
//                 <div className="form-group col-md-4">
//                   <label>Price *</label>
//                   <input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//                 </div>
//                 <div className="form-group col-md-4">
//                   <label>Duration (Months) *</label>
//                   <input type="number" className="form-control" value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: e.target.value })} />
//                 </div>

//                 {activeTab === "agent" && (
//                   <div className="form-group col-md-4">
//                     <label>Type *</label>
//                     <select className="form-control" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
//                       <option>Full Time</option>
//                       <option>Part Time</option>
//                     </select>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn" style={{ background: "#6c757d", color: "#fff" }} onClick={() => setShowAddModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn" style={{ background: ORANGE, color: "#fff" }} onClick={saveNew}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* EDIT Modal */}
//       {showEditModal && <div className="modal-backdrop show" style={{ zIndex: 1040 }} />}
//       <div className={`modal ${showEditModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog" aria-modal="true">
//         <div className="modal-dialog modal-lg" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" style={{ color: MAROON }}>Edit Subscription</h5>
//               <button type="button" className="close" onClick={() => setShowEditModal(false)}>
//                 <span aria-hidden>×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>Name *</label>
//                 <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//               </div>

//               <div className="form-group">
//                 <label>Description *</label>
//                 <textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//               </div>

//               <div className="form-row">
//                 <div className="form-group col-md-4">
//                   <label>Price *</label>
//                   <input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//                 </div>
//                 <div className="form-group col-md-4">
//                   <label>Duration (Months) *</label>
//                   <input type="number" className="form-control" value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: e.target.value })} />
//                 </div>

//                 {activeTab === "agent" && (
//                   <div className="form-group col-md-4">
//                     <label>Type *</label>
//                     <select className="form-control" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
//                       <option>Full Time</option>
//                       <option>Part Time</option>
//                     </select>
//                   </div>
//                 )}
//               </div>

//               <div className="form-group form-check">
//                 <input type="checkbox" className="form-check-input" id="activeCheck" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
//                 <label className="form-check-label" htmlFor="activeCheck">Active Subscription</label>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn" style={{ background: "#6c757d", color: "#fff" }} onClick={() => setShowEditModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn" style={{ background: ORANGE, color: "#fff" }} onClick={updateItem}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DEACTIVATE Modal */}
//       {showDeactivateModal && <div className="modal-backdrop show" style={{ zIndex: 1040 }} />}
//       <div className={`modal ${showDeactivateModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog" aria-modal="true">
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" style={{ color: MAROON }}>Deactivate Subscription</h5>
//               <button type="button" className="close" onClick={() => setShowDeactivateModal(false)}>
//                 <span aria-hidden>×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <p>
//                 Are you sure you want to deactivate the subscription plan
//                 <strong> "{toDeactivate ? toDeactivate.name : ""}"</strong>?
//               </p>
//             </div>
//             <div className="modal-footer">
//               <button className="btn" style={{ background: "#6c757d", color: "#fff" }} onClick={() => setShowDeactivateModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn" style={{ background: MAROON, color: "#fff" }} onClick={deactivateConfirmed}>
//                 Yes, Deactivate
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Inline styles to replicate look */}
//       <style jsx>{`
//         .modal-backdrop.show { opacity: 0.5; }
//         .nav-tabs .nav-link { border: none; margin-right: 8px; border-radius: 6px 6px 0 0; padding: 10px 18px; }
//         .nav-tabs .nav-link.active { box-shadow: 0 0 0 3px rgba(255,155,0,0.15); }
//         .table thead th { vertical-align: middle; }
//         .badge { padding: 6px 8px; border-radius: 12px; }
//         .modal-content { border-radius: 8px; }
              
//         .table tbody tr:nth-child(even) {
//           background-color: #f9f9f9 !important;
//         }
//         .table tbody tr:nth-child(odd) {
//           background-color: #ffffff !important;
//         }
//         .table th,
//         .table td {
//           border: none !important;
//           vertical-align: middle !important;
//           padding: 12px 15px !important;
//         }
//         .table thead th {
//           border: none !important;
//           text-align: left;
//         }
//         .modal-backdrop.show {
//           opacity: 0.5;
//         }
//         .nav-tabs .nav-link {
//           border: none;
//           margin-right: 8px;
//           border-radius: 6px 6px 0 0;
//           padding: 10px 18px;
//         }
//         .nav-tabs .nav-link.active {
//           box-shadow: 0 0 0 3px rgba(255, 155, 0, 0.15);
//         }
//         .badge {
//           padding: 6px 8px;
//           border-radius: 12px;
//         }
//         .modal-content {
//           border-radius: 8px;
//         }
      
//       `}</style>
//     </div>
//   );
// }



import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

const MAROON = "#b61d23";
const GOLD = "#f7c700";
const ORANGE = "#ff9b00";

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("agent"); // 'agent' or 'vendor'
  const [search, setSearch] = useState("");

  const initialAgentSubs = [
    {
      id: 3,
      name: "venkata murthi gattamaneni",
      description: "agent subscription",
      price: 15000,
      durationMonths: 3,
      type: "Part Time",
      active: true,
    },
    {
      id: 2,
      name: "Premier Agent Subscription",
      description: "Additional benefits and commissions for agents",
      price: 1000,
      durationMonths: 24,
      type: "Full Time",
      active: true,
    },
  ];

  const initialVendorSubs = [
    {
      id: 5,
      name: "verrappan",
      description: "subscription of vender",
      price: 30000,
      durationMonths: 3,
      active: true,
    },
    {
      id: 4,
      name: "verrappan",
      description: "subscription of vender",
      price: 30000,
      durationMonths: 3,
      active: true,
    },
    {
      id: 1,
      name: "Premier Vendor Subscription",
      description: "allow premium products for the vendor",
      price: 1000,
      durationMonths: 24,
      active: true,
    },
  ];

  const [agentSubs, setAgentSubs] = useState(initialAgentSubs);
  const [vendorSubs, setVendorSubs] = useState(initialVendorSubs);

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [toDeactivate, setToDeactivate] = useState(null);

  const filteredRows = useMemo(() => {
    const list = activeTab === "agent" ? agentSubs : vendorSubs;
    if (!search) return list;
    const q = search.trim().toLowerCase();
    return list.filter((r) => {
      return (
        String(r.id).includes(q) ||
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.price && String(r.price).includes(q))
      );
    });
  }, [search, activeTab, agentSubs, vendorSubs]);

  // Add / Edit form state
  const emptyForm = {
    name: "",
    description: "",
    price: 0,
    durationMonths: "",
    type: "Full Time",
    active: true,
  };

  const [form, setForm] = useState(emptyForm);

  function openAddModal() {
    setForm(emptyForm);
    setShowAddModal(true);
  }

  function openEditModal(item) {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price || 0,
      durationMonths: item.durationMonths || "",
      type: item.type || "Full Time",
      active: item.active !== false,
    });
    setShowEditModal(true);
  }

  function openDeactivateModal(item) {
    setToDeactivate(item);
    setShowDeactivateModal(true);
  }

  function saveNew() {
    const list = activeTab === "agent" ? agentSubs : vendorSubs;
    const setter = activeTab === "agent" ? setAgentSubs : setVendorSubs;
    const newId = Math.max(...list.map((l) => l.id), 0) + 1;
    const payload = {
      id: newId,
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      durationMonths: Number(form.durationMonths) || 0,
      active: form.active !== false,
    };
    if (activeTab === "agent") payload.type = form.type;

    setter([...list, payload]);
    setShowAddModal(false);
  }

  function updateItem() {
    if (!editingItem) return;
    if (activeTab === "agent") {
      setAgentSubs((prev) =>
        prev.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                name: form.name,
                description: form.description,
                price: Number(form.price) || 0,
                durationMonths: Number(form.durationMonths) || 0,
                type: form.type,
                active: form.active !== false,
              }
            : p
        )
      );
    } else {
      setVendorSubs((prev) =>
        prev.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                name: form.name,
                description: form.description,
                price: Number(form.price) || 0,
                durationMonths: Number(form.durationMonths) || 0,
                active: form.active !== false,
              }
            : p
        )
      );
    }
    setShowEditModal(false);
  }

  function deactivateConfirmed() {
    const item = toDeactivate;
    if (!item) return;
    if (activeTab === "agent") {
      setAgentSubs((prev) => prev.filter((p) => p.id !== item.id));
    } else {
      setVendorSubs((prev) => prev.filter((p) => p.id !== item.id));
    }

    setShowDeactivateModal(false);
  }

  function formatPrice(n) {
    return `₹${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Breadcrumb / Back button */}
      <div style={{ marginBottom: 14 }}>
        <button
          className="btn btn-link"
          style={{ color: MAROON, padding: 0, fontWeight: 600 }}
          onClick={() => window.history.back()}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <h1 style={{ color: MAROON, fontWeight: 700, marginBottom: 18 }}>Subscription Management</h1>

      <div className="card" style={{ borderRadius: 8, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <ul className="nav nav-tabs" style={{ width: "70%" }}>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "agent" ? "active" : ""}`}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("agent");
                }}
                style={{ background: activeTab === "agent" ? ORANGE : "#f1f1f1", color: activeTab === "agent" ? "#fff" : "#333" }}
              >
                Agent Subscriptions
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "vendor" ? "active" : ""}`}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("vendor");
                }}
                style={{ background: activeTab === "vendor" ? ORANGE : "#f1f1f1", color: activeTab === "vendor" ? "#fff" : "#333" }}
              >
                Vendor Subscriptions
              </a>
            </li>
          </ul>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="input-group" style={{ width: 420 }}>
              <input
                className="form-control"
                placeholder={activeTab === "agent" ? "Search agent subscriptions..." : "Search vendor subscriptions..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn" style={{ background: GOLD, border: "none" }}>
                  <FaSearch />
                </button>
              </div>
            </div>

            <button
              className="btn"
              style={{ background: MAROON, color: "#fff", borderRadius: 6, padding: "10px 14px", border: `2px solid ${ORANGE}` }}
              onClick={openAddModal}
            >
              <FaPlus style={{ marginRight: 8 }} /> {activeTab === "agent" ? "Add Agent Subscription" : "Add Vendor Subscription"}
            </button>
          </div>
        </div>

        <div style={{ borderTop: `4px solid ${MAROON}`, marginTop: 6 }} />

        {/* Table */}
        <div style={{ marginTop: 12 }}>
          <table className="table">
            {/* <-- Removed inline style on thead. We add a class instead --> */}
            <thead className="custom-thead">
              <tr>
                <th style={{ width: 60, padding: "12px 15px" }}>ID</th>
                <th style={{ padding: "12px 15px" }}>Name</th>
                <th style={{ padding: "12px 15px" }}>Description</th>
                <th style={{ width: 140, padding: "12px 15px" }}>Price</th>
                <th style={{ width: 110, padding: "12px 15px" }}>Duration</th>
                {activeTab === "agent" && <th style={{ width: 120, padding: "12px 15px" }}>Type</th>}
                <th style={{ width: 130, padding: "12px 15px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((r) => (
                <tr key={r.id}>
                  <td style={{ verticalAlign: "middle" }}>{r.id}</td>
                  <td style={{ verticalAlign: "middle" }}>{r.name}</td>
                  <td style={{ verticalAlign: "middle" }}>{r.description}</td>
                  <td style={{ verticalAlign: "middle" }}>{formatPrice(r.price)}</td>
                  <td style={{ verticalAlign: "middle" }}>{r.durationMonths} months</td>
                  {activeTab === "agent" && (
                    <td style={{ verticalAlign: "middle" }}>
                      <span className="badge badge-pill" style={{ background: "#1e90ff", color: "#fff" }}>
                        {r.type}
                      </span>
                    </td>
                  )}
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => openEditModal(r)}
                        title="Edit"
                        style={{ borderRadius: 6 }}
                      >
                        <FaEdit />
                      </button>

                      <button className="btn btn-outline-danger" onClick={() => openDeactivateModal(r)} title="Deactivate" style={{ borderRadius: 6 }}>
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={activeTab === "agent" ? 7 : 6} style={{ textAlign: "center", padding: 30, color: "#777" }}>
                    No subscriptions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD Modal */}
      {showAddModal && <div className="modal-backdrop show" style={{ zIndex: 1040 }} />}
      <div className={`modal ${showAddModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: MAROON }}>{`Add ${activeTab === "agent" ? "Agent" : "Vendor"} Subscription`}</h5>
              <button type="button" className="close" onClick={() => setShowAddModal(false)}>
                <span aria-hidden>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input className="form-control" placeholder={`Enter subscription name`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea className="form-control" rows={3} placeholder={`Enter subscription description`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>Price *</label>
                  <input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="form-group col-md-4">
                  <label>Duration (Months) *</label>
                  <input type="number" className="form-control" value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: e.target.value })} />
                </div>

                {activeTab === "agent" && (
                  <div className="form-group col-md-4">
                    <label>Type *</label>
                    <select className="form-control" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option>Full Time</option>
                      <option>Part Time</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" style={{ background: "#6c757d", color: "#fff" }} onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn" style={{ background: ORANGE, color: "#fff" }} onClick={saveNew}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT Modal */}
      {showEditModal && <div className="modal-backdrop show" style={{ zIndex: 1040 }} />}
      <div className={`modal ${showEditModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: MAROON }}>Edit Subscription</h5>
              <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                <span aria-hidden>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>Price *</label>
                  <input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="form-group col-md-4">
                  <label>Duration (Months) *</label>
                  <input type="number" className="form-control" value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: e.target.value })} />
                </div>

                {activeTab === "agent" && (
                  <div className="form-group col-md-4">
                    <label>Type *</label>
                    <select className="form-control" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option>Full Time</option>
                      <option>Part Time</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="activeCheck" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                <label className="form-check-label" htmlFor="activeCheck">Active Subscription</label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" style={{ background: "#6c757d", color: "#fff" }} onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn" style={{ background: ORANGE, color: "#fff" }} onClick={updateItem}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DEACTIVATE Modal */}
      {showDeactivateModal && <div className="modal-backdrop show" style={{ zIndex: 1040 }} />}
      <div className={`modal ${showDeactivateModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: MAROON }}>Deactivate Subscription</h5>
              <button type="button" className="close" onClick={() => setShowDeactivateModal(false)}>
                <span aria-hidden>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to deactivate the subscription plan
                <strong> "{toDeactivate ? toDeactivate.name : ""}"</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn" style={{ background: "#6c757d", color: "#fff" }} onClick={() => setShowDeactivateModal(false)}>
                Cancel
              </button>
              <button className="btn" style={{ background: MAROON, color: "#fff" }} onClick={deactivateConfirmed}>
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles to replicate look + the important override for thead */}
      <style jsx>{`
        .modal-backdrop.show { opacity: 0.5; }
        .nav-tabs .nav-link { border: none; margin-right: 8px; border-radius: 6px 6px 0 0; padding: 10px 18px; }
        .nav-tabs .nav-link.active { box-shadow: 0 0 0 3px rgba(255,155,0,0.15); }
        .table thead th { vertical-align: middle; }
        .badge { padding: 6px 8px; border-radius: 12px; }
        .modal-content { border-radius: 8px; }

        /* Row zebra */
        .table tbody tr:nth-child(even) {
          background-color: #f9f9f9 !important;
        }
        .table tbody tr:nth-child(odd) {
          background-color: #ffffff !important;
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

        /* ====== IMPORTANT THEAD OVERRIDE ======
           Use a class on thead and an !important rule so Bootstrap can't override it.
        */
        .table thead.custom-thead {
          background-color: ${MAROON} !important;
        }
        .table thead.custom-thead th {
          background: transparent !important; /* let the thead color show through */
          color: white !important;
          font-weight: 600 !important;
          font-size: 15px !important;
          border-bottom: 2px solid #a31a1f !important;
        }
      `}</style>
    </div>
  );
}