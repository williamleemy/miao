import React, { useState, useEffect } from 'react';
import { Plus, Search, Trophy, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { useCartStore, useLanguageStore } from '../lib/store';
import { getCardPriceUsd } from '../lib/cardPriceUsd';
import { SECTION_BANNER_PATHS } from '../lib/bannerPaths';
import { MOCK_PRODUCTS } from '../lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, Link } from 'react-router-dom';
import BannerBoard from '../components/BannerBoard';

export default function Shop() {
  const addItem = useCartStore((state) => state.addItem);
  const { t, language, formatPrice, unitsPerUsd } = useLanguageStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    if (category) {
      setActiveCategory(category);
      setActiveTag(null);
    } else if (tag) {
      setActiveTag(tag);
      setActiveCategory('All');
    } else {
      setActiveCategory('All');
      setActiveTag(null);
    }
  }, [searchParams]);

  const mainCategories = [
    'All', 
    'DailyLimited', 
    'HealingSeries', 
    'LogicCake', 
    'CoBranded'
  ];

  const themeCategories = [
    'Pingu',
    'SpongeBob', 
    'Manor', 
    'Elf'
  ];

  const isThemeContext = themeCategories.includes(activeCategory);
  const currentCategories = isThemeContext ? themeCategories : mainCategories;

  const getCategoryKey = (cat: string) => {
    switch(cat) {
      case 'DailyLimited': return 'dailyLimited';
      case 'HealingSeries': return 'healingSeries';
      case 'LogicCake': return 'logicCake';
      case 'CoBranded': return 'coBranded';
      case 'SpongeBob': return 'spongebob';
      case 'Pingu': return 'pingu';
      case 'Manor': return 'manor';
      case 'Elf': return 'elf';
      default: return cat.toLowerCase();
    }
  };
  
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || 
                            p.category.en === activeCategory || 
                            (p as any).series?.en === activeCategory;
    const matchesTag = !activeTag || (p as any).tags?.includes(activeTag);
    const matchesSearch = p.name[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.name.en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    searchParams.delete('tag');
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const getCategoryName = (catEn: string) => {
    if (catEn === 'All') return t('shop.all');
    return t(`nav.categories.${getCategoryKey(catEn)}`);
  };

  const isBestSeller = activeTag === 'BestSeller';
  const isNewArrival = activeTag === 'NewArrival';
  const isLimited = activeTag === 'Limited';
  const allProductsMobileBanner = encodeURI('/banners/所有产品banner/手机端ads/all-products-mobile.png');
  const dailyLimitedMobileBanner = encodeURI('/banners/每日限量banner/手机端banner/daily-limited-mobile.png');
  const healingSeriesMobileBanner = encodeURI('/banners/治愈系列banner/手机端ads/healing-series-mobile.png');
  const giftPicksMobileBanner = encodeURI('/banners/礼物精选banner/手机端ads/gift-picks-mobile.png');
  const coBrandedMobileBanner = encodeURI('/banners/联名限定款banner/手机端ads/co-branded-mobile.png');

  const getBannerConfig = () => {
    const pinguSeriesBanner = encodeURI('/banners/banner1/pingu 系列ads/pingu-series.png');
    const allProductsBanner = encodeURI('/banners/所有产品banner/ads/all-products.png');
    const dailyLimitedBanner = encodeURI('/banners/每日限量banner/daily-limited-desktop.png');

    if (isBestSeller) {
      return {
        title: t('shop.bestSellerTitle'),
        subtitle: t('shop.bestSellerSubtitle'),
        leftImg: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
        rightImg: "https://images.unsplash.com/photo-1585244343909-dd5bf84db222?auto=format&fit=crop&q=80&w=600",
        bgColor: 'bg-gradient-to-r from-bakery-yellow/40 via-white to-bakery-yellow/40',
        borderColor: 'border-bakery-yellow',
        badge: 'TOP RANKING',
        badgeIcon: <Trophy className="h-4 w-4" />
      };
    }
    if (isNewArrival) {
      return {
        title: t('shop.newArrivalTitle'),
        subtitle: t('shop.newArrivalSubtitle'),
        leftImg: SECTION_BANNER_PATHS.newArrival,
        rightImg: SECTION_BANNER_PATHS.newArrival,
        bgColor: 'bg-gradient-to-r from-bakery-mint/40 via-white to-bakery-mint/40',
        borderColor: 'border-bakery-mint',
        badge: 'NEW IN',
        badgeIcon: <Star className="h-4 w-4" />
      };
    }
    if (isLimited) {
      return {
        title: t('shop.limitedTitle'),
        subtitle: t('shop.limitedSubtitle'),
        leftImg: SECTION_BANNER_PATHS.monthlyLimited,
        rightImg: SECTION_BANNER_PATHS.monthlyLimited,
        bgColor: 'bg-gradient-to-r from-bakery-pink-light/60 via-white to-bakery-pink-light/60',
        borderColor: 'border-bakery-pink',
        badge: 'LIMITED EDITION',
        badgeIcon: <TrendingUp className="h-4 w-4" />
      };
    }
    if (activeCategory === 'Pingu') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: pinguSeriesBanner,
        rightImg: pinguSeriesBanner,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'DailyLimited') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: dailyLimitedBanner,
        rightImg: dailyLimitedBanner,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'HealingSeries') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: SECTION_BANNER_PATHS.healingSeries,
        rightImg: SECTION_BANNER_PATHS.healingSeries,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'LogicCake') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: SECTION_BANNER_PATHS.giftPicks,
        rightImg: SECTION_BANNER_PATHS.giftPicks,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'CoBranded') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: SECTION_BANNER_PATHS.coBranded,
        rightImg: SECTION_BANNER_PATHS.coBranded,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'SpongeBob') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: SECTION_BANNER_PATHS.spongebobSeries,
        rightImg: SECTION_BANNER_PATHS.spongebobSeries,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'Manor') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: SECTION_BANNER_PATHS.manorSeries,
        rightImg: SECTION_BANNER_PATHS.manorSeries,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    if (activeCategory === 'Elf') {
      return {
        title: getCategoryName(activeCategory),
        subtitle: t('shop.subtitle'),
        leftImg: SECTION_BANNER_PATHS.elfSeries,
        rightImg: SECTION_BANNER_PATHS.elfSeries,
        bgColor: 'bg-bakery-pink-light/30',
        borderColor: 'border-bakery-pink-light',
        badge: null,
        badgeIcon: null
      };
    }
    // Default for categories or "All"
    return {
      title: activeCategory === 'All' ? t('nav.allProducts') : getCategoryName(activeCategory),
      subtitle: t('shop.subtitle'),
      leftImg: activeCategory === 'All'
        ? allProductsBanner
        : "https://images.unsplash.com/photo-1558060370-d64111d20163?auto=format&fit=crop&q=80&w=1600",
      rightImg: "https://images.unsplash.com/photo-1596461404969-9ce20f71881b?auto=format&fit=crop&q=80&w=1600",
      bgColor: 'bg-bakery-pink-light/30',
      borderColor: 'border-bakery-pink-light',
      badge: null,
      badgeIcon: null
    };
  };

  const banner = getBannerConfig();
  const isThemeSeries = activeCategory !== 'All' || activeTag;

  return (
    <div className="pb-12 md:pb-20">
      {/* Shop Header Banner Section - Rounded Board Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BannerBoard 
          src={banner.leftImg}
          mobileSrc={
            activeCategory === 'All'
              ? allProductsMobileBanner
              : activeCategory === 'DailyLimited'
                ? dailyLimitedMobileBanner
                : activeCategory === 'HealingSeries'
                  ? healingSeriesMobileBanner
                : activeCategory === 'LogicCake'
                  ? giftPicksMobileBanner
                : activeCategory === 'CoBranded'
                  ? coBrandedMobileBanner
                : undefined
          }
          alt="Shop Banner"
          aspectRatio="aspect-[430/365] md:aspect-[1913/822]"
          className="mb-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
      <div className="flex flex-col gap-8 mb-12">
        {/* Search Bar - Centered and Refined */}
        <div className="max-w-2xl mx-auto w-full px-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-bakery-brown/40 group-focus-within:text-pink-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={t('shop.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border-2 border-bakery-pink-light rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all text-bakery-brown shadow-sm text-lg"
            />
          </div>
        </div>
        
        {/* Category Navigation */}
        <div className="flex flex-col items-center gap-4">
          {isBestSeller ? (
            <div className="flex items-center gap-4 text-sm md:text-base font-bold text-bakery-brown/60">
              <span className="text-pink-500">{t('shop.hot')}:</span>
              <div className="flex gap-4 md:gap-8">
                {['Plushies', 'Wooden', 'Disney', 'Puzzles'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="hover:text-pink-500 transition-colors border-b-2 border-transparent hover:border-pink-500 pb-1"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {currentCategories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm md:text-base whitespace-nowrap transition-all border-2 ${
                    activeCategory === category 
                      ? 'bg-bakery-brown text-white border-bakery-brown shadow-lg' 
                      : 'bg-white text-bakery-brown border-bakery-pink-light hover:border-pink-300 hover:bg-bakery-pink-light/20'
                  }`}
                >
                  {getCategoryName(category)}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const isTop3 = isBestSeller && index < 3;
              const rank = index + 1;
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={product.id} 
                  className={`bg-white rounded-2xl sm:rounded-[3rem] p-1.5 sm:p-6 shadow-md border-2 transition-all group flex flex-col relative ${
                    isTop3 
                      ? 'border-bakery-yellow ring-4 ring-bakery-yellow/10 scale-105 z-10' 
                      : 'border-bakery-pink-light hover:border-pink-300'
                  }`}
                >
                  {/* Rank Badge */}
                  {isTop3 && (
                    <div className={`absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg z-20 border-4 border-white ${
                      rank === 1 ? 'bg-bakery-yellow text-bakery-brown' :
                      rank === 2 ? 'bg-slate-300 text-slate-700' :
                      'bg-orange-300 text-orange-800'
                    }`}>
                      {rank}
                    </div>
                  )}

                  <Link to={`/product/${product.id}`} className="aspect-square rounded-lg sm:rounded-[2.5rem] overflow-hidden mb-2 sm:mb-6 bg-bakery-cream relative block">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={product.imageUrl} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = product.fallbackImage;
                      }}
                      alt={product.name.en} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-bakery-brown shadow-sm">
                      {product.category[language]}
                    </div>
                  </Link>
                  
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`} className="block group-hover:text-pink-500 transition-colors">
                      <h3 className="text-sm sm:text-2xl font-display font-black text-bakery-brown mb-1 line-clamp-1 group-hover:text-inherit transition-colors">{product.name[language]}</h3>
                    </Link>
                    {isBestSeller && (
                      <div className="flex flex-col gap-1 mb-3">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-pink-500">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          {t('shop.orderedThisWeek')}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-bakery-mint">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-bakery-mint" />
                          {t('shop.positiveRating')}
                        </div>
                      </div>
                    )}
                    <p className="text-[10px] sm:text-sm text-bakery-brown/60 mb-2 sm:mb-4 line-clamp-1 sm:line-clamp-2 font-medium">{product.description[language]}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4 border-t border-bakery-pink-light/50">
                    <span className="text-lg sm:text-3xl font-black text-pink-500">{formatPrice(getCardPriceUsd(product, unitsPerUsd))}</span>
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: '#86efac' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addItem({ ...product, price: getCardPriceUsd(product, unitsPerUsd), quantity: 1 })}
                      className="flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 bg-bakery-mint text-bakery-brown rounded-full transition-colors shadow-md"
                      title="Add to cart"
                    >
                      <Plus className="h-5 w-5 sm:h-8 sm:w-8" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="max-w-md mx-auto bg-white p-10 rounded-[3rem] border-2 border-bakery-pink-light shadow-sm">
                <div className="text-6xl mb-6">🍪</div>
                <h2 className="text-2xl md:text-3xl font-display font-black text-bakery-brown mb-4">
                  {isBestSeller ? t('shop.emptyBestSellerTitle') : 'No toys found.'}
                </h2>
                <p className="text-bakery-brown/70 font-medium mb-8">
                  {isBestSeller ? t('shop.emptyBestSellerSubtitle') : "We couldn't find any toys matching your search."}
                </p>
                <Link 
                  to="/shop?tag=NewArrival"
                  className="inline-flex items-center gap-2 bg-bakery-pink text-white px-8 py-4 rounded-2xl font-bold hover:bg-pink-400 transition-all shadow-md"
                >
                  {t('nav.newArrivals')} <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </div>
  );
}
