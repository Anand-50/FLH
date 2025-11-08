// src/schemes.js
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTimes, FaCheck } from "react-icons/fa";

export default function Schemes() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Color palette (same tones) ---
  const COLORS = {
    headerRed: "#b22222",
    cardBorder: "#e6e6e6",
    rowAlt: "#f7f7f7",
    typePill: "#17c9e0",
    typePillText: "#ffffff",
    statusGreen: "#2e7d32",
    statusInactive: "#9e9e9e",
    statusText: "#ffffff",
    viewBlue: "#1e88e5",
    editYellow: "#f4b400",
    deleteRed: "#c62828",
    searchYellow: "#f4b400",
    createRed: "#b22222",
  };

  // --- Fixed / initial data (cleaned up) ---
  const fixedData = useMemo(
    () => [
      {
        id: 1,
        name: "Diwali Scheme",
        type: "Weekly",
        duration: "10 months",
        amount: "₹500",
        endDate: "2025-12-13",
        status: "Active",
      },
      {
        id: 2,
        name: "Weekly Scheme",
        type: "Monthly",
        duration: "24 months",
        amount: "₹2,500.11",
        endDate: "2025-12-22",
        status: "Active",
      },
      {
        id: 3,
        name: "FLH Golden Eleven",
        type: "Monthly",
        duration: "24 months",
        amount: "₹2,000",
        endDate: "2026-09-30",
        status: "Active",
      },
    ],
    []
  );

  // LocalStorage key used by AdminForm (and this component)
  const STORAGE_KEY = "schemes";

  // --- Helper: merge stored entries with fixedData
  // For each fixed row, if storage has an entry with the same id, prefer the stored one (so edits persist).
  const mergeFixedWithStored = (storedArray) => {
    const storedById = new Map();
    (storedArray || []).forEach((s) => {
      if (s && typeof s.id !== "undefined") storedById.set(s.id, s);
    });
    // start with fixed rows, overridden by stored if present
    const mergedFixed = fixedData.map((f) => (storedById.has(f.id) ? storedById.get(f.id) : f));
    // then append any stored rows that are not part of fixedData (extras)
    const fixedIds = new Set(fixedData.map((d) => d.id));
    const extras = (storedArray || []).filter((s) => !fixedIds.has(s.id));
    return [...mergedFixed, ...extras];
  };

  // --- Rows state: read from localStorage 'schemes'. If none present, initialize with fixedData
  const [rows, setRows] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // initialize storage with fixed rows so the app has a single source
        const initial = fixedData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fixedData));
        return fixedData;
      }
      // Merge: prefer stored entries for fixed ids (so edits to fixed rows persist)
      return mergeFixedWithStored(parsed);
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fixedData));
      return fixedData;
    }
  });

  // Keep search query
  const [query, setQuery] = useState("");

  // Reload rows from localStorage — used on events
  const reloadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setRows(fixedData);
        return;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        setRows(fixedData);
        return;
      }
      setRows(mergeFixedWithStored(parsed));
    } catch {
      setRows(fixedData);
    }
  };

  // Listen for the AdminForm and other components to dispatch 'schemes-updated' events
  useEffect(() => {
    const handler = () => reloadFromStorage();
    window.addEventListener("schemes-updated", handler);
    return () => window.removeEventListener("schemes-updated", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Also reload when route location.state might contain a newScheme (back-compat)
  useEffect(() => {
    // If location.state.newScheme is present (older flow), merge into storage and then clear state
    if (location && location.state && location.state.newScheme) {
      try {
        const newScheme = location.state.newScheme;
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? (JSON.parse(raw) || []) : [];
        // avoid duplicate by id or name+amount
        const exists =
          parsed.some((p) => p.id === newScheme.id) ||
          parsed.some((p) => p.name === newScheme.name && String(p.amount) === String(newScheme.amount));
        if (!exists) {
          const next = [...parsed, newScheme];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
      } catch {
        // ignore
      }
      // replace history to clear state
      navigate(location.pathname, { replace: true });
      reloadFromStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location && location.state]);

  // Combined / filtered dataset (search)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((s) =>
      [s.name, s.type, s.duration, s.amount, s.status].join(" ").toLowerCase().includes(q)
    );
  }, [rows, query]);

  // --- Actions ---
  const goToForm = (mode, scheme) => {
    // open AdminForm which will update storage (and emit schemes-updated)
    navigate("/admin-form", { state: { mode, scheme } });
  };

  // Toggle status locally (Active <-> Inactive) and persist to 'schemes'
  // This gives immediate response in table when user clicks activate/deactivate icon.
  const toggleStatusLocal = (scheme) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) || []) : [];
      // If storage had no entry for this fixed id, include fixed row first
      const presentIds = new Set((parsed || []).map((p) => p.id));
      let baseline = parsed;
      if (!presentIds.has(scheme.id)) {
        // add scheme (use current scheme object) so we can toggle it
        baseline = [...parsed, scheme];
      }
      const next = baseline.map((s) =>
        s.id === scheme.id
          ? {
              ...s,
              status: String(s.status || "").toLowerCase() === "inactive" ? "Active" : "Inactive",
              // keep _raw.status boolean consistent where present
              _raw: { ...(s._raw || {}), status: String(s.status || "").toLowerCase() === "inactive" ? true : false },
              updatedAt: new Date().toISOString(),
            }
          : s
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      // update local list for immediate UI feedback (merge ensures fixed rows reflect edited stored values)
      reloadFromStorage();
      window.dispatchEvent(new Event("schemes-updated"));
    } catch (e) {
      console.error("toggleStatusLocal failed:", e);
    }
  };

  // If a row is a fixed row (from fixedData) and user clicked "delete", call AdminForm delete mode
  // AdminForm (delete mode) will set status inactive as required. For quicker UX we also allow direct toggle.
  const handleDeleteOrDeactivate = (scheme) => {
    // We'll use toggleStatusLocal so clicking the icon is immediate.
    toggleStatusLocal(scheme);
  };

  // --- Styles ---
  const container = { padding: 20 };
  const breadcrumb = { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 };

  const heading = {
    fontSize: 34,
    fontWeight: 600,
    margin: 0,
    color: COLORS.headerRed,
    lineHeight: 1.15,
    letterSpacing: 0.2,
  };

  const topBar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0 16px",
  };

  const searchWrap = {
    display: "flex",
    alignItems: "stretch",
    borderRadius: 10,
    overflow: "hidden",
    border: `1px solid ${COLORS.cardBorder}`,
    height: 44,
    width: 460,
    background: "#fff",
  };

  const searchInput = {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "0 12px",
    fontSize: 16,
  };

  const searchBtn = {
    background: COLORS.searchYellow,
    border: "none",
    padding: "0 14px",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
  };

  const createBtn = {
    background: COLORS.createRed,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    height: 44,
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  };

  const card = {
    background: "#fff",
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
  };

  const theadCell = {
    background: COLORS.headerRed,
    color: "#fff",
    fontWeight: 600,
    padding: "10px 12px",
    fontSize: 15,
    textAlign: "left",
    borderRight: "1px solid rgba(255,255,255,0.15)",
    whiteSpace: "nowrap",
  };

  const cell = {
    padding: "12px",
    fontSize: 15,
    color: "#222",
    verticalAlign: "middle",
  };

  const typePill = {
    display: "inline-block",
    background: COLORS.typePill,
    color: COLORS.typePillText,
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
  };

  const statusPillStyle = (status) => ({
    display: "inline-block",
    background: status && String(status).toLowerCase() === "inactive" ? COLORS.statusInactive : COLORS.statusGreen,
    color: COLORS.statusText,
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
  });

  const iconBtnBase = {
    border: "none",
    padding: 8,
    width: 36,
    height: 36,
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
  };

  return (
    <div style={container}>
      {/* Breadcrumb */}
      <div style={breadcrumb}>
        <a href="/" style={{ color: COLORS.headerRed, fontSize: 18, textDecoration: "underline" }}>
          Home
        </a>
        <span style={{ color: "#666", fontSize: 18 }}>|</span>
        <span style={{ color: "#333", fontSize: 20 }}>Schemes</span>
      </div>

      {/* Top bar */}
      <div style={topBar}>
        <h2 style={heading}>Scheme Management</h2>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={searchWrap}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search schemes..."
              style={searchInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            <button type="button" style={searchBtn} aria-label="Search">
              <FaSearch style={{ color: "#fff", fontSize: 16 }} />
            </button>
          </div>

          <button type="button" style={createBtn} onClick={() => goToForm("create", null)}>
            <FaPlus /> Create Scheme
          </button>
        </div>
      </div>

      {/* Table card */}
      <div style={card}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={{ ...theadCell, borderTopLeftRadius: 12, width: "28%" }}>Scheme Name</th>
              <th style={{ ...theadCell, width: "14%" }}>Type</th>
              <th style={{ ...theadCell, width: "20%" }}>Duration</th>
              <th style={{ ...theadCell, width: "18%" }}>Term Amount</th>
              <th style={{ ...theadCell, width: "10%" }}>Status</th>
              <th style={{ ...theadCell, borderTopRightRadius: 12, width: "10%" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s, i) => {
              return (
                <tr
                  key={String(s.id) + "-" + i}
                  style={{
                    background: i % 2 === 0 ? "#fff" : COLORS.rowAlt,
                    borderBottom: `1px solid ${COLORS.cardBorder}`,
                  }}
                >
                  <td style={cell}>{s.name}</td>
                  <td style={cell}>
                    <span style={typePill}>{s.type}</span>
                  </td>
                  <td style={cell}>{s.duration}</td>
                  <td style={cell}>{s.amount}</td>
                  <td style={cell}>
                    <span style={statusPillStyle(s.status)}>{s.status}</span>
                  </td>
                  <td style={cell}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <button
                        type="button"
                        title="View"
                        style={{ ...iconBtnBase, background: COLORS.viewBlue }}
                        onClick={() => goToForm("view", s)}
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        style={{ ...iconBtnBase, background: COLORS.editYellow, color: "#212121" }}
                        onClick={() => goToForm("edit", s)}
                      >
                        <FaEdit />
                      </button>

                      {/* Dynamic activate/deactivate icon:
                          - If scheme is Active => show FaTimes (deactivate) in red
                          - If scheme is Inactive => show FaCheck (activate) in green
                          Clicking toggles status immediately and persists to 'schemes' key. */}
                      {String(s.status || "").toLowerCase() === "inactive" ? (
                        <button
                          type="button"
                          title="Activate"
                          style={{ ...iconBtnBase, background: COLORS.statusGreen }}
                          onClick={() => toggleStatusLocal(s)}
                        >
                          <FaCheck />
                        </button>
                      ) : (
                        <button
                          type="button"
                          title="Deactivate"
                          style={{ ...iconBtnBase, background: COLORS.deleteRed }}
                          onClick={() => handleDeleteOrDeactivate(s)}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ ...cell, textAlign: "center", color: "#666" }}>
                  No schemes match “{query.trim()}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
