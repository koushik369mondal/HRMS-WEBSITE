import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DarkModeProvider } from './components/Recognition';
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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);

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
    <DarkModeProvider>
      <div className='d-flex h-100' style={{ minHeight: '100vh' }}>
        <div style={{ 
          width: isMobile ? (isSidebarOpen ? '80%' : '0') : '20%',
          position: isMobile ? 'fixed' : 'relative',
          height: '100vh',
          zIndex: 1000,
          transition: 'width 0.3s ease',
          overflow: 'hidden'
        }}>
          <Sidebar 
            activePage={activePage} 
            setActivePage={(page) => {
              setActivePage(page);
              if (isMobile) setSidebarOpen(false);
            }} 
            style={{padding: '0%'}} 
          />
        </div>
        {isMobile && (
          <button
            className="btn btn-primary position-fixed"
            style={{ 
              top: '1rem', 
              left: '1rem', 
              zIndex: 1001,
              padding: '0.5rem',
              width: '40px',
              height: '40px'
            }}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        )}
        <div style={{ 
          width: isMobile ? '100%' : '80%', 
          backgroundColor: '#f8f9fa',
          marginLeft: isMobile ? 0 : 'auto'
        }}>
          {renderPage()}
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;