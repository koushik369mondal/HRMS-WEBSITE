import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: "English"
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  return (
    <div className="main-content">
      <div className="container py-4">
        <h3 className="fw-bold mb-4">Settings</h3>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Preferences</h5>
                
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Notifications</h6>
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="notifications"
                      checked={settings.notifications}
                      onChange={() => handleToggle("notifications")}
                    />
                    <label className="form-check-label" htmlFor="notifications">
                      Enable push notifications
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="emailAlerts"
                      checked={settings.emailAlerts}
                      onChange={() => handleToggle("emailAlerts")}
                    />
                    <label className="form-check-label" htmlFor="emailAlerts">
                      Email alerts
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Appearance</h6>
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="darkMode"
                      checked={settings.darkMode}
                      onChange={() => handleToggle("darkMode")}
                    />
                    <label className="form-check-label" htmlFor="darkMode">
                      Dark mode
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Language</h6>
                  <select 
                    className="form-select" 
                    value={settings.language}
                    onChange={handleLanguageChange}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-primary me-2">Save Changes</button>
                  <button className="btn btn-outline-secondary">Reset to Default</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
