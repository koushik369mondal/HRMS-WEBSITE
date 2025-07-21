import { Row, Col, Card } from "react-bootstrap"
import { TrendingUp, TrendingDown } from "lucide-react"

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

export default StatsCards
