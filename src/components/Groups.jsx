import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Groups = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Admin Group",
      permissions: ["Add User", "Edit User", "Delete User"],
      members: ["Anand", "Rahul"],
    },
    {
      id: 2,
      name: "Support Team",
      permissions: ["View Tickets", "Reply Tickets"],
      members: ["Meena", "Amit"],
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    permissions: "",
    members: "",
  });
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setGroups(
        groups.map((g) =>
          g.id === editing.id
            ? {
                ...g,
                name: newGroup.name,
                permissions: newGroup.permissions.split(",").map((p) => p.trim()),
                members: newGroup.members.split(",").map((m) => m.trim()),
              }
            : g
        )
      );
      setEditing(null);
    } else {
      setGroups([
        ...groups,
        {
          id: groups.length + 1,
          name: newGroup.name,
          permissions: newGroup.permissions.split(",").map((p) => p.trim()),
          members: newGroup.members.split(",").map((m) => m.trim()),
        },
      ]);
    }
    setNewGroup({ name: "", permissions: "", members: "" });
  };

  const handleEdit = (group) => {
    setEditing(group);
    setNewGroup({
      name: group.name,
      permissions: group.permissions.join(", "),
      members: group.members.join(", "),
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      setGroups(groups.filter((g) => g.id !== id));
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ color: "#991925", fontWeight: "700", fontSize: "28px", marginBottom: "20px" }}>
        Groups Management
      </h2>

      {/* Add/Edit Form */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "25px",
          marginBottom: "40px",
        }}
      >
        <h4 style={{ color: "#000", marginBottom: "20px", fontWeight: "600" }}>
          {editing ? "Edit Group" : "Add New Group"}
        </h4>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Group Name"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            required
            style={{
              border: "1px solid #991925",
              borderRadius: "6px",
              padding: "10px",
              outline: "none",
            }}
          />
          <input
            type="text"
            placeholder="Permissions (comma separated)"
            value={newGroup.permissions}
            onChange={(e) => setNewGroup({ ...newGroup, permissions: e.target.value })}
            style={{
              border: "1px solid #991925",
              borderRadius: "6px",
              padding: "10px",
              outline: "none",
            }}
          />
          <input
            type="text"
            placeholder="Members (comma separated)"
            value={newGroup.members}
            onChange={(e) => setNewGroup({ ...newGroup, members: e.target.value })}
            style={{
              border: "1px solid #991925",
              borderRadius: "6px",
              padding: "10px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#991925",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#FFC107")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#991925")}
          >
            {editing ? "Update Group" : <><FaPlus style={{ marginRight: "5px" }} /> Add Group</>}
          </button>
        </form>
      </div>

      {/* Groups Table */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "25px",
        }}
      >
        <h4 style={{ color: "#000", marginBottom: "20px", fontWeight: "600" }}>
          Existing Groups
        </h4>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#991925", color: "#fff" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Group Name</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Permissions</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Members</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr
                  key={group.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#fff",
                    transition: "0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFF8E1")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  <td style={{ padding: "12px", fontWeight: "600", color: "#000" }}>{group.name}</td>
                  <td style={{ padding: "12px", color: "#555" }}>{group.permissions.join(", ")}</td>
                  <td style={{ padding: "12px", color: "#555" }}>{group.members.join(", ")}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      style={{
                        color: "#FFC107",
                        background: "none",
                        border: "none",
                        fontSize: "18px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(group)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      style={{
                        color: "#991925",
                        background: "none",
                        border: "none",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(group.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {groups.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#777",
                    }}
                  >
                    No groups available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Groups;
