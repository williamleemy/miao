import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, useLanguageStore } from '../lib/store';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const { user, signInWithGoogle } = useAuth();
  const { t, language, formatPrice } = useLanguageStore();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (error) {
        const message = error instanceof Error ? error.message : '登录失败，请稍后重试。';
        window.alert(message);
      }
      return;
    }
    navigate('/checkout');
  };

  const getItemName = (name: any) => {
    if (typeof name === 'string') return name;
    return name[language] || name.en;
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 py-24 text-center"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-24 h-24 bg-bakery-pink-light rounded-full mb-6"
        >
          <ShoppingBag className="h-12 w-12 text-bakery-brown" />
        </motion.div>
        <h2 className="text-3xl font-display font-bold text-bakery-brown mb-4">{t('cart.emptyTitle')}</h2>
        <p className="text-bakery-brown/70 mb-8">{t('cart.emptySubtitle')}</p>
        <Link to="/shop">
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-bakery-mint text-bakery-brown px-8 py-4 rounded-full font-bold text-lg shadow-[0_4px_0_#5C4033] hover:shadow-[0_0px_0_#5C4033] transition-shadow"
          >
            {t('cart.goShop')}
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-display font-bold text-bakery-brown mb-6 md:mb-8"
      >
        {t('cart.title')}
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={item.id} 
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white p-4 rounded-3xl shadow-sm border-2 border-bakery-pink-light"
              >
                <img 
                  src={item.imageUrl} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  alt={getItemName(item.name)} 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl bg-bakery-cream"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-bakery-brown mb-2">{getItemName(item.name)}</h3>
                  <p className="text-pink-500 font-bold text-lg">{formatPrice(item.price)}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-bakery-cream rounded-full border-2 border-bakery-pink-light p-1">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors text-bakery-brown"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <span className="w-8 text-center font-bold text-bakery-brown">{item.quantity}</span>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors text-bakery-brown"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: '#fef2f2' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-red-400 hover:text-red-600 rounded-full transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-bakery-pink-light sticky top-24">
            <h3 className="text-2xl font-display font-bold text-bakery-brown mb-6">{t('cart.summary')}</h3>
            
            <div className="space-y-4 mb-6 text-bakery-brown">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('cart.shipping')}</span>
                <span className="font-bold">{t('cart.free')}</span>
              </div>
              <div className="border-t-2 border-bakery-pink-light pt-4 flex justify-between text-xl font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-pink-500">{formatPrice(total)}</span>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { void handleCheckout(); }}
              className="w-full flex items-center justify-center gap-2 bg-bakery-mint text-bakery-brown px-6 py-4 rounded-full font-bold text-lg shadow-[0_4px_0_#5C4033] hover:shadow-[0_0px_0_#5C4033] transition-shadow"
            >
              {user ? t('cart.checkout') : t('cart.loginCheckout')} <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
