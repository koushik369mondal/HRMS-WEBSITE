"use client"

import type React from "react"
import { useState } from "react"
import { Container, Row, Col, Card, Dropdown, Button } from "react-bootstrap"
import Sidebar from "./Sidebar"
import StatsCards from "./StatsCards"
import ApplicationsChart from "./ApplicationsChart"
import MeetingsList from "./MeetingsList"
import EmployeeComposition from "./EmployeeComposition"
import { MoreHorizontal } from "lucide-react"

const Dashboard: React.FC = () => {
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
                            <Dropdown.Item onClick={() => setSelectedMonth("August")}>August</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("September")}>September</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("October")}>October</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("November")}>November</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth("December")}>December</Dropdown.Item>

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
