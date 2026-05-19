import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import RepairList from './components/RepairList';
import About from './components/About';
import Reviews from './components/Reviews';
import QuoteForm from './components/QuoteForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <RepairList />
        <About />
        <Reviews />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
