import React from 'react';
import { FaHome, FaComments, FaUsers, FaBookOpen, FaChartBar, FaCalendarAlt, FaUserCircle, FaCog } from 'react-icons/fa';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
  { key: 'chat', label: 'Chat', icon: <FaComments /> },
  { key: 'employees', label: 'Employees', icon: <FaUsers /> },
  { key: 'feed', label: 'Feed', icon: <FaBookOpen /> },
  { key: 'recognition', label: 'Recognition', icon: <FaChartBar /> },
  { key: 'event', label: 'Event', icon: <FaCalendarAlt /> },
  { key: 'profile', label: 'Profile', icon: <FaUserCircle /> },
  { key: 'settings', label: 'Settings', icon: <FaCog /> },
];

const styles = `
/* SidebarStyles.css */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;            /* 20% of viewport, or use min-width if you prefer px */
  min-width: 250px;      /* ensures it never shrinks below 250px */
  height: 100vh;         /* full viewport height */
  overflow-y: auto;      /* scrollable if its own content overflows */
  scrollbar-width: none;
  background-color: #4c57c1;
  color: white;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

/* nav-link rules stay the same… */
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
`
function InjectStyles({css}) {
    return <style>{css}</style>;  
}

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <>
    <InjectStyles css={styles} />
    <div className="sidebar d-flex flex-column p-3">
      <div className="text-center mb-4">
        <img src="/logo.png" alt="HRMS Logo" style={{ width: '150px' }} />
      </div>
      <div className="d-flex align-items-center mb-4">
        <img src="/maria.jpg" alt="Profile" style={{ width: '50px', borderRadius: '50%', marginRight: '25px', marginLeft: '20px' }} />
        <div>
          <p className="mb-0 fw-bold">Maria</p>
          <small>HR Manager</small>
        </div>
      </div>
      <ul className="nav flex-column">
        {navItems.map(item => (
          <li key={item.key} className="mb-2">
            <button
              className={`nav-link ${activePage === item.key ? 'active' : ''}`}
              onClick={() => setActivePage(item.key)}
            >
              <span className="me-2">{item.icon}</span> {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
