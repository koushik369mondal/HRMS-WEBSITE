"use client"

import { useState, useEffect, useRef } from "react"
import Highcharts from "highcharts"
import { Container, Row, Col, Card, Dropdown, Button, ListGroup, Nav } from "react-bootstrap"
import { 
  LayoutDashboard, MessageCircle, Users, FileText, Award, 
  Calendar, User, Settings, MoreHorizontal, Video, TrendingUp, 
  TrendingDown 
} from "lucide-react"

/* ------------------- Sidebar ------------------- */
const Sidebar = () => {
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
            <img src="/placeholder.svg?height=40&width=40" alt="Maria" className="avatar-img" />
          </div>
          <div className="user-info">
            <div className="user-name">Maria</div>
            <div className="user-role">HR Manager</div>
          </div>
        </div>
      </div>

      <Nav className="sidebar-nav flex-column">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <Nav.Link key={index} className={`sidebar-nav-item ${item.active ? "active" : ""}`}>
              <IconComponent size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Nav.Link>
          )
        })}
      </Nav>
    </div>
  )
}

/* ------------------- StatsCards ------------------- */
const StatsCards = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "856",
      subtitle: "All time",
      change: "+30.5%",
      positive: true,
    },
    {
      title: "Job View",
      value: "3,342",
      subtitle: "",
      change: "+22.5%",
      positive: true,
    },
    {
      title: "Job Applied",
      value: "77",
      subtitle: "",
      change: "+12.5%",
      positive: true,
    },
    {
      title: "Resigned Employees",
      value: "17",
      subtitle: "",
      change: "-3.2%",
      positive: false,
    },
  ]

  return (
    <Row className="stats-row">
      {stats.map((stat, index) => (
        <Col key={index} md={6} lg={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <span className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
                  {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              {stat.subtitle && <div className="stat-subtitle">{stat.subtitle}</div>}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

/* ------------------- ApplicationsChart ------------------- */
const ApplicationsChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: { type: "column", height: 300, backgroundColor: "transparent" },
        title: { text: "" },
        xAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          lineWidth: 0,
          tickWidth: 0,
          labels: { style: { color: "#666", fontSize: "12px" } },
        },
        yAxis: {
          title: { text: "" },
          gridLineWidth: 1,
          gridLineColor: "#f0f0f0",
          labels: { style: { color: "#666", fontSize: "12px" } },
          max: 100,
        },
        legend: { enabled: false },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
            groupPadding: 0.1,
            pointWidth: 20,
          },
        },
        series: [
          { name: "Applications", data: [65, 70, 75, 80, 85, 75, 90, 85, 80, 75, 70, 65], color: "#4A90E2", type: "column" },
          { name: "Shortlisted", data: [45, 50, 55, 60, 65, 55, 70, 65, 60, 55, 50, 45], color: "#F5A623", type: "column" },
          { name: "Rejected", data: [25, 30, 35, 40, 45, 35, 50, 45, 40, 35, 30, 25], color: "#D0021B", type: "column" },
        ],
        credits: { enabled: false },
      })
    }
  }, [])

  return <div ref={chartRef} className="applications-chart"></div>
}

/* ------------------- MeetingsList ------------------- */
const MeetingsList = () => {
  const meetings = [
    { type: "Interview", title: "Interview", time: "Today 09:30 AM to 10:30 AM", icon: Video, color: "warning" },
    { type: "Meeting", title: "Departmental meeting", time: "Today 12:30 PM to 01:30 PM", icon: Users, color: "info" },
    { type: "Meeting", title: "Meeting with the manager", time: "Tomorrow 09:30 AM to 10:30 AM", icon: User, color: "success" },
  ]

  return (
    <ListGroup variant="flush" className="meetings-list">
      {meetings.map((meeting, index) => {
        const IconComponent = meeting.icon
        return (
          <ListGroup.Item key={index} className="meeting-item">
            <div className="d-flex align-items-center">
              <div className={`meeting-icon ${meeting.color}`}>
                <IconComponent size={16} />
              </div>
              <div className="meeting-details flex-grow-1">
                <div className="meeting-title">{meeting.title}</div>
                <div className="meeting-time">{meeting.time}</div>
              </div>
              <div className="meeting-status">
                <div className={`status-dot ${meeting.color}`}></div>
              </div>
            </div>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

/* ------------------- EmployeeComposition ------------------- */
const EmployeeComposition = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: { type: "pie", height: 250, backgroundColor: "transparent" },
        title: { text: "" },
        plotOptions: {
          pie: {
            innerSize: "60%",
            dataLabels: { enabled: false },
            showInLegend: false,
          },
        },
        series: [
          {
            name: "Employees",
            data: [
              { name: "Boys", y: 35, color: "#4A90E2" },
              { name: "Girls", y: 14, color: "#50E3C2" },
              { name: "Others", y: 51, color: "#E8E8E8" },
            ],
            type: "pie",
          },
        ],
        credits: { enabled: false },
      })
    }
  }, [])

  return (
    <div className="employee-composition">
      <div ref={chartRef} className="composition-chart"></div>
      <div className="composition-stats">
        <div className="stat-item">
          <div className="stat-color" style={{ backgroundColor: "#4A90E2" }}></div>
          <span className="stat-percentage">35%</span>
        </div>
        <div className="stat-item">
          <div className="stat-color" style={{ backgroundColor: "#50E3C2" }}></div>
          <span className="stat-percentage">14%</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------- Main Dashboard Component ------------------- */
const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("July")

  return (
    <div className="dashboard-container">
      <Row className="g-0 min-vh-100">
        <Col md={3} lg={2} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col md={9} lg={10} className="main-content">
          <div className="dashboard-header">
            <h2 className="dashboard-title">Dashboard</h2>
          </div>

          <Container fluid className="dashboard-content">
            <StatsCards />

            <Row className="mt-4">
              <Col>
                <Card className="chart-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="chart-title">Statistics of active applications</h5>
                      <div className="d-flex align-items-center gap-3">
                        <div className="chart-toggles d-flex gap-3">
                          {["Applications", "Shortlisted", "Rejected"].map((label, i) => (
                            <div key={i} className="d-flex align-items-center gap-2">
                              <div className={`toggle-switch active ${label.toLowerCase()}`}>
                                <div className="toggle-slider"></div>
                              </div>
                              <span className="toggle-label">{label}</span>
                            </div>
                          ))}
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm">
                            {selectedMonth}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {[
                              "January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December",
                            ].map(month => (
                              <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                                {month}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <ApplicationsChart />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={6}>
                <Card className="meetings-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title">Meetings</h5>
                      <Button variant="link" className="create-new-btn">
                        Create new
                      </Button>
                    </div>
                    <MeetingsList />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="composition-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title">Employee Composition</h5>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">All Departments</span>
                        <MoreHorizontal size={16} className="text-muted" />
                      </div>
                    </div>
                    <EmployeeComposition />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
