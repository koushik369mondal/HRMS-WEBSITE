import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardMain from './components/Dashboard';
import Chat from './components/Chat';
import Feed from './components/Feed';
import Employee from './components/Employee';
import Recognition from './components/Recognition';
import Events from './components/Events';
import Profile from './components/Profile';
import Settings from './components/Settings';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardMain />;
      case 'chat': return <Chat />;
      case 'feed': return <Feed />;
      case 'employees': return <Employee />;
      case 'recognition': return <Recognition />;
      case 'event': return <Events />;
      case 'profile': return <Profile />;
      case 'settings': return <Settings />;
      default: return <DashboardMain />;
    }
  };

return (
  <div className='d-flex h-100' style={{ minHeight: '100vh' }}>
    <div style={{ width: '20%' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} style={{padding: '0%'}} />
    </div>
    <div style={{ width: '80%', backgroundColor: '#f8f9fa',}}>
      {renderPage()}
    </div>
  </div>
);
}

export default App;