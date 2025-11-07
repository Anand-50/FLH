// src/ProductCategories.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("categories");

  const COLORS = {
    headerRed: "#b22222",
    lightGrayBg: "#f2f2f2",
    pageBg: "#ffffff",
    orangeTitle: "#f39c12",
    greenBadge: "#27ae60",
    yellowBtn: "#f1c40f",
    deleteRed: "#e74c3c",
    cardBorder: "#e7e7e7",
    tabsBg: "#f3f3f3",
    overlayBg: "rgba(0,0,0,0.45)",
    inactiveGray: "#6c757d",
  };

  // initial categories (5)
  const initialCategories = [
    {
      id: 1,
      name: "Home Appliances",
      description: "Home Appliances",
      image:
        "https://asset7.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/How-to-Save-Money-on-Home-Appliances-in-India.jpg",
      status: "Active",
    },
    {
      id: 2,
      name: "Furniture",
      description:
        "Stylish, durable, and functional – a perfect addition to any space. Designed for comfort and built to last.",
      image:
        "https://www.orangetree.in/cdn/shop/articles/Living-and-dining_1_1_1100x_08a44e99-1855-4516-ab82-86bbc86b74a3.jpg?v=1722849622",
      status: "Active",
    },
    {
      id: 3,
      name: "Electronics",
      description: "Category to classify all electrical products",
      image:
        "https://deq64r0ss2hgl.cloudfront.net/images/product/earbuds-headphones-21094938305907.jpg",
      status: "Active",
    },
    {
      id: 4,
      name: "Grocery kit",
      description:
        "Essential grocery bundle for everyday cooking and pantry needs.",
      image:
        "https://charitism-campaigns.s3.ap-south-1.amazonaws.com/1817c173-a086-447d-89e2-4ebb124d6f51.webp",
      status: "Active",
    },
    {
      id: 5,
      name: "Festival kit",
      description:
        "Special festive assortment — perfect for gifting during celebrations.",
      image: "https://m.media-amazon.com/images/I/81l4ypnjZvL.jpg",
      status: "Active",
    },
  ];

  const [categories, setCategories] = useState(initialCategories);

  // modal/form state
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageFile: null,
    imagePreview: "",
    status: "Active",
    editId: null,
  });
  const [errors, setErrors] = useState({});

  // confirm/deactivate modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmCategory, setConfirmCategory] = useState(null);

  // placeholder image if none provided
  const PLACEHOLDER_IMAGE =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#f3f3f3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#999' font-size='14'>No image</text></svg>`
    );

  // styles
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: COLORS.pageBg,
      padding: 24,
      color: "#222",
      minHeight: "100vh",
    },
    breadcrumb: {
      color: "#555",
      fontSize: 14,
      marginBottom: 18,
    },
    pageTitle: {
      color: COLORS.headerRed,
      fontSize: 36,
      fontWeight: 700,
      marginBottom: 18,
    },
    tabsWrapper: {
      display: "flex",
      gap: 12,
      marginBottom: 18,
    },
    tab: {
      background: COLORS.tabsBg,
      color: COLORS.headerRed,
      padding: "10px 18px",
      borderRadius: 6,
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
    },
    tabActive: {
      background: COLORS.headerRed,
      color: "#fff",
      padding: "10px 18px",
      borderRadius: 6,
      fontWeight: 700,
      cursor: "pointer",
      border: "none",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    addButton: {
      background: COLORS.headerRed,
      color: "#fff",
      padding: "10px 16px",
      borderRadius: 8,
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
    },
    sectionTitle: {
      color: COLORS.orangeTitle,
      fontSize: 26,
      fontWeight: 700,
    },
    card: {
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 8,
      padding: 12,
      background: "#fff",
    },
    tableHeader: {
      background: COLORS.headerRed,
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "6px 6px 0 0",
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "60px 90px 1fr 2fr 120px 120px",
      fontWeight: 700,
    },
    row: {
      display: "grid",
      gridTemplateColumns: "60px 90px 1fr 2fr 120px 120px",
      padding: "14px 16px",
      alignItems: "center",
      borderBottom: `1px solid ${COLORS.cardBorder}`,
      background: COLORS.lightGrayBg,
      gap: 8,
    },
    img: {
      width: 56,
      height: 56,
      objectFit: "cover",
      borderRadius: 8,
      border: "3px solid #fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
    },
    statusBadge: {
      display: "inline-block",
      background: COLORS.greenBadge,
      color: "#fff",
      padding: "6px 10px",
      borderRadius: 16,
      fontWeight: 700,
    },
    statusBadgeInactive: {
      display: "inline-block",
      background: COLORS.inactiveGray,
      color: "#fff",
      padding: "6px 10px",
      borderRadius: 16,
      fontWeight: 700,
    },
    actionBtns: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end",
    },
    editBtn: {
      background: COLORS.yellowBtn,
      border: "none",
      padding: "8px 10px",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 700,
    },
    deleteBtn: {
      background: COLORS.deleteRed,
      border: "none",
      padding: "8px 10px",
      borderRadius: 6,
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
    },
    // modal
    overlay: {
      position: "fixed",
      inset: 0,
      background: COLORS.overlayBg,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    modal: {
      width: 580,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    },
    modalHeader: {
      padding: "18px 20px",
      borderBottom: `1px solid ${COLORS.cardBorder}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      color: COLORS.headerRed,
      fontSize: 22,
      fontWeight: 700,
    },
    modalBody: {
      padding: "18px 20px",
    },
    modalFooter: {
      padding: "12px 20px",
      borderTop: `1px solid ${COLORS.cardBorder}`,
      display: "flex",
      justifyContent: "flex-end",
      gap: 12,
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 6,
      border: `1px solid ${COLORS.cardBorder}`,
      marginBottom: 10,
      fontSize: 14,
    },
    textarea: {
      width: "100%",
      minHeight: 80,
      padding: "10px 12px",
      borderRadius: 6,
      border: `1px solid ${COLORS.cardBorder}`,
      resize: "vertical",
      marginBottom: 10,
    },
    imgPreview: {
      width: 84,
      height: 84,
      objectFit: "cover",
      borderRadius: 8,
      border: `1px solid ${COLORS.cardBorder}`,
      marginTop: 6,
    },
    btnCancel: {
      background: "#6c757d",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
    },
    btnSave: {
      background: COLORS.headerRed,
      color: "#fff",
      padding: "8px 14px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
    },
    errorText: { color: COLORS.deleteRed, fontSize: 13 },

    // confirm modal style (match screenshot look)
    confirmModal: {
      width: 560,
      maxWidth: "94%",
      background: "#fff",
      borderRadius: 6,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      overflow: "hidden",
    },
    confirmHeader: {
      padding: "18px 20px",
      borderBottom: `1px solid ${COLORS.cardBorder}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    confirmBody: { padding: "18px 20px" },
    confirmFooter: {
      padding: "12px 20px",
      borderTop: `1px solid ${COLORS.cardBorder}`,
      display: "flex",
      justifyContent: "flex-end",
      gap: 12,
    },
    btnDanger: {
      background: COLORS.deleteRed,
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 700,
    },
    btnNeutral: {
      background: "#6c757d",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 700,
    },
  };

  // Modal open/close
  const openModal = () => {
    setForm({
      name: "",
      description: "",
      imageFile: null,
      imagePreview: "",
      status: "Active",
      editId: null,
    });
    setErrors({});
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, imageFile: file, imagePreview: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // validation
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter category name.";
    if (!form.description.trim()) e.description = "Please enter description.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // add category
  const handleSave = () => {
    if (!validate()) return;
    const maxId = Math.max(...categories.map((c) => c.id), 0);
    const newCategory = {
      id: maxId + 1,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.imagePreview || PLACEHOLDER_IMAGE,
      status: form.status || "Active",
    };
    setCategories((prev) => [...prev, newCategory]);
    setModalOpen(false);
  };

  // edit category
  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      description: cat.description,
      imageFile: null,
      imagePreview: cat.image || "",
      status: cat.status || "Active",
      editId: cat.id,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!validate()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === form.editId
          ? {
              ...c,
              name: form.name.trim(),
              description: form.description.trim(),
              image: form.imagePreview || PLACEHOLDER_IMAGE,
              status: form.status || "Active",
            }
          : c
      )
    );
    setModalOpen(false);
  };

  // OPEN confirm modal (instead of immediate delete)
  const openDeactivateConfirm = (cat) => {
    setConfirmCategory(cat);
    setConfirmOpen(true);
  };

  // deactivate category -> set status to Inactive (keep in list)
  const handleDeactivate = () => {
    if (!confirmCategory) {
      setConfirmOpen(false);
      return;
    }
    setCategories((prev) => prev.map((c) => (c.id === confirmCategory.id ? { ...c, status: "Inactive" } : c)));
    setConfirmOpen(false);
    setConfirmCategory(null);
  };

  // For backward compatibility: if someone used the old immediate delete
  const handleImmediateDelete = (id) => {
    // kept but not used by UI - if used, we fallback to removal
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>
        <a href="/" style={{ color: COLORS.headerRed, textDecoration: "underline" }}>
          Home
        </a>{" "}
        | Products
      </div>

      <h1 style={styles.pageTitle}>Products</h1>

      <div style={styles.tabsWrapper}>
        <button
          style={activeTab === "categories" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>

        <button
          style={activeTab === "products" ? styles.tabActive : styles.tab}
          onClick={() => navigate("/products")}
        >
          Products
        </button>
      </div>

      {/* Categories Table */}
      <div style={styles.headerRow}>
        <h2 style={styles.sectionTitle}>Product Categories</h2>
        <button style={styles.addButton} onClick={openModal}>
          + Add Category
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.tableHeader}>
          <div>ID</div>
          <div>Image</div>
          <div>Category Name</div>
          <div>Description</div>
          <div style={{ textAlign: "center" }}>Status</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>

        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            style={{
              ...styles.row,
              background: idx % 2 === 0 ? "#f7f7f7" : "#efefef",
              opacity: cat.status === "Inactive" ? 0.7 : 1,
            }}
          >
            <div>{cat.id}</div>
            <div>
              <img src={cat.image || PLACEHOLDER_IMAGE} alt={cat.name} style={styles.img} />
            </div>
            <div>{cat.name}</div>
            <div>{cat.description}</div>
            <div style={{ textAlign: "center" }}>
              <span style={cat.status === "Active" ? styles.statusBadge : styles.statusBadgeInactive}>
                {cat.status}
              </span>
            </div>
            <div style={styles.actionBtns}>
              <button style={styles.editBtn} onClick={() => handleEdit(cat)}>
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => openDeactivateConfirm(cat)}
                disabled={cat.status === "Inactive"}
                title={cat.status === "Inactive" ? "Already Inactive" : "Deactivate"}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>{form.editId ? "Edit Category" : "Add Category"}</div>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <label>Category Name *</label>
              <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <div style={styles.errorText}>{errors.name}</div>}

              <label>Description *</label>
              <textarea style={styles.textarea} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              {errors.description && <div style={styles.errorText}>{errors.description}</div>}

              <label>Status</label>
              <select
                style={styles.input}
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <label>Category Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {form.imagePreview && <img src={form.imagePreview} alt="preview" style={styles.imgPreview} />}
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={closeModal}>
                Cancel
              </button>
              {form.editId ? (
                <button style={styles.btnSave} onClick={handleSaveEdit}>
                  Save
                </button>
              ) : (
                <button style={styles.btnSave} onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deactivate confirmation modal */}
      {confirmOpen && confirmCategory && (
        <div style={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && setConfirmOpen(false)}>
          <div style={styles.confirmModal}>
            <div style={styles.confirmHeader}>
              <div style={{ color: COLORS.headerRed, fontSize: 20, fontWeight: 700 }}>Deactivate Product</div>
              <button onClick={() => setConfirmOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 20 }}>
                ✕
              </button>
            </div>

            <div style={styles.confirmBody}>
              <div style={{ color: "#333", fontSize: 14 }}>
                Are you sure you want to deactivate <strong>{confirmCategory.name}</strong>?
              </div>
            </div>

            <div style={styles.confirmFooter}>
              <button style={styles.btnNeutral} onClick={() => setConfirmOpen(false)}>
                Cancel
              </button>
              <button
                style={styles.btnDanger}
                onClick={() => {
                  handleDeactivate();
                }}
              >
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
