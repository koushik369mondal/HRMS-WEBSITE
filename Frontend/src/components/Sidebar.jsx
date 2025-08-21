"use client"

import { useState } from "react"
import {
  FaHome,
  FaComments,
  FaUsers,
  FaBookOpen,
  FaChartBar,
  FaCalendarAlt,
  FaUserCircle,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <FaHome /> },
  { key: "chat", label: "Chat", icon: <FaComments /> },
  { key: "employees", label: "Employees", icon: <FaUsers /> },
  { key: "feed", label: "Feed", icon: <FaBookOpen /> },
  { key: "recognition", label: "Recognition", icon: <FaChartBar /> },
  { key: "event", label: "Event", icon: <FaCalendarAlt /> },
  { key: "profile", label: "Profile", icon: <FaUserCircle /> },
  { key: "settings", label: "Settings", icon: <FaCog /> },
]

const styles = `
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  min-width: 250px;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #4c57c1;
  color: white;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 45;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  font-size: 16px;
  color: white;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out,
              border-radius 0.3s ease-in-out,
              transform 0.3s ease-in-out;
  border-radius: 8px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.6);
  transform: translateX(5px);
}

.nav-link.active {
  background-color: white;
  color: #4c57c1;
  font-weight: bold;
  transform: translateX(10px);
  border-radius: 8px;
}

.mobile-menu-button {
  transition: all 0.3s ease-in-out;
}

.mobile-menu-button:hover {
  transform: scale(1.05);
}

@media (max-width: 767px) {
  .sidebar {
    width: 250px;
    transform: translateX(-100%);
    z-index: 45;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
    z-index: 45;
  }
}

@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(0);
    z-index: 45;
  }
}
`

function InjectStyles({ css }) {
  return <style>{css}</style>
}

const Sidebar = ({ activePage, setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuClick = (key) => {
    setActivePage(key)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <InjectStyles css={styles} />

      <button
        onClick={toggleMobileMenu}
        className="xl:hidden"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          width: "44px",
          height: "44px",
          padding: "12px",
          backgroundColor: "#4c57c1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)"
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)"
        }}
      >
        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          className="xl:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <div
        className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img src="/logo.png" alt="HRMS Logo" style={{ width: "150px" }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src="/maria.jpg"
            alt="Profile"
            style={{
              width: "50px",
              borderRadius: "50%",
              marginRight: "0.5rem",
              marginLeft: "20px",
            }}
          />
          <div>
            <p style={{ margin: "0", fontWeight: "bold" }}>Maria</p>
            <small>HR Manager</small>
          </div>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: "0",
            margin: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {navItems.map((item) => (
            <li key={item.key} style={{ marginBottom: "0.5rem" }}>
              <button
                className={`nav-link ${activePage === item.key ? "active" : ""}`}
                onClick={() => handleMenuClick(item.key)}
              >
                <span style={{ marginRight: "0.5rem" }}>{item.icon}</span> {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
