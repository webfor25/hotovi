import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryList } from './components/CategoryList';
import { BecomeProviderSection } from './components/BecomeProviderSection';
import { FeaturedServices } from './components/FeaturedServices';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer/Footer';
import { BecomeProvider } from './pages/BecomeProvider';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import { Profile } from './pages/Profile';
import Providers from './pages/Providers';
import { ThemeProvider } from './context/ThemeContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from './hooks/useTranslation';
import { MetaHead } from './components/MetaHead';
import { CookieConsent } from './components/CookieConsent';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { t } = useTranslation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'become-provider':
        return <BecomeProvider />;
      case 'signin':
        return <SignIn />;
      case 'signup':
        return <SignUp />;
      case 'forgot-password':
        return <ForgotPassword />;
      case 'profile':
        return <Profile />;
      case 'providers':
        return <Providers />;
      default:
        return (
          <main>
            <Hero />
            <CategoryList />
            <BecomeProviderSection />
            <HowItWorks />
            <Testimonials />
            <FeaturedServices />
          </main>
        );
    }
  };

  return (
    <HelmetProvider>
      <MetaHead 
        title={t('meta.title')}
        description={t('meta.description')}
      />
      <AuthProvider>
        <ThemeProvider>
          <SearchProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex flex-col">
              <Navbar />
              {renderPage()}
              <Footer />
              <CookieConsent />
            </div>
            <Toaster position="top-right" />
          </SearchProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;