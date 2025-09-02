"use client"

import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { DarkModeProvider } from "./components/Recognition"
import Sidebar from "./components/Sidebar"
import DashboardMain from "./components/Dashboard"
import Chat from "./components/Chat"
import Feed from "./components/Feed"
import Employee from "./components/Employee"
import Recognition from "./components/Recognition"
import Events from "./components/Events"
import Profile from "./components/Profile"
import Settings from "./components/Settings"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [activePage, setActivePage] = useState("dashboard")
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardMain />
      case "chat":
        return <Chat />
      case "feed":
        return <Feed />
      case "employees":
        return <Employee />
      case "recognition":
        return <Recognition />
      case "event":
        return <Events />
      case "profile":
        return <Profile />
      case "settings":
        return <Settings />
      default:
        return <DashboardMain />
    }
  }

  return (
    <DarkModeProvider>
      <div className="d-flex h-100" style={{ minHeight: "100vh" }}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div
          style={{
            width: "100%",
            backgroundColor: "#f8f9fa",
            marginLeft: isMobile ? 0 : "19.85%",
            minWidth: isMobile ? "100%" : "calc(80% - 250px)",
          }}
        >
          {renderPage()}
        </div>
      </div>
    </DarkModeProvider>
  )
}

export default App
