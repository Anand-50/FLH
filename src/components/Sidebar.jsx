// // src/components/Sidebar.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
// FaTachometerAlt,
// FaUsers,
// FaUserShield,
// FaUserFriends,
// FaKey,
// FaCoins,
// FaMoneyBillAlt,
// FaGift,
// FaImage,
// FaTags,
// FaCogs,
// FaChevronDown,
// FaChevronRight,
// FaUserTie,
// } from "react-icons/fa";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = ({ sidebarOpen = true, onSelect }) => {
// const [active, setActive] = useState("Dashboard");
// const [openMenus, setOpenMenus] = useState({});
// const navigate = useNavigate();

// const toggleMenu = (menu) =>
// setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

// const handleSelect = (page, path) => {
// setActive(page);
// navigate(path);
// if (onSelect) onSelect();
// };

// if (!sidebarOpen) return null;

// const headingStyle = { 
//   color: "#991925", 
//   textAlign: "left", 
//   fontWeight: "700",  // bold
//   fontSize: "1rem"  // slightly bigger
// };




// return ( <div className="sidebar vh-100 d-flex flex-column shadow"> 
//   <ul className="nav flex-column flex-grow-1">
//     {/* Dashboard */}
//     <li
//       className={`nav-item p-3 d-flex align-items-center ${
//         active === "Dashboard" ? "active-menu" : ""
//       }`}
//       onClick={() => handleSelect("Dashboard", "/dashboard")}
//     >
//       <FaTachometerAlt className="me-3 sidebar-icon" />
//       <span className="fw-semibold sidebar-text" style={headingStyle}>
//         Dashboard
//       </span>
//     </li>

//     {/* Users */}
//     <li
//       className="nav-item p-3 d-flex align-items-center justify-content-between"
//       onClick={() => toggleMenu("users")}
//     >
//       <div className="d-flex align-items-center">
//         <FaUsers className="me-3 sidebar-icon" />
//         <span className="fw-semibold sidebar-text" style={headingStyle}>
//           Users
//         </span>
//       </div>
//       {openMenus.users ? <FaChevronDown /> : <FaChevronRight />}
//     </li>

//     {openMenus.users && (
//       <ul className="submenu">
//         <li
//           className={`submenu-item ${
//             active === "Customers" ? "active-submenu" : ""
//           }`}
//           onClick={() => handleSelect("Customers", "/users/customers")}
//         >
//           <FaUserFriends className="me-2 submenu-icon" />
//           <span style={headingStyle}>Customers</span>
//         </li>
//         <li
//           className={`submenu-item ${
//             active === "Agents" ? "active-submenu" : ""
//           }`}
//           onClick={() => handleSelect("Agents", "/users/agents")}
//         >
//           <FaUserShield className="me-2 submenu-icon" />
//           <span style={headingStyle}>Agents</span>
//         </li>
//         <li
//           className={`submenu-item ${
//             active === "Vendors" ? "active-submenu" : ""
//           }`}
//           onClick={() => handleSelect("Vendors", "/users/vendors")}
//         >
//           <FaUserTie className="me-2 submenu-icon" />
//           <span style={headingStyle}>Vendors</span>
//         </li>
//       </ul>
//     )}

//     {/* Admin */}
//     <li
//       className="nav-item p-3 d-flex align-items-center justify-content-between"
//       onClick={() => toggleMenu("admin")}
//     >
//       <div className="d-flex align-items-center">
//         <FaUserShield className="me-3 sidebar-icon" />
//         <span className="fw-semibold sidebar-text" style={headingStyle}>
//           Admin
//         </span>
//       </div>
//       {openMenus.admin ? <FaChevronDown /> : <FaChevronRight />}
//     </li>

//     {openMenus.admin && (
//       <ul className="submenu">
//         <li
//           className={`submenu-item ${
//             active === "Admin Users" ? "active-submenu" : ""
//           }`}
//           onClick={() => handleSelect("Admin Users", "/admin/users")}
//         >
//           <FaUserFriends className="me-2 submenu-icon" />
//           <span style={headingStyle}>Admin Users</span>
//         </li>
//         <li
//           className={`submenu-item ${
//             active === "Permissions" ? "active-submenu" : ""
//           }`}
//           onClick={() => handleSelect("Permissions", "/admin/permissions")}
//         >
//           <FaKey className="me-2 submenu-icon" />
//           <span style={headingStyle}>Permissions</span>
//         </li>
//         <li
//           className={`submenu-item ${
//             active === "Groups" ? "active-submenu" : ""
//           }`}
//           onClick={() => handleSelect("Groups", "/admin/groups")}
//         >
//           <FaUserFriends className="me-2 submenu-icon" />
//           <span style={headingStyle}>Groups</span>
//         </li>
//       </ul>
//     )}

//     {/* Remaining main items */}
//     {[
//       { label: "Subscriptions", icon: FaCoins, path: "/subscriptions" },
//       { label: "Schemes", icon: FaCoins, path: "/schemes" },
//       { label: "Earn Cashbacks", icon: FaMoneyBillAlt, path: "/earn-cashbacks" },
//       { label: "Lucky Draws", icon: FaGift, path: "/lucky-draws" },
//       { label: "Banners", icon: FaImage, path: "/banners" },
//       { label: "Products", icon: FaTags, path: "/products" },
//       { label: "Orders", icon: FaCogs, path: "/orders" },
//       { label: "AMC-MPL", icon: FaMapMarkerAlt, path: "/amc-mpl" },
//     ].map((item) => (
//       <li
//         key={item.label}
//         className={`nav-item p-3 d-flex align-items-center ${
//           active === item.label ? "active-menu" : ""
//         }`}
//         onClick={() => handleSelect(item.label, item.path)}
//       >
//         <item.icon className="me-3 sidebar-icon" />
//         <span className="fw-semibold sidebar-text" style={headingStyle}>
//           {item.label}
//         </span>
//       </li>
//     ))}
//   </ul>
// </div>


