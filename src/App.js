

// // // // src/App.js
// // // import React, { useState } from "react";
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // // import Login from "./components/Login";
// // // import Sidebar from "./components/Sidebar";
// // // import NavbarTop from "./components/NavbarTop";
// // // import Dashboard from "./components/Dashboard";
// // // import Schemes from "./components/Schemes";
// // // import EarnCashbacks from "./components/EarnCashbacks";
// // // import LuckyDraws from "./components/LuckyDraws";
// // // import Users from "./components/Users";
// // // import AdminForm from "./components/AdminForm";
// // // import AdminUsers from "./components/AdminUsers";
// // // import PermissionsTab from "./components/PermissionsTab";
// // // import Groups from "./components/Groups";
// // // import Banners from "./components/Banners"; // ✅ NEW Import
// // // import Products from "./components/Products";
// // // import ProductCategories from "./components/ProductCategories";
// // // import Orders from "./components/Orders";
// // // import OrderDetails from './components/OrderDetails';



// // // function App() {
// // //   const [isLoggedIn, setIsLoggedIn] = useState(true);
// // //   const [page, setPage] = useState("Dashboard");

// // //   const SIDEBAR_WIDTH = 250;
// // //   const NAVBAR_HEIGHT = 85;

// // //   const handleLogout = () => {
// // //     setIsLoggedIn(false);
// // //   };

// // //   if (!isLoggedIn) {
// // //     return <Login onLogin={setIsLoggedIn} />;
// // //   }

// // //   return (
// // //     <Router>
// // //       {/* ✅ Top Navbar */}
// // //       <NavbarTop onLogout={handleLogout} />

// // //       <div className="d-flex" style={{ backgroundColor: "#f8f9fa" }}>
// // //         {/* ✅ Sidebar */}
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: NAVBAR_HEIGHT,
// // //             left: 0,
// // //             width: SIDEBAR_WIDTH,
// // //             height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
// // //             backgroundColor: "#f5901d",
// // //             overflowY: "auto",
// // //             boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
// // //             zIndex: 100,
// // //           }}
// // //         >
// // //           <Sidebar />
// // //         </div>

// // //         {/* ✅ Main Content */}
// // //         <div
// // //           style={{
// // //             marginLeft: SIDEBAR_WIDTH,
// // //             marginTop: NAVBAR_HEIGHT,
// // //             padding: "30px",
// // //             width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
// // //             minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
// // //             backgroundColor: "#f8f9fa",
// // //             overflowY: "auto",
// // //           }}
// // //         >
// // //           <Routes>
// // //             <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // //             <Route path="/dashboard" element={<Dashboard />} />
// // //             <Route path="/schemes" element={<Schemes />} />
// // //             <Route path="/earn-cashbacks" element={<EarnCashbacks />} />
// // //             <Route path="/lucky-draws" element={<LuckyDraws />} />
// // //             <Route path="/users" element={<Users />} />
// // //             <Route path="/admin-form" element={<AdminForm />} />
// // //             <Route path="/admin/users" element={<AdminUsers />} />
// // //             <Route path="/admin/permissions" element={<PermissionsTab />} />
// // //             <Route path="/admin/groups" element={<Groups />} />
// // //             <Route path="/banners" element={<Banners />} /> {/* ✅ NEW ROUTE */}
// // //             <Route path="/products" element={<Products />} />
// // //             <Route path="/product-categories" element={<ProductCategories />} />
// // //             {/* Fallback */}
// // //             <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
// // //             <Route path="/orders" element={<Orders />} />
// // //             <Route path="/order-details/:id" element={<OrderDetails />} />
            

// // //           </Routes>
// // //         </div>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;













// // src/App.js
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Sidebar from "./components/Sidebar";
// import NavbarTop from "./components/NavbarTop";
// import Dashboard from "./components/Dashboard";
// import Schemes from "./components/Schemes";
// import EarnCashbacks from "./components/EarnCashbacks";
// import LuckyDraws from "./components/LuckyDraws";
// import Users from "./components/Users";
// import AdminForm from "./components/AdminForm";
// import AdminUsers from "./components/AdminUsers";
// import PermissionsTab from "./components/PermissionsTab";
// import Groups from "./components/Groups";
// import Banners from "./components/Banners";
// import Products from "./components/Products";
// import ProductCategories from "./components/ProductCategories";
// import Orders from "./components/Orders";
// import OrderDetails from "./components/OrderDetails";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const SIDEBAR_WIDTH = 250;
//   const NAVBAR_HEIGHT = 85;

//   const handleLogout = () => setIsLoggedIn(false);
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);

//     // Collapse sidebar automatically on small screens
//     if (windowWidth < 768) setSidebarOpen(false);
//     else setSidebarOpen(true);

