import React from "react";
import { FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";

function Event3({ eventData }) {
    const {
        name,
        eventTitle,
        time,
        date,
        timezone,
        conferenceDetails,
    } = eventData || {};

    return (
        <div className="main-content d-flex justify-content-center">
            <div className="container py-4">
                <div className="event-wrapper card p-4 shadow-sm">
                <div className="event-header text-center mb-4">
                    <img src="/maria.jpg" alt="User" className="event-profile" style={{ width: 70, height: 70, borderRadius: "50%" }} />
                    <h2 className="event-heading mt-3">You are scheduled</h2>
                    <p className="event-subtext text-muted">A calendar invitation has been sent to your email address.</p>
                </div>

                <div className="event-card-box">
                    <h4 className="event-title">{eventTitle || "Event Title"}</h4>
                    <p><i className="bi bi-person-fill me-2"></i>{name || "Participant Name"}</p>
                    <p><FaCalendarAlt /> {time} - {date}</p>
                    <p><FaGlobe /> {timezone}</p>
                    <p><FaVideo /> {conferenceDetails}</p>
                </div>
                </div>
            </div>
        </div>
    );
}export default Event3;
