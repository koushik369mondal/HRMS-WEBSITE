"use client"

import { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Card, Dropdown, Button, Nav, ListGroup } from "react-bootstrap"
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  FileText,
  Award,
  Calendar,
  User,
  Settings,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Video,
} from "lucide-react"
import Highcharts from "highcharts"

// Inline CSS Styles
const styles = `
/* Global Styles */
.dashboard-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.main-content {
  background-color: #f8f9fa;
  padding: 0;
}

/* Dashboard Header */
.dashboard-header {
  background: white;
  padding: 20px 30px;
  border-bottom: 1px solid #e9ecef;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.dashboard-content {
  padding: 30px;
}

/* Stats Cards */
.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.stat-title {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-left: auto;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.stat-subtitle {
  font-size: 12px;
  color: #999;
}

/* Chart Card */
.chart-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.chart-toggles {
  display: flex;
  align-items: center;
  gap: 20px;
}

.toggle-switch {
  width: 40px;
  height: 20px;
  background: #e5e7eb;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}

.toggle-switch.active {
  background: #4a90e2;
}

.toggle-switch.active.yellow {
  background: #f5a623;
}

.toggle-switch.active.orange {
  background: #d0021b;
}

.toggle-slider {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  right: 2px;
  transition: transform 0.2s ease;
}

.toggle-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

/* Meetings Card */
.meetings-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.create-new-btn {
  color: #4a90e2;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
}

.meetings-list {
  border: none;
}

.meeting-item {
  border: none;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.meeting-item:last-child {
  border-bottom: none;
}

.meeting-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.meeting-icon.warning {
  background: #fef3c7;
  color: #f59e0b;
}

.meeting-icon.info {
  background: #dbeafe;
  color: #3b82f6;
}

.meeting-icon.success {
  background: #d1fae5;
  color: #10b981;
}

.meeting-details {
  flex: 1;
}

.meeting-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.meeting-time {
  font-size: 12px;
  color: #666;
}

.meeting-status {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.warning {
  background: #f59e0b;
}

.status-dot.info {
  background: #3b82f6;
}

.status-dot.success {
  background: #10b981;
}

/* Employee Composition */
.composition-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.employee-composition {
  position: relative;
}

.composition-chart {
  margin-bottom: 20px;
}

.composition-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.stat-percentage {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-content {
    padding: 20px 15px;
  }

  .chart-toggles {
    flex-direction: column;
    gap: 10px;
  }

  .composition-stats {
    gap: 20px;
  }
}
`

// Stats Cards Component

const StatsCards = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "856",
      subtitle: "All time",
      change: "+30.5%",
      positive: true,
      color: "blue",
    },
    {
      title: "Job View",
      value: "3,342",
      subtitle: "",
      change: "+22.5%",
      positive: true,
      color: "blue",
    },
    {
      title: "Job Applied",
      value: "77",
      subtitle: "",
      change: "+12.5%",
      positive: true,
      color: "green",
    },
    {
      title: "Resigned Employees",
      value: "17",
      subtitle: "",
      change: "-3.2%",
      positive: false,
      color: "red",
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

// Applications Chart Component
const ApplicationsChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: "column",
          height: 300,
          backgroundColor: "transparent",
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            style: {
              color: "#666",
              fontSize: "12px",
            },
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          gridLineWidth: 1,
          gridLineColor: "#f0f0f0",
          labels: {
            style: {
              color: "#666",
              fontSize: "12px",
            },
          },
          max: 100,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
            groupPadding: 0.1,
            pointWidth: 20,
          },
        },
        series: [
          {
            name: "Applications",
            data: [65, 70, 75, 80, 85, 75, 90, 85, 80, 75, 70, 65],
            color: "#4A90E2",
            type: "column",
          },
          {
            name: "Shortlisted",
            data: [45, 50, 55, 60, 65, 55, 70, 65, 60, 55, 50, 45],
            color: "#F5A623",
            type: "column",
          },
          {
            name: "Rejected",
            data: [25, 30, 35, 40, 45, 35, 50, 45, 40, 35, 30, 25],
            color: "#D0021B",
            type: "column",
          },
        ],
        credits: {
          enabled: false,
        },
      })
    }
  }, [])

  return <div ref={chartRef} className="applications-chart"></div>
}

// Meetings List Component
const MeetingsList = () => {
  const meetings = [
    {
      type: "Interview",
      title: "Interview",
      time: "Today 09:30 AM to 10:30 AM",
      icon: Video,
      color: "warning",
    },
    {
      type: "Meeting",
      title: "Departmental meeting",
      time: "Today 12:30 PM to 01:30 PM",
      icon: Users,
      color: "info",
    },
    {
      type: "Meeting",
      title: "Meeting with the manager",
      time: "Tomorrow 09:30 AM to 10:30 AM",
      icon: User,
      color: "success",
    },
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

// Employee Composition Component
const EmployeeComposition = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: "pie",
          height: 250,
          backgroundColor: "transparent",
        },
        title: {
          text: "",
        },
        plotOptions: {
          pie: {
            innerSize: "60%",
            dataLabels: {
              enabled: false,
            },
            showInLegend: false,
          },
        },
        series: [
          {
            name: "Employees",
            data: [
              { name: "Department A", y: 35, color: "#4A90E2" },
              { name: "Department B", y: 14, color: "#50E3C2" },
              { name: "Others", y: 51, color: "#E8E8E8" },
            ],
            type: "pie",
          },
        ],
        credits: {
          enabled: false,
        },
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

// Main Dashboard Component
const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("July")

  return (
    <div className="dashboard-container">
      <Row className="g-0 min-vh-100">
        <Col md={9} lg={10} className="main-content" style={{marginLeft: '250px'}}>
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
                          <div className="d-flex align-items-center gap-2">
                            <div className="toggle-switch active">
                              <div className="toggle-slider"></div>
                            </div>
                            <span className="toggle-label">Applications</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="toggle-switch active yellow">
                              <div className="toggle-slider"></div>
                            </div>
                            <span className="toggle-label">Shortlisted</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="toggle-switch active orange">
                              <div className="toggle-slider"></div>
                            </div>
                            <span className="toggle-label">Rejected</span>
                          </div>
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm">
                            {selectedMonth}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedMonth("January")}>January</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("February")}>February</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("March")}>March</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("April")}>April</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("May")}>May</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("June")}>June</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("July")}>July</Dropdown.Item>
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

// Main App Component
function DashboardMain() {
  useEffect(() => {
    // Inject CSS styles
    const styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  return (
    <div className="App">
      <Dashboard />
    </div>
  )
}

export default DashboardMain
