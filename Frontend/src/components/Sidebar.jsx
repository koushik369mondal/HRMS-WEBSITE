import React from 'react';
import { FaHome, FaChartBar, FaBookOpen, FaComments, FaUsers, FaCalendarAlt, FaUserCircle, FaCog } from 'react-icons/fa';

const styles = `
.side-navbar{
    width: 250px;
    min-height: 100vh;
    background-color: #4c57c1;
    position: fixed;
}

.logo-img {
    width: 180px;
}

.profile-container {
    display: flex;
    padding: 5px 15px;
}

.profile-img{
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 5px;
    border: 2px solid #ffffff;
}

.profile-info small{
    color: aliceblue;
    font-size: small;
}

.side-navbar .nav-link {
  font-size: 16px;
  padding: 6px;
  color: white;
  background-color: transparent;
  border-radius: 8px;
  transition: 
    background 0.1s ease-in-out,
    transform 0.4s ease-in-out,
    border-radius 0.4s ease-in-out;
}

.nav-link:hover{
    background-color:#0401011f;
    border-radius: 8px;
}

.nav-link.active{
    background-color: #ffffff;
    color: #4c57c1 !important;
    border-radius: 8px;
    transform: translateX(10px);
}
`

function InjectStyles({ css }) {
    return <style>{css}</style>;
}

console.log("Sidebar loaded");
const Sidebar = ({ setActivePage, activePage }) => {
    return (
        <>
            <InjectStyles css={styles} />

            <div className="side-navbar d-flex flex-column flex-shrink-0 p-2">

                {/*HRMS Logo */}

                <div className='logo-container text-center'>
                    <img
                        src="/logo.png"
                        alt='HRMS logo'
                        className='img-fluid logo-img' />
                </div>

                {/* Profile Info */}

                <div className="profile-container">
                    <div className='profile-img-container d-flex justify-content-center align-items-center me-3'>
                        <img
                            src="/maria.jpg"
                            alt='Profile'
                            className='img-fluid profile-img' />
                    </div>
                    <div className='profile-info'>
                        <p className='text-white fw-bold mb-0'>Maria</p>
                        <small>HR Manager</small>
                    </div>
                </div>

                {/*Navigation items */}

                <ul className='nav flex-column mb-auto'>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('dashboard')} style={{cursor: 'pointer'}}>
                        <div className={`nav-link text-white w-100 text-start ${activePage === 'dashboard' ? 'active' : ''}`}><FaHome className='me-2' /><span className="nav-label">Dashboard</span></div>
                    </li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('chat')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'chat' ? 'active' : ''}`}><FaComments className='me-2' /><span className="nav-label">Chat</span></div></li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('employees')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'employees' ? 'active' : ''}`}><FaUsers className='me-2' /><span className="nav-label">Employees</span></div></li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('feed')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'feed' ? 'active' : ''}`}><FaBookOpen className='me-2' /><span className="nav-label">Feed</span></div></li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('recognition')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'recognition' ? 'active' : ''}`}><FaChartBar className='me-2' /><span className="nav-label">Recognition</span></div></li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('event')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'event' ? 'active' : ''}`}><FaCalendarAlt className='me-2' /><span className="nav-label">Event</span></div></li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('profile')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'profile' ? 'active' : ''}`}><FaUserCircle className='me-2' /><span className="nav-label">Profile</span></div></li>
                    <li className='nav-item w-100 mb-0' onClick={() => setActivePage('settings')} style={{cursor: 'pointer'}}><div className={`nav-link text-white w-100 text-start ${activePage === 'settings' ? 'active' : ''}`}><FaUserCircle className='me-2' /><span className="nav-label">Settings</span></div></li>
                </ul>
            </div>
        </>
    );
};
export default Sidebar;