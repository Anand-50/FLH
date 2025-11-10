import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Configuration = () => {
  const [states, setStates] = useState([
    { id: 1, name: "Andhra Pradesh" },
    { id: 2, name: "Telangana" },
    { id: 3, name: "MP" },
  ]);
  const [districts, setDistricts] = useState([
    { id: 1, name: "Hyderabad", state: "Telangana" },
    { id: 2, name: "Visakhapatnam", state: "Andhra Pradesh" },
  ]);
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedState, setSelectedState] = useState("Andhra Pradesh");
  const [activeTab, setActiveTab] = useState("States");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStateId, setEditingStateId] = useState(null);
  const [newStateName, setNewStateName] = useState("");
  const [editingDistrictId, setEditingDistrictId] = useState(null);
  const [newDistrictName, setNewDistrictName] = useState("");
  const [districtModalOpen, setDistrictModalOpen] = useState(false);

  const handleAddState = () => {
    if (stateName.trim()) {
      setStates([...states, { id: states.length + 1, name: stateName }]);
      setStateName("");
    }
  };

  const handleAddDistrict = () => {
    if (districtName.trim() && selectedState) {
      setDistricts([
        ...districts,
        { id: districts.length + 1, name: districtName, state: selectedState },
      ]);
      setDistrictName("");
    }
  };

  const handleEditState = (id) => {
    const state = states.find((s) => s.id === id);
    setNewStateName(state.name);
    setEditingStateId(id);
    setModalOpen(true);
  };

  const handleEditDistrict = (id) => {
    const district = districts.find((d) => d.id === id);
    setNewDistrictName(district.name);
    setEditingDistrictId(id);
    setDistrictModalOpen(true);
  };

  const handleSaveStateChanges = () => {
    if (newStateName.trim()) {
      setStates(
        states.map((s) =>
          s.id === editingStateId ? { ...s, name: newStateName } : s
        )
      );
      setModalOpen(false);
      setEditingStateId(null);
      setNewStateName("");
    }
  };

  const handleSaveDistrictChanges = () => {
    if (newDistrictName.trim()) {
      setDistricts(
        districts.map((d) =>
          d.id === editingDistrictId ? { ...d, name: newDistrictName } : d
        )
      );
      setDistrictModalOpen(false);
      setEditingDistrictId(null);
      setNewDistrictName("");
    }
  };

  const handleDeleteState = (id) => {
    setStates(states.filter((s) => s.id !== id));
  };

  const handleDeleteDistrict = (id) => {
    setDistricts(districts.filter((d) => d.id !== id));
  };

  const filteredDistricts = districts.filter(
    (d) => d.state === selectedState
  );

  return (
    <div style={{ padding: "20px 40px", background: "#fff" }}>
      <nav style={{ marginBottom: "15px" }}>
        <a href="#" style={{ color: "red", textDecoration: "none" }}>
          Home
        </a>{" "}
        | <span style={{ color: "#555" }}>States and Districts</span>
      </nav>

      <h2 style={{ fontWeight: 700, color: "#b22222", marginBottom: "30px" }}>
        States and Districts
      </h2>

      {/* Tabs for States and Districts - HR LINE REMOVED */}
      <div
        style={{
          display: "flex",
          marginBottom: "30px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setActiveTab("States")}
          style={{
            background: activeTab === "States" ? "#ff9800" : "#f5f5f5",
            color: activeTab === "States" ? "white" : "#333",
            padding: "12px 24px",
            border: "1px solid #ddd",
            cursor: "pointer",
            fontWeight: 600,
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "States") {
              e.target.style.background = "#e0e0e0";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "States") {
              e.target.style.background = "#f5f5f5";
            }
          }}
        >
          States
        </button>
        <button
          onClick={() => setActiveTab("Districts")}
          style={{
            background: activeTab === "Districts" ? "#ff9800" : "#f5f5f5",
            color: activeTab === "Districts" ? "white" : "#333",
            padding: "12px 24px",
            border: "1px solid #ddd",
            cursor: "pointer",
            fontWeight: 600,
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "Districts") {
              e.target.style.background = "#e0e0e0";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "Districts") {
              e.target.style.background = "#f5f5f5";
            }
          }}
        >
          Districts
        </button>
      </div>

      {/* -------- STATES TAB -------- */}
      {activeTab === "States" && (
        <div>
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Enter State Name
            </label>
            <input
              type="text"
              placeholder="Enter state"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleAddState}
              style={{
                background: "#b22222",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Create State
            </button>
          </div>

          <h3 style={{ marginTop: "30px", fontWeight: 600, marginBottom: "15px" }}>
            States List
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ background: "#b22222", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "left" }}>State Name</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {states.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px" }}>{s.id}</td>
                  <td style={{ padding: "12px" }}>{s.name}</td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => handleEditState(s.id)}
                      style={{
                        background: "white",
                        color: "#1976d2",
                        border: "1px solid #1976d2",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteState(s.id)}
                      style={{
                        background: "white",
                        color: "red",
                        border: "1px solid red",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* -------- DISTRICTS TAB -------- */}
      {activeTab === "Districts" && (
        <div>
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Enter City Name
            </label>
            <input
              type="text"
              placeholder="Enter city"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleAddDistrict}
              style={{
                background: "#b22222",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Create City
            </button>
          </div>

          <h3 style={{ marginTop: "30px", fontWeight: 600, marginBottom: "15px" }}>
            Cities in {selectedState}
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ background: "#b22222", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "left" }}>City Name</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDistricts.map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px" }}>{d.id}</td>
                  <td style={{ padding: "12px" }}>{d.name}</td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => handleEditDistrict(d.id)}
                      style={{
                        background: "white",
                        color: "#1976d2",
                        border: "1px solid #1976d2",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteDistrict(d.id)}
                      style={{
                        background: "white",
                        color: "red",
                        border: "1px solid red",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for editing state */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: "15px" }}>Edit State</h3>
            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={newStateName}
              onChange={(e) => setNewStateName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: "gray",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStateChanges}
                style={{
                  background: "#b22222",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing district */}
      {districtModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: "15px" }}>Edit City</h3>
            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: "8px",
              }}
            >
              City Name
            </label>
            <input
              type="text"
              value={newDistrictName}
              onChange={(e) => setNewDistrictName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setDistrictModalOpen(false)}
                style={{
                  background: "gray",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDistrictChanges}
                style={{
                  background: "#b22222",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;