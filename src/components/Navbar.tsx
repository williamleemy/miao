import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Globe, Menu, X, Coins } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartStore, useLanguageStore, CURRENCIES, Currency } from '../lib/store';
import { BRAND_LOGO_SRC } from '../lib/brand';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { language, setLanguage, currency, setCurrency, t } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsShopHovered(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      const message = error instanceof Error ? error.message : '登录失败，请稍后重试。';
      window.alert(message);
    }
  };

  const shopCategories = [
    { name: t('nav.categories.pingu'), path: '/shop?category=Pingu' },
    { name: t('nav.categories.spongebob'), path: '/shop?category=SpongeBob' },
    { name: t('nav.categories.manor'), path: '/shop?category=Manor' },
    { name: t('nav.categories.elf'), path: '/shop?category=Elf' },
  ];

  return (
    <nav className="bg-bakery-pink-light shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between min-h-24 h-24 md:min-h-16 md:h-16 items-center">
          
          {/* Left: Hamburger (Mobile) / Logo (Desktop) */}
          <div className="flex items-center flex-1">
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 -ml-2 text-bakery-brown hover:text-pink-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Logo */}
            <Link to="/" className="hidden md:flex items-center gap-2" onClick={closeMenu}>
              <img
                src={BRAND_LOGO_SRC}
                alt="Miaomiaoshops"
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover shrink-0"
                width={64}
                height={64}
                decoding="async"
              />
              <span className="font-display text-2xl lg:text-3xl text-bakery-brown font-bold tracking-wider hidden lg:block">
                Miaomiaoshops
              </span>
            </Link>
          </div>
          
          {/* Center: Logo (Mobile) / Links (Desktop) */}
          <div className="flex items-center justify-center flex-[2]">
            {/* Mobile Logo */}
            <Link to="/" className="md:hidden flex items-center justify-center" onClick={closeMenu}>
              <img
                src={BRAND_LOGO_SRC}
                alt="Miaomiaoshops"
                className="h-20 w-20 rounded-full object-cover shrink-0 shadow-sm"
                width={80}
                height={80}
                decoding="async"
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
              <Link to="/" className="text-bakery-brown font-bold hover:text-pink-600 transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('nav.home')}
              </Link>
              <Link to="/shop" className="text-bakery-brown font-bold hover:text-pink-600 transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('nav.allProducts')}
              </Link>
              <Link to="/shop?tag=NewArrival" className="text-bakery-brown font-bold hover:text-pink-600 transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('nav.newArrivals')}
              </Link>
              <Link to="/shop?tag=Limited" className="text-bakery-brown font-bold hover:text-pink-600 transition-colors text-sm lg:text-base whitespace-nowrap">
                {t('nav.monthlyLimited')}
              </Link>
              
              {/* Theme Series with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
              >
                <button 
                  className="text-bakery-brown font-bold hover:text-pink-600 transition-colors text-sm lg:text-base whitespace-nowrap flex items-center gap-1 py-4"
                >
                  {t('nav.series')}
                </button>
                
                <AnimatePresence>
                  {isShopHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-xl border-2 border-bakery-pink-light overflow-hidden py-2"
                    >
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => setIsShopHovered(false)}
                          className="block px-4 py-2 text-bakery-brown font-medium hover:bg-bakery-pink-light hover:text-pink-600 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Right: Controls (Language, Cart, Desktop Login) */}
          <div className="flex items-center justify-end flex-1 gap-2 sm:gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 text-bakery-brown hover:text-pink-600 transition-colors font-bold bg-white/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                title="Select Currency"
              >
                <Coins className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{currency}</span>
              </motion.button>

              <AnimatePresence>
                {isCurrencyOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsCurrencyOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border-2 border-bakery-pink-light overflow-hidden py-2 z-20"
                    >
                      {(Object.keys(CURRENCIES) as Currency[]).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setCurrency(curr);
                            setIsCurrencyOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${
                            currency === curr 
                              ? 'bg-bakery-pink-light text-pink-600' 
                              : 'text-bakery-brown hover:bg-bakery-pink-light/50'
                          }`}
                        >
                          {CURRENCIES[curr].symbol} {CURRENCIES[curr].label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-bakery-brown hover:text-pink-600 transition-colors font-bold bg-white/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
              title="Toggle Language"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase hidden sm:inline">{language}</span>
            </motion.button>

            <Link to="/cart" className="relative text-bakery-brown hover:text-pink-600 transition-colors" onClick={closeMenu}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-bakery-mint text-bakery-brown text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Desktop Login/User */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full border-2 border-white"
                    />
                    <span className="text-sm font-medium hidden xl:block">{user.displayName}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={logout}
                    className="text-bakery-brown hover:text-pink-600 transition-colors"
                    title="Log out"
                  >
                    <LogOut className="h-5 w-5" />
                  </motion.button>
                </div>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 bg-white text-bakery-brown px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all hover:bg-bakery-yellow"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">{t('nav.login')}</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-bakery-pink-light overflow-hidden shadow-lg absolute w-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link 
                to="/" 
                onClick={closeMenu} 
                className="block px-3 py-3 rounded-xl text-lg font-bold text-bakery-brown hover:bg-bakery-pink-light hover:text-pink-600 transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/shop" 
                onClick={closeMenu} 
                className="block px-3 py-3 rounded-xl text-lg font-bold text-bakery-brown hover:bg-bakery-pink-light hover:text-pink-600 transition-colors"
              >
                {t('nav.allProducts')}
              </Link>
              <Link 
                to="/shop?tag=NewArrival" 
                onClick={closeMenu} 
                className="block px-3 py-3 rounded-xl text-lg font-bold text-bakery-brown hover:bg-bakery-pink-light hover:text-pink-600 transition-colors"
              >
                {t('nav.newArrivals')}
              </Link>
              <Link 
                to="/shop?tag=Limited" 
                onClick={closeMenu} 
                className="block px-3 py-3 rounded-xl text-lg font-bold text-bakery-brown hover:bg-bakery-pink-light hover:text-pink-600 transition-colors"
              >
                {t('nav.monthlyLimited')}
              </Link>
              
              <div className="px-3 py-3 text-lg font-bold text-bakery-brown border-t border-bakery-pink-light mt-2">
                {t('nav.series')}
              </div>

              {/* Mobile Sub-categories */}
              <div className="pl-6 space-y-1">
                {shopCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-bakery-brown/80 hover:bg-bakery-pink-light hover:text-pink-600 transition-colors"
                  >
                    • {cat.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 mt-2 border-t border-bakery-pink-light">
                {user ? (
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} 
                        alt="Profile" 
                        className="h-10 w-10 rounded-full border-2 border-bakery-pink" 
                      />
                      <span className="font-bold text-bakery-brown">{user.displayName || user.email}</span>
                    </div>
                    <button 
                      onClick={() => { logout(); closeMenu(); }} 
                      className="p-2 text-bakery-brown hover:text-pink-600 bg-bakery-pink-light rounded-full"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={async () => { await handleGoogleLogin(); closeMenu(); }} 
                    className="w-full flex items-center justify-center gap-2 bg-bakery-yellow text-bakery-brown px-4 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all text-lg"
                  >
                    <User className="h-5 w-5" />
                    <span>{t('nav.login')}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
