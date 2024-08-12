/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import NavBar from '../components/nav/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