// );
// };

// export default Sidebar;



// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaUserFriends,
  FaKey,
  FaCoins,
  FaMoneyBillAlt,
  FaGift,
  FaImage,
  FaTags,
  FaCogs,
  FaChevronDown,
  FaChevronRight,
  FaUserTie,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen = true, onSelect }) => {
  const [active, setActive] = useState("Dashboard");
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (menu) =>
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

  const handleSelect = (page, path) => {
    setActive(page);
    navigate(path);
    if (onSelect) onSelect();
  };

  if (!sidebarOpen) return null;

  // ✅ Inline style function for active/inactive heading
  const headingStyle = (isActive) => ({
    color: isActive ? "white" : "#991925",
    textAlign: "left",
    fontWeight: "700",
    fontSize: "1rem",
  });

  return (
    <div
  className="sidebar d-flex flex-column shadow"
  style={{
    height: "100vh",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#991925 #f5f5f5",
  }}
>

      <ul className="nav flex-column flex-grow-1">
        {/* Dashboard */}
        <li
          className={`nav-item p-3 d-flex align-items-center ${
            active === "Dashboard" ? "active-menu" : ""
          }`}
          onClick={() => handleSelect("Dashboard", "/dashboard")}
        >
          <FaTachometerAlt className="me-3 sidebar-icon" />
          <span style={headingStyle(active === "Dashboard")}>Dashboard</span>
        </li>

        {/* Users */}
        <li
          className="nav-item p-3 d-flex align-items-center justify-content-between"
          onClick={() => toggleMenu("users")}
        >
          <div className="d-flex align-items-center">
            <FaUsers className="me-3 sidebar-icon" />
            <span style={headingStyle(openMenus.users)}>Users</span>
          </div>
          {openMenus.users ? <FaChevronDown /> : <FaChevronRight />}
        </li>

        {openMenus.users && (
          <ul className="submenu">
            <li
              className={`submenu-item ${
                active === "Customers" ? "active-submenu" : ""
              }`}
              onClick={() => handleSelect("Customers", "/users/customers")}
            >
              <FaUserFriends className="me-2 submenu-icon" />
              <span style={headingStyle(active === "Customers")}>
                Customers
              </span>
            </li>
            <li
              className={`submenu-item ${
                active === "Agents" ? "active-submenu" : ""
              }`}
              onClick={() => handleSelect("Agents", "/users/agents")}
            >
              <FaUserShield className="me-2 submenu-icon" />
              <span style={headingStyle(active === "Agents")}>Agents</span>
            </li>
            <li
              className={`submenu-item ${
                active === "Vendors" ? "active-submenu" : ""
              }`}
              onClick={() => handleSelect("Vendors", "/users/vendors")}
            >
              <FaUserTie className="me-2 submenu-icon" />
              <span style={headingStyle(active === "Vendors")}>Vendors</span>
            </li>
          </ul>
        )}

        {/* Admin */}
        <li
          className="nav-item p-3 d-flex align-items-center justify-content-between"
          onClick={() => toggleMenu("admin")}
        >
          <div className="d-flex align-items-center">
            <FaUserShield className="me-3 sidebar-icon" />
            <span style={headingStyle(openMenus.admin)}>Admin</span>
          </div>
          {openMenus.admin ? <FaChevronDown /> : <FaChevronRight />}
        </li>

        {openMenus.admin && (
          <ul className="submenu">
            <li
              className={`submenu-item ${
                active === "Admin Users" ? "active-submenu" : ""
              }`}
              onClick={() => handleSelect("Admin Users", "/admin/users")}
            >
              <FaUserFriends className="me-2 submenu-icon" />
              <span style={headingStyle(active === "Admin Users")}>
                Admin Users
              </span>
            </li>
            <li
              className={`submenu-item ${
                active === "Permissions" ? "active-submenu" : ""
              }`}
              onClick={() => handleSelect("Permissions", "/admin/permissions")}
            >
              <FaKey className="me-2 submenu-icon" />
              <span style={headingStyle(active === "Permissions")}>
                Permissions
              </span>
            </li>
            <li
              className={`submenu-item ${
                active === "Groups" ? "active-submenu" : ""
              }`}
              onClick={() => handleSelect("Groups", "/admin/groups")}
            >
              <FaUserFriends className="me-2 submenu-icon" />
              <span style={headingStyle(active === "Groups")}>Groups</span>
            </li>
          </ul>
        )}

        {/* Remaining Main Items */}
        {[
          { label: "Subscriptions", icon: FaCoins, path: "/subscriptions" },
          { label: "Schemes", icon: FaCoins, path: "/schemes" },
          { label: "Earn Cashbacks", icon: FaMoneyBillAlt, path: "/earn-cashbacks" },
          { label: "Lucky Draws", icon: FaGift, path: "/lucky-draws" },
          { label: "Banners", icon: FaImage, path: "/banners" },
          { label: "Products", icon: FaTags, path: "/products" },
          { label: "Orders", icon: FaCogs, path: "/orders" },
          { label: "AMC-MPL", icon: FaMapMarkerAlt, path: "/amc-mpl" },
        ].map((item) => (
          <li
            key={item.label}
            className={`nav-item p-3 d-flex align-items-center ${
              active === item.label ? "active-menu" : ""
            }`}
            onClick={() => handleSelect(item.label, item.path)}
          >
            <item.icon className="me-3 sidebar-icon" />
            <span style={headingStyle(active === item.label)}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
