// import React, { useState } from "react";
// import "./Login.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../assets/loginlogo.png";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const demoUser = {
//     email: "admin@demo.com",
//     password: "admin123",
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       if (email === demoUser.email && password === demoUser.password) {
//         onLogin(true);
//       } else {
//         setError("Invalid credentials. Try admin@demo.com / admin123");
//       }
//     }, 3000);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card shadow-lg">
//         <div className="text-center mb-3">
//           <div className="logo-circle">
//             <img src={logo} alt="logo" className="login-logo" />
//           </div>
//           <h3 className="fw-bold text-danger mt-3 login-title">Login</h3>
//         </div>

//         <form onSubmit={handleLogin}>
//           <div className="mb-3 position-relative">
//             <input
//               type="text"
//               placeholder="Email or Phone"
//               className="form-control login-input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3 position-relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="form-control login-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <div className="text-end mb-3">
//             <a href="#" className="forgot-link">
//               Forgot Password?
//             </a>
//           </div>

//           {error && <p className="text-danger small text-center">{error}</p>}

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? <span className="loader"></span> : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;












// import React, { useState } from "react";
// import "./Login.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../assets/loginlogo.png";

// const Login = ({ onLogin }) => {
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const demoUser = {
//     email: "admin@demo.com",
//     password: "admin123",
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       if (email === demoUser.email && password === demoUser.password) {
//         onLogin(true);
//       } else {
//         setError("Invalid credentials. Try admin@demo.com / admin123");
//       }
//     }, 3000);
//   };

import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/loginlogo.png";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoUser = {
    email: "admin@demo.com",
    password: "admin123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === demoUser.email && password === demoUser.password) {
        onLogin(true);
      } else {
        setError("Invalid credentials. Try admin@demo.com / admin123");
      }
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg">
        <div className="text-center mb-3">
          <div className="logo-circle">
            <img src={logo} alt="logo" className="login-logo" />
          </div>
          <h2 className="fw-bold text-danger mt-3 login-title">Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3 position-relative">
            <input
              type="text"
              placeholder="Email or Phone"
              className="form-control login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="text-end mb-3">
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          {error && <p className="text-danger small text-center">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
