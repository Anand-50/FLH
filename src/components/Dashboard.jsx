












// // normal



// // import React from "react";
// // import { Card, Row, Col } from "react-bootstrap";
// // import {
// //   FaUsers,
// //   FaUserCheck,
// //   FaUserTimes,
// //   FaUserTie,
// //   FaGift,
// //   FaChartLine,
// //   FaTrophy,
// //   FaCoins,
// //   FaStore,
// //   FaUserSecret,
// //   FaCogs,
// // } from "react-icons/fa";
// // import { Bar, Line, Doughnut, PolarArea, Radar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   ArcElement,
// //   PointElement,
// //   LineElement,
// //   RadialLinearScale,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import "./Dashboard.css";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   ArcElement,
// //   PointElement,
// //   LineElement,
// //   RadialLinearScale,
// //   Tooltip,
// //   Legend
// // );

// // const Dashboard = () => {
// //   // Chart Data
// //   const revenueExpenseData = {
// //     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
// //     datasets: [
// //       { label: "Revenue", data: [500, 700, 800, 650, 900], backgroundColor: "#4e73df" },
// //       { label: "Expenses", data: [400, 500, 600, 450, 700], backgroundColor: "#e74a3b" },
// //     ],
// //   };

// //   const userActivityData = {
// //     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
// //     datasets: [
// //       {
// //         label: "Active Users",
// //         data: [300, 500, 400, 700, 600, 800],
// //         borderColor: "#1cc88a",
// //         fill: true,
// //         tension: 0.4,
// //       },
// //     ],
// //   };

// //   const userStatusData = {
// //     labels: ["Active", "Inactive", "Pending"],
// //     datasets: [
// //       {
// //         data: [70, 20, 10],
// //         backgroundColor: ["#1cc88a", "#e74a3b", "#f6c23e"],
// //       },
// //     ],
// //   };

// //   const subscriptionData = {
// //     labels: ["Free", "Basic", "Premium"],
// //     datasets: [
// //       {
// //         data: [30, 45, 25],
// //         backgroundColor: ["#36b9cc", "#4e73df", "#f6c23e"],
// //       },
// //     ],
// //   };

// //   const regionalData = {
// //     labels: ["North", "South", "East", "West"],
// //     datasets: [
// //       {
// //         data: [11, 16, 7, 14],
// //         backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
// //       },
// //     ],
// //   };

// //   const performanceData = {
// //     labels: ["Performance", "Sales", "Engagement", "Growth", "Support"],
// //     datasets: [
// //       {
// //         label: "2025",
// //         data: [80, 90, 70, 85, 75],
// //         borderColor: "#4e73df",
// //         backgroundColor: "rgba(78,115,223,0.3)",
// //       },
// //     ],
// //   };

// //   const productSalesData = {
// //     labels: ["Laptop", "Phone", "Accessories", "Software", "Parts"],
// //     datasets: [
// //       {
// //         label: "Sales",
// //         data: [300, 400, 250, 500, 350],
// //         backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"],
// //       },
// //     ],
// //   };

// //   // ============ RETURN UI ============
// //   return (
// //     <div className="dashboard-wrapper">
// //       <h2 className="fw-bold mb-4 text-primary text-center">📊 Admin Dashboard</h2>

