import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useLanguageStore } from './lib/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import Support from './pages/Support';
import { Cake, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

function AppContent() {
  const { t } = useLanguageStore();
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>
      
      {/* Comprehensive E-commerce Footer */}
      <footer className="bg-bakery-pink-light pt-12 md:pt-16 pb-6 md:pb-8 mt-auto border-t-4 border-bakery-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand & About */}
            <div className="col-span-1 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Cake className="h-8 w-8 text-bakery-brown" />
                <span className="font-display text-2xl text-bakery-brown font-bold tracking-wider">
                  Miaomiaoshops
                </span>
              </Link>
              <p className="text-bakery-brown/80 mb-6 leading-relaxed">
                {t('footer.aboutText')}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-bakery-brown hover:bg-pink-500 hover:text-white transition-colors shadow-sm">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-bakery-brown hover:bg-pink-500 hover:text-white transition-colors shadow-sm">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-bakery-brown hover:bg-pink-500 hover:text-white transition-colors shadow-sm">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-bold text-bakery-brown text-xl mb-6">{t('footer.quickLinks')}</h3>
              <ul className="space-y-4 font-bold text-bakery-brown/70">
                <li>
                  <Link to="/" className="hover:text-pink-500 transition-all flex items-center gap-3 group">
                    <span className="w-2 h-2 rounded-full bg-bakery-pink group-hover:scale-125 transition-transform"></span>
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-pink-500 transition-all flex items-center gap-3 group">
                    <span className="w-2 h-2 rounded-full bg-bakery-yellow group-hover:scale-125 transition-transform"></span>
                    {t('nav.shop')}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-pink-500 transition-all flex items-center gap-3 group">
                    <span className="w-2 h-2 rounded-full bg-bakery-mint group-hover:scale-125 transition-transform"></span>
                    {t('cart.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-pink-500 transition-all flex items-center gap-3 group">
                    <span className="w-2 h-2 rounded-full bg-bakery-blue group-hover:scale-125 transition-transform"></span>
                    {t('footer.aboutUs')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-display font-bold text-bakery-brown text-xl mb-6">{t('footer.customerService')}</h3>
              <ul className="space-y-3 font-medium text-bakery-brown/80">
                <li><Link to="/support#faq" className="hover:text-pink-600 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-bakery-mint"></span>{t('footer.faq')}</Link></li>
                <li><Link to="/support#shipping" className="hover:text-pink-600 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-bakery-mint"></span>{t('footer.shipping')}</Link></li>
                <li><Link to="/support#returns" className="hover:text-pink-600 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-bakery-mint"></span>{t('footer.returns')}</Link></li>
                <li><Link to="/support#contact" className="hover:text-pink-600 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-bakery-mint"></span>{t('footer.contact')}</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-display font-bold text-bakery-brown text-xl mb-6">{t('footer.contact')}</h3>
              <ul className="space-y-4 font-medium text-bakery-brown/80">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
                  <span>{useLanguageStore.getState().language === 'cn' ? '马来西亚发货' : 'Shipped from Malaysia'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pink-500 shrink-0" />
                  <span>+60 11-6257 3845</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-bakery-brown/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-bakery-brown/60 font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} Miaomiaoshops. {t('footer.rights')}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-pink-600">Privacy Policy</a>
              <a href="#" className="hover:text-pink-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
