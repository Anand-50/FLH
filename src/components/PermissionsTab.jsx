// import React, { useState, useEffect } from "react";
// import {
//   FaPlus,
//   FaTrashAlt,
//   FaKey,
//   FaUserShield,
//   FaTimes,
//   FaSave,
// } from "react-icons/fa";
// import "./PermissionsTab.css";

// const PermissionsTab = () => {
//   const [users, setUsers] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [formData, setFormData] = useState({
//     role: "",
//     permissions: [],
//   });

//   const availablePermissions = [
//     "user_management",
//     "content_management",
//     "settings_management",
//     "reports_view",
//     "analytics_view",
//     "billing_management",
//     "api_management",
//   ];

//   const availableRoles = [
//     { value: "super_admin", label: "Super Admin", permissions: availablePermissions },
//     {
//       value: "admin",
//       label: "Admin",
//       permissions: ["user_management", "content_management", "reports_view"],
//     },
//     {
//       value: "moderator",
//       label: "Moderator",
//       permissions: ["content_management"],
//     },
//     {
//       value: "viewer",
//       label: "Viewer",
//       permissions: ["reports_view", "analytics_view"],
//     },
//   ];

//   useEffect(() => {
//     const savedUsers = localStorage.getItem("adminUsers");
//     const savedPermissions = localStorage.getItem("userPermissions");
//     if (savedUsers) setUsers(JSON.parse(savedUsers));
//     if (savedPermissions) setPermissions(JSON.parse(savedPermissions));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("userPermissions", JSON.stringify(permissions));
//   }, [permissions]);

//   const handleUserSelect = (userId) => {
//     setSelectedUser(userId);
//     const user = users.find((u) => u.id === userId);
//     if (user) {
//       const existingPermission = permissions.find((p) => p.userId === userId);
//       const userRole = availableRoles.find((r) => r.value === user.role);
//       setFormData({
//         role: user.role,
//         permissions: existingPermission
//           ? existingPermission.permissions
//           : userRole
//           ? userRole.permissions
//           : [],
//       });
//     }
//   };

//   const handlePermissionChange = (permission) => {
//     setFormData((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(permission)
//         ? prev.permissions.filter((p) => p !== permission)
//         : [...prev.permissions, permission],
//     }));
//   };

//   const handleRoleChange = (roleValue) => {
//     const role = availableRoles.find((r) => r.value === roleValue);
//     setFormData((prev) => ({
//       role: roleValue,
//       permissions: role ? role.permissions : prev.permissions,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedUser) {
//       alert("Please select a user");
//       return;
//     }
//     const user = users.find((u) => u.id === selectedUser);
//     const updatedPermissions = permissions.filter(
//       (p) => p.userId !== selectedUser
//     );
//     updatedPermissions.push({
//       id: Date.now().toString(),
//       userId: selectedUser,
//       userName: user.name,
//       userEmail: user.email,
//       role: formData.role,
//       permissions: formData.permissions,
//       updatedAt: new Date().toISOString(),
//     });
//     setPermissions(updatedPermissions);
//     setShowForm(false);
//     setSelectedUser("");
//     setFormData({ role: "", permissions: [] });
//     alert("Permissions updated successfully!");
//   };

//   const deletePermission = (permissionId) => {
//     if (window.confirm("Are you sure you want to remove these permissions?")) {
//       setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
//     }
//   };

//   return (
//     <div className="permissions-container">
//       {/* Header */}
//       <div className="header-section">
//         <h2 className="page-title">
//           <FaUserShield className="me-2" /> Permissions Management
//         </h2>
//         <button
//           onClick={() => setShowForm(true)}
//           className="btn-create-permission"
//         >
//           <FaPlus className="me-1" /> Give Permissions
//         </button>
//       </div>

//       {/* Popup Form */}
//       {showForm && (
//         <div className="form-overlay">
//           <div className="form-modal animate">
//             <div className="form-header">
//               <h3>
//                 <FaKey className="me-2" /> Assign Permissions
//               </h3>
//               <button
//                 className="close-btn"
//                 onClick={() => {
//                   setShowForm(false);
//                   setSelectedUser("");
//                   setFormData({ role: "", permissions: [] });
//                 }}
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="popup-form">
//               <label>Select Admin User</label>
//               <select
//                 value={selectedUser}
//                 onChange={(e) => handleUserSelect(e.target.value)}
//                 required
//               >
//                 <option value="">Choose a user...</option>
//                 {users.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name} ({user.email}) - {user.role}
//                   </option>
//                 ))}
//               </select>

//               {selectedUser && (
//                 <>
//                   <label>Role</label>
//                   <select
//                     value={formData.role}
//                     onChange={(e) => handleRoleChange(e.target.value)}
//                     required
//                   >
//                     <option value="">Select a role...</option>
//                     {availableRoles.map((role) => (
//                       <option key={role.value} value={role.value}>
//                         {role.label}
//                       </option>
//                     ))}
//                   </select>

