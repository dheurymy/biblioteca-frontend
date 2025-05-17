import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from './mui/AppTheme';
import AppAppBar from './mui/AppAppBar';
import Hero from './mui/Hero';

import Highlights from './mui/Highlights';

import Features from './mui/Features';

import FAQ from './mui/FAQ';
import Footer from './mui/Footer';

export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        
        <Features />
        
        <Divider />
        <Highlights />
        
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}