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
} from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
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

const headingStyle = { 
  color: "#991925", 
  textAlign: "left", 
  fontWeight: "700",  // bold
  fontSize: "1rem"  // slightly bigger
};

return ( <div className="sidebar vh-100 d-flex flex-column shadow"> 
  <ul className="nav flex-column flex-grow-1">
    {/* Dashboard */}
    <li
      className={`nav-item p-3 d-flex align-items-center ${
        active === "Dashboard" ? "active-menu" : ""
      }`}
      onClick={() => handleSelect("Dashboard", "/dashboard")}
    >
      <FaTachometerAlt className="me-3 sidebar-icon" />
      <span className="fw-semibold sidebar-text" style={headingStyle}>
        Dashboard
      </span>
    </li>

    {/* Users */}
    <li
      className="nav-item p-3 d-flex align-items-center justify-content-between"
      onClick={() => toggleMenu("users")}
    >
      <div className="d-flex align-items-center">
        <FaUsers className="me-3 sidebar-icon" />
        <span className="fw-semibold sidebar-text" style={headingStyle}>
          Users
        </span>
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
          <span style={headingStyle}>Customers</span>
        </li>
        <li
          className={`submenu-item ${
            active === "Agents" ? "active-submenu" : ""
          }`}
          onClick={() => handleSelect("Agents", "/users/agents")}
        >
          <FaUserShield className="me-2 submenu-icon" />
          <span style={headingStyle}>Agents</span>
        </li>
        <li
          className={`submenu-item ${
            active === "Vendors" ? "active-submenu" : ""
          }`}
          onClick={() => handleSelect("Vendors", "/users/vendors")}
        >
          <FaUserTie className="me-2 submenu-icon" />
          <span style={headingStyle}>Vendors</span>
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
        <span className="fw-semibold sidebar-text" style={headingStyle}>
          Admin
        </span>
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
          <span style={headingStyle}>Admin Users</span>
        </li>
        <li
          className={`submenu-item ${
            active === "Permissions" ? "active-submenu" : ""
          }`}
          onClick={() => handleSelect("Permissions", "/admin/permissions")}
        >
          <FaKey className="me-2 submenu-icon" />
          <span style={headingStyle}>Permissions</span>
        </li>
        <li
          className={`submenu-item ${
            active === "Groups" ? "active-submenu" : ""
          }`}
          onClick={() => handleSelect("Groups", "/admin/groups")}
        >
          <FaUserFriends className="me-2 submenu-icon" />
          <span style={headingStyle}>Groups</span>
        </li>
      </ul>
    )}

    {/* Remaining main items */}
    {[
      { label: "Subscriptions", icon: FaCoins, path: "/subscriptions" },
      { label: "Schemes", icon: FaCoins, path: "/schemes" },
      { label: "Earn Cashbacks", icon: FaMoneyBillAlt, path: "/earn-cashbacks" },
      { label: "Lucky Draws", icon: FaGift, path: "/lucky-draws" },
      { label: "Banners", icon: FaImage, path: "/banners" },
      { label: "Products", icon: FaTags, path: "/products" },
      { label: "Orders", icon: FaCogs, path: "/orders" },
    ].map((item) => (
      <li
        key={item.label}
        className={`nav-item p-3 d-flex align-items-center ${
          active === item.label ? "active-menu" : ""
        }`}
        onClick={() => handleSelect(item.label, item.path)}
      >
        <item.icon className="me-3 sidebar-icon" />
        <span className="fw-semibold sidebar-text" style={headingStyle}>
          {item.label}
        </span>
      </li>
    ))}
  </ul>
</div>


);
};

