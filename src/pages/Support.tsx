import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HelpCircle, Truck, RefreshCcw, MessageCircle, ChevronDown, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguageStore } from '../lib/store';

export default function Support() {
  const { t, language } = useLanguageStore();

  const faqData = [
    {
      q: language === 'cn' ? '你们的玩具安全吗？' : 'Are your toys safe?',
      a: language === 'cn' ? '当然！我们所有的玩具都经过严格的质量检测，采用无毒环保材质，符合国际安全标准。' : 'Absolutely! All our toys undergo strict quality testing, use non-toxic eco-friendly materials, and meet international safety standards.'
    },
    {
      q: language === 'cn' ? '下单后多久发货？' : 'How long does shipping take?',
      a: language === 'cn' ? '通常情况下，我们在收到订单后的 24-48 小时内完成发货。' : 'Typically, we ship orders within 24-48 hours of receiving them.'
    },
    {
      q: language === 'cn' ? '支持国际配送吗？' : 'Do you ship internationally?',
      a: language === 'cn' ? '是的，我们支持配送至新加坡、马来西亚、台湾等地。' : 'Yes, we ship to Singapore, Malaysia, Taiwan, and more.'
    }
  ];

  return (
    <div className="bg-bakery-cream min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-bakery-pink-light py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-bakery-brown mb-6"
          >
            {language === 'cn' ? '客户服务中心' : 'Customer Service Center'}
          </motion.h1>
          <p className="text-bakery-brown/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {language === 'cn' ? '我们在这里为您提供全方位的支持与帮助' : 'We are here to provide you with full support and assistance.'}
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-bakery-yellow/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bakery-mint/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* FAQ Section */}
            <section id="faq" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-bakery-yellow rounded-2xl">
                  <HelpCircle className="h-8 w-8 text-bakery-brown" />
                </div>
                <h2 className="text-3xl font-display font-black text-bakery-brown">{t('footer.faq')}</h2>
              </div>
              <div className="space-y-4">
                {faqData.map((item, i) => (
                  <details key={i} className="group bg-bakery-cream/30 rounded-2xl border-2 border-bakery-pink-light/20 overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-bold text-lg text-bakery-brown">{item.q}</span>
                      <ChevronDown className="h-5 w-5 text-pink-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-bakery-brown/70 font-medium leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Shipping Policy */}
            <section id="shipping" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-bakery-mint rounded-2xl">
                  <Truck className="h-8 w-8 text-bakery-brown" />
                </div>
                <h2 className="text-3xl font-display font-black text-bakery-brown">{t('footer.shipping')}</h2>
              </div>
              <p className="mb-4">
                <Link to="/shipping-policy" className="font-bold text-pink-600 hover:text-pink-700 underline underline-offset-2">
                  {language === 'cn' ? '查看完整配送政策（独立页面）' : 'View full shipping policy (dedicated page)'}
                </Link>
              </p>
              <div className="prose prose-pink max-w-none text-bakery-brown/70 font-medium space-y-4">
                <p>{language === 'cn' ? '我们致力于为您提供最快捷、最安全的配送服务。' : 'We are committed to providing you with the fastest and safest delivery service.'}</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{language === 'cn' ? '全场满 S$50 免运费。' : 'Free shipping on orders over S$50.'}</li>
                  <li>{language === 'cn' ? '标准配送时间：3-5 个工作日。' : 'Standard delivery time: 3-5 business days.'}</li>
                  <li>{language === 'cn' ? '支持实时物流追踪。' : 'Real-time logistics tracking supported.'}</li>
                </ul>
              </div>
            </section>

            {/* Returns Policy */}
            <section id="returns" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-bakery-pink-light rounded-2xl">
                  <RefreshCcw className="h-8 w-8 text-bakery-brown" />
                </div>
                <h2 className="text-3xl font-display font-black text-bakery-brown">
                  {language === 'cn' ? '退换货 售前须知' : 'Returns & Pre-sale Notice'}
                </h2>
              </div>
              <div className="prose prose-pink max-w-none text-bakery-brown/70 font-medium space-y-6">
                <div className="bg-pink-50 p-8 rounded-3xl border-2 border-bakery-pink-light/30">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-black text-bakery-brown text-lg mb-2">
                        {language === 'cn' ? '非质量问题不退不换：' : 'No returns for non-quality issues:'}
                      </h4>
                      <p className="text-bakery-brown/80">
                        {language === 'cn' 
                          ? '本店商品一经售出，非质量问题恕不接受退换货申请。' 
                          : 'Once sold, return or exchange requests for non-quality issues will not be accepted.'}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-bakery-pink-light/20">
                      <h4 className="font-black text-bakery-brown text-lg mb-2">
                        {language === 'cn' ? '拆封视同购买：' : 'Unboxing is final:'}
                      </h4>
                      <p className="text-bakery-brown/80">
                        {language === 'cn' 
                          ? '为保障所有顾客权益，包装一经拆封，由于影响二次销售，不可进行退换。' 
                          : 'To protect all customers\' rights, once the packaging is opened, it cannot be returned or exchanged as it affects secondary sales.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="space-y-8">
            <section id="contact" className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-white sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-bakery-blue rounded-2xl">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-display font-black text-bakery-brown">{t('footer.contact')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-bakery-cream rounded-lg mt-1">
                    <Phone className="h-5 w-5 text-bakery-brown" />
                  </div>
                  <div>
                    <p className="font-bold text-bakery-brown">{language === 'cn' ? '电话' : 'Phone'}</p>
                    <p className="text-bakery-brown/60">+60 11-6257 3845</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-bakery-cream rounded-lg mt-1">
                    <MapPin className="h-5 w-5 text-bakery-brown" />
                  </div>
                  <div>
                    <p className="font-bold text-bakery-brown">{language === 'cn' ? '地址' : 'Address'}</p>
                    <p className="text-bakery-brown/60">{language === 'cn' ? '马来西亚发货' : 'Shipped from Malaysia'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-bakery-cream rounded-lg mt-1">
                    <Clock className="h-5 w-5 text-bakery-brown" />
                  </div>
                  <div>
                    <p className="font-bold text-bakery-brown">{language === 'cn' ? '营业时间' : 'Business Hours'}</p>
                    <p className="text-bakery-brown/60">Mon - Sun: 10:00 - 22:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-bakery-pink text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-pink-400 transition-all"
                >
                  {language === 'cn' ? '在线客服' : 'Live Chat'}
                </motion.button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
