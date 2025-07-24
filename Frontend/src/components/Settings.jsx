import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, ListGroup, Modal, Button, Form } from 'react-bootstrap';
import {
  FaBell, FaMoon, FaStar, FaShareAlt, FaLock, FaFileAlt,
  FaCookieBite, FaEnvelope, FaComment, FaSignOutAlt, FaTachometerAlt,
  FaComments, FaUsers, FaNewspaper, FaAward, FaCalendarAlt, FaUser
} from 'react-icons/fa';
import { Toast } from 'react-bootstrap';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
  setDarkMode((prev) => !prev);};
  const [modals, setModals] = useState({});
  const [notification, setNotification] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });


  const toggleModal = (modalName) => setModals({ ...modals, [modalName]: !modals[modalName] });

  const renderModal = (name, title, body) => (
    <Modal show={modals[name]} onHide={() => toggleModal(name)} centered>
      <Modal.Header closeButton><Modal.Title>{title}</Modal.Title></Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );

  return (
    <div className={`d-flex ${modals && Object.values(modals).some(Boolean) ? 'blurred-bg' : ''}`}>
      <div /*className="bg-primary text-white vh-100 p-3"*/ style={{ width: '250px' }}>
        {/* <div className="text-center mb-4">
          <img src="assets/maria.png" alt="User" className="rounded-circle mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          <h6>Maria</h6>
          <small>HR Manager</small>
        </div>
        <ListGroup variant="flush" className="text-white">
          <ListGroup.Item className="bg-primary border-0 text-white"><FaTachometerAlt /> Dashboard</ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0 text-white"><FaComments /> Chat</ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0 text-white"><FaUsers /> Employees</ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0 text-white"><FaNewspaper /> Feed</ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0 text-white"><FaAward /> Recognition</ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0 text-white"><FaCalendarAlt /> Event</ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0 text-white"><FaUser /> Profile</ListGroup.Item>
          <ListGroup.Item className="bg-light border-0 text-dark"><FaUser /> Settings</ListGroup.Item>
        </ListGroup> */}
        
      </div>

      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <h3><u>Settings</u></h3>
            <ListGroup variant="flush" className="mt-5">
              <ListGroup.Item><FaBell /> Notification
                <Form.Check type="switch" className="float-end" checked={notification} onChange={() => setNotification(!notification)} />
              </ListGroup.Item>
              <ListGroup.Item><FaMoon /> Dark Mode
                <Form.Check type="switch" className="float-end" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('rateApp')}><FaStar /> Rate App</ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('shareApp')}><FaShareAlt /> Share App</ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('privacyPolicy')}><FaLock /> Privacy Policy</ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('terms')}><FaFileAlt /> Terms and Conditions</ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('cookies')}><FaCookieBite /> Cookies Policy</ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('contact')}><FaEnvelope /> Contact</ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('feedback')}><FaComment /> Feedback</ListGroup.Item>
              <ListGroup.Item action className="text-danger" onClick={() => toggleModal('logout')}><FaSignOutAlt /> Logout</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4} className="text-center">
            <img src="assets/hrms_logo.png" alt="HRMS" className="img-fluid" style={{ maxWidth: '200px' }} />
            <p className="mt-3">Human Resource Management System</p>
            <img src="assets/hrms_2.png" alt="Illustration" className="img-fluid" />
          </Col>
        </Row>

        {/* Modals */}
        {renderModal('rateApp', 'Rate App', (
          <div>
            {[1, 2, 3, 4, 5].map((n) => (
              <FaStar
                key={n}
                className="me-2"
                style={{
                  color: n <= (modals.ratingValue || 0) ? '#ffc107' : '#ccc',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => setModals({ ...modals, ratingValue: n })}
              />
            ))}
            <Button
              className="mt-3"
              onClick={() => {
                setToast({ show: true, message: `Thank you for rating us ${modals.ratingValue || 0} stars!` });
                toggleModal('rateApp');
              }}  >Submit
            </Button>
          </div>
        ))}



        {renderModal('shareApp', 'Share App', (
          <div>
            <p>Select a platform to share:</p>
            <Button variant="outline-secondary" className="me-2">WhatsApp</Button>
            <Button variant="outline-primary" className="me-2">Facebook</Button>
            <Button variant="outline-info">Telegram</Button>
          </div>
        ))}

        {renderModal('privacyPolicy', 'Privacy Policy', <p>This is a short summary of our privacy policy. We protect your data.</p>)}
        {renderModal('terms', 'Terms and Conditions', <p>By using this app, you agree to our terms and conditions listed here.</p>)}
        {renderModal('cookies', 'Cookies Policy', <p>This app uses cookies to improve user experience and analyze traffic.</p>)}
        {renderModal('contact', 'Contact', <p>Email us at support@hrms.com or call +91-1234567890</p>)}

        {renderModal('feedback', 'Feedback', (
          <Form onSubmit={(e) => {
            e.preventDefault();
            if (feedbackText.trim()) {
              setToast({ show: true, message: '✅ Thank you for your feedback!' });
              setFeedbackText('');
              toggleModal('feedback');
            } else {
              alert('Please enter feedback.');
            }
          }}>
            <Form.Group controlId="feedbackForm">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">Submit</Button>
          </Form>
        ))}




        {renderModal('logout', 'Logout Confirmation', (
          <>
            <p>Are you sure you want to logout?</p>
            <Button variant="danger" className="me-2">Yes, Logout</Button>
            <Button variant="secondary" onClick={() => toggleModal('logout')}>Cancel</Button>
          </>
        ))}
      </Container>
      <Toast
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
        bg="success"
        className="position-fixed top-0 end-0 m-3 text-white"
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">HRMS</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>

    </div>
  );
}

export default App;

