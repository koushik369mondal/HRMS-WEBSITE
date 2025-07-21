import type React from "react"
import { ListGroup } from "react-bootstrap"
import { Video, Users, User } from "lucide-react"

const MeetingsList: React.FC = () => {
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
      {meetings.map((meeting, index) => (
        <ListGroup.Item key={index} className="meeting-item">
          <div className="d-flex align-items-center">
            <div className={`meeting-icon ${meeting.color}`}>
              <meeting.icon size={16} />
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
      ))}
    </ListGroup>
  )
}

export default MeetingsList
