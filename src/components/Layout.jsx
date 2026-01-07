import React from 'react';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';

const Layout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '1800px',
        margin: '0 auto',
        width: '100%',
        overflowX: 'hidden'
      }}>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
};

export default Layout;