//     return () => window.removeEventListener("resize", handleResize);
//   }, [windowWidth]);

//   if (!isLoggedIn) return <Login onLogin={setIsLoggedIn} />;

//   return (
//     <Router>
//       {/* Navbar with toggle */}
//       <NavbarTop onLogout={handleLogout} toggleSidebar={toggleSidebar} />

//       <div className="d-flex" style={{ backgroundColor: "#f8f9fa" }}>
//         {/* Sidebar */}
//         <div
//           style={{
//             position: "fixed",
//             top: NAVBAR_HEIGHT,
//             left: sidebarOpen ? 0 : `-${SIDEBAR_WIDTH}px`,
//             width: SIDEBAR_WIDTH,
//             height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
//             backgroundColor: "#f5901d",
//             overflowY: "auto",
//             boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
//             zIndex: 1000,
//             transition: "left 0.3s ease",
//           }}
//         >
//           <Sidebar sidebarOpen={sidebarOpen} />
//         </div>

//         {/* Overlay for mobile when sidebar is open */}
//         {sidebarOpen && windowWidth < 768 && (
//           <div
//             onClick={toggleSidebar}
//             style={{
//               position: "fixed",
//               top: NAVBAR_HEIGHT,
//               left: 0,
//               width: "100%",
//               height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
//               backgroundColor: "rgba(0,0,0,0.3)",
//               zIndex: 999,
//             }}
//           />
//         )}

//         {/* Main content */}
//         <div
//           style={{
//             marginLeft: sidebarOpen && windowWidth >= 768 ? SIDEBAR_WIDTH : 0,
//             marginTop: NAVBAR_HEIGHT,
//             padding: "30px",
//             width: "100%",
//             minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
//             transition: "margin-left 0.3s ease",
//             overflowY: "auto",
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/schemes" element={<Schemes />} />
//             <Route path="/earn-cashbacks" element={<EarnCashbacks />} />
//             <Route path="/lucky-draws" element={<LuckyDraws />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/admin-form" element={<AdminForm />} />
//             <Route path="/admin/users" element={<AdminUsers />} />
//             <Route path="/admin/permissions" element={<PermissionsTab />} />
//             <Route path="/admin/groups" element={<Groups />} />
//             <Route path="/banners" element={<Banners />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/product-categories" element={<ProductCategories />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/order-details/:id" element={<OrderDetails />} />
//             <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;









// // src/App.js
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Sidebar from "./components/Sidebar";
// import NavbarTop from "./components/NavbarTop";
// import Dashboard from "./components/Dashboard";
// import ConfigurationPage from "./components/ConfigurationPage";
// import Schemes from "./components/Schemes";
// import EarnCashbacks from "./components/EarnCashbacks";
// import Categories from "./components/Categories";
// import LuckyDraws from "./components/LuckyDraws";
// import Users from "./components/Users";
// import AdminForm from "./components/AdminForm";
// import AdminUsers from "./components/AdminUsers";
// import PermissionsTab from "./components/PermissionsTab";
// import Groups from "./components/Groups";
// import Banners from "./components/Banners";
// import Products from "./components/Products";
// import ProductCategories from "./components/ProductCategories";
// import Orders from "./components/Orders";
// import OrderDetails from "./components/OrderDetails";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const SIDEBAR_WIDTH = 260; // Increased width
//   const NAVBAR_HEIGHT = 85;

//   const handleLogout = () => setIsLoggedIn(false);
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   // Automatically close sidebar on mobile when selecting a page
//   const handlePageSelect = () => {
//     if (windowWidth < 768) setSidebarOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);

//     if (windowWidth < 768) setSidebarOpen(false);
//     else setSidebarOpen(true);

//     return () => window.removeEventListener("resize", handleResize);
//   }, [windowWidth]);

//   if (!isLoggedIn) return <Login onLogin={setIsLoggedIn} />;

//   return (
//     <Router>
//       <NavbarTop onLogout={handleLogout} toggleSidebar={toggleSidebar} />

//       <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
//         {/* Sidebar */}
//         <div
//           style={{
//             position: "fixed",
//             top: NAVBAR_HEIGHT,
//             left: sidebarOpen ? 0 : `-${SIDEBAR_WIDTH}px`,
//             width: SIDEBAR_WIDTH,
//             height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
//             backgroundColor: "#f5901d",
//             overflowY: "hidden", // Removed vertical scroll
//             boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
//             zIndex: 1000,
//             transition: "left 0.3s ease",
//           }}
//         >
//           <Sidebar sidebarOpen={sidebarOpen} onSelect={handlePageSelect} />
//         </div>

