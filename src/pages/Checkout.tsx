import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowLeft, CreditCard, Truck, MapPin, Phone, User } from 'lucide-react';
import { useCartStore, useLanguageStore } from '../lib/store';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const { t, language, formatPrice } = useLanguageStore();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  const getItemName = (name: any) => {
    if (typeof name === 'string') return name;
    return name[language] || name.en;
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
        >
          <CheckCircle className="h-12 w-12 text-green-600" />
        </motion.div>
        <h2 className="text-4xl font-display font-bold text-bakery-brown mb-4">{t('checkout.successTitle')}</h2>
        <p className="text-bakery-brown/70 text-lg mb-12">{t('checkout.successSubtitle')}</p>
        <Link to="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-bakery-mint text-bakery-brown px-10 py-4 rounded-full font-bold text-lg shadow-[0_4px_0_#5C4033] hover:shadow-[0_0px_0_#5C4033] transition-all"
          >
            {t('checkout.backToHome')}
          </motion.button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-display font-bold text-bakery-brown mb-8">{t('cart.emptyTitle')}</h2>
        <Link to="/shop">
          <button className="bg-bakery-mint text-bakery-brown px-8 py-3 rounded-full font-bold">
            {t('cart.goShop')}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={() => navigate('/cart')}
          className="p-2 hover:bg-bakery-pink-light rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-bakery-brown" />
        </button>
        <h1 className="text-4xl font-display font-bold text-bakery-brown">{t('checkout.title')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-bakery-brown mb-6 flex items-center gap-3">
                <Truck className="h-6 w-6 text-bakery-pink" />
                {t('checkout.shippingInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-bakery-brown mb-2">{t('checkout.fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-bakery-brown/40" />
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-bakery-pink-light rounded-2xl focus:border-bakery-pink outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-bakery-brown mb-2">{t('checkout.address')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-bakery-brown/40" />
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-bakery-pink-light rounded-2xl focus:border-bakery-pink outline-none transition-colors"
                      placeholder="123 Candy Lane"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-bakery-brown mb-2">{t('checkout.city')}</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-bakery-pink-light rounded-2xl focus:border-bakery-pink outline-none transition-colors"
                    placeholder="Sweet Town"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-bakery-brown mb-2">{t('checkout.postalCode')}</label>
                  <input
                    required
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-bakery-pink-light rounded-2xl focus:border-bakery-pink outline-none transition-colors"
                    placeholder="12345"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-bakery-brown mb-2">{t('checkout.phone')}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-bakery-brown/40" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-bakery-pink-light rounded-2xl focus:border-bakery-pink outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-bakery-brown mb-6 flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-bakery-pink" />
                {t('checkout.paymentMethod')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${formData.paymentMethod === 'cod' 
                    ? 'border-bakery-pink bg-bakery-pink-light text-bakery-brown' 
                    : 'border-bakery-pink-light bg-white text-bakery-brown/60 hover:border-bakery-pink/50'}
                `}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="font-bold">{t('checkout.cod')}</span>
                </label>
                <label className={`
                  flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${formData.paymentMethod === 'card' 
                    ? 'border-bakery-pink bg-bakery-pink-light text-bakery-brown' 
                    : 'border-bakery-pink-light bg-white text-bakery-brown/60 hover:border-bakery-pink/50'}
                `}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="font-bold">{t('checkout.creditCard')}</span>
                </label>
              </div>
            </section>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing}
              type="submit"
              className="w-full bg-bakery-mint text-bakery-brown py-5 rounded-2xl font-bold text-xl shadow-[0_4px_0_#5C4033] hover:shadow-[0_0px_0_#5C4033] transition-all disabled:opacity-50"
            >
              {isProcessing ? t('checkout.processing') : t('checkout.placeOrder')}
            </motion.button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-bakery-pink-light sticky top-24">
            <h2 className="text-2xl font-display font-bold text-bakery-brown mb-8">{t('checkout.orderSummary')}</h2>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img 
                    src={item.imageUrl} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallbackImage;
                    }}
                    alt={getItemName(item.name)} 
                    className="w-20 h-20 object-cover rounded-xl bg-bakery-cream"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-bakery-brown line-clamp-1">{getItemName(item.name)}</h3>
                    <p className="text-bakery-brown/60 text-sm">Qty: {item.quantity}</p>
                    <p className="text-pink-500 font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t-2 border-bakery-pink-light pt-6">
              <div className="flex justify-between text-bakery-brown">
                <span>{t('cart.subtotal')}</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-bakery-brown">
                <span>{t('cart.shipping')}</span>
                <span className="font-bold text-green-500">{t('cart.free')}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-bakery-brown pt-2">
                <span>{t('cart.total')}</span>
                <span className="text-pink-500">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
