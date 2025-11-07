


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaUserCog, FaSignOutAlt } from "react-icons/fa"; // Changed icon to FaUserCog for profile
// import { Button, Card } from "react-bootstrap";
// import fullyLoadedHouseLogo from "../assets/fully-loaded-house-logo.png.png";

// const NavbarTop = ({ onLogout }) => {
//   const [showProfile, setShowProfile] = useState(false);

//   return (
//     <nav
//       className="navbar navbar-dark px-4 d-flex justify-content-between align-items-center shadow-sm"
//       style={{
//         height: "85px", // Increased height
//         width: "100%",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 1000,
//         backgroundColor: "#b71c1c", // Slightly deeper maroon red
//       }}
//     >
//       {/* LEFT SIDE - Logo */}
//       <div className="d-flex align-items-center">
//         <img
//           src={fullyLoadedHouseLogo}
//           alt="Fully Loaded House Logo"
//           style={{
//             height: "70px",
//             marginRight: "16px",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="d-flex align-items-center position-relative">
//         <span
//           className="fw-bold text-white me-3"
//           style={{
//             fontSize: "1.2rem",
//             letterSpacing: "0.5px",
//             textTransform: "uppercase",
//           }}
//         >
//          <small>Welcome,</small> <span style={{ fontWeight: "800" }}>Admin</span>
//         </span>

//         {/* Profile Button */}
//         <Button
//           variant="light"
//           size="sm"
//           className="me-2 d-flex align-items-center justify-content-center"
//           style={{
//             borderRadius: "8px",
//             border: "2px solid #f9b233", // yellow-orange border
//             color: "#f9b233",
//             backgroundColor: "transparent",
//             width: "40px",
//             height: "40px",
//             transition: "0.3s ease",
//           }}
//           onClick={() => setShowProfile(!showProfile)}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#f9b233";
//             e.target.style.color = "#b71c1c";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "transparent";
//             e.target.style.color = "#f9b233";
//           }}
//         >
//           <FaUserCog className="fs-5" />
//         </Button>

//         {/* Logout Button */}
//         <Button
//           variant="light"
//           size="sm"
//           className="d-flex align-items-center justify-content-center"
//           style={{
//             borderRadius: "8px",
//             border: "2px solid #f9b233",
//             color: "#f9b233",
//             backgroundColor: "transparent",
//             width: "40px",
//             height: "40px",
//             transition: "0.3s ease",
//           }}
//           onClick={onLogout}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#f9b233";
//             e.target.style.color = "#b71c1c";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "transparent";
//             e.target.style.color = "#f9b233";
//           }}
//         >
//           <FaSignOutAlt className="fs-5" />
//         </Button>

//         {/* Profile Popup Card */}
//         {showProfile && (
//           <Card
//             className="position-absolute shadow-lg"
//             style={{
//               top: "90px",
//               right: "10px",
//               width: "250px",
//               zIndex: 2000,
//               border: "none",
//               borderRadius: "15px",
//             }}
//           >
//             <Card.Body className="text-center">
//               <FaUserCog className="text-danger fs-1 mb-2" />
//               <h6 className="fw-bold">Admin User</h6>
//               <p className="text-muted" style={{ fontSize: "14px" }}>
//                 admin@example.com
//               </p>
//               <Button
//                 variant="outline-danger"
//                 size="sm"
//                 onClick={onLogout}
//                 className="mt-2"
//               >
//                 Logout
//               </Button>
//             </Card.Body>
//           </Card>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavbarTop;








// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaUserCog, FaSignOutAlt, FaBars } from "react-icons/fa";
// import { Button, Card } from "react-bootstrap";
// import fullyLoadedHouseLogo from "../assets/fully-loaded-house-logo.png.png";

// const NavbarTop = ({ onLogout, toggleSidebar }) => {
//   const [showProfile, setShowProfile] = useState(false);

//   return (
//     <nav
//       className="navbar navbar-dark px-4 d-flex justify-content-between align-items-center shadow-sm"
//       style={{
//         height: "85px",
//         width: "100%",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 1000,
//         backgroundColor: "#b71c1c",
//       }}
//     >
//       <div className="d-flex align-items-center">
//         <Button
//           variant="light"
//           size="sm"
//           className="me-3 d-flex align-items-center justify-content-center"
//           style={{ width: "40px", height: "40px" }}
//           onClick={toggleSidebar}
//         >
//           <FaBars />
//         </Button>
//         <img src={fullyLoadedHouseLogo} alt="Fully Loaded House Logo" style={{ height: "70px", objectFit: "contain" }} />
//       </div>

