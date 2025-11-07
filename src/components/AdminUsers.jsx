
import React, { useState, useEffect } from "react";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "admin",
    status: "active",
  });

  // Load existing users from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("adminUsers");
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("adminUsers", JSON.stringify(users));
  }, [users]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save new user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
      role: "admin",
      status: "active",
    });
    setShowForm(false);
    alert("Admin created successfully!");
  };

  // Delete user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="admin-container">
      <div className="header-section">
        <h2 className="page-title">Admin Users</h2>
        <button className="btn-create-admin" onClick={() => setShowForm(true)}>
          + Create Admin
        </button>
      </div>

      {/* Table Section */}
      <div className="admin-table-card">
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          user.status === "active" ? "active" : "inactive"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No admin users found. Click "Create Admin" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal animate">
            <div className="form-header">
              <h3>Create New Admin</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="popup-form landscape-form">
  <div className="form-grid">
    <div className="form-group">
      <label>Admin Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Role / Access Type (optional)</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="admin">Admin</option>
        <option value="super_admin">Super Admin</option>
        <option value="moderator">Moderator</option>
      </select>
    </div>

    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Phone</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        placeholder="Enter phone number"
      />
    </div>

    <div className="form-group">
      <label>Status</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  </div>

  <div className="form-actions">
    <button type="submit" className="btn-save">
      Save Admin
    </button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