// //       {/* ================= USERS INFO ================= */}
// //       <h4 className="fw-bold mb-3 text-secondary">👤 Users Info</h4>
// //       <Row className="g-4 mb-4">
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUsers size={40} className="text-primary mb-2" />
// //             <h6>Total Users</h6>
// //             <h3 className="fw-bold">12,500</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserCheck size={40} className="text-success mb-2" />
// //             <h6>Active Users</h6>
// //             <h3 className="fw-bold">8,750</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserTimes size={40} className="text-danger mb-2" />
// //             <h6>Inactive Users</h6>
// //             <h3 className="fw-bold">3,750</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaGift size={40} className="text-warning mb-2" />
// //             <h6>Ongoing Offers</h6>
// //             <h3 className="fw-bold">14</h3>
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Row className="g-4 mb-5">
// //         <Col lg={6}>
// //           <Card className="chart-card">
// //             <h6 className="fw-bold mb-3 text-secondary">📈 User Activity Over Time</h6>
// //             <Line data={userActivityData} />
// //           </Card>
// //         </Col>
// //         <Col lg={6}>
// //           <Card className="chart-card">
// //             <h6 className="fw-bold mb-3 text-secondary">📊 User Status Breakdown</h6>
// //             <Doughnut data={userStatusData} />
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* ================= AGENTS INFO ================= */}
// //       <h4 className="fw-bold mb-3 text-secondary">🕵️ Agents Info</h4>
// //       <Row className="g-4 mb-4">
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserSecret size={40} className="text-info mb-2" />
// //             <h6>Total Agents</h6>
// //             <h3 className="fw-bold">1,240</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserCheck size={40} className="text-success mb-2" />
// //             <h6>Active Agents</h6>
// //             <h3 className="fw-bold">980</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserTimes size={40} className="text-danger mb-2" />
// //             <h6>Inactive Agents</h6>
// //             <h3 className="fw-bold">260</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaCogs size={40} className="text-warning mb-2" />
// //             <h6>Tasks Assigned</h6>
// //             <h3 className="fw-bold">72</h3>
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Row className="g-4 mb-5">
// //         <Col lg={6}>
// //           <Card className="chart-card text-center">
// //             <h6 className="fw-bold mb-3 text-secondary">🪙 Agent Subscriptions</h6>
// //             <Doughnut data={subscriptionData} />
// //           </Card>
// //         </Col>
// //         <Col lg={6}>
// //           <Card className="chart-card text-center">
// //             <h6 className="fw-bold mb-3 text-secondary">🌍 Regional Distribution</h6>
// //             <PolarArea data={regionalData} />
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Row className="g-4 mb-5">
// //         <Col lg={12}>
// //           <Card className="chart-card text-center">
// //             <h6 className="fw-bold mb-3 text-secondary">🏆 Team Performance</h6>
// //             <Radar data={performanceData} />
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* ================= VENDORS INFO ================= */}
// //       <h4 className="fw-bold mb-3 text-secondary">🏬 Vendors Info</h4>
// //       <Row className="g-4 mb-4">
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaStore size={40} className="text-primary mb-2" />
// //             <h6>Total Vendors</h6>
// //             <h3 className="fw-bold">560</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserCheck size={40} className="text-success mb-2" />
// //             <h6>Active Vendors</h6>
// //             <h3 className="fw-bold">450</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaUserTimes size={40} className="text-danger mb-2" />
// //             <h6>Inactive Vendors</h6>
// //             <h3 className="fw-bold">110</h3>
// //           </Card>
// //         </Col>
// //         <Col lg={3} md={6}>
// //           <Card className="stat-card text-center">
// //             <FaGift size={40} className="text-warning mb-2" />
// //             <h6>Current Deals</h6>
// //             <h3 className="fw-bold">28</h3>
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Row className="g-4 mb-5">
// //         <Col lg={6}>
// //           <Card className="chart-card">
// //             <h6 className="fw-bold mb-3 text-secondary">🛒 Product Sales</h6>
// //             <Bar data={productSalesData} />
// //           </Card>
// //         </Col>
// //         <Col lg={6}>
// //           <Card className="chart-card">
// //             <h6 className="fw-bold mb-3 text-secondary">💰 Revenue vs Expenses</h6>
// //             <Bar data={revenueExpenseData} />
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* ================= TOTAL WINNERS ================= */}
// //       <h4 className="fw-bold mb-3 text-secondary">🏅 Total Winners</h4>
// //       <div className="text-center mt-4 mb-5">
// //         <div className="card summary-card mx-auto p-4 shadow-sm">
// //           <FaTrophy size={48} color="#f39c12" className="mb-3" />
// //           <h5 className="text-secondary">Top Contest Winners</h5>
// //           <h3 className="fw-bold text-success">345</h3>
// //           <p className="text-muted mb-0">Congratulations to all our achievers!</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;




// // collapsible sections