//                   <label>Permissions</label>
//                   <div className="permissions-list">
//                     {availablePermissions.map((permission) => (
//                       <label key={permission}>
//                         <input
//                           type="checkbox"
//                           checked={formData.permissions.includes(permission)}
//                           onChange={() => handlePermissionChange(permission)}
//                         />
//                         {permission.replace(/_/g, " ")}
//                       </label>
//                     ))}
//                   </div>
//                 </>
//               )}

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn-cancel"
//                   onClick={() => {
//                     setShowForm(false);
//                     setSelectedUser("");
//                     setFormData({ role: "", permissions: [] });
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-save">
//                   <FaSave className="me-1" /> Save Permissions
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Table Section */}
//       <div className="admin-table-card">
//         <div className="table-wrapper">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Permissions</th>
//                 <th>Last Updated</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {permissions.length > 0 ? (
//                 permissions.map((permission) => (
//                   <tr key={permission.id}>
//                     <td>{permission.userName}</td>
//                     <td>{permission.userEmail}</td>
//                     <td>
//                       <span className={`role-badge ${permission.role}`}>
//                         {permission.role}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="perm-tags">
//                         {permission.permissions.map((perm) => (
//                           <span key={perm} className="perm-badge">
//                             {perm.replace(/_/g, " ")}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                     <td>
//                       {new Date(permission.updatedAt).toLocaleDateString()}
//                     </td>
//                     <td className="action-buttons">
//                       <button
//                         onClick={() => deletePermission(permission.id)}
//                         className="btn-delete"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     No permissions assigned yet. Click "Give Permissions" to get
//                     started.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PermissionsTab;





import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaKey,
  FaUserShield,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import "./PermissionsTab.css";

const PermissionsTab = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    permissions: [],
  });

  const availablePermissions = [
    "user_management",
    "content_management",
    "settings_management",
    "reports_view",
    "analytics_view",
    "billing_management",
    "api_management",
  ];

  const availableRoles = [
    { value: "super_admin", label: "Super Admin", permissions: availablePermissions },
    {
      value: "admin",
      label: "Admin",
      permissions: ["user_management", "content_management", "reports_view"],
    },
    {
      value: "moderator",
      label: "Moderator",
      permissions: ["content_management"],
    },
    {
      value: "viewer",
      label: "Viewer",
      permissions: ["reports_view", "analytics_view"],
    },
  ];

  useEffect(() => {
    const savedUsers = localStorage.getItem("adminUsers");
    const savedPermissions = localStorage.getItem("userPermissions");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedPermissions) setPermissions(JSON.parse(savedPermissions));
  }, []);

  useEffect(() => {
    localStorage.setItem("userPermissions", JSON.stringify(permissions));
  }, [permissions]);

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    const user = users.find((u) => u.id === userId);
    if (user) {
      const existingPermission = permissions.find((p) => p.userId === userId);
      const userRole = availableRoles.find((r) => r.value === user.role);
      setFormData({
        role: user.role,
        permissions: existingPermission
          ? existingPermission.permissions
          : userRole
          ? userRole.permissions
          : [],
      });
    }
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleRoleChange = (roleValue) => {
    const role = availableRoles.find((r) => r.value === roleValue);
    setFormData((prev) => ({
      role: roleValue,
      permissions: role ? role.permissions : prev.permissions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }
    const user = users.find((u) => u.id === selectedUser);
    const updatedPermissions = permissions.filter(
      (p) => p.userId !== selectedUser
    );
    updatedPermissions.push({
      id: Date.now().toString(),
      userId: selectedUser,
      userName: user.name,
      userEmail: user.email,
      role: formData.role,
      permissions: formData.permissions,
      updatedAt: new Date().toISOString(),
      status: "Active",
      lastLogin: new Date().toLocaleString(),
    });
    setPermissions(updatedPermissions);
    setShowForm(false);
    setSelectedUser("");
    setFormData({ role: "", permissions: [] });
    alert("Permissions updated successfully!");
  };

  const deletePermission = (permissionId) => {
    if (window.confirm("Are you sure you want to remove these permissions?")) {
      setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
    }
  };

  return (
    <div className="permissions-container">
      {/* Header */}
      <div className="header-section">
        <h2 className="page-title">
          <FaUserShield className="me-2" /> Permissions Management
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-create-permission"
        >
          <FaPlus className="me-1" /> Assign Permissions
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
  <div className="form-overlay">
    <div className="form-modal animate">
      <div className="form-header">
        <h3>
          <FaKey className="me-2" /> Assign Permissions
        </h3>
        <button
          className="close-btn"
          onClick={() => {
            setShowForm(false);
            setSelectedUser("");
            setFormData({ role: "", permissions: [] });
          }}
        >
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="popup-form responsive-form">
        <div className="form-group">
          <label>Select Admin User</label>
          <select
            value={selectedUser}
            onChange={(e) => handleUserSelect(e.target.value)}
            required
          >
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email}) - {user.role}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <>
            <div className="form-group">
              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                required
              >
                <option value="">Select a role...</option>
                {availableRoles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Permissions</label>
              <div className="permissions-list grid-layout">
                {[
                  "Users",
                  "Admins",
                  "Subscriptions",
                  "Configurations",
                  "Lucky Draws",
                  "Schemes",
                  "Earn Cashback",
                  "Banners",
                  "Products",
                  "Others",
                  "Allow All",
                ].map((permission) => (
                  <label key={permission} className="permission-item">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              setShowForm(false);
              setSelectedUser("");
              setFormData({ role: "", permissions: [] });
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn-save">
            <FaSave className="me-1" /> Save Admin
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Table Section */}
      <div className="admin-table-card">
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0 ? (
                permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td>{permission.userId}</td>
                    <td>{permission.userName}</td>
                    <td>{permission.userEmail.split("@")[0]}</td>
                    <td>{permission.userEmail}</td>
                    <td>
                      <span className={`role-badge ${permission.role}`}>
                        {permission.role}
                      </span>
                    </td>
                    <td>
                      <div className="perm-tags">
                        {permission.permissions.map((perm) => (
                          <span key={perm} className="perm-badge">
                            {perm.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{permission.status}</td>
                    <td>{permission.lastLogin}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => deletePermission(permission.id)}
                        className="btn-delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    No admins found. Click "Create New Admin" to get started.
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

export default PermissionsTab;
