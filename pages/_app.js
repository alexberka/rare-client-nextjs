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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
