import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardMain from './components/Dashboard';
import Chat from './components/Chat';
// import Feed from './components/Feed';
// import Employee from './components/Employee';
// import Recognition from './components/Recognition';
// import Event from './components/Events';
// import Profile from './components/Profile';
// import Settings from './components/Settings';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardMain />;
      case 'chat': return <Chat />;
      case 'feed': return <Feed />;
      case 'employees': return <Employees />;
      case 'recogination': return <Recognition />;
      case 'event': return <Event />;
      case 'profile': return <Profile />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className='d-flex h-100'>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-content p-4" style={{ width: '100%' }}>
        {renderPage()}
      </div>
    </div>
  );

  
}

export default App;