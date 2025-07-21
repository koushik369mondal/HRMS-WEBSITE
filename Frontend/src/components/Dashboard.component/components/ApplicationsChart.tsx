"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Highcharts from "highcharts"

const ApplicationsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)

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

export default ApplicationsChart