export default Sidebar;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTachometerAlt, FaUsers, FaUserShield, FaUserFriends, FaKey, FaCoins, FaMoneyBillAlt, FaGift, FaImage, FaTags, FaCogs, FaChevronDown, FaChevronRight } from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = ({ sidebarOpen = true }) => {
//   const [active, setActive] = useState("Dashboard");
//   const [openMenus, setOpenMenus] = useState({});
//   const navigate = useNavigate();

//   const toggleMenu = (menu) => setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

//   const handleSelect = (page, path) => {
//     setActive(page);
//     navigate(path);
//   };

//   if (!sidebarOpen) return null; // hide sidebar when closed on small screens

//   return (
//     <div className="sidebar vh-100 d-flex flex-column shadow">
//       <div className="sidebar-header p-4">
//         <h3 className="sidebar-title">Admin Panel</h3>
//       </div>

//       <ul className="nav flex-column flex-grow-1">
//         {/* Dashboard */}
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Dashboard" ? "active-menu" : ""}`} onClick={() => handleSelect("Dashboard", "/dashboard")}>
//           <FaTachometerAlt className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Dashboard</span>
//         </li>

//         {/* Users Menu */}
//         <li className="nav-item p-3 d-flex align-items-center justify-content-between" onClick={() => toggleMenu("users")}>
//           <div className="d-flex align-items-center">
//             <FaUsers className="me-3 sidebar-icon" />
//             <span className="fw-semibold sidebar-text">Users</span>
//           </div>
//           {openMenus.users ? <FaChevronDown className="menu-arrow" /> : <FaChevronRight className="menu-arrow" />}
//         </li>
//         {openMenus.users && (
//           <ul className="submenu ps-5">
//             <li className={`nav-item p-2 submenu-item d-flex align-items-center ${active === "Customers" ? "active-submenu" : ""}`} onClick={() => handleSelect("Customers", "/users/customers")}>
//               <span>Customers</span>
//             </li>
//             <li className={`nav-item p-2 submenu-item d-flex align-items-center ${active === "Agents" ? "active-submenu" : ""}`} onClick={() => handleSelect("Agents", "/users/agents")}>
//               <span>Agents</span>
//             </li>
//           </ul>
//         )}

//         {/* Admin Menu */}
//         <li className="nav-item p-3 d-flex align-items-center justify-content-between" onClick={() => toggleMenu("admin")}>
//           <div className="d-flex align-items-center">
//             <FaUserShield className="me-3 sidebar-icon" />
//             <span className="fw-semibold sidebar-text">Admin</span>
//           </div>
//           {openMenus.admin ? <FaChevronDown className="menu-arrow" /> : <FaChevronRight className="menu-arrow" />}
//         </li>
//         {openMenus.admin && (
//           <ul className="submenu ps-5">
//             <li className={`nav-item p-2 submenu-item d-flex align-items-center ${active === "Admin Users" ? "active-submenu" : ""}`} onClick={() => handleSelect("Admin Users", "/admin/users")}>
//               <FaUserFriends className="me-2 submenu-icon" />
//               <span>Admin Users</span>
//             </li>
//             <li className={`nav-item p-2 submenu-item d-flex align-items-center ${active === "Permissions" ? "active-submenu" : ""}`} onClick={() => handleSelect("Permissions", "/admin/permissions")}>
//               <FaKey className="me-2 submenu-icon" />
//               <span>Permissions</span>
//             </li>
//             <li className={`nav-item p-2 submenu-item d-flex align-items-center ${active === "Groups" ? "active-submenu" : ""}`} onClick={() => handleSelect("Groups", "/admin/groups")}>
//               <FaUserFriends className="me-2 submenu-icon" />
//               <span>Groups</span>
//             </li>
//           </ul>
//         )}

//         {/* Other menu items */}
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Schemes" ? "active-menu" : ""}`} onClick={() => handleSelect("Schemes", "/schemes")}>
//           <FaCoins className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Schemes</span>
//         </li>

//         <li className={`nav-item p-3 d-flex align-items-center ${active === "EarnCashbacks" ? "active-menu" : ""}`} onClick={() => handleSelect("EarnCashbacks", "/earn-cashbacks")}>
//           <FaMoneyBillAlt className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Earn Cashbacks</span>
//         </li>

//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Lucky Draws" ? "active-menu" : ""}`} onClick={() => handleSelect("Lucky Draws", "/lucky-draws")}>
//           <FaGift className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Lucky Draws</span>
//         </li>

//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Banners" ? "active-menu" : ""}`} onClick={() => handleSelect("Banners", "/banners")}>
//           <FaImage className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Banners</span>
//         </li>

//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Products" ? "active-menu" : ""}`} onClick={() => handleSelect("Products", "/products")}>
//           <FaTags className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Products</span>
//         </li>

//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Orders" ? "active-menu" : ""}`} onClick={() => handleSelect("Orders", "/orders")}>
//           <FaCogs className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Orders</span>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;











// // src/components/Sidebar.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTachometerAlt, FaUsers, FaUserShield, FaUserFriends, FaKey, FaCoins, FaMoneyBillAlt, FaGift, FaImage, FaTags, FaCogs, FaChevronDown, FaChevronRight } from "react-icons/fa";
// import "./Sidebar.css";
// import { FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa";


// const Sidebar = ({ sidebarOpen = true, onSelect }) => {
//   const [active, setActive] = useState("Dashboard");
//   const [openMenus, setOpenMenus] = useState({});
//   const navigate = useNavigate();

//   const toggleMenu = (menu) => setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
//   const handleSelect = (page, path) => {
//     setActive(page);
//     navigate(path);
//     if (onSelect) onSelect(); // automatically close sidebar on mobile
//   };

//   if (!sidebarOpen) return null;

//   return (
//     <div className="sidebar vh-100 d-flex flex-column shadow">
//       <div className="sidebar-header p-4">
//         <h3 className="sidebar-title">Admin Panel</h3>
//       </div>

//       <ul className="nav flex-column flex-grow-1">
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Dashboard" ? "active-menu" : ""}`} onClick={() => handleSelect("Dashboard", "/dashboard")}>
//           <FaTachometerAlt className="me-3 sidebar-icon" />
//           <span className="fw-semibold sidebar-text">Dashboard</span>
//         </li>

//         {/* Users */}
//         <li className="nav-item p-3 d-flex align-items-center justify-content-between" onClick={() => toggleMenu("users")}>
//           <div className="d-flex align-items-center">
//             <FaUsers className="me-3 sidebar-icon" />
//             <span className="fw-semibold sidebar-text">Users</span>
//           </div>
//           {openMenus.users ? <FaChevronDown /> : <FaChevronRight />}
//         </li>
//         {openMenus.users && (
//           <ul className="submenu ps-5">
//             <li className={`nav-item p-2 submenu-item ${active === "Customers" ? "active-submenu" : ""}`} onClick={() => handleSelect("Customers", "/users/customers")}>Customers</li>
//             <li className={`nav-item p-2 submenu-item ${active === "Agents" ? "active-submenu" : ""}`} onClick={() => handleSelect("Agents", "/users/agents")}>Agents</li>
//           </ul>
//         )}

//         {/* Admin */}
//         <li className="nav-item p-3 d-flex align-items-center justify-content-between" onClick={() => toggleMenu("admin")}>
//           <div className="d-flex align-items-center">
//             <FaUserShield className="me-3 sidebar-icon" />
//             <span className="fw-semibold sidebar-text">Admin</span>
//           </div>
//           {openMenus.admin ? <FaChevronDown /> : <FaChevronRight />}
//         </li>
//         {openMenus.admin && (
//           <ul className="submenu ps-5">
//             <li className={`nav-item p-2 submenu-item ${active === "Admin Users" ? "active-submenu" : ""}`} onClick={() => handleSelect("Admin Users", "/admin/users")}>
//               <FaUserFriends className="me-2 submenu-icon" /> Admin Users
//             </li>
//             <li className={`nav-item p-2 submenu-item ${active === "Permissions" ? "active-submenu" : ""}`} onClick={() => handleSelect("Permissions", "/admin/permissions")}>
//               <FaKey className="me-2 submenu-icon" /> Permissions
//             </li>
//             <li className={`nav-item p-2 submenu-item ${active === "Groups" ? "active-submenu" : ""}`} onClick={() => handleSelect("Groups", "/admin/groups")}>
//               <FaUserFriends className="me-2 submenu-icon" /> Groups
//             </li>
//           </ul>
//         )}

// {/* Configuration */}
// <li className="nav-item p-3 d-flex align-items-center justify-content-between" onClick={() => toggleMenu("configuration")}>
//   <div className="d-flex align-items-center">
//     <FaCogs className="me-3 sidebar-icon" />
//     <span className="fw-semibold sidebar-text">Configuration</span>
//   </div>
//   {openMenus.configuration ? <FaChevronDown /> : <FaChevronRight />}
// </li>
// {openMenus.configuration && (
//   <ul className="submenu ps-5">
//     <li
//       className={`nav-item p-2 submenu-item ${active === "Configuration" ? "active-submenu" : ""}`}
//       onClick={() => handleSelect("Configuration", "/configuration")}
//     >
//       <FaMapMarkerAlt className="me-2 submenu-icon" /> States & Districts
//     </li>
//   </ul>
// )}


//         {/* Other items */}
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Schemes" ? "active-menu" : ""}`} onClick={() => handleSelect("Schemes", "/schemes")}>
//           <FaCoins className="me-3 sidebar-icon" /> Schemes
//         </li>
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "EarnCashbacks" ? "active-menu" : ""}`} onClick={() => handleSelect("EarnCashbacks", "/earn-cashbacks")}>
//           <FaMoneyBillAlt className="me-3 sidebar-icon" /> Earn Cashbacks
//         </li>
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Lucky Draws" ? "active-menu" : ""}`} onClick={() => handleSelect("Lucky Draws", "/lucky-draws")}>
//           <FaGift className="me-3 sidebar-icon" /> Lucky Draws
//         </li>
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Banners" ? "active-menu" : ""}`} onClick={() => handleSelect("Banners", "/banners")}>
//           <FaImage className="me-3 sidebar-icon" /> Banners
//         </li>
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Products" ? "active-menu" : ""}`} onClick={() => handleSelect("Products", "/products")}>
//           <FaTags className="me-3 sidebar-icon" /> Products
//         </li>
//         <li className={`nav-item p-3 d-flex align-items-center ${active === "Orders" ? "active-menu" : ""}`} onClick={() => handleSelect("Orders", "/orders")}>
//           <FaCogs className="me-3 sidebar-icon" /> Orders
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
