/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import NavBar from '../components/nav/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <NavBar />
        <div className="app-container">
          <Component {...pageProps} />
        </div>
      </SSRProvider>
    </>
  );
}

export default MyApp;