//       <div className="d-flex align-items-center position-relative">
//         <span className="fw-bold text-white me-3" style={{ fontSize: "1.2rem" }}>
//           <small>Welcome,</small> <span style={{ fontWeight: "800" }}>Admin</span>
//         </span>

//         <Button
//           variant="light"
//           size="sm"
//           className="me-2 d-flex align-items-center justify-content-center"
//           onClick={() => setShowProfile(!showProfile)}
//         >
//           <FaUserCog />
//         </Button>

//         <Button variant="light" size="sm" className="d-flex align-items-center justify-content-center" onClick={onLogout}>
//           <FaSignOutAlt />
//         </Button>

//         {showProfile && (
//           <Card className="position-absolute shadow-lg" style={{ top: "90px", right: "10px", width: "250px", zIndex: 2000, border: "none", borderRadius: "15px" }}>
//             <Card.Body className="text-center">
//               <FaUserCog className="text-danger fs-1 mb-2" />
//               <h6 className="fw-bold">Admin User</h6>
//               <p className="text-muted" style={{ fontSize: "14px" }}>
//                 admin@example.com
//               </p>
//               <Button variant="outline-danger" size="sm" onClick={onLogout} className="mt-2">
//                 Logout
//               </Button>
//             </Card.Body>
//           </Card>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavbarTop;





// src/components/NavbarTop.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import fullyLoadedHouseLogo from "../assets/fully-loaded-house-logo.png.png";

const NavbarTop = ({ onLogout, toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav
      className="navbar px-3 px-md-4 d-flex align-items-center shadow-sm"
      style={{
        minHeight: "70px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#b71c1c",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {/* Left: Toggle + Logo */}
      <div className="d-flex align-items-center flex-shrink-0">
        <Button
          variant="light"
          size="sm"
          className="me-2 d-flex align-items-center justify-content-center"
          style={{
            width: "38px",
            height: "38px",
            padding: 0,
          }}
          onClick={toggleSidebar}
        >
          <FaBars color="orange" size={18} />
        </Button>
        <img
          src={fullyLoadedHouseLogo}
          alt="Fully Loaded House Logo"
          className="img-fluid"
          style={{ height: "55px", maxWidth: "150px", objectFit: "contain" }}
        />
      </div>

      {/* Right: Welcome + Buttons */}
      <div className="d-flex align-items-center ms-auto flex-wrap gap-1 position-relative">
        {/* Welcome Text - Hidden on very small screens */}
        <span
          className="fw-bold text-white d-none d-sm-inline"
          style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
        >
          <small>Welcome,</small>{" "}
          <span style={{ fontWeight: "800", color: "orange" }}>Admin</span>
        </span>

        {/* Mobile Welcome (smaller) */}
        <span
          className="fw-bold text-white d-inline d-sm-none"
          style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}
        >
          Hi, <span style={{ color: "orange" }}>Admin</span>
        </span>

        {/* Profile Button */}
        <Button
          variant="light"
          size="sm"
          className="d-flex align-items-center justify-content-center"
          style={{ width: "36px", height: "36px", padding: 0 }}
          onClick={() => setShowProfile(!showProfile)}
        >
          <FaUserCog color="orange" size={16} />
        </Button>

        {/* Logout Button */}
        <Button
          variant="light"
          size="sm"
          className="d-flex align-items-center justify-content-center"
          style={{ width: "36px", height: "36px", padding: 0 }}
          onClick={onLogout}
        >
          <FaSignOutAlt color="orange" size={16} />
        </Button>

        {/* Profile Dropdown Card */}
        {showProfile && (
          <Card
            className="position-absolute shadow-lg border-0"
            style={{
              top: "100%",
              right: 0,
              width: "220px",
              marginTop: "8px",
              borderRadius: "12px",
              zIndex: 2000,
            }}
          >
            <Card.Body className="text-center py-3">
              <FaUserCog className="mb-2" style={{ color: "orange" }} size={32} />
              <h6 className="fw-bold mb-1">Admin User</h6>
              <p className="text-muted small mb-2">admin@example.com</p>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={onLogout}
                className="w-100"
              >
                Logout
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </nav>
  );
};

export default NavbarTop;