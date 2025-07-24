import React, { useState } from "react";
import { FaClock, FaCalendarAlt, FaVideo, FaGlobe } from "react-icons/fa";

function Event2({ onNavigate, eventData }) {
    const { date, time, timezone } = eventData || {};

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [conferenceDetails, setConferenceDetails] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNavigate('event3', {
            name,
            email,
            eventTitle,
            conferenceDetails,
            duration,
            date,
            time,
            timezone,
        });
    };

    return (
        <div className="main-content">
            <div className="container my-4">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <img
                                    src="/maria.jpg"
                                    alt="Organizer"
                                    style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "2px solid #6A7ADA" }}
                                />
                                <div>
                                    <div className="fw-medium text-dark">Maria</div>
                                    <h2 className="fw-bold fs-5 mb-0 text-primary">{eventTitle || "Event title"}</h2>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-2 mb-2"><FaClock /><span className="text-muted fst-italic small">{time} - {date}</span></div>
                            <div className="d-flex align-items-center gap-2 mb-2"><FaCalendarAlt /><span className="text-muted fst-italic small">{duration || "30 min"}</span></div>
                            <div className="d-flex align-items-center gap-2 mb-2"><FaVideo /><span className="text-muted fst-italic small">{conferenceDetails || "Web conferencing details provided upon confirmation."}</span></div>
                            <div className="d-flex align-items-center gap-2"><FaGlobe /><span className="text-muted fst-italic small">{timezone}</span></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm p-4">
                            <h2 className="fw-bold fs-5 text-primary mb-3">Fill Your Details here -</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3"><label className="form-label">Event Title</label><input type="text" className="form-control" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} /></div>
                                <div className="mb-3"><label className="form-label">Name</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                                <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                                <div className="mb-3"><label className="form-label">Duration</label><input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} /></div>
                                <div className="mb-3"><label className="form-label">Web Conferencing Details</label><input type="text" className="form-control" value={conferenceDetails} onChange={(e) => setConferenceDetails(e.target.value)} /></div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event2;
