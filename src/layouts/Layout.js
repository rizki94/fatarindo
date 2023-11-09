import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

const WithNav = () => {
  return (
    <div className='flex min-h-screen flex-col bg-primary text-primary'>
      <Header />
        <main className='flex flex-1'>
          <Outlet />   
        </main>   
      <Footer />
    </div>
  );
};

export default WithNav