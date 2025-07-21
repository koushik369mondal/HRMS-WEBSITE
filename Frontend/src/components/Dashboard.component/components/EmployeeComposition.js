"use client"

import { useEffect, useRef } from "react"
import Highcharts from "highcharts"

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
              { name: "Boys", y: 35, color: "#4A90E2" },
              { name: "Girls", y: 14, color: "#50E3C2" },
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

export default EmployeeComposition
