// src/Products.js
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const COLORS = {
    headerRed: "#b22222",
    orangeTitle: "#f39c12",
    greenBadge: "#27ae60",
    yellowBtn: "#f1c40f",
    deleteRed: "#e74c3c",
    cardBorder: "#e7e7e7",
    lightGray: "#f7f7f7",
    tabBg: "#f3f3f3",
    inactiveGray: "#6c757d",
  };

  // --- initial products (includes Grocery kit & Festival kit items) ---
  const initialProducts = [
    {
      id: 1,
      name: "Iphone 17",
      description: "Mobile",
      category: "Electronics",
      mrp: 250000,
      strikethrough: 220000,
      price: 200000,
      stockAvailable: 100,
      stockTotal: 100,
      status: "Active",
      vendor: "Vendor A",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjN2kyK5UjlIE79ic9GstkRLYs8Og7k4T_YA&s",
      ],
    },
    {
      id: 2,
      name: "Samsung Fridge",
      description: "5 star power saving fridge",
      category: "Home Appliances",
      mrp: 30000,
      strikethrough: 28000,
      price: 25000,
      stockAvailable: 21,
      stockTotal: 40,
      status: "Active",
      vendor: "Vendor B",
      images: [
        "https://images.samsung.com/is/image/samsung/p6pim/in/rr20f1823wb-hl/gallery/in-one-door-digital-inverter-technology-561600-rr20f1823wb-hl-thumb-548627965",
      ],
    },
    {
      id: 3,
      name: "Washing Machine",
      description: "ultra clean washing machine",
      category: "Home Appliances",
      mrp: 12000,
      strikethrough: 11000,
      price: 10000,
      stockAvailable: 23,
      stockTotal: 33,
      status: "Active",
      vendor: "Vendor C",
      images: ["https://lgonlinestores.com/wp-content/uploads/2024/11/FHB1208Z4M-DZ-04.webp"],
    },
    {
      id: 4,
      name: "LG Fridge",
      description: "multi storage fridge",
      category: "Electronics",
      mrp: 25000,
      strikethrough: 23000,
      price: 20000,
      stockAvailable: 10,
      stockTotal: 10,
      status: "Active",
      vendor: "Vendor A",
      images: ["https://www.myg.in/images/thumbnails/300/300/detailed/77/ff5-removebg-preview.png.png"],
    },
    {
      id: 5,
      name: "Whirlpool Fridge",
      description: "smart refrigerator",
      category: "Home Appliances",
      mrp: 30000,
      strikethrough: 28000,
      price: 25000,
      stockAvailable: 25,
      stockTotal: 25,
      status: "Active",
      vendor: "Vendor B",
      images: [],
    },
    {
      id: 6,
      name: "Kurl On Sofa sets",
      description: "test",
      category: "Furniture",
      mrp: 25000,
      strikethrough: 24000,
      price: 20000,
      stockAvailable: 9,
      stockTotal: 30,
      status: "Active",
      vendor: "Vendor C",
      images: [
        "https://5.imimg.com/data5/SELLER/Default/2024/3/405495948/ZM/QD/LW/3788898/two-piece-sofa-set-500x500.jpg",
      ],
    },
    {
      id: 7,
      name: "Ganga Mixer",
      description: "no.1 Mixer for your home",
      category: "Home Appliances",
      mrp: 2000,
      strikethrough: 1800,
      price: 1599,
      stockAvailable: 53,
      stockTotal: 60,
      status: "Active",
      vendor: "Vendor A",
      images: [],
    },
    {
      id: 8,
      name: "Jio Chromebook",
      description: "chromebook for students",
      category: "Electronics",
      mrp: 25000,
      strikethrough: 23000,
      price: 20000,
      stockAvailable: 20,
      stockTotal: 40,
      status: "Active",
      vendor: "Vendor B",
      images: [],
    },

    // Grocery kit products
    {
      id: 9,
      name: "Grocery Starter Kit - Essentials",
      description: "Rice, oil, salt, spices — daily essentials bundle.",
      category: "Grocery kit",
      mrp: 1999,
      strikethrough: 0,
      price: 1699,
      stockAvailable: 120,
      stockTotal: 150,
      status: "Active",
      vendor: "Grocery Vendor A",
      images: ["https://srinivasanmemorialcharitable.org/public/uploads/services/1730194403_2.jpeg"],
    },
    {
      id: 10,
      name: "Grocery Snacks Pack",
      description: "Assorted snacks pack for small families.",
      category: "Grocery kit",
      mrp: 899,
      strikethrough: 0,
      price: 749,
      stockAvailable: 75,
      stockTotal: 100,
      status: "Active",
      vendor: "Grocery Vendor B",
      images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=60"],
    },

    // Festival kit products
    {
      id: 11,
      name: "Festival Gift Hamper - Deluxe",
      description: "Festive hamper with sweets, dry fruits & gift item.",
      category: "Festival kit",
      mrp: 3999,
      strikethrough: 0,
      price: 3499,
      stockAvailable: 30,
      stockTotal: 40,
      status: "Active",
      vendor: "Festival Vendor A",
      images: ["https://cossetgifts.com/cdn/shop/files/20221020-172239_0000.png?v=1695449615"],
    },
    {
      id: 12,
      name: "Festival Eco Kit",
      description: "Eco-friendly festival kit (diyas, eco packaging, sweets).",
      category: "Festival kit",
      mrp: 1499,
      strikethrough: 0,
      price: 1299,
      stockAvailable: 80,
      stockTotal: 100,
      status: "Active",
      vendor: "Festival Vendor B",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlA7o1X14eB_sqVo5WXvW-55EG-Evug06ZlQ&s"],
    },
  ];

  // --- state ---
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // category filter state (default 'all' or from navigation state)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const catFromNav = location?.state?.category;
    return catFromNav || "all";
  });

  // modal state: visible, mode 'add'|'edit', editing id
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);

  // confirm deactivate modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmProduct, setConfirmProduct] = useState(null);

  const emptyForm = {
    name: "",
    category: "",
    description: "",
    mrp: "0.00",
    strikethrough: "0.00",
    price: "0.00",
    stockTotal: 0,
    stockAvailable: 0,
    status: "Active",
    vendor: "",
    imagesFiles: [],
    imagesData: [],
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const calc = () => setCollapsed(window.innerWidth <= 920);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // derive available categories from products (unique) so Grocery kit & Festival kit show up automatically
  const categories = useMemo(() => {
    const setNames = new Set(products.map((p) => p.category || "").filter(Boolean));
    return ["All Categories", ...Array.from(setNames)];
  }, [products]);

  // filtered products based on search term and selectedCategory
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      // category filter
      if (selectedCategory && selectedCategory !== "all" && selectedCategory !== "All Categories") {
        if ((p.category || "").toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }
      // search filter
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    });
  }, [products, query, selectedCategory]);

  const gridTemplates = {
    normal:
      "48px minmax(140px, 1.4fr) minmax(140px, 1.4fr) minmax(100px, 1fr) 160px 110px 100px 140px 120px",
    collapsed: "48px minmax(160px, 2fr) 180px 120px 120px 100px",
  };

  const styles = {
    page: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: 16, minHeight: "100vh", boxSizing: "border-box" },
    tabs: { display: "flex", gap: 10, marginBottom: 12 },
    tabActive: { background: COLORS.headerRed, color: "#fff", padding: "8px 14px", borderRadius: 6, fontWeight: 700 },
    tab: { background: COLORS.tabBg, color: COLORS.headerRed, padding: "8px 14px", borderRadius: 6, fontWeight: 600, cursor: "pointer" },
    titleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    title: { color: COLORS.orangeTitle, fontSize: 20, fontWeight: 700 },
    controls: { display: "flex", gap: 8, alignItems: "center" },
    searchBox: { display: "flex", alignItems: "center", border: `1px solid ${COLORS.cardBorder}`, padding: "4px 6px", borderRadius: 6, width: 300 },
    searchInput: { border: "none", outline: "none", flex: 1, padding: 6 },
    searchBtn: { background: COLORS.yellowBtn, border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" },
    categorySelect: { padding: "8px 10px", borderRadius: 6, border: `1px solid ${COLORS.cardBorder}`, fontSize: 13, background: "#fff" },
    addBtn: { background: COLORS.headerRed, color: "#fff", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer", display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 700 },
    card: { border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: 6, background: "#fff" },
    tableHeader: (template) => ({ display: "grid", gridTemplateColumns: template, alignItems: "center", background: COLORS.headerRed, color: "#fff", padding: 10, borderRadius: "6px 6px 0 0", fontWeight: 700 }),
    row: (template) => ({ display: "grid", gridTemplateColumns: template, alignItems: "center", padding: 10, borderBottom: `1px solid ${COLORS.cardBorder}`, gap: 8, fontSize: 13 }),
    idCell: { fontWeight: 700 },
    nameCell: { fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    descCell: { color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    priceCell: { textAlign: "left", fontWeight: 800 },
    priceNow: { color: "#028a0f", fontWeight: 800 },
    stockNormal: { color: "#222" },
    stockLow: { color: "#e74c3c", fontWeight: 800 },
    statusBadge: { display: "inline-block", background: COLORS.greenBadge, color: "#fff", padding: "6px 8px", borderRadius: 14, fontWeight: 700, fontSize: 12 },
    imagesCell: { display: "flex", alignItems: "center", gap: 8 },
    thumb: { width: 36, height: 36, objectFit: "cover", borderRadius: 6, border: "2px solid #fff" },
    moreBadge: { border: `1px solid ${COLORS.cardBorder}`, padding: "5px 6px", borderRadius: 6, background: "#fff", fontWeight: 700, fontSize: 12 },
    actionsCell: { display: "flex", gap: 6, justifyContent: "flex-end" },
    editBtn: { background: COLORS.yellowBtn, border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" },
    deleteBtn: { background: COLORS.deleteRed, border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer", color: "#fff" },
    emptyState: { padding: 16, textAlign: "center", color: "#666" },

    // modal styles
    overlayTop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 20, zIndex: 9999, overflowY: "auto" },
    overlayCenter: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 9999 },
    modal: { width: 920, maxWidth: "98%", background: "#fff", borderRadius: 8, padding: 18, marginTop: 30 },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    modalTitle: { fontSize: 22, color: COLORS.headerRed, fontWeight: 700 },
    fieldRow: { display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" },
    field: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
    label: { fontSize: 13, fontWeight: 700 },
    input: { padding: "10px 12px", borderRadius: 6, border: `1px solid ${COLORS.cardBorder}`, fontSize: 13, outline: "none" },
    textarea: { padding: "10px 12px", borderRadius: 6, border: `1px solid ${COLORS.cardBorder}`, fontSize: 13, minHeight: 90, resize: "vertical" },
    previewRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 },
    previewThumb: { width: 90, height: 90, objectFit: "cover", borderRadius: 6, border: `1px solid ${COLORS.cardBorder}` },
    removeSmall: { marginTop: 6, background: "#e74c3c", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" },
    footerActions: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 },
    cancelBtn: { background: "#777", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700 },
    saveBtn: { background: COLORS.headerRed, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700 },
    errText: { color: "#e74c3c", fontSize: 12 },

    // confirm modal (centered)
    confirmModal: { width: 560, maxWidth: "94%", background: "#fff", borderRadius: 6, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", overflow: "hidden" },
    confirmHeader: { padding: "18px 20px", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" },
    confirmBody: { padding: "18px 20px" },
    confirmFooter: { padding: "12px 20px", borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "flex-end", gap: 12 },
    btnDanger: { background: COLORS.deleteRed, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700 },
    btnNeutral: { background: "#6c757d", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 700 },
  };

  const template = collapsed ? gridTemplates.collapsed : gridTemplates.normal;

  // add files (append up to 5)
  const handleFilesAdd = (filesList) => {
    const newFiles = Array.from(filesList);
    setForm((prev) => {
      const existingCount = prev.imagesData.length;
      const filtered = newFiles.slice(0, Math.max(0, 5 - existingCount));
      const readers = filtered.map(
        (f) =>
          new Promise((res) => {
            const r = new FileReader();
            r.onload = () => res({ file: f, data: r.result });
            r.readAsDataURL(f);
          })
      );
      Promise.all(readers).then((arr) => {
        setForm((p) => ({
          ...p,
          imagesFiles: [...p.imagesFiles, ...arr.map((a) => a.file)],
          imagesData: [...p.imagesData, ...arr.map((a) => a.data)],
        }));
      });
      return prev;
    });
  };

  const removeImageAt = (index) => {
    setForm((prev) => {
      const nf = prev.imagesFiles.slice();
      const nd = prev.imagesData.slice();
      nf.splice(index, 1);
      nd.splice(index, 1);
      return { ...prev, imagesFiles: nf, imagesData: nd };
    });
  };

  const openAdd = () => {
    setForm({ ...emptyForm });
    setErrors({});
    setModalMode("add");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      mrp: product.mrp !== undefined ? Number(product.mrp).toFixed(2) : "0.00",
      strikethrough: product.strikethrough !== undefined ? Number(product.strikethrough).toFixed(2) : "0.00",
      price: product.price !== undefined ? Number(product.price).toFixed(2) : "0.00",
      stockTotal: product.stockTotal || 0,
      stockAvailable: product.stockAvailable || 0,
      status: product.status || "Active",
      vendor: product.vendor || "",
      imagesFiles: [],
      imagesData: Array.isArray(product.images) ? product.images.slice() : [],
    });
    setErrors({});
    setModalMode("edit");
    setEditingId(product.id);
    setModalOpen(true);
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Product Name is required";
    if (!form.category.trim()) err.category = "Category is required";
    if (!form.description.trim()) err.description = "Description is required";
    if (Number(form.price) <= 0) err.price = "Price must be greater than 0";
    if (Number(form.stockTotal) <= 0) err.stockTotal = "Quantity must be greater than 0";
    if (!form.imagesData || form.imagesData.length === 0) err.images = "Please upload at least one product image";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const saveForm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (modalMode === "add") {
      const maxId = products.reduce((a, b) => Math.max(a, b.id), 0);
      const newProduct = {
        id: maxId + 1,
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        mrp: Number(form.mrp),
        strikethrough: Number(form.strikethrough),
        price: Number(form.price),
        stockAvailable: Number(form.stockAvailable),
        stockTotal: Number(form.stockTotal),
        status: form.status || "Active",
        vendor: form.vendor || "",
        images: form.imagesData.slice(),
      };
      setProducts((prev) => [...prev, newProduct]);
    } else if (modalMode === "edit" && editingId !== null) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: form.name.trim(),
                category: form.category.trim(),
                description: form.description.trim(),
                mrp: Number(form.mrp),
                strikethrough: Number(form.strikethrough),
                price: Number(form.price),
                stockAvailable: Number(form.stockAvailable),
                stockTotal: Number(form.stockTotal),
                status: form.status || "Active",
                vendor: form.vendor || "",
                images: form.imagesData.slice(),
              }
            : p
        )
      );
    }
    setModalOpen(false);
  };

  // open centered confirm modal (do not remove product, mark as Inactive)
  const openDeactivateConfirm = (product) => {
    setConfirmProduct(product);
    setConfirmOpen(true);
  };

  const handleDeactivate = () => {
    if (!confirmProduct) return;
    setProducts((prev) => prev.map((p) => (p.id === confirmProduct.id ? { ...p, status: "Inactive" } : p)));
    setConfirmOpen(false);
    setConfirmProduct(null);
  };

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={styles.tabs}>
          <div style={styles.tab} onClick={() => navigate("/product-categories")}>
            Categories
          </div>
          <div style={styles.tabActive}>Products</div>
        </div>

        <div style={styles.controls}>
          <div style={styles.searchBox}>
            <input
              placeholder="Search products..."
              style={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button style={styles.searchBtn} onClick={() => {}} aria-label="Search">
              <FaSearch />
            </button>
          </div>

          {/* Category dropdown to filter products */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              const v = e.target.value;
              setSelectedCategory(v === "All Categories" ? "all" : v);
            }}
            style={styles.categorySelect}
            aria-label="Filter by category"
          >
            {categories.map((c) => {
              const value = c === "All Categories" ? "all" : c;
              return (
                <option key={c} value={value}>
                  {c}
                </option>
              );
            })}
          </select>

          <button style={styles.addBtn} onClick={openAdd} title="Add Product">
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      <div style={styles.card}>
        {/* Header: left-align labels so they appear on left side of columns */}
        <div style={styles.tableHeader(template)}>
          <div style={{ paddingLeft: 4, textAlign: "left" }}>ID</div>
          <div style={{ textAlign: "left" }}>Product Name</div>
          {!collapsed && <div style={{ textAlign: "left" }}>Description</div>}
          {!collapsed && <div style={{ textAlign: "left" }}>Category</div>}
          <div style={{ textAlign: "left" }}>Price</div>
          <div style={{ textAlign: "left" }}>Stock</div>
          {!collapsed && <div style={{ textAlign: "left" }}>Status</div>}
          <div style={{ textAlign: "left" }}>Images</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>

        <div>
          {filtered.map((p, idx) => {
            const lowStock = p.stockAvailable < Math.ceil(p.stockTotal * 0.25);
            const rowBg = idx % 2 === 0 ? "#fafafa" : "#f2f2f2";

            if (collapsed) {
              return (
                <div key={p.id} style={{ ...styles.row(template), background: rowBg }}>
                  <div style={styles.idCell}>{p.id}</div>

                  <div style={styles.nameCell} title={p.name}>
                    {p.name}
                  </div>

                  <div style={styles.priceCell}>
                    <div style={styles.priceNow}>₹{Number(p.price).toFixed(2)}</div>
                  </div>

                  <div style={{ textAlign: "left" }}>
                    <span style={lowStock ? styles.stockLow : styles.stockNormal}>
                      {p.stockAvailable} / {p.stockTotal}
                    </span>
                  </div>

                  <div style={styles.imagesCell}>
                    {p.images && p.images.length > 0 ? (
                      <>
                        <img src={p.images[0]} alt={p.name} style={styles.thumb} />
                        {p.images.length > 1 ? <div style={styles.moreBadge}>+{p.images.length - 1}</div> : null}
                      </>
                    ) : (
                      <div style={{ color: "#777", fontSize: 13 }}>No Images</div>
                    )}
                  </div>

                  <div style={styles.actionsCell}>
                    <button style={styles.editBtn} onClick={() => openEdit(p)} title="Edit">
                      ✎
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => openDeactivateConfirm(p)}
                      title="Deactivate"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={p.id} style={{ ...styles.row(template), background: rowBg, opacity: p.status === "Inactive" ? 0.7 : 1 }}>
                <div style={styles.idCell}>{p.id}</div>

                <div style={styles.nameCell} title={p.name}>
                  {p.name}
                </div>

                <div style={styles.descCell} title={p.description}>
                  {p.description}
                </div>

                <div>{p.category}</div>

                <div style={styles.priceCell}>
                  <span style={styles.priceNow}>₹{Number(p.price).toFixed(2)}</span>
                </div>

                <div style={{ textAlign: "left" }}>
                  <span style={lowStock ? styles.stockLow : styles.stockNormal}>
                    {p.stockAvailable} / {p.stockTotal}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background: p.status === "Active" ? COLORS.greenBadge : COLORS.inactiveGray,
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <div style={styles.imagesCell}>
                  {p.images && p.images.length > 0 ? (
                    <>
                      <img src={p.images[0]} alt={p.name} style={styles.thumb} />
                      {p.images.length > 1 ? <div style={styles.moreBadge}>+{p.images.length - 1}</div> : null}
                    </>
                  ) : (
                    <div style={{ color: "#777", fontSize: 13 }}>No Images</div>
                  )}
                </div>

                <div style={styles.actionsCell}>
                  <button style={styles.editBtn} onClick={() => openEdit(p)} title="Edit">
                    ✎
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => openDeactivateConfirm(p)}
                    title="Deactivate"
                    disabled={p.status === "Inactive"}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && <div style={styles.emptyState}>No products found</div>}
        </div>
      </div>

      {/* Add / Edit Modal (keeps previous behavior) */}
      {modalOpen && (
        <div style={styles.overlayTop} onMouseDown={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>{modalMode === "add" ? "Add Product" : "Edit Product"}</div>
              <button onClick={() => setModalOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={saveForm}>
              <div style={styles.fieldRow}>
                <div style={{ ...styles.field, flex: 2 }}>
                  <label style={styles.label}>Product Name *</label>
                  <input style={styles.input} value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Enter product name" />
                  {errors.name && <div style={styles.errText}>{errors.name}</div>}
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Category *</label>
                  <select style={styles.input} value={form.category} onChange={(e) => setField("category", e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.filter((c) => c !== "All Categories").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    {/* keep full list available too */}
                    <option>Fashion</option>
                    <option>Accessories</option>
                  </select>
                  {errors.category && <div style={styles.errText}>{errors.category}</div>}
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={{ ...styles.field }}>
                  <label style={styles.label}>Description *</label>
                  <textarea style={styles.textarea} value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Enter product description" />
                  {errors.description && <div style={styles.errText}>{errors.description}</div>}
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Original Price (₹)</label>
                  <input style={styles.input} type="number" step="0.01" min="0" value={form.mrp} onChange={(e) => setField("mrp", e.target.value)} />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Strikethrough Price (₹)</label>
                  <input style={styles.input} type="number" step="0.01" min="0" value={form.strikethrough} onChange={(e) => setField("strikethrough", e.target.value)} />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Price (₹) *</label>
                  <input style={styles.input} type="number" step="0.01" min="0" value={form.price} onChange={(e) => setField("price", e.target.value)} />
                  {errors.price && <div style={styles.errText}>{errors.price}</div>}
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Quantity *</label>
                  <input
                    style={styles.input}
                    type="number"
                    min="0"
                    value={form.stockTotal}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setField("stockTotal", v);
                      if (Number(form.stockAvailable) === 0) setField("stockAvailable", v);
                    }}
                  />
                  {errors.stockTotal && <div style={styles.errText}>{errors.stockTotal}</div>}
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Remaining Quantity</label>
                  <input style={styles.input} type="number" min="0" value={form.stockAvailable} onChange={(e) => setField("stockAvailable", Number(e.target.value))} />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Vendor</label>
                  <select style={styles.input} value={form.vendor} onChange={(e) => setField("vendor", e.target.value)}>
                    <option value="">Select Vendor</option>
                    <option>Vendor A</option>
                    <option>Vendor B</option>
                    <option>Vendor C</option>
                    <option>Grocery Vendor A</option>
                    <option>Grocery Vendor B</option>
                    <option>Festival Vendor A</option>
                    <option>Festival Vendor B</option>
                  </select>
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Status</label>
                  <select style={styles.input} value={form.status} onChange={(e) => setField("status", e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={styles.label}>Product Images * (Max 5)</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="file" accept="image/*" multiple onChange={(e) => handleFilesAdd(e.target.files)} />
                  {errors.images && <div style={styles.errText}>{errors.images}</div>}
                </div>

                <div style={styles.previewRow}>
                  {form.imagesData && form.imagesData.length > 0 ? (
                    form.imagesData.map((src, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={src} alt={`preview-${i}`} style={styles.previewThumb} />
                        <button type="button" style={styles.removeSmall} onClick={() => removeImageAt(i)}>
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "#777" }}>No Images</div>
                  )}
                </div>
              </div>

              <div style={styles.footerActions}>
                <button type="button" style={styles.cancelBtn} onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Centered Deactivate confirmation modal */}
      {confirmOpen && confirmProduct && (
        <div style={styles.overlayCenter} onMouseDown={(e) => e.target === e.currentTarget && setConfirmOpen(false)}>
          <div style={styles.confirmModal}>
            <div style={styles.confirmHeader}>
              <div style={{ color: COLORS.headerRed, fontSize: 20, fontWeight: 700 }}>Deactivate Product</div>
              <button onClick={() => setConfirmOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 20 }}>
                ✕
              </button>
            </div>

            <div style={styles.confirmBody}>
              <div style={{ color: "#333", fontSize: 14 }}>
                Are you sure you want to deactivate <strong>{confirmProduct.name}</strong>?
              </div>
            </div>

            <div style={styles.confirmFooter}>
              <button style={styles.btnNeutral} onClick={() => setConfirmOpen(false)}>
                Cancel
              </button>
              <button style={styles.btnDanger} onClick={handleDeactivate}>
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