//         {/* Overlay for mobile */}
//         {sidebarOpen && windowWidth < 768 && (
//           <div
//             onClick={toggleSidebar}
//             style={{
//               position: "fixed",
//               top: NAVBAR_HEIGHT,
//               left: 0,
//               width: "100%",
//               height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
//               backgroundColor: "rgba(0,0,0,0.3)",
//               zIndex: 999,
//             }}
//           />
//         )}

//         {/* Main content */}
//         <div
//           style={{
//             marginLeft: sidebarOpen && windowWidth >= 768 ? SIDEBAR_WIDTH : 0,
//             marginTop: NAVBAR_HEIGHT,
//             padding: "30px",
//             width: "100%",
//             minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
//             transition: "margin-left 0.3s ease",
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/configuration" element={<ConfigurationPage />} />

//             <Route path="/schemes" element={<Schemes />} />
//             <Route path="/earn-cashbacks" element={<EarnCashbacks />} />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/lucky-draws" element={<LuckyDraws />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/admin-form" element={<AdminForm />} />
//             <Route path="/admin/users" element={<AdminUsers />} />
//             <Route path="/admin/permissions" element={<PermissionsTab />} />
//             <Route path="/admin/groups" element={<Groups />} />
//             <Route path="/banners" element={<Banners />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/product-categories" element={<ProductCategories />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/order-details/:id" element={<OrderDetails />} />
//             <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;





// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import NavbarTop from "./components/NavbarTop";
import Dashboard from "./components/Dashboard";
import ConfigurationPage from "./components/ConfigurationPage";
import Schemes from "./components/Schemes";
import EarnCashbacks from "./components/EarnCashbacks";
import Categories from "./components/Categories";
import LuckyDraws from "./components/LuckyDraws";
import Users from "./components/Users";
import AdminForm from "./components/AdminForm";
import AdminUsers from "./components/AdminUsers";
import PermissionsTab from "./components/PermissionsTab";
import Groups from "./components/Groups";
import Banners from "./components/Banners";
import Products from "./components/Products";
import ProductCategories from "./components/ProductCategories";
import Orders from "./components/Orders";
import OrderDetails from "./components/OrderDetails";
import Subscriptions from "./components/Subscriptions";
import Customers from "./components/Customers";
import Agents from "./components/Agents";
import Vendors from "./components/Vendors";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const SIDEBAR_WIDTH = 250;
  const NAVBAR_HEIGHT = 85;

  const handleLogout = () => setIsLoggedIn(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePageSelect = () => {
    if (windowWidth < 768) setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (windowWidth < 768) setSidebarOpen(false);
    else setSidebarOpen(true);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  if (!isLoggedIn) return <Login onLogin={setIsLoggedIn} />;

  return (
    <Router>
      <NavbarTop onLogout={handleLogout} toggleSidebar={toggleSidebar} />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Sidebar */}
     <div
  style={{
    position: "fixed",
    top: NAVBAR_HEIGHT,
    left: sidebarOpen ? 0 : `-${SIDEBAR_WIDTH}px`,
    width: SIDEBAR_WIDTH,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    backgroundColor: "#f5901d",
    overflowY: "scroll",   // always show vertical scrollbar
    overflowX: "hidden",   // hide horizontal scroll
    boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
    zIndex: 1000,
    transition: "left 0.3s ease",
  }}
>
  <Sidebar sidebarOpen={sidebarOpen} onSelect={handlePageSelect} />
</div>

        {/* Overlay for mobile */}
        {sidebarOpen && windowWidth < 768 && (
          <div
            onClick={toggleSidebar}
            style={{
              position: "fixed",
              top: NAVBAR_HEIGHT,
              left: 0,
              width: "100%",
              height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 999,
            }}
          />
        )}

        {/* Main content */}
        <div
          style={{
            marginLeft: sidebarOpen && windowWidth >= 768 ? SIDEBAR_WIDTH : 0,
            marginTop: NAVBAR_HEIGHT,
            padding: "30px",
            width: "100%",
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Configuration */}
            <Route path="/configuration" element={<ConfigurationPage />} />

            {/* Other main pages */}
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/earn-cashbacks" element={<EarnCashbacks />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/lucky-draws" element={<LuckyDraws />} />

            {/* Users & Subpages */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/customers" element={<Customers />} />
            <Route path="/users/agents" element={<Agents />} />
            <Route path="/users/vendors" element={<Vendors />} />

            {/* Admin */}
            <Route path="/admin-form" element={<AdminForm />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/permissions" element={<PermissionsTab />} />
            <Route path="/admin/groups" element={<Groups />} />

            {/* Others */}
            <Route path="/banners" element={<Banners />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-categories" element={<ProductCategories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />

            {/* 404 fallback */}
            <Route
              path="*"
              element={<div style={{ padding: 24 }}>Page not found</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
