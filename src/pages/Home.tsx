import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Send, MessageSquare, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { useLanguageStore, useCartStore } from '../lib/store';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../lib/data';
import { motion } from 'motion/react';
import BannerBoard from '../components/BannerBoard';

export default function Home() {
  const { t, language, formatPrice, unitsPerUsd } = useLanguageStore();
  const addItem = useCartStore((state) => state.addItem);

  const getCardPriceUsd = (product: (typeof MOCK_PRODUCTS)[number]) => {
    if (product.id === '1') return 49 / unitsPerUsd.MYR;
    if (product.id === '4') return 60 / unitsPerUsd.MYR;
    if (product.id === '6') return 75 / unitsPerUsd.MYR;
    if (product.id === '10') return 10 / unitsPerUsd.MYR;
    if (product.id === '14') return 50 / unitsPerUsd.MYR;
    if (product.id === '20') return 10 / unitsPerUsd.MYR;
    if (product.id === '22') return 69.9 / unitsPerUsd.MYR;
    if (product.id === '23') return 55.9 / unitsPerUsd.MYR;
    if (product.id === '8') return 55 / unitsPerUsd.MYR;
    if ((product as any).series?.en === 'Pingu' && product.id !== '22') return 59 / unitsPerUsd.MYR;
    return product.price;
  };

  const bestSellers = MOCK_PRODUCTS.filter(p => (p as any).tags?.includes('BestSeller'));
  const newArrivals = MOCK_PRODUCTS.filter(p => (p as any).tags?.includes('NewArrival'));
  const monthlyLimited = MOCK_PRODUCTS.filter(p => (p as any).tags?.includes('Limited'));
  
  const spongebobItems = MOCK_PRODUCTS.filter(p => p.category.en === 'SpongeBob');
  const sanrioItems = MOCK_PRODUCTS.filter(p => p.category.en === 'Sanrio');
  const originalItems = MOCK_PRODUCTS.filter(p => p.category.en === 'Original');
  const moreTreasuresItems = MOCK_PRODUCTS.filter(p => p.category.en === 'More');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('home.contactSuccess'));
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-bakery-pink-light overflow-hidden bg-grid-pattern">
        {/* Floating Cute Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-pink-400 opacity-60 hidden md:block"
        >
          <Heart className="h-12 w-12 fill-current" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-[15%] text-bakery-yellow opacity-80 hidden md:block"
        >
          <Sparkles className="h-16 w-16 fill-current" />
        </motion.div>

        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #5C4033 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>
        
        <HeroCarousel />
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-bakery-yellow rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-10 -right-10 w-40 h-40 bg-bakery-mint rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
      </section>

      {/* Main Sections */}
      <ProductSection title={t('home.bestSellers')} items={bestSellers} t={t} language={language} addItem={addItem} tag="BestSeller" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />
      <ProductSection title={t('home.newArrivals')} items={newArrivals} t={t} language={language} addItem={addItem} tag="NewArrival" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />
      <ProductSection title={t('home.monthlyLimited')} items={monthlyLimited} t={t} language={language} addItem={addItem} tag="Limited" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />

      {/* Series Sections */}
      <SeriesSection title={t('home.spongebobSeries')} items={spongebobItems} t={t} language={language} addItem={addItem} category="SpongeBob" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />
      <SeriesSection title={t('home.sanrioSeries')} items={sanrioItems} t={t} language={language} addItem={addItem} category="Sanrio" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />
      <SeriesSection title={t('home.originalSeries')} items={originalItems} t={t} language={language} addItem={addItem} category="Original" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />
      <SeriesSection title={t('home.more')} items={moreTreasuresItems} t={t} language={language} addItem={addItem} category="More" formatPrice={formatPrice} getCardPriceUsd={getCardPriceUsd} />

      {/* Auto-scrolling Reviews Section */}
      <section className="py-12 md:py-20 bg-bakery-blue/20 overflow-hidden bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-bakery-brown flex items-center justify-center gap-2 md:gap-3 bg-white/60 backdrop-blur-sm inline-flex px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-white shadow-sm">
            <MessageSquare className="text-bakery-blue h-6 w-6 md:h-8 md:w-8" />
            {t('home.reviewsTitle')}
          </h2>
        </div>
        
        <div className="relative w-full overflow-hidden whitespace-nowrap flex flex-col gap-4 md:gap-6">
          <div className="inline-flex animate-marquee gap-4 md:gap-6 px-3 hover:[animation-play-state:paused]">
            {/* Double the array for seamless looping */}
            {[...MOCK_REVIEWS, ...MOCK_REVIEWS].map((review, i) => (
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                key={`row1-${review.id}-${i}`} 
                className="w-64 md:w-80 whitespace-normal bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border-2 border-bakery-blue/30 inline-block cursor-pointer"
              >
                <div className="flex text-bakery-yellow mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 md:h-5 md:w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-bakery-brown/80 font-medium mb-2 md:mb-4 text-sm md:text-base line-clamp-3">"{review.text[language]}"</p>
                <p className="text-bakery-brown font-bold font-display text-sm md:text-base">- {review.name}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="inline-flex animate-marquee [animation-direction:reverse] gap-4 md:gap-6 px-3 hover:[animation-play-state:paused]">
            {/* Reverse the array for the second row for variety */}
            {[...MOCK_REVIEWS].reverse().concat([...MOCK_REVIEWS].reverse()).map((review, i) => (
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                key={`row2-${review.id}-${i}`} 
                className="w-64 md:w-80 whitespace-normal bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border-2 border-bakery-blue/30 inline-block cursor-pointer"
              >
                <div className="flex text-bakery-yellow mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 md:h-5 md:w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-bakery-brown/80 font-medium mb-2 md:mb-4 text-sm md:text-base line-clamp-3">"{review.text[language]}"</p>
                <p className="text-bakery-brown font-bold font-display text-sm md:text-base">- {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 md:py-20 bg-bakery-cream bg-grid-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-xl border-2 md:border-4 border-bakery-pink-light relative"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 bg-bakery-yellow rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
            
            <div className="text-center mb-8 md:mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-bakery-brown mb-3 md:mb-4">{t('home.contactTitle')}</h2>
              <div className="w-16 md:w-24 h-2 bg-bakery-mint mx-auto rounded-full"></div>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-bakery-brown font-bold mb-2 ml-2">{t('home.contactName')}</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-bakery-cream/50 border-2 border-bakery-pink-light rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-bakery-brown font-bold mb-2 ml-2">{t('home.contactEmail')}</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-bakery-cream/50 border-2 border-bakery-pink-light rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-bakery-brown font-bold mb-2 ml-2">{t('home.contactMessage')}</label>
                <textarea 
                  rows={4}
                  required
                  className="w-full bg-bakery-cream/50 border-2 border-bakery-pink-light rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors resize-none"
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-bakery-pink text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_4px_0_#d81b60] hover:shadow-[0_0px_0_#d81b60] transition-all"
              >
                <Send className="h-5 w-5" /> {t('home.contactSubmit')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HeroCarousel() {
  const AUTO_PLAY_MS = 10000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isAutoScrolling = useRef(false);
  const autoScrollUnlockTimerRef = useRef<number | null>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const homeBannerPath = encodeURI('/banners/banner1/ad/ChatGPT Image May 1, 2026, 12_14_21 AM.png');
  const homeBannerPath2 = encodeURI('/banners/banner2/ad/ChatGPT Image May 1, 2026, 01_09_24 AM.png');
  const homeBannerPath3 = encodeURI('/banners/banner3/ad/ChatGPT Image May 1, 2026, 01_45_03 AM.png');

  const BANNERS = [
    homeBannerPath,
    homeBannerPath2,
    homeBannerPath3,
  ];

  const bannerLinks: Array<string | null> = [
    '/shop?category=Pingu',
    '/shop?category=SpongeBob',
    '/shop?category=Manor',
  ];

  const FALLBACK_BANNERS = [
    homeBannerPath,
    homeBannerPath2,
    homeBannerPath3,
  ];

  useEffect(() => {
    if (BANNERS.length <= 1 || isInteracting) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, AUTO_PLAY_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [BANNERS.length, isInteracting]);

  useEffect(() => {
    if (scrollRef.current && !isDragging.current) {
      const scrollWidth = scrollRef.current.clientWidth;
      isAutoScrolling.current = true;
      scrollRef.current.scrollTo({
        left: currentIndex * scrollWidth,
        behavior: 'smooth'
      });

      if (autoScrollUnlockTimerRef.current) {
        window.clearTimeout(autoScrollUnlockTimerRef.current);
      }
      autoScrollUnlockTimerRef.current = window.setTimeout(() => {
        isAutoScrolling.current = false;
      }, 500);
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (autoScrollUnlockTimerRef.current) {
        window.clearTimeout(autoScrollUnlockTimerRef.current);
      }
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current && !isDragging.current) {
      if (isAutoScrolling.current) return;
      const scrollWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollRef.current.scrollLeft / scrollWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsInteracting(true);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.classList.remove('snap-x');
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.classList.add('snap-x');
        const scrollWidth = scrollRef.current.clientWidth;
        const newIndex = Math.round(scrollRef.current.scrollLeft / scrollWidth);
        setCurrentIndex(newIndex);
        scrollRef.current.scrollTo({
          left: newIndex * scrollWidth,
          behavior: 'smooth'
        });
      }
      setIsInteracting(false);
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.classList.add('snap-x');
        const scrollWidth = scrollRef.current.clientWidth;
        const newIndex = Math.round(scrollRef.current.scrollLeft / scrollWidth);
        setCurrentIndex(newIndex);
        scrollRef.current.scrollTo({
          left: newIndex * scrollWidth,
          behavior: 'smooth'
        });
      }
      setIsInteracting(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = () => {
    setIsInteracting(true);
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden border-4 md:border-8 border-white shadow-[0_30px_100px_rgba(0,0,0,0.2)] bg-white aspect-[16/9] md:aspect-[21/9]"
      >
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'smooth' }}
        >
          {BANNERS.map((banner, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 snap-center relative">
              {bannerLinks[index] ? (
                <Link to={bannerLinks[index]} className="block w-full h-full">
                  <img
                    src={banner}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_BANNERS[index];
                    }}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              ) : (
                <img
                  src={banner}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_BANNERS[index];
                  }}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Dots */}
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125 shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/** 手机端：透明左右滑动提示，约 5 秒内淡入淡出 3 次；用户横滑或播完即不再出现 */
function MobileHorizontalSwipeHint({
  scrollRef,
  watchKey,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  watchKey: string | number;
}) {
  const [show, setShow] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    dismissed.current = false;
    setShow(false);
  }, [watchKey]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const sync = () => {
      if (dismissed.current) {
        setShow(false);
        return;
      }
      const mobile = window.matchMedia('(max-width: 639px)').matches;
      const overflow = el.scrollWidth > el.clientWidth + 2;
      setShow(mobile && overflow);
    };

    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) sync();
      });
    });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener('resize', sync);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [scrollRef, watchKey]);

  const dismiss = useCallback(() => {
    dismissed.current = true;
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    const el = scrollRef.current;
    if (!el) return;
    const startLeft = el.scrollLeft;
    const dismissNotBefore = Date.now() + 550;

    const canDismiss = () => Date.now() >= dismissNotBefore;

    const onScroll = () => {
      if (!canDismiss()) return;
      if (Math.abs(el.scrollLeft - startLeft) > 10) dismiss();
    };

    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0]?.clientX ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!canDismiss()) return;
      const x = e.touches[0]?.clientX ?? touchStartX;
      if (Math.abs(x - touchStartX) > 20) dismiss();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [show, scrollRef, dismiss]);

  if (!show) return null;

  return (
    <motion.div
      className="sm:hidden pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
      transition={{ duration: 5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (!dismissed.current) {
          dismissed.current = true;
          setShow(false);
        }
      }}
    >
      <div className="w-12 flex justify-center bg-gradient-to-r from-black/10 to-transparent">
        <ChevronLeft className="h-8 w-8 text-bakery-brown/45" strokeWidth={2.25} aria-hidden />
      </div>
      <div className="flex-1 min-w-0" />
      <div className="w-12 flex justify-center bg-gradient-to-l from-black/10 to-transparent">
        <ChevronRight className="h-8 w-8 text-bakery-brown/45" strokeWidth={2.25} aria-hidden />
      </div>
    </motion.div>
  );
}

function ProductSection({ title, items, t, language, addItem, tag, formatPrice, getCardPriceUsd, showCategories = false }: { title: string, items: any[], t: any, language: any, addItem: any, tag: string, formatPrice: (price: number) => string, getCardPriceUsd: (product: any) => number, showCategories?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const bestSellerBannerPath = encodeURI('/banners/人气热卖banner/ChatGPT Image May 3, 2026, 12_24_42 AM.png');
  const newArrivalBannerPath = encodeURI('/banners/新品首发banner/ChatGPT Image May 3, 2026, 01_53_00 PM.png');
  const monthlyLimitedBannerPath = encodeURI('/banners/本月限定banner/ChatGPT Image May 3, 2026, 02_17_06 PM.png');

  const categories = [
    'All', 
    'Plushies', 
    'Wooden', 
    'Educational', 
    'Puzzles', 
    'Pretend Play', 
    'SpongeBob', 
    'Peppa Pig', 
    'Disney', 
    'Pokemon', 
    'Doraemon', 
    'Sanrio', 
    'More', 
    'Bags', 
    'Original'
  ];

  const getCategoryKey = (cat: string) => {
    switch(cat) {
      case 'Plushies': return 'plushies';
      case 'Wooden': return 'wooden';
      case 'Educational': return 'educational';
      case 'Puzzles': return 'puzzles';
      case 'Pretend Play': return 'pretendPlay';
      case 'SpongeBob': return 'spongebob';
      case 'Peppa Pig': return 'peppaPig';
      case 'Disney': return 'disney';
      case 'Pokemon': return 'pokemon';
      case 'Doraemon': return 'doraemon';
      case 'Sanrio': return 'sanrio';
      case 'More': return 'more';
      case 'Bags': return 'bags';
      case 'Original': return 'original';
      default: return cat.toLowerCase();
    }
  };

  const filteredItems = showCategories && activeCategory !== 'All' 
    ? items.filter(item => item.category.en === activeCategory)
    : items;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.style.scrollBehavior = 'smooth';
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.classList.remove('snap-x');
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.add('snap-x');
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.add('snap-x');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-bakery-cream bg-grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white shadow-sm"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <Star className="text-bakery-yellow fill-bakery-yellow h-6 w-6 md:h-8 md:w-8" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-bakery-brown">
              {title}
            </h2>
          </motion.div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="hidden sm:flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')} 
                className="p-2 md:p-3 rounded-full bg-bakery-pink text-white shadow-sm hover:bg-pink-400 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')} 
                className="p-2 md:p-3 rounded-full bg-bakery-pink text-white shadow-sm hover:bg-pink-400 transition-colors"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
            </div>
            <Link to={`/shop?tag=${tag}`} className="text-pink-500 font-bold hover:text-pink-600 flex items-center gap-1 bg-white/80 px-4 py-2 rounded-full text-sm md:text-base shadow-sm">
              {t('home.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Section Banner Board */}
        <BannerBoard 
          src={
            tag === 'BestSeller' ? bestSellerBannerPath :
            tag === 'NewArrival' ? newArrivalBannerPath :
            tag === 'Limited' ? monthlyLimitedBannerPath :
            tag === 'All' ? "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1600" :
            "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=1600"
          }
          alt={`${title} Banner`}
          aspectRatio={
            tag === 'BestSeller'
              ? "aspect-[1927/816]"
              : tag === 'NewArrival'
                ? "aspect-[1024/456]"
                : tag === 'Limited'
                  ? "aspect-[1914/822]"
                  : undefined
          }
          imageClassName={
            tag === 'NewArrival' || tag === 'Limited'
              ? "object-contain group-hover:scale-100"
              : undefined
          }
          className="mb-10"
        />

        {showCategories && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
                  activeCategory === cat 
                    ? 'bg-bakery-pink text-white border-bakery-pink shadow-md scale-105' 
                    : 'bg-white text-bakery-brown border-bakery-pink-light hover:border-bakery-pink'
                }`}
              >
                {cat === 'All' ? t('shop.all') : t(`nav.categories.${getCategoryKey(cat)}`)}
              </button>
            ))}
          </div>
        )}
        
        <div className="relative isolate">
        <div 
          ref={scrollRef}
          className="relative z-0 flex overflow-x-auto gap-4 md:gap-8 pb-8 snap-x scrollbar-hide cursor-grab active:cursor-grabbing select-none -mx-4 px-4 sm:mx-0 sm:px-0"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {filteredItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="min-w-[200px] md:min-w-[280px] bg-white rounded-2xl md:rounded-[2.5rem] p-3 md:p-6 shadow-md border-2 border-bakery-pink-light transition-shadow hover:shadow-xl flex flex-col snap-start"
            >
              <Link to={`/product/${item.id}`} className="aspect-square rounded-xl md:rounded-[2rem] overflow-hidden mb-3 md:mb-6 bg-bakery-pink-light/30 block">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={item.imageUrl} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  alt={item.name.en} 
                  className="w-full h-full object-cover mix-blend-multiply" 
                  draggable={false}
                  referrerPolicy="no-referrer" 
                />
              </Link>
              <Link to={`/product/${item.id}`} className="block hover:text-pink-500 transition-colors">
                <h3 className="text-sm md:text-xl font-display font-bold text-bakery-brown mb-1 md:mb-2 line-clamp-1 hover:text-inherit transition-colors">
                  {item.name[language]}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-auto pt-2">
                <p className="text-pink-500 font-bold text-base md:text-lg">{formatPrice(getCardPriceUsd(item))}</p>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addItem({ ...item, quantity: 1 })}
                  className="bg-bakery-mint text-bakery-brown w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-lg hover:bg-green-300 transition-colors shadow-sm flex items-center justify-center"
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
          <MobileHorizontalSwipeHint
            scrollRef={scrollRef}
            watchKey={`${tag}-${activeCategory}-${filteredItems.length}`}
          />
        </div>
      </div>
    </section>
  );
}

function SeriesSection({ title, items, t, language, addItem, category, formatPrice, getCardPriceUsd }: { title: string, items: any[], t: any, language: any, addItem: any, category: string, formatPrice: (price: number) => string, getCardPriceUsd: (product: any) => number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.style.scrollBehavior = 'smooth';
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.classList.remove('snap-x');
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.add('snap-x');
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.classList.add('snap-x');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white border-y-2 border-bakery-pink-light border-dashed bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-10 gap-4">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-bakery-brown flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-bakery-pink-light shadow-sm">
            <Sparkles className="text-pink-400 h-6 w-6 md:h-8 md:w-8" />
            {title}
          </h2>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="hidden sm:flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')} 
                className="p-2 md:p-3 rounded-full bg-bakery-pink text-white shadow-sm hover:bg-pink-400 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')} 
                className="p-2 md:p-3 rounded-full bg-bakery-pink text-white shadow-sm hover:bg-pink-400 transition-colors"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
            </div>
            <Link to={`/shop?category=${category}`} className="text-pink-500 font-bold hover:text-pink-600 flex items-center gap-1 bg-white/80 px-4 py-2 rounded-full text-sm md:text-base">
              {t('home.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Series Banner Board */}
        <BannerBoard 
          src={
            category === 'SpongeBob' ? "https://images.unsplash.com/photo-1596461404969-9ce20f71881b?auto=format&fit=crop&q=80&w=1600" :
            category === 'Sanrio' ? "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1600" :
            category === 'Original' ? "https://images.unsplash.com/photo-1558060370-d64111d20163?auto=format&fit=crop&q=80&w=1600" :
            "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?auto=format&fit=crop&q=80&w=1600"
          }
          alt={`${title} Banner`}
          className="mb-10"
        />
        
        <div className="relative isolate">
        <div 
          ref={scrollRef}
          className="relative z-0 flex overflow-x-auto gap-4 md:gap-6 pb-6 md:pb-8 snap-x scrollbar-hide cursor-grab active:cursor-grabbing select-none -mx-4 px-4 sm:mx-0 sm:px-0"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] bg-bakery-cream rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-md border-2 border-bakery-yellow snap-start flex flex-col relative overflow-hidden"
            >
              <Link to={`/product/${item.id}`} className="aspect-square rounded-2xl overflow-hidden mb-4 bg-white relative block">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={item.imageUrl} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  alt={item.name.en} 
                  className="w-full h-full object-cover" 
                  draggable={false}
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-bakery-brown shadow-sm">
                  {item.category[language]}
                </div>
              </Link>
              <Link to={`/product/${item.id}`} className="block hover:text-pink-500 transition-colors">
                <h3 className="text-lg font-display font-bold text-bakery-brown mb-1 line-clamp-1 hover:text-inherit transition-colors">
                  {item.name[language]}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-auto pt-4">
                <span className="text-xl font-bold text-pink-500">{formatPrice(getCardPriceUsd(item))}</span>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addItem({ ...item, quantity: 1 })}
                  className="bg-bakery-pink text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-pink-400 transition-colors shadow-sm"
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
          <MobileHorizontalSwipeHint scrollRef={scrollRef} watchKey={`${category}-${items.length}`} />
        </div>
      </div>
    </section>
  );
}
