// src/schemes.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTimes } from "react-icons/fa";

export default function Schemes() {
  const navigate = useNavigate();

  // --- Color palette (same tones) ---
  const COLORS = {
    headerRed: "#b22222",
    cardBorder: "#e6e6e6",
    rowAlt: "#f7f7f7",
    typePill: "#17c9e0",
    typePillText: "#ffffff",
    statusGreen: "#2e7d32",
    statusText: "#ffffff",
    viewBlue: "#1e88e5",
    editYellow: "#f4b400",
    deleteRed: "#c62828",
    searchYellow: "#f4b400",
    createRed: "#b22222",
  };

  // --- Data (sample/static) ---
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Diwali Scheme",
        type: "Weekly",
        duration: "10 months",
        amount: "₹500",
        endDate: "12/13/2025", // kept in data (unused in UI)
        status: "Active",
      },
      {
        id: 2,
        name: "weekly scheme",
        type: "Monthly",
        duration: "24 months",
        amount: "₹2,500.11",
        endDate: "12/22/2025",
        status: "Active",
      },
      {
        id: 3,
        name: "FLH Golden Eleven",
        type: "Monthly",
        duration: "24 months",
        amount: "₹2,000",
        endDate: "9/30/2026",
        status: "Active",
      },
    ],
    []
  );

  // --- Live search (End Date removed from search fields) ---
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((s) =>
      [s.name, s.type, s.duration, s.amount, s.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  // --- Handlers to open adminForm.js for each action ---
  const goToForm = (mode, scheme) => {
    // mode can be "view" | "edit" | "delete" | "create"
    navigate("/admin-form", { state: { mode, scheme } });
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

  const statusPill = {
    display: "inline-block",
    background: COLORS.statusGreen,
    color: COLORS.statusText,
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
  };

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
            {filtered.map((s, i) => (
              <tr
                key={s.id}
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
                  <span style={statusPill}>{s.status}</span>
                </td>
                <td style={cell}>
                  <div style={{ display: "flex", gap: 10 }}>
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
                    <button
                      type="button"
                      title="Delete"
                      style={{ ...iconBtnBase, background: COLORS.deleteRed }}
                      onClick={() => goToForm("delete", s)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

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