// import React, { useState } from "react";
// import { Card, Row, Col, Collapse } from "react-bootstrap";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaUserTie,
//   FaGift,
//   FaChartLine,
//   FaTrophy,
//   FaCoins,
//   FaStore,
//   FaUserSecret,
//   FaCogs,
//   FaChevronDown,
//   FaChevronUp,
// } from "react-icons/fa";
// import { Bar, Line, Doughnut, PolarArea, Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   PointElement,
//   LineElement,
//   RadialLinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./Dashboard.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   PointElement,
//   LineElement,
//   RadialLinearScale,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   // Collapsible state
//   const [openUsers, setOpenUsers] = useState(true);
//   const [openAgents, setOpenAgents] = useState(true);
//   const [openVendors, setOpenVendors] = useState(true);
//   const [openWinners, setOpenWinners] = useState(true);

//   // Chart Data
//   const revenueExpenseData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       { label: "Revenue", data: [500, 700, 800, 650, 900], backgroundColor: "#4e73df" },
//       { label: "Expenses", data: [400, 500, 600, 450, 700], backgroundColor: "#e74a3b" },
//     ],
//   };

//   const userActivityData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     datasets: [
//       {
//         label: "Active Users",
//         data: [300, 500, 400, 700, 600, 800],
//         borderColor: "#1cc88a",
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const userStatusData = {
//     labels: ["Active", "Inactive", "Pending"],
//     datasets: [
//       {
//         data: [70, 20, 10],
//         backgroundColor: ["#1cc88a", "#e74a3b", "#f6c23e"],
//       },
//     ],
//   };

//   const subscriptionData = {
//     labels: ["Free", "Basic", "Premium"],
//     datasets: [
//       {
//         data: [30, 45, 25],
//         backgroundColor: ["#36b9cc", "#4e73df", "#f6c23e"],
//       },
//     ],
//   };

//   const regionalData = {
//     labels: ["North", "South", "East", "West"],
//     datasets: [
//       {
//         data: [11, 16, 7, 14],
//         backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
//       },
//     ],
//   };

//   const performanceData = {
//     labels: ["Performance", "Sales", "Engagement", "Growth", "Support"],
//     datasets: [
//       {
//         label: "2025",
//         data: [80, 90, 70, 85, 75],
//         borderColor: "#4e73df",
//         backgroundColor: "rgba(78,115,223,0.3)",
//       },
//     ],
//   };

//   const productSalesData = {
//     labels: ["Laptop", "Phone", "Accessories", "Software", "Parts"],
//     datasets: [
//       {
//         label: "Sales",
//         data: [300, 400, 250, 500, 350],
//         backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <h2 className="fw-bold mb-4 text-primary text-center">📊 Admin Dashboard</h2>

//       {/* ================= USERS INFO ================= */}
//       <div
//         className="section-header d-flex justify-content-between align-items-center mb-3"
//         style={{ cursor: "pointer" }}
//         onClick={() => setOpenUsers(!openUsers)}
//       >
//         <h4 className="fw-bold text-secondary">👤 Users Info</h4>
//         {openUsers ? <FaChevronUp /> : <FaChevronDown />}
//       </div>

//       <Collapse in={openUsers}>
//         <div>
//           <Row className="g-4 mb-4">
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUsers size={40} className="text-primary mb-2" />
//                 <h6>Total Users</h6>
//                 <h3 className="fw-bold">12,500</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserCheck size={40} className="text-success mb-2" />
//                 <h6>Active Users</h6>
//                 <h3 className="fw-bold">8,750</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserTimes size={40} className="text-danger mb-2" />
//                 <h6>Inactive Users</h6>
//                 <h3 className="fw-bold">3,750</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaGift size={40} className="text-warning mb-2" />
//                 <h6>Ongoing Offers</h6>
//                 <h3 className="fw-bold">14</h3>
//               </Card>
//             </Col>
//           </Row>

//           <Row className="g-4 mb-5">
//             <Col lg={6}>
//               <Card className="chart-card">
//                 <h6 className="fw-bold mb-3 text-secondary">📈 User Activity Over Time</h6>
//                 <Line data={userActivityData} />
//               </Card>
//             </Col>
//             <Col lg={6}>
//               <Card className="chart-card">
//                 <h6 className="fw-bold mb-3 text-secondary">📊 User Status Breakdown</h6>
//                 <Doughnut data={userStatusData} />
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </Collapse>

//       {/* ================= AGENTS INFO ================= */}
//       <div
//         className="section-header d-flex justify-content-between align-items-center mb-3"
//         style={{ cursor: "pointer" }}
//         onClick={() => setOpenAgents(!openAgents)}
//       >
//         <h4 className="fw-bold text-secondary">🕵️ Agents Info</h4>
//         {openAgents ? <FaChevronUp /> : <FaChevronDown />}
//       </div>

//       <Collapse in={openAgents}>
//         <div>
//           <Row className="g-4 mb-4">
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserSecret size={40} className="text-info mb-2" />
//                 <h6>Total Agents</h6>
//                 <h3 className="fw-bold">1,240</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserCheck size={40} className="text-success mb-2" />
//                 <h6>Active Agents</h6>
//                 <h3 className="fw-bold">980</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserTimes size={40} className="text-danger mb-2" />
//                 <h6>Inactive Agents</h6>
//                 <h3 className="fw-bold">260</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaCogs size={40} className="text-warning mb-2" />
//                 <h6>Tasks Assigned</h6>
//                 <h3 className="fw-bold">72</h3>
//               </Card>
//             </Col>
//           </Row>

//           <Row className="g-4 mb-5">
//             <Col lg={6}>
//               <Card className="chart-card text-center">
//                 <h6 className="fw-bold mb-3 text-secondary">🪙 Agent Subscriptions</h6>
//                 <Doughnut data={subscriptionData} />
//               </Card>
//             </Col>
//             <Col lg={6}>
//               <Card className="chart-card text-center">
//                 <h6 className="fw-bold mb-3 text-secondary">🌍 Regional Distribution</h6>
//                 <PolarArea data={regionalData} />
//               </Card>
//             </Col>
//           </Row>

//           <Row className="g-4 mb-5">
//             <Col lg={12}>
//               <Card className="chart-card text-center">
//                 <h6 className="fw-bold mb-3 text-secondary">🏆 Team Performance</h6>
//                 <Radar data={performanceData} />
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </Collapse>

//       {/* ================= VENDORS INFO ================= */}
//       <div
//         className="section-header d-flex justify-content-between align-items-center mb-3"
//         style={{ cursor: "pointer" }}
//         onClick={() => setOpenVendors(!openVendors)}
//       >
//         <h4 className="fw-bold text-secondary">🏬 Vendors Info</h4>
//         {openVendors ? <FaChevronUp /> : <FaChevronDown />}
//       </div>

//       <Collapse in={openVendors}>
//         <div>
//           <Row className="g-4 mb-4">
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaStore size={40} className="text-primary mb-2" />
//                 <h6>Total Vendors</h6>
//                 <h3 className="fw-bold">560</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserCheck size={40} className="text-success mb-2" />
//                 <h6>Active Vendors</h6>
//                 <h3 className="fw-bold">450</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaUserTimes size={40} className="text-danger mb-2" />
//                 <h6>Inactive Vendors</h6>
//                 <h3 className="fw-bold">110</h3>
//               </Card>
//             </Col>
//             <Col lg={3} md={6}>
//               <Card className="stat-card text-center">
//                 <FaGift size={40} className="text-warning mb-2" />
//                 <h6>Current Deals</h6>
//                 <h3 className="fw-bold">28</h3>
//               </Card>
//             </Col>
//           </Row>

//           <Row className="g-4 mb-5">
//             <Col lg={6}>
//               <Card className="chart-card">
//                 <h6 className="fw-bold mb-3 text-secondary">🛒 Product Sales</h6>
//                 <Bar data={productSalesData} />
//               </Card>
//             </Col>
//             <Col lg={6}>
//               <Card className="chart-card">
//                 <h6 className="fw-bold mb-3 text-secondary">💰 Revenue vs Expenses</h6>
//                 <Bar data={revenueExpenseData} />
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </Collapse>

//       {/* ================= WINNERS ================= */}
//       <div
//         className="section-header d-flex justify-content-between align-items-center mb-3"
//         style={{ cursor: "pointer" }}
//         onClick={() => setOpenWinners(!openWinners)}
//       >
//         <h4 className="fw-bold text-secondary">🏅 Total Winners</h4>
//         {openWinners ? <FaChevronUp /> : <FaChevronDown />}
//       </div>

//       <Collapse in={openWinners}>
//         <div>
//           <div className="text-center mt-4 mb-5">
//             <div className="card summary-card mx-auto p-4 shadow-sm">
//               <FaTrophy size={48} color="#f39c12" className="mb-3" />
//               <h5 className="text-secondary">Top Contest Winners</h5>
//               <h3 className="fw-bold text-success">345</h3>
//               <p className="text-muted mb-0">Congratulations to all our achievers!</p>
//             </div>
//           </div>
//         </div>
//       </Collapse>
//     </div>
//   );
// };

// export default Dashboard;








import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaStore,
  FaGift,
  FaTrophy,
  FaUserTie,
  FaChartLine,
  FaCogs,
  FaBuilding,
} from "react-icons/fa";
import {
  Bar,
  Line,
  Doughnut,
  PolarArea,
  Radar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // ======== User Section Data ========
  const userActivity = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Active Users",
        data: [300, 500, 400, 700, 600, 800],
        borderColor: "#1cc88a",
        backgroundColor: "rgba(28,200,138,0.2)",
        tension: 0.4,
      },
    ],
  };

  const userStatus = {
    labels: ["Active", "Inactive", "Banned"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#36b9cc", "#f6c23e", "#e74a3b"],
      },
    ],
  };

  // ======== Agents Section Data ========
  const agentBar = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Agents",
        backgroundColor: "#4CAF50",
        data: [120, 190, 300, 250, 220, 300],
      },
      {
        label: "Inactive Agents",
        backgroundColor: "#F44336",
        data: [50, 80, 120, 90, 70, 110],
      },
    ],
  };

  const agentPolar = {
    labels: ["North", "South", "East", "West"],
    datasets: [
      {
        data: [11, 16, 7, 14],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
      },
    ],
  };

  const agentRadar = {
    labels: ["Performance", "Sales", "Engagement", "Growth", "Support"],
    datasets: [
      {
        label: "Team A",
        data: [80, 90, 70, 85, 75],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78,115,223,0.3)",
      },
      {
        label: "Team B",
        data: [60, 70, 65, 80, 68],
        borderColor: "#e74a3b",
        backgroundColor: "rgba(231,74,59,0.2)",
      },
    ],
  };

  // ======== Vendors Section Data ========
  const vendorSales = {
    labels: ["Electronics", "Fashion", "Home", "Grocery", "Toys"],
    datasets: [
      {
        label: "Sales (in K)",
        backgroundColor: "#4e73df",
        data: [400, 300, 200, 350, 250],
      },
    ],
  };

  const vendorRevenue = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 700, 800, 650, 900],
        backgroundColor: "#4e73df",
      },
      {
        label: "Expenses",
        data: [400, 500, 600, 450, 700],
        backgroundColor: "#e74a3b",
      },
    ],
  };

  return (
   <div className="dashboard-wrapper">
  <h1
    className="fw-bold mb-4 text-center"
    style={{ color: "#991925" }}
  >
    📊 Admin Dashboard
  </h1>


    
      {/* ================= USERS SECTION ================= */}
      <h4 className="fw-bold text-secondary mt-3 mb-3">👥 Users Overview</h4>
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUsers size={40} className="text-primary mb-2" />
            <h6>Total Users</h6>
            <h3 className="fw-bold">12,500</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserCheck size={40} className="text-success mb-2" />
            <h6>Active Users</h6>
            <h3 className="fw-bold">8,750</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserTimes size={40} className="text-danger mb-2" />
            <h6>Inactive Users</h6>
            <h3 className="fw-bold">3,750</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaGift size={40} className="text-warning mb-2" />
            <h6>Ongoing Offers</h6>
            <h3 className="fw-bold">14</h3>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col lg={6}>
          <Card className="chart-card">
            <h6 className="fw-bold mb-2 text-secondary text-center">
              User Activity Over Time
            </h6>
            <div style={{ height: "220px" }}>
              <Line data={userActivity} />
            </div>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="chart-card">
            <h6 className="fw-bold mb-2 text-secondary text-center">
              User Status Breakdown
            </h6>
            <div style={{ height: "220px" }}>
              <Doughnut data={userStatus} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* ================= AGENTS SECTION ================= */}
      <h4 className="fw-bold text-secondary mt-4 mb-3">🧑‍💼 Agents Overview</h4>
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserTie size={40} className="text-info mb-2" />
            <h6>Total Agents</h6>
            <h3 className="fw-bold">2,340</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserCheck size={40} className="text-success mb-2" />
            <h6>Active Agents</h6>
            <h3 className="fw-bold">1,850</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserTimes size={40} className="text-danger mb-2" />
            <h6>Inactive Agents</h6>
            <h3 className="fw-bold">490</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaStore size={40} className="text-warning mb-2" />
            <h6>Agent Outlets</h6>
            <h3 className="fw-bold">120</h3>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col lg={4}>
          <Card className="chart-card text-center">
            <h6 className="fw-bold mb-2 text-secondary">
              Subscription Growth
            </h6>
            <div style={{ height: "210px" }}>
              <Bar data={agentBar} />
            </div>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="chart-card text-center">
            <h6 className="fw-bold mb-2 text-secondary">
              Regional Distribution
            </h6>
            <div style={{ height: "210px" }}>
              <PolarArea data={agentPolar} />
            </div>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="chart-card text-center">
            <h6 className="fw-bold mb-2 text-secondary">Team Performance</h6>
            <div style={{ height: "210px" }}>
              <Radar data={agentRadar} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* ================= VENDORS SECTION ================= */}
      <h4 className="fw-bold text-secondary mt-4 mb-3">🏪 Vendors Overview</h4>
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaBuilding size={40} className="text-primary mb-2" />
            <h6>Total Vendors</h6>
            <h3 className="fw-bold">640</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserCheck size={40} className="text-success mb-2" />
            <h6>Active Vendors</h6>
            <h3 className="fw-bold">520</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaUserTimes size={40} className="text-danger mb-2" />
            <h6>Inactive Vendors</h6>
            <h3 className="fw-bold">120</h3>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="stat-card text-center">
            <FaStore size={40} className="text-warning mb-2" />
            <h6>Partner Stores</h6>
            <h3 className="fw-bold">78</h3>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col lg={6}>
          <Card className="chart-card text-center">
            <h6 className="fw-bold mb-2 text-secondary">Product Sales</h6>
            <div style={{ height: "220px" }}>
              <Bar data={vendorSales} />
            </div>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="chart-card text-center">
            <h6 className="fw-bold mb-2 text-secondary">
              Revenue vs Expenses
            </h6>
            <div style={{ height: "220px" }}>
              <Bar data={vendorRevenue} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* ================= WINNERS SECTION ================= */}
      <h4 className="fw-bold text-secondary mt-4 mb-3">🏆 Total Winners</h4>
      <Row className="g-4 text-center mb-5">
        <Col md={4}>
          <Card className="summary-card p-4 shadow-sm border-success">
            <FaTrophy size={48} color="#f39c12" className="mb-3" />
            <h6 className="text-secondary">ECB Winners</h6>
            <h3 className="fw-bold text-success">220</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card p-4 shadow-sm border-info">
            <FaTrophy size={48} color="#36b9cc" className="mb-3" />
            <h6 className="text-secondary">Luckey Draw Winners</h6>
            <h3 className="fw-bold text-info">180</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card p-4 shadow-sm border-warning">
            <FaTrophy size={48} color="#f6c23e" className="mb-3" />
            <h6 className="text-secondary">Total Winners</h6>
            <h3 className="fw-bold text-warning">400</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
