import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Truck } from 'lucide-react';
import { useLanguageStore } from '../lib/store';
import ShippingSubsidyPanel from '../components/ShippingSubsidyPanel';

export default function ShippingPolicy() {
  const { t, language } = useLanguageStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isCn = language === 'cn';

  return (
    <div className="bg-bakery-cream min-h-screen pb-20">
      <section className="bg-bakery-pink-light py-14 md:py-20 relative overflow-hidden border-b-4 border-bakery-pink/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-bakery-brown/70 hover:text-pink-600 font-bold text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isCn ? '返回首页' : 'Back to home'}
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border-2 border-white">
              <Truck className="h-9 w-9 text-bakery-brown" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-bakery-brown leading-tight">
              {t('footer.shipping')}
            </h1>
          </motion.div>
          <p className="text-bakery-brown/75 font-medium text-lg">
            {isCn
              ? '尊享免运费与补贴说明；下单前也可通过 WhatsApp 联系客服确认最终金额。'
              : 'Premium free-shipping and subsidy details. You can also confirm your final total via WhatsApp before ordering.'}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-bakery-yellow/25 rounded-full translate-x-1/3 -translate-y-1/4 blur-3xl pointer-events-none" />
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <ShippingSubsidyPanel embed="page" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="text-center text-sm text-bakery-brown/60 font-medium"
        >
          <Link to="/support#contact" className="text-pink-600 font-bold hover:underline underline-offset-2">
            {isCn ? '其他问题 · 联系客服' : 'Other questions · Customer service'}
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
