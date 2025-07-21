import type React from "react"
import { Nav } from "react-bootstrap"
import { LayoutDashboard, MessageCircle, Users, FileText, Award, Calendar, User, Settings } from "lucide-react"

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: MessageCircle, label: "Chat" },
    { icon: Users, label: "Employees" },
    { icon: FileText, label: "Feed" },
    { icon: Award, label: "Recognition" },
    { icon: Calendar, label: "Event" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">HRMS</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <img src="/api/placeholder/40/40" alt="Maria" className="avatar-img" />
          </div>
          <div className="user-info">
            <div className="user-name">Maria</div>
            <div className="user-role">HR Manager</div>
          </div>
        </div>
      </div>

      <Nav className="sidebar-nav flex-column">
        {menuItems.map((item, index) => (
          <Nav.Link key={index} className={`sidebar-nav-item ${item.active ? "active" : ""}`}>
            <item.icon size={20} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  )
}

export default Sidebar
