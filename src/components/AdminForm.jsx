// src/AdminForm.js
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

// Toast component
const Toast = ({ message, type = "success", onClose }) => {
  const backgroundColor = type === "success" ? "#4caf50" : "#f44336";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: backgroundColor,
        color: "white",
        padding: "12px 20px",
        borderRadius: "4px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        minWidth: "200px",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          padding: 0,
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>
    </div>
  );
};

const AdminForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  // mode from Schemes: "create" | "edit" | "view" | "delete" | "activate"
  const mode = state?.mode || "create";
  const incoming = state?.scheme || null;

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  // ---------------- Palette (for modal too) ----------------
  const COLORS = {
    headerRed: "#b22222",
    cardBorder: "#e0e0e0",
    text: "#000000",
    modalBackdrop: "rgba(0,0,0,0.35)",
    btnGrey: "#6b7785",
    successGreen: "#4caf50",
  };

  // ---------------- Helpers for dates ----------------
  const getNowISO = () => new Date().toISOString();
  const getTodayISO = () => new Date().toISOString().split("T")[0];
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  // ---------------- Form State ----------------
  const [formData, setFormData] = useState({
    // Basic Information
    schemeName: "",
    schemeType: "",
    schemeDescription: "",
    status: true,

    // Dates
    startDate: "", // YYYY-MM-DD
    endDate: "",

    // Saving Amount Configuration
    minSavingAmount: 100,
    maxSavingAmount: 1000,

    // Duration Settings (these control overall scheme length)
    minDuration: 0.5,
    minDurationUnit: "Years",
    maxDuration: 1,
    maxDurationUnit: "Years",

    // Term Amount (amount user contributes per selected frequency)
    termAmount: 200,

    // Advance Payment Options
    allowAdvancePayment: true,
    minAdvancePaymentPeriod: 4,
    maxAdvancePaymentPeriod: 8,

    // Terms & Conditions
    termsConditions:
      "1. Users must make timely payments as per selected frequency.\n2. Grace period of 3 days after due date.\n3. Penalty of 5% for missed payments.\n4. Refund available with 10% processing fee before 30 days.",

    // Penalty & Grace (moved to Section 6)
    penaltyAmount: 5,
    penaltyType: "Percentage (%)",
    gracePeriod: 3,
  });

  // Prefill when opened from edit/view
  useEffect(() => {
    if (incoming) {
      const raw = incoming._raw || {};
      setFormData((prev) => ({
        ...prev,
        schemeName: incoming.name || prev.schemeName,
        schemeType:
          incoming.type === "Daily"
            ? "Daily Saving Scheme"
            : incoming.type === "Weekly"
            ? "Weekly Saving Scheme"
            : incoming.type === "Monthly"
            ? "Monthly Saving Scheme"
            : prev.schemeType,
        schemeDescription: raw.schemeDescription ?? prev.schemeDescription,
        status: (incoming.status || "").toLowerCase() !== "inactive",
        startDate: raw.startDate ?? prev.startDate,
        endDate: raw.endDate ?? prev.endDate,
        minSavingAmount: raw.minSavingAmount ?? prev.minSavingAmount,
        maxSavingAmount: raw.maxSavingAmount ?? prev.maxSavingAmount,
        minDuration: raw.minDuration ?? prev.minDuration,
        minDurationUnit: raw.minDurationUnit ?? prev.minDurationUnit,
        maxDuration: raw.maxDuration ?? prev.maxDuration,
        maxDurationUnit: raw.maxDurationUnit ?? prev.maxDurationUnit,
        termAmount: raw.termAmount ?? prev.termAmount,
        allowAdvancePayment: raw.allowAdvancePayment ?? prev.allowAdvancePayment,
        minAdvancePaymentPeriod: raw.minAdvancePaymentPeriod ?? prev.minAdvancePaymentPeriod,
        maxAdvancePaymentPeriod: raw.maxAdvancePaymentPeriod ?? prev.maxAdvancePaymentPeriod,
        termsConditions: raw.termsConditions ?? prev.termsConditions,
        penaltyAmount: raw.penaltyAmount ?? prev.penaltyAmount,
        penaltyType: raw.penaltyType ?? prev.penaltyType,
        gracePeriod: raw.gracePeriod ?? prev.gracePeriod,
      }));
    } else {
      // If creating and no incoming, default startDate to today
      setFormData((prev) => ({
        ...prev,
        startDate: prev.startDate || getTodayISO(),
        // do not auto-calc endDate; leave empty so user selects it
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incoming]);

  // ---------------- Helpers ----------------
  // days-per-unit conversion factors (approx)
  const conversionFactors = { Day: 1, Week: 7, Month: 30, Year: 365 };
  const unitToKey = {
    Days: "Day",
    Weeks: "Week",
    Months: "Month",
    Years: "Year",
  };

  // convert value from one unit -> another using days as intermediate
  const convertDuration = (value, fromUnit, toUnit) => {
    const v = parseFloat(value);
    const safe = Number.isFinite(v) ? v : 0;
    const fromKey = unitToKey[fromUnit] || "Day";
    const toKey = unitToKey[toUnit] || "Day";
    const inDays = safe * (conversionFactors[fromKey] || 1);
    const result = inDays / (conversionFactors[toKey] || 1);
    return Math.max(0, Math.round(result * 100) / 100); // Keep 2 decimal places
  };

  // NOTE: removed automatic end-date calculation — user will choose End Date manually

  // Auto adjust ranges by scheme type
  useEffect(() => {
    if (formData.schemeType === "Daily Saving Scheme") {
      setFormData((prev) => ({
        ...prev,
        minSavingAmount: 10,
        maxSavingAmount: 100,
        minDuration: 0.5,
        minDurationUnit: "Years",
        maxDuration: 1,
        maxDurationUnit: "Years",
        minAdvancePaymentPeriod: 7,
        maxAdvancePaymentPeriod: 30,
      }));
    } else if (formData.schemeType === "Weekly Saving Scheme") {
      setFormData((prev) => ({
        ...prev,
        minSavingAmount: 100,
        maxSavingAmount: 1000,
        minDuration: 1,
        minDurationUnit: "Years",
        maxDuration: 2,
        maxDurationUnit: "Years",
        minAdvancePaymentPeriod: 4,
        maxAdvancePaymentPeriod: 8,
      }));
    } else if (formData.schemeType === "Monthly Saving Scheme") {
      setFormData((prev) => ({
        ...prev,
        minSavingAmount: 500,
        maxSavingAmount: 2500,
        minDuration: 1,
        minDurationUnit: "Years",
        maxDuration: 3,
        maxDurationUnit: "Years",
        minAdvancePaymentPeriod: 2,
        maxAdvancePaymentPeriod: 6,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.schemeType]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDurationChange = (field, value, unitField, unitValue) => {
    const currentUnit = formData[unitField];
    const newValue = convertDuration(value, unitValue, currentUnit);
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleDurationUnitChange = (field, unitField, newUnit) => {
    const currentValue = formData[field];
    const currentUnit = formData[unitField];
    const newValue = convertDuration(currentValue, currentUnit, newUnit);
    setFormData((prev) => ({ ...prev, [field]: newValue, [unitField]: newUnit }));
  };

  const toggleSwitch = (field) =>
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));

  const isReadOnly = mode === "view";

  // ---------------- Calculations for term-based totals ----------------
  const getTotalDays = () => {
    const n = parseFloat(formData.maxDuration);
    const unit = formData.maxDurationUnit || "Years";
    const safe = Number.isFinite(n) ? n : 0;
    const key = unitToKey[unit] || "Year";
    return safe * (conversionFactors[key] || 365);
  };

  const getTotalPayout = () => {
    const amount = parseFloat(formData.termAmount);
    if (!Number.isFinite(amount)) return 0;

    const totalDays = getTotalDays();

    if (formData.schemeType === "Daily Saving Scheme") {
      return amount * Math.floor(totalDays);
    } else if (formData.schemeType === "Weekly Saving Scheme") {
      return amount * Math.floor(totalDays / 7);
    } else if (formData.schemeType === "Monthly Saving Scheme") {
      return amount * Math.floor(totalDays / 30);
    }

    return amount;
  };

  const getFrequencyDescription = () => {
    if (formData.schemeType === "Daily Saving Scheme") {
      return "Daily";
    } else if (formData.schemeType === "Weekly Saving Scheme") {
      return "Weekly";
    } else if (formData.schemeType === "Monthly Saving Scheme") {
      return "Monthly";
    }
    return "";
  };

  const getPaymentPeriods = () => {
    const totalDays = getTotalDays();

    if (formData.schemeType === "Daily Saving Scheme") {
      return Math.floor(totalDays);
    } else if (formData.schemeType === "Weekly Saving Scheme") {
      return Math.floor(totalDays / 7);
    } else if (formData.schemeType === "Monthly Saving Scheme") {
      return Math.floor(totalDays / 30);
    }

    return 0;
  };

  const formatNumber = (v) => {
    if (!Number.isFinite(v)) return "0";
    return v.toLocaleString();
  };

  const formatDurationForTable = (duration, unit) => {
    const durationNum = parseFloat(duration);

    if (unit === "Days") {
      if (durationNum >= 7 && durationNum % 7 === 0) {
        const weeks = durationNum / 7;
        return weeks === 1 ? "1 week" : `${weeks} weeks`;
      } else if (durationNum >= 30 && durationNum % 30 === 0) {
        const months = durationNum / 30;
        return months === 1 ? "1 month" : `${months} months`;
      } else if (durationNum >= 365 && durationNum % 365 === 0) {
        const years = durationNum / 365;
        return years === 1 ? "1 year" : `${years} years`;
      } else {
        return durationNum === 1 ? "1 day" : `${durationNum} days`;
      }
    } else if (unit === "Weeks") {
      if (durationNum >= 4.33 && durationNum % 4.33 === 0) {
        const months = Math.round(durationNum / 4.33);
        return months === 1 ? "1 month" : `${months} months`;
      } else if (durationNum >= 52 && durationNum % 52 === 0) {
        const years = durationNum / 52;
        return years === 1 ? "1 year" : `${years} years`;
      } else {
        return durationNum === 1 ? "1 week" : `${durationNum} weeks`;
      }
    } else if (unit === "Months") {
      if (durationNum >= 12 && durationNum % 12 === 0) {
        const years = durationNum / 12;
        return years === 1 ? "1 year" : `${years} years`;
      } else {
        return durationNum === 1 ? "1 month" : `${durationNum} months`;
      }
    } else if (unit === "Years") {
      return durationNum === 1 ? "1 year" : `${durationNum} years`;
    }

    return `${duration} ${unit.toLowerCase()}`;
  };

  // ---------------- Local storage helpers ----------------
  const readJSON = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeJSON = (key, arr) => {
    try {
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {
      console.error("localStorage write failed for", key, e);
    }
  };

  // ---------------- Submit (add term fields into stored object) ----------------
  const handleSubmit = () => {
    if (!formData.schemeName.trim()) {
      showToast("Please enter a Scheme Name.", "error");
      return;
    }
    if (!formData.schemeType) {
      showToast("Please select a Scheme Type.", "error");
      return;
    }
    if (!formData.startDate) {
      showToast("Please select a Start Date.", "error");
      return;
    }
    // END DATE IS OPTIONAL — removed mandatory check

    if (Number(formData.minSavingAmount) > Number(formData.maxSavingAmount)) {
      showToast("Minimum amount cannot be greater than maximum.", "error");
      return;
    }

    try {
      // keep original "schemes" key for compatibility
      const existing = readJSON("schemes");

      let payload;

      if (mode === "edit" && incoming?.id) {
        // Update existing scheme (in "schemes")
        payload = {
          ...incoming,
          name: formData.schemeName,
          type:
            formData.schemeType === "Daily Saving Scheme"
              ? "Daily"
              : formData.schemeType === "Weekly Saving Scheme"
              ? "Weekly"
              : "Monthly",
          duration: formatDurationForTable(formData.maxDuration, formData.maxDurationUnit),
          amount: `₹${formData.termAmount} / ${getFrequencyDescription().toLowerCase()}`,
          totalPayout: `₹${formatNumber(getTotalPayout())}`,
          startDate: formData.startDate,
          endDate: formData.endDate || "",
          status: formData.status ? "Active" : "Inactive",
          _raw: formData,
          updatedAt: getNowISO(),
        };

        // Replace the existing scheme in "schemes"
        const next = existing.map((scheme) => (scheme.id === incoming.id ? payload : scheme));
        writeJSON("schemes", next);

        // Also update created_schemes (if the edited scheme exists there)
        const created = readJSON("created_schemes");
        const createdExists = created.some((c) => c.id === incoming.id);
        if (createdExists) {
          const updatedCreated = created.map((c) => (c.id === incoming.id ? payload : c));
          writeJSON("created_schemes", updatedCreated);
        }

        // notify other components
        window.dispatchEvent(new Event("schemes-updated"));
        showToast("Scheme updated successfully.");
        // Navigate back (no newScheme state needed for edits)
        navigate("/schemes");
      } else {
        // Create new scheme
        const createdAt = getNowISO();
        payload = {
          id: Date.now(),
          name: formData.schemeName,
          type:
            formData.schemeType === "Daily Saving Scheme"
              ? "Daily"
              : formData.schemeType === "Weekly Saving Scheme"
              ? "Weekly"
              : "Monthly",
          duration: formatDurationForTable(formData.maxDuration, formData.maxDurationUnit),
          amount: `₹${formData.termAmount} / ${getFrequencyDescription().toLowerCase()}`,
          totalPayout: `₹${formatNumber(getTotalPayout())}`,
          startDate: formData.startDate || getTodayISO(),
          endDate: formData.endDate || "",
          status: formData.status ? "Active" : "Inactive",
          _raw: formData,
          createdAt, // ISO timestamp
          createdDate: formatDateForDisplay(createdAt), // human-friendly date
        };

        // Prepend to original "schemes" (backward compatibility)
        const next = [payload, ...existing];
        writeJSON("schemes", next);

        // Append to "created_schemes" (the updated Schemes component reads this)
        const created = readJSON("created_schemes");
        const updatedCreated = [...created, payload];
        writeJSON("created_schemes", updatedCreated);

        // notify other components
        window.dispatchEvent(new Event("schemes-updated"));
        showToast("Scheme created successfully.");

        // Navigate back to schemes without passing state to avoid the "remove button" issue
        navigate("/schemes");
      }
    } catch (err) {
      console.error("Save failed:", err);
      showToast("Failed to save. Please try again.", "error");
    }
  };

  // ---------------- Status Change Modal (for deactivate/activate) ----------------
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(""); // "deactivate" or "activate"

  useEffect(() => {
    if (mode === "delete") {
      setConfirmAction("deactivate");
      setShowConfirm(true);
    } else if (mode === "activate") {
      setConfirmAction("activate");
      setShowConfirm(true);
    }
  }, [mode]);

  const handleStatusChange = () => {
    if (!incoming?.id) {
      navigate("/schemes");
      return;
    }

    try {
      const newStatus = confirmAction === "activate" ? "Active" : "Inactive";

      // Update in "schemes"
      const existing = readJSON("schemes");
      const updatedSchemes = existing.map((scheme) =>
        scheme.id === incoming.id
          ? {
              ...scheme,
              status: newStatus,
              _raw: { ...scheme._raw, status: newStatus === "Active" },
              updatedAt: getNowISO(),
            }
          : scheme
      );
      writeJSON("schemes", updatedSchemes);

      // Also update in "created_schemes" if present
      const created = readJSON("created_schemes");
      const updatedCreated = created.map((scheme) =>
        scheme.id === incoming.id
          ? {
              ...scheme,
              status: newStatus,
              _raw: { ...scheme._raw, status: newStatus === "Active" },
              updatedAt: getNowISO(),
            }
          : scheme
      );
      writeJSON("created_schemes", updatedCreated);

      // Notify other components
      window.dispatchEvent(new Event("schemes-updated"));

      // Show success message
      showToast(
        `Scheme "${incoming.name}" ${confirmAction === "activate" ? "activated" : "deactivated"} successfully.`
      );
    } catch (e) {
      console.error(e);
      showToast(`Failed to ${confirmAction} scheme.`, "error");
    }

    navigate("/schemes");
  };

  // ---------------- Styles ----------------
  const styles = {
    container: {
      margin: 0,
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#ffffff",
      minHeight: "100vh",
    },
    mainContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      background: "white",
      borderRadius: "0px",
      boxShadow: "none",
      overflow: "hidden",
      border: "none",
    },
    header: {
      position: "relative",
      padding: "0px 40px 30px",
      marginBottom: "0px",
    },
    headerTitle: {
      fontSize: "28px",
      color: COLORS.headerRed,
      fontWeight: 600,
      margin: 0,
    },
    closeBtn: {
      position: "absolute",
      right: 16,
      top: 0,
      width: 38,
      height: 38,
      borderRadius: 8,
      border: "none",
      background: COLORS.headerRed,
      color: "#fff",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
    },
    formContent: { padding: "0 40px" },
    section: { marginBottom: "40px", padding: 0 },
    sectionTitle: {
      fontSize: "20px",
      color: COLORS.text,
      marginBottom: "20px",
      fontWeight: 600,
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    formRowFull: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    formGroup: { display: "flex", flexDirection: "column" },
    label: { fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" },
    input: {
      padding: "12px",
      border: `2px solid ${COLORS.cardBorder}`,
      borderRadius: "6px",
      fontSize: "14px",
      background: "white",
      color: COLORS.text,
    },
    textarea: {
      padding: "12px",
      border: `2px solid ${COLORS.cardBorder}`,
      borderRadius: "6px",
      fontSize: "14px",
      minHeight: "100px",
      resize: "vertical",
      background: "white",
      color: COLORS.text,
    },
    toggleGroup: { display: "flex", alignItems: "center", gap: "10px" },
    toggle: {
      position: "relative",
      width: "50px",
      height: "26px",
      background: "#ccc",
      borderRadius: "13px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    toggleActive: { background: COLORS.headerRed },
    toggleKnob: {
      position: "absolute",
      width: "20px",
      height: "20px",
      background: "white",
      borderRadius: "50%",
      top: "3px",
      left: "3px",
      transition: "left 0.3s",
    },
    toggleKnobActive: { left: "27px" },
    inputAddon: { display: "flex", alignItems: "center", gap: "10px" },
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "30px 40px",
      background: "#ffffff",
      borderTop: "none",
    },
    btn: {
      padding: "14px 40px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s",
    },
    btnPrimary: { background: COLORS.headerRed, color: "white" },
    hint: { fontSize: "12px", color: COLORS.text, marginTop: "5px", opacity: 0.7 },
    dateHint: {
      fontSize: "12px",
      color: COLORS.headerRed,
      marginTop: "5px",
      fontWeight: 600,
    },

    // calculation display box
    calcBox: {
      marginTop: 12,
      padding: 18,
      borderRadius: 8,
      background: "#eef6ff",
      border: `1px solid ${COLORS.cardBorder}`,
    },
    calcBig: { fontSize: 32, fontWeight: 800, color: "#0b57a4", marginBottom: 6 },
    calcSub: { fontSize: 14, color: "#0b57a4" },
    breakdownText: {
      fontSize: "14px",
      color: "#0b7a2a",
      fontWeight: 600,
      marginTop: "8px",
    },

    // Modal styles
    modalBackdrop: {
      position: "fixed",
      inset: 0,
      background: COLORS.modalBackdrop,
      display: showConfirm ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    },
    modalBox: {
      width: 520,
      background: "#fff",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    },
    modalHeader: {
      padding: "16px 20px",
      background: "#fff",
      borderBottom: "1px solid #eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    modalTitle: {
      fontSize: 24,
      color: confirmAction === "activate" ? COLORS.successGreen : COLORS.headerRed,
      fontWeight: 700,
      margin: 0,
    },
    modalCloseBtn: {
      background: "transparent",
      border: "none",
      fontSize: 22,
      color: "#777",
      cursor: "pointer",
      padding: 6,
      lineHeight: 1,
    },
    modalBody: { padding: "18px 20px", fontSize: 16, color: COLORS.text },
    modalFooter: {
      padding: "16px 20px",
      display: "flex",
      gap: 12,
      justifyContent: "flex-end",
      borderTop: "1px solid #eee",
    },
    btnGrey: {
      background: COLORS.btnGrey,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 16px",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
    },
    btnAction: {
      background: confirmAction === "activate" ? COLORS.successGreen : COLORS.headerRed,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 16px",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  const getAmountHint = () => {
    if (formData.schemeType === "Daily Saving Scheme") return "Daily: ₹10 - ₹100";
    if (formData.schemeType === "Weekly Saving Scheme") return "Weekly: ₹100 - ₹1000";
    if (formData.schemeType === "Monthly Saving Scheme") return "Monthly: ₹500 - ₹2500";
    return "";
  };

  const getAdvancePaymentHint = () => {
    if (formData.schemeType === "Daily Saving Scheme") return "Daily: 7-30 days advance";
    if (formData.schemeType === "Weekly Saving Scheme") return "Weekly: 4-8 weeks advance";
    if (formData.schemeType === "Monthly Saving Scheme") return "Monthly: 2-6 months advance";
    return "";
  };

  const getDurationHint = () => {
    if (formData.schemeType === "Daily Saving Scheme") return "Duration: 0.5 - 1 Year";
    if (formData.schemeType === "Weekly Saving Scheme") return "Duration: 1 - 2 Years";
    if (formData.schemeType === "Monthly Saving Scheme") return "Duration: 1 - 3 Years";
    return "";
  };

  // ---------------- Render ----------------
  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: "", type: "success" })} />}

      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            {mode === "edit" ? "Edit Scheme" : mode === "view" ? "View Scheme" : mode === "delete" ? "Deactivate Scheme" : mode === "activate" ? "Activate Scheme" : "Create Scheme"}
          </h1>

          {/* Close (X) */}
          <button type="button" title="Close" style={styles.closeBtn} onClick={() => navigate("/schemes")}>
            <FaTimes />
          </button>
        </div>

        {/* Status Change Modal (for deactivate/activate) */}
        <div style={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{confirmAction === "activate" ? "Activate Scheme" : "Deactivate Scheme"}</h3>
              <button style={styles.modalCloseBtn} onClick={() => navigate("/schemes")} aria-label="Close">
                ×
              </button>
            </div>

            <div style={styles.modalBody}>
              Are you sure you want to {confirmAction} <strong>{incoming?.name || "this scheme"}</strong>?
              {confirmAction === "deactivate" && (
                <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>Deactivated schemes will not be available for new enrollments.</p>
              )}
              {confirmAction === "activate" && (
                <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>Activated schemes will be available for new enrollments.</p>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnGrey} onClick={() => navigate("/schemes")}>
                Cancel
              </button>
              <button style={styles.btnAction} onClick={handleStatusChange}>
                Yes, {confirmAction === "activate" ? "Activate" : "Deactivate"}
              </button>
            </div>
          </div>
        </div>

        {/* Form content (hidden when mode === "delete" or "activate" because we show modal) */}
        {!["delete", "activate"].includes(mode) && (
          <>
            <div style={styles.formContent}>
              {/* Section 1: Basic Information */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>1. Basic Scheme Information</div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Scheme Name *</label>
                    <input type="text" placeholder="e.g., Gold Savings Plan" value={formData.schemeName} onChange={(e) => handleInputChange("schemeName", e.target.value)} style={styles.input} disabled={isReadOnly} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Scheme Type *</label>
                    <select value={formData.schemeType} onChange={(e) => handleInputChange("schemeType", e.target.value)} style={styles.input} disabled={isReadOnly}>
                      <option value="">Select...</option>
                      <option value="Daily Saving Scheme">Daily Saving Scheme</option>
                      <option value="Weekly Saving Scheme">Weekly Saving Scheme</option>
                      <option value="Monthly Saving Scheme">Monthly Saving Scheme</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Start Date *</label>
                    <input type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} style={styles.input} disabled={isReadOnly} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>End Date (optional)</label>
                    {/* Now editable by user (no auto-calculation) */}
                    <input type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} style={styles.input} disabled={isReadOnly} />
                    
                  </div>
                </div>

                <div style={styles.formRowFull}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Scheme Description</label>
                    <textarea placeholder="Enter detailed description for users" value={formData.schemeDescription} onChange={(e) => handleInputChange("schemeDescription", e.target.value)} style={styles.textarea} disabled={isReadOnly} />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Status</label>
                    <div style={styles.toggleGroup}>
                      <div
                        style={{
                          ...styles.toggle,
                          ...(formData.status ? styles.toggleActive : {}),
                          ...(isReadOnly ? { opacity: 0.6, cursor: "not-allowed" } : {}),
                        }}
                        onClick={() => {
                          if (!isReadOnly) toggleSwitch("status");
                        }}
                      >
                        <div style={{ ...styles.toggleKnob, ...(formData.status ? styles.toggleKnobActive : {}) }} />
                      </div>
                      <span style={{ color: COLORS.text }}>{formData.status ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: For create -> Term Amount & Total Payout; for edit/view -> Saving Amount Configuration */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>2. {mode === "create" ? "Term Amount & Total Payout" : "Saving Amount Configuration"}</div>

                {mode === "create" ? (
                  // When creating, show Term Amount & calculation here (instead of separate section)
                  <>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Term Amount (₹) *</label>
                        <div style={styles.inputAddon}>
                          <span style={{ alignSelf: "center", marginRight: 8 }}>₹</span>
                          <input type="number" placeholder="e.g., 200" value={formData.termAmount} onChange={(e) => handleInputChange("termAmount", e.target.value)} style={styles.input} disabled={isReadOnly} />
                        </div>
                        <span style={styles.hint}>Amount paid by user every {getFrequencyDescription().toLowerCase() || "period"}</span>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Payment Frequency</label>
                        <input type="text" value={getFrequencyDescription()} style={styles.input} disabled readOnly />
                        <span style={styles.hint}>Based on selected scheme type</span>
                      </div>
                    </div>

                    <div style={styles.calcBox}>
                      <div style={styles.calcBig}>₹{formatNumber(getTotalPayout())}</div>
                      <div style={styles.calcSub}>Total payout amount</div>

                      <div style={styles.breakdownText}>
                        {formData.termAmount
                          ? `₹${formatNumber(parseFloat(formData.termAmount))} × ${getPaymentPeriods()} ${getFrequencyDescription().toLowerCase()}(s) = ₹${formatNumber(getTotalPayout())}`
                          : "Enter term amount to calculate"}
                      </div>

                      <div style={{ marginTop: 12, color: "#0b7a2a", fontWeight: 700 }}>
                        Scheme Duration: {formatDurationForTable(formData.maxDuration, formData.maxDurationUnit)}
                      </div>
                      <div style={{ marginTop: 6, fontSize: "12px", color: "#666" }}>Based on {getPaymentPeriods()} payment periods</div>
                    </div>
                  </>
                ) : (
                  // For edit/view keep original "Saving Amount Configuration" section
                  <>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Minimum Saving Amount (₹) *</label>
                        <input type="number" placeholder="Enter minimum amount" value={formData.minSavingAmount} onChange={(e) => handleInputChange("minSavingAmount", e.target.value)} style={styles.input} disabled={isReadOnly} />
                        <span style={styles.hint}>{getAmountHint()}</span>
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Maximum Saving Amount (₹) *</label>
                        <input type="number" placeholder="Enter maximum amount" value={formData.maxSavingAmount} onChange={(e) => handleInputChange("maxSavingAmount", e.target.value)} style={styles.input} disabled={isReadOnly} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Section 3: Duration Settings */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>3. Duration Settings</div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Minimum Duration *</label>
                    <div style={styles.inputAddon}>
                      <input type="number" placeholder="Enter minimum duration" value={formData.minDuration} onChange={(e) => handleDurationChange("minDuration", e.target.value, "minDurationUnit", formData.minDurationUnit)} style={styles.input} disabled={isReadOnly} />
                      <select value={formData.minDurationUnit} onChange={(e) => handleDurationUnitChange("minDuration", "minDurationUnit", e.target.value)} style={{ ...styles.input, width: "120px" }} disabled={isReadOnly}>
                        <option value="Days">Days</option>
                        <option value="Weeks">Weeks</option>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                      </select>
                    </div>
                    <span style={styles.hint}>{getDurationHint()}</span>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Maximum Duration *</label>
                    <div style={styles.inputAddon}>
                      <input type="number" placeholder="Enter maximum duration" value={formData.maxDuration} onChange={(e) => handleDurationChange("maxDuration", e.target.value, "maxDurationUnit", formData.maxDurationUnit)} style={styles.input} disabled={isReadOnly} />
                      <select value={formData.maxDurationUnit} onChange={(e) => handleDurationUnitChange("maxDuration", "maxDurationUnit", e.target.value)} style={{ ...styles.input, width: "120px" }} disabled={isReadOnly}>
                        <option value="Days">Days</option>
                        <option value="Weeks">Weeks</option>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3.5 (for edit/view only): Term Amount & Total Payout (when not create) */}
              {mode !== "create" && (
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Term Amount & Total Payout</div>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Term Amount (₹) *</label>
                      <div style={styles.inputAddon}>
                        <span style={{ alignSelf: "center", marginRight: 8 }}>₹</span>
                        <input type="number" placeholder="e.g., 200" value={formData.termAmount} onChange={(e) => handleInputChange("termAmount", e.target.value)} style={styles.input} disabled={isReadOnly} />
                      </div>
                      <span style={styles.hint}>Amount paid by user every {getFrequencyDescription().toLowerCase()}</span>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Payment Frequency</label>
                      <input type="text" value={getFrequencyDescription()} style={styles.input} disabled readOnly />
                      <span style={styles.hint}>Based on selected scheme type</span>
                    </div>
                  </div>

                  <div style={styles.calcBox}>
                    <div style={styles.calcBig}>₹{formatNumber(getTotalPayout())}</div>
                    <div style={styles.calcSub}>Total payout amount</div>

                    <div style={styles.breakdownText}>
                      {formData.termAmount
                        ? `₹${formatNumber(parseFloat(formData.termAmount))} × ${getPaymentPeriods()} ${getFrequencyDescription().toLowerCase()}(s) = ₹${formatNumber(getTotalPayout())}`
                        : "Enter term amount to calculate"}
                    </div>

                    <div style={{ marginTop: 12, color: "#0b7a2a", fontWeight: 700 }}>
                      Scheme Duration: {formatDurationForTable(formData.maxDuration, formData.maxDurationUnit)}
                    </div>
                    <div style={{ marginTop: 6, fontSize: "12px", color: "#666" }}>Based on {getPaymentPeriods()} payment periods</div>
                  </div>
                </div>
              )}

              {/* Section 4: Advance Payment Options */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>4. Advance Payment Options</div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Allow Advance Payment</label>
                    <div style={styles.toggleGroup}>
                      <div
                        style={{
                          ...styles.toggle,
                          ...(formData.allowAdvancePayment ? styles.toggleActive : {}),
                          ...(isReadOnly ? { opacity: 0.6, cursor: "not-allowed" } : {}),
                        }}
                        onClick={() => {
                          if (!isReadOnly) toggleSwitch("allowAdvancePayment");
                        }}
                      >
                        <div style={{ ...styles.toggleKnob, ...(formData.allowAdvancePayment ? styles.toggleKnobActive : {}) }} />
                      </div>
                      <span style={{ color: COLORS.text }}>{formData.allowAdvancePayment ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Minimum Advance Payment Period</label>
                    <div style={styles.inputAddon}>
                      <input type="number" placeholder="Enter minimum period" value={formData.minAdvancePaymentPeriod} onChange={(e) => handleInputChange("minAdvancePaymentPeriod", e.target.value)} style={styles.input} disabled={isReadOnly} />
                      <span style={{ color: COLORS.text }}>
                        {formData.schemeType === "Daily Saving Scheme" ? "Days" : formData.schemeType === "Weekly Saving Scheme" ? "Weeks" : "Months"}
                      </span>
                    </div>
                    <span style={styles.hint}>{getAdvancePaymentHint()}</span>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Maximum Advance Payment Period</label>
                    <div style={styles.inputAddon}>
                      <input type="number" placeholder="Enter maximum period" value={formData.maxAdvancePaymentPeriod} onChange={(e) => handleInputChange("maxAdvancePaymentPeriod", e.target.value)} style={styles.input} disabled={isReadOnly} />
                      <span style={{ color: COLORS.text }}>
                        {formData.schemeType === "Daily Saving Scheme" ? "Days" : formData.schemeType === "Weekly Saving Scheme" ? "Weeks" : "Months"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Terms & Conditions */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>5. Terms & Conditions</div>
                <div style={styles.formRowFull}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Scheme Terms & Conditions</label>
                    <textarea placeholder="Enter terms and conditions, withdrawal policy, refund policy..." value={formData.termsConditions} onChange={(e) => handleInputChange("termsConditions", e.target.value)} style={styles.textarea} disabled={isReadOnly} />
                  </div>
                </div>
              </div>

              {/* Section 6: Penalty & Grace Period */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>6. Penalty & Grace Period</div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Penalty for Missed Payments</label>
                    <div style={styles.inputAddon}>
                      <input type="number" placeholder="5" value={formData.penaltyAmount} onChange={(e) => handleInputChange("penaltyAmount", e.target.value)} style={styles.input} disabled={isReadOnly} />
                      <select value={formData.penaltyType} onChange={(e) => handleInputChange("penaltyType", e.target.value)} style={{ ...styles.input, width: "150px" }} disabled={isReadOnly}>
                        <option value="Fixed Amount (₹)">Fixed Amount (₹)</option>
                        <option value="Percentage (%)">Percentage (%)</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Grace Period (Days)</label>
                    <input type="number" placeholder="3" value={formData.gracePeriod} onChange={(e) => handleInputChange("gracePeriod", e.target.value)} style={styles.input} disabled={isReadOnly} />
                    <span style={styles.hint}>Days allowed after due date</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {mode !== "view" && (
              <div style={styles.actionButtons}>
                <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleSubmit}>
                  {mode === "edit" ? "Update Scheme" : "Create Scheme"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminForm;
