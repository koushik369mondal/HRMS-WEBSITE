// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App
// import React from 'react'
// import Dashboard from './components/dashboard'
// import DashboardMain from './components/dashboard'
// // import DashboardMain from './components/Dashboard.component/components/Dashboard'

// export default function APP() {
//   return (
//     <>
//       {/* <Dashboard/> */}
//       <DashboardMain
//       />
//       <Chat />
//       {/* <DashboardMain/> */}
//     </>
//   )
// }
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Feed from './components/Feed';
import Employees from './components/Employee';
import Recognition from './components/Recognition';
import Event from './components/Events';
import Profile from './components/Profile';
import Settings from './components/Settings';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
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
      <div className="main-content p-4" style={{ width: '100%'}}>
        {renderPage()}
      </div>
    </div>
  );

  
}

export default App;