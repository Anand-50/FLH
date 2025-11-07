import React, { useState } from "react";

function Categories({ onTabChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, title: "T1", description: "Upload bills related to shopping", ticket: 15, min: 100, max: 2500 },
    { id: 2, title: "T2", description: "General expense cashback category", ticket: 25, min: 2500, max: 5000 },
    { id: 3, title: "T3", description: "Higher value purchase cashback", ticket: 35, min: 5000, max: 7500 },
    { id: 4, title: "T4", description: "Premium purchase category", ticket: 45, min: 7500, max: 10000 },
  ]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    title: "",
    description: "",
    ticket: "",
    min: "",
    max: "",
  });

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const breadcrumb = {
    fontSize: "14px",
    marginBottom: "8px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
  };

  const tabContainer = {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  };

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

  const addBtn = {
    background: "#B11226",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
  };

  const tableHead = {
    background: "#B11226",
    color: "#fff",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const thStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
  };

  const editIcon = {
    background: "#FFC107",
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

  const openEdit = (item) => {
    setSelectedItem(item);
    setIsAdd(false);
    setIsOpen(true);
  };

  const openAdd = () => {
    setSelectedItem({
      id: "",
      title: "",
      description: "",
      ticket: "",
      min: "",
      max: "",
    });
    setIsAdd(true);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!selectedItem.title || !selectedItem.description || !selectedItem.ticket || !selectedItem.min || !selectedItem.max) {
      showToast("Please fill all required fields!", "error");
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      title: selectedItem.title,
      description: selectedItem.description,
      ticket: parseInt(selectedItem.ticket),
      min: parseInt(selectedItem.min),
      max: parseInt(selectedItem.max),
    };

    setCategories(prevCategories => [...prevCategories, newCategory]);
    setIsOpen(false);
    showToast("Category added successfully!");
  };

  const handleUpdate = () => {
    if (!selectedItem.title || !selectedItem.description || !selectedItem.ticket || !selectedItem.min || !selectedItem.max) {
      showToast("Please fill all required fields!", "error");
      return;
    }

    setCategories(prevCategories => 
      prevCategories.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              title: selectedItem.title,
              description: selectedItem.description,
              ticket: parseInt(selectedItem.ticket),
              min: parseInt(selectedItem.min),
              max: parseInt(selectedItem.max)
            }
          : item
      )
    );
    setIsOpen(false);
    showToast("Category updated successfully!");
  };

  const handleSubmit = () => {
    if (isAdd) {
      handleSave();
    } else {
      handleUpdate();
    }
  };

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

      {/* ✅ Breadcrumb */}
      <p style={breadcrumb}>
        <b>Home</b> | Earn Cashback Management
      </p>

      {/* ✅ Heading */}
      <h2 style={titleStyle}>Earn Cashback Management</h2>

      {/* ✅ Tabs */}
      <div style={tabContainer}>
        <button style={tabActive}>Categories</button>

        <button
          style={tabInactive}
          onClick={() => onTabChange("earn cashbacks")}
        >
          Earn Cashbacks
        </button>
      </div>

      {/* ✅ Title + Add button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ color: "#F4A30A", margin: 0 }}>Cashback Categories</h3>
        <button style={addBtn} onClick={openAdd}>
          + Add Category
        </button>
      </div>

      {/* ✅ Table */}
      <table style={tableStyle}>
        <thead style={tableHead}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Ticket Price</th>
            <th style={thStyle}>Bill Range Min</th>
            <th style={thStyle}>Bill Range Max</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.id}</td>
              <td style={tdStyle}>{item.title}</td>
              <td style={tdStyle}>{item.description}</td>
              <td style={tdStyle}>{item.ticket}</td>
              <td style={tdStyle}>₹{item.min}.00</td>
              <td style={tdStyle}>₹{item.max}.00</td>
              <td style={tdStyle}>
                <button style={editIcon} onClick={() => openEdit(item)} title="Edit">
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MODAL */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              width: "500px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#B11226",
                marginBottom: "20px",
              }}
            >
              {isAdd ? "Add Category" : "Edit Category"}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Title *</label>
              <input
                value={selectedItem.title}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
                placeholder="Enter category title"
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Description *</label>
              <textarea
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                rows={3}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  resize: "vertical",
                }}
                placeholder="Enter category description"
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Ticket Price *</label>
              <input
                type="number"
                value={selectedItem.ticket}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, ticket: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
                placeholder="Enter ticket price"
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Bill Range Min *</label>
                <input
                  type="number"
                  value={selectedItem.min}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, min: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                  }}
                  placeholder="Min amount"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Bill Range Max *</label>
                <input
                  type="number"
                  value={selectedItem.max}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, max: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                  }}
                  placeholder="Max amount"
                />
              </div>
            </div>

            {/* ✅ Buttons */}
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "#6c757d",
                  padding: "8px 16px",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                style={{
                  background: "#F4A30A",
                  padding: "8px 16px",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {isAdd ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;